import subprocess, pathlib, re, json, sys
sha = subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
cdn = f"https://cdn.jsdelivr.net/gh/abdelrahmanelsayed252-blip/test@{sha}"
out = pathlib.Path('out'); out.mkdir(exist_ok=True)
for src in ['index.html'] + [str(p) for p in pathlib.Path('apply').rglob('index.html')]:
    h = pathlib.Path(src).read_text()
    h = h.replace('href="/assets/', f'href="{cdn}/assets/').replace('src="/w/', f'src="{cdn}/w/').replace('content="/w/', f'content="{cdn}/w/').replace('href="/cv/', f'href="{cdn}/cv/')
    d = out / src; d.parent.mkdir(parents=True, exist_ok=True); d.write_text(h)
    print(src, len(h))
print(cdn)
