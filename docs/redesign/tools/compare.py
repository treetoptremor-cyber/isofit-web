#!/usr/bin/env python3
"""Compare a fresh capture against baseline. Usage: compare.py <baseline_dir> <new_dir>
Reports per route: title/canonical/meta/JSON-LD/anchor-id/heading/link/alt changes, source copy missing from the new
rendered text, and any change to machine-readable routes. Text *order/layout* may change; copy may not go missing."""
import json, sys, glob, os, re
a, b = sys.argv[1:3]
norm = lambda s: re.sub(r"\s+", " ", s).strip().lower()
bad = 0
for f in sorted(glob.glob(f"{a}/text/*.json")):
    n = os.path.basename(f); g = f"{b}/text/{n}"
    old = json.load(open(f))
    if not os.path.exists(g): print("MISSING ROUTE", old["route"]); bad += 1; continue
    new = json.load(open(g)); out = []
    for k in ("status", "title", "canonical", "meta", "jsonld", "links", "imgalts"):
        if old.get(k) != new.get(k): out.append(k)
    for k in ("ids", "headings"):
        miss = [x for x in old[k] if x not in new[k]]
        if miss: out.append(f"{k} missing: {miss[:5]}")
    # copy parity: every baseline text line must still appear (case-insensitive: CSS may change casing)
    nt = norm(new["text"]); gone = [l for l in old["text"].split("\n") if len(norm(l)) > 3 and norm(l) not in nt]
    if gone: out.append(f"{len(gone)} text lines missing, e.g. {gone[:3]}")
    if out: bad += 1; print(old["route"], "->", "; ".join(map(str, out)))
for f in sorted(glob.glob(f"{a}/machine/*")):
    g = f"{b}/machine/{os.path.basename(f)}"
    if not os.path.exists(g) or open(f).read() != open(g).read(): bad += 1; print("MACHINE OUTPUT CHANGED", os.path.basename(f))
print("clean" if not bad else f"{bad} differences")
sys.exit(1 if bad else 0)
