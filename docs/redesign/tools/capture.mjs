import { chromium } from "playwright";
import fs from "fs";
const base = process.argv[2] || "http://localhost:3100";
const out = process.argv[3];
const routes = ["/","/features","/features/workout-logging","/features/body-graph","/features/atlas","/features/bonfire","/pricing","/compare","/compare/isofit-vs-hevy","/compare/isofit-vs-strong","/compare/isofit-vs-fitbod","/compare/isofit-vs-jefit","/faq","/about","/terms","/privacy","/health-privacy","/login","/signup","/join","/forgot-password","/update-password","/waitlist/ok","/waitlist/already","/waitlist/missing","/billing","/billing/return","/billing/success","/billing/cancel","/checkout/success","/checkout/cancelled","/iso-sync/success","/iso-sync/cancel"];
const machine = ["/llms.txt","/llms-full.txt","/sitemap.xml","/robots.txt","/md/index","/md/features","/md/pricing","/md/compare/isofit-vs-hevy","/md/faq","/md/about"];
const name = r => r==="/"?"home":r.slice(1).replace(/\//g,"--");
for (const r of machine){ const res = await fetch(base+r,{redirect:"manual"}); fs.writeFileSync(`${out}/machine/${name(r)}.txt`, `status ${res.status}\n`+[...res.headers].filter(([k])=>["content-type","x-robots-tag"].includes(k)).map(h=>h.join(": ")).join("\n")+"\n\n"+await res.text()); }
const b = await chromium.launch({executablePath:"/opt/pw-browsers/chromium"});
const sizes = {mobile:[390,844],desktop:[1440,900]};
for (const [k,[w,h]] of Object.entries(sizes)){
  const ctx = await b.newContext({viewport:{width:w,height:h}}); const p = await ctx.newPage();
  for (const r of routes){
    const res = await p.goto(base+r,{waitUntil:"networkidle"}).catch(e=>null);
    const status = res?.status();
    if(k==="desktop"){
      const raw = await res.text(); fs.writeFileSync(`${out}/html/${name(r)}.html`, raw); const canon = (raw.match(/<link rel="canonical" href="([^"]*)"/)||[])[1]||null;
      const meta = await p.evaluate(()=>({title:document.title,meta:[...document.querySelectorAll('meta[name],meta[property]')].map(m=>(m.getAttribute('name')||m.getAttribute('property'))+"="+m.content),jsonld:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>s.textContent),headings:[...document.querySelectorAll('h1,h2,h3,h4')].map(h=>h.tagName+" "+h.textContent.trim()),ids:[...document.querySelectorAll('[id]')].map(e=>e.id),links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')),imgalts:[...document.querySelectorAll('img')].map(i=>i.alt),text:document.body.innerText}));
      fs.writeFileSync(`${out}/text/${name(r)}.json`, JSON.stringify({route:r,status,canonical:canon,...meta},null,1));
    }
    await p.screenshot({path:`${out}/shots/${name(r)}-${k}.png`,fullPage:true});
  }
  await ctx.close();
}
await b.close();
