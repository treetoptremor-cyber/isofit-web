// Capture a running build (default http://localhost:3100) into <outdir>:
//   text/       desktop 1440, JS on        (ledger: status, title, canonical, meta, JSON-LD, headings, ids, links, alts, text)
//   text-mobile/ 390 wide, JS on, plus mobile-menu text opened
//   text-nojs/  JavaScript disabled        (proves content is server-rendered)
//   machine/    llms*.txt, sitemap, robots, all 14 /md mirrors (full text), all 14 /og images (sha256)
//   perf/       mobile-emulated load metrics for key routes
//   shots/      full-page screenshots at 390 and 1440 (not committed)
// Usage: node capture.mjs <base> <outdir>   (needs `playwright`; set CHROMIUM to override the browser path)
import { chromium } from "playwright";
import fs from "fs";
import crypto from "crypto";
const base = process.argv[2] || "http://localhost:3100";
const out = process.argv[3];
const ROUTES = ["/","/features","/features/workout-logging","/features/body-graph","/features/atlas","/features/bonfire","/pricing","/compare","/compare/isofit-vs-hevy","/compare/isofit-vs-strong","/compare/isofit-vs-fitbod","/compare/isofit-vs-jefit","/faq","/about","/terms","/privacy","/health-privacy","/login","/signup","/join","/forgot-password","/update-password","/waitlist/ok","/waitlist/already","/waitlist/missing","/billing","/billing/return","/billing/success","/billing/cancel","/checkout/success","/checkout/cancelled","/iso-sync/success","/iso-sync/cancel"];
const DOCS = ["/","/features","/features/workout-logging","/features/body-graph","/features/atlas","/features/bonfire","/pricing","/compare","/compare/isofit-vs-hevy","/compare/isofit-vs-strong","/compare/isofit-vs-fitbod","/compare/isofit-vs-jefit","/faq","/about"];
const name = (r) => (r === "/" ? "home" : r.slice(1).replace(/\//g, "--"));
for (const d of ["text","text-mobile","text-nojs","machine","perf","shots","html"]) fs.mkdirSync(`${out}/${d}`, { recursive: true });

// ---- machine-readable routes
const machine = ["/llms.txt","/llms-full.txt","/sitemap.xml","/robots.txt", ...DOCS.map((r) => "/md" + (r === "/" ? "/index" : r))];
for (const r of machine) {
  const res = await fetch(base + r, { redirect: "manual" });
  const hdr = [...res.headers].filter(([k]) => ["content-type", "x-robots-tag"].includes(k)).map((h) => h.join(": ")).join("\n");
  fs.writeFileSync(`${out}/machine/${name(r)}.txt`, `status ${res.status}\n${hdr}\n\n${await res.text()}`);
}
for (const r of DOCS) {
  const slug = r === "/" ? "home" : r.slice(1).replace(/\//g, "--");
  const res = await fetch(`${base}/og/${slug}`, { redirect: "manual" });
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(`${out}/machine/og--${slug}.txt`, `status ${res.status}\ncontent-type: ${res.headers.get("content-type")}\nsha256 ${crypto.createHash("sha256").update(buf).digest("hex")}\nbytes ${buf.length}\n`);
}

const extract = () => ({
  title: document.title,
  meta: [...document.querySelectorAll("meta[name],meta[property]")].map((m) => (m.getAttribute("name") || m.getAttribute("property")) + "=" + m.content),
  jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
  headings: [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => h.tagName + " " + h.textContent.trim()),
  ids: [...document.querySelectorAll("[id]")].map((e) => e.id).filter((i) => !i.startsWith("_R_") && !i.includes("_R_")),
  links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
  imgalts: [...document.querySelectorAll("img")].map((i) => i.alt),
  text: document.body.innerText,
});
const executablePath = process.env.CHROMIUM || "/opt/pw-browsers/chromium";
const b = await chromium.launch({ executablePath });
const canonOf = (raw) => (raw.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || null;

for (const [variant, w, h, js] of [["text", 1440, 900, true], ["text-mobile", 390, 844, true], ["text-nojs", 1440, 900, false]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, javaScriptEnabled: js });
  const p = await ctx.newPage();
  for (const r of ROUTES) {
    const res = await p.goto(base + r, { waitUntil: js ? "networkidle" : "load" }).catch(() => null);
    const raw = res ? await res.text() : "";
    const data = await p.evaluate(extract);
    const rec = { route: r, status: res?.status(), canonical: canonOf(raw), ...data };
    if (variant === "text-mobile") {
      const menu = p.locator('button[aria-label*="menu" i], button[aria-controls], summary').first();
      if (await menu.count()) { await menu.click().catch(() => {}); await p.waitForTimeout(300); rec.menuOpenText = await p.evaluate(() => document.body.innerText); }
    }
    if (variant === "text") fs.writeFileSync(`${out}/html/${name(r)}.html`, raw);
    fs.writeFileSync(`${out}/${variant}/${name(r)}.json`, JSON.stringify(rec, null, 1));
    if (js) await p.screenshot({ path: `${out}/shots/${name(r)}-${w === 390 ? "mobile" : "desktop"}.png`, fullPage: true });
  }
  await ctx.close();
}

// ---- performance (mobile emulation, cold cache, JS on). Numbers are noisy: compare ranges, not exact values.
for (const r of ["/", "/features/body-graph", "/compare/isofit-vs-hevy", "/pricing", "/faq"]) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  const reqs = []; p.on("response", async (rs) => { try { reqs.push({ url: rs.url(), type: rs.request().resourceType(), bytes: (await rs.body()).length }); } catch {} });
  await p.addInitScript(() => {
    window.__m = { cls: 0, lcp: 0 };
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value; }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__m.lcp = e.startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  await p.goto(base + r, { waitUntil: "networkidle" }); await p.waitForTimeout(800);
  const m = await p.evaluate(() => ({ ...window.__m, dcl: Math.round(performance.getEntriesByType("navigation")[0].domContentLoadedEventEnd), domNodes: document.getElementsByTagName("*").length }));
  const sum = (t) => reqs.filter((x) => x.type === t).reduce((a, x) => a + x.bytes, 0);
  fs.writeFileSync(`${out}/perf/${name(r)}.json`, JSON.stringify({ route: r, requests: reqs.length, bytes: { total: reqs.reduce((a, x) => a + x.bytes, 0), script: sum("script"), image: sum("image"), font: sum("font"), stylesheet: sum("stylesheet") }, cls: +m.cls.toFixed(4), lcpMs: Math.round(m.lcp), dclMs: m.dcl, domNodes: m.domNodes }, null, 1));
  await ctx.close();
}
await b.close();
