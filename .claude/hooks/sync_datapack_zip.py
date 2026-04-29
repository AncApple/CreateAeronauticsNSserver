#!/usr/bin/env python3
import sys, json, re, zipfile, pathlib

data = json.load(sys.stdin)
f = data.get("tool_input", {}).get("file_path", "")
m = re.search(r"defaultconfigs/datapacks/([^/]+)/", f)
if not m:
    sys.exit(0)

pack = m.group(1)
root = pathlib.Path("/mnt/d/work/minecraft/CreateAeronauticsPack")
src = root / "defaultconfigs" / "datapacks" / pack
dst = root / "global_packs" / "required_data" / (pack + ".zip")

with zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED) as zf:
    for p in src.rglob("*"):
        if p.is_file():
            zf.write(p, p.relative_to(src))
