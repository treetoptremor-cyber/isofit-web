#!/usr/bin/env python3
"""Compare a fresh capture against baseline.   Usage: compare.py <baseline_dir> <new_dir> [--perf]

Checks (per route, for desktop, mobile and no-JS captures):
  * status, title, canonical, meta/OG/Twitter tags, JSON-LD: exact match
  * links, image alts, anchor ids, headings: compared as MULTISETS, so approved regrouping/reordering passes but a
    missing, renamed or duplicated item fails. Heading *levels* are part of the heading string ("H2 ...").
  * copy: every baseline text line must still appear, and no line may appear MORE often than in the baseline
    (duplicated copy is a stop-ship). Lines of 3 characters or fewer (e.g. "->" glyphs) are ignored. Case-insensitive,
    because CSS may change casing.
  * mobile-menu text (menuOpenText) must contain every baseline menu line
  * machine routes (llms*.txt, sitemap, robots, 14 /md mirrors, 14 /og hashes): byte-identical
Section order is NOT enforced here; review the page manifest for that. --perf prints a perf delta table (informational).
Exit code 1 on any difference."""
import json, sys, glob, os, re
from collections import Counter
a, b = sys.argv[1:3]
norm = lambda s: re.sub(r"\s+", " ", s).strip().lower()
lines = lambda t: Counter(n for n in (norm(l) for l in t.split("\n")) if len(n) > 3)
bad = 0
def report(msg):
    global bad; bad += 1; print(msg)
for variant in ("text", "text-mobile", "text-nojs"):
    for f in sorted(glob.glob(f"{a}/{variant}/*.json")):
        n = os.path.basename(f); g = f"{b}/{variant}/{n}"
        old = json.load(open(f))
        if not os.path.exists(g): report(f"[{variant}] MISSING ROUTE {old['route']}"); continue
        new = json.load(open(g)); out = []
        for k in ("status", "title", "canonical", "meta", "jsonld"):
            if old.get(k) != new.get(k): out.append(k)
        for k in ("links", "imgalts", "ids", "headings"):
            o, nw = Counter(old[k]), Counter(new[k]); miss, extra = o - nw, nw - o
            if miss: out.append(f"{k} missing {list(miss.elements())[:4]}")
            if extra: out.append(f"{k} added/duplicated {list(extra.elements())[:4]}")
        o, nw = lines(old["text"]), lines(new["text"])
        gone, dup = o - nw, nw - o
        if gone: out.append(f"{sum(gone.values())} copy lines missing e.g. {list(gone)[:3]}")
        if dup: out.append(f"{sum(dup.values())} copy lines duplicated/added e.g. {list(dup)[:3]}")
        if "menuOpenText" in old:
            gm = lines(old["menuOpenText"]) - lines(new.get("menuOpenText", ""))
            if gm: out.append(f"mobile menu lines missing e.g. {list(gm)[:3]}")
        if out: report(f"[{variant}] {old['route']} -> " + "; ".join(map(str, out)))
for f in sorted(glob.glob(f"{a}/machine/*")):
    g = f"{b}/machine/{os.path.basename(f)}"
    if not os.path.exists(g) or open(f).read() != open(g).read(): report(f"MACHINE OUTPUT CHANGED {os.path.basename(f)}")
if "--perf" in sys.argv:
    for f in sorted(glob.glob(f"{a}/perf/*.json")):
        o = json.load(open(f)); g = f"{b}/perf/{os.path.basename(f)}"
        if os.path.exists(g):
            nw = json.load(open(g)); print(f"perf {o['route']}: bytes {o['bytes']['total']}->{nw['bytes']['total']} js {o['bytes']['script']}->{nw['bytes']['script']} cls {o['cls']}->{nw['cls']} lcp {o['lcpMs']}->{nw['lcpMs']}ms")
print("clean" if not bad else f"{bad} differences")
sys.exit(1 if bad else 0)
