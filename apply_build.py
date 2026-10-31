"""Build bilingual application pages: python3 apply_build.py <slug> [<slug>...]
Reads apply/<slug>.json, writes apply/<slug>/index.html."""
import json, sys, html, pathlib

CSSV = "2"
PDF = "https://drive.google.com/file/d/1ew7FIP2rW-dcuGnLQMi-8I99_wXS-K0f/view"
WA = "201019815508"

def t(en, ar):
    return f'<span class="en-t">{en}</span><span class="ar-t">{ar}</span>'

def build(slug):
    d = json.loads(pathlib.Path(f"apply/{slug}.json").read_text())
    E, A = d["en"], d["ar"]
    cv = f'/cv/Abdelrahman_Elsayed_CV_{d.get("cv","AI")}.pdf'
    from urllib.parse import quote
    wa_en = quote(E["wa_text"]); wa_ar = quote(A["wa_text"])
    why = "\n".join(
        f'    <div class="tcard"><div class="n">0{i+1}</div><h3>{t(e["h"], a["h"])}</h3><p>{t(e["p"], a["p"])}</p></div>'
        for i, (e, a) in enumerate(zip(E["why"], A["why"])))
    steps = "\n".join(
        f'    <div class="tcard"><div class="n">{i+1}</div><h3>{t(e["h"], a["h"])}</h3><p>{t(e["p"], a["p"])}</p></div>'
        for i, (e, a) in enumerate(zip(E["steps"], A["steps"])))
    imgs = "\n".join(
        f'    <figure class="card"><img src="/w/{im["src"]}.jpg" alt="{html.escape(im["en_title"])}" loading="lazy"><figcaption class="cap"><b>{t(im["en_title"], im["ar_title"])}</b>{t(im["en_cap"], im["ar_cap"])}</figcaption></figure>'
        for im in d["images"])
    page = f'''<!doctype html>
<html lang="{d["default_lang"]}" dir="{"rtl" if d["default_lang"]=="ar" else "ltr"}" data-lang="{d["default_lang"]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(E["title"])}</title>
<meta name="robots" content="noindex">
<meta property="og:title" content="{html.escape(E["title"])}">
<meta property="og:image" content="/w/{d["images"][0]["src"]}.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Inter:wght@400;600;700&family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css?v={CSSV}">
<script>(function(){{var d=document.documentElement,p=new URLSearchParams(location.search).get('lang');function s(l){{d.dataset.lang=l;d.lang=l;d.dir=l==='ar'?'rtl':'ltr'}}if(p==='ar'||p==='en')s(p);document.addEventListener('click',function(e){{if(e.target.closest('[data-toggle-lang]'))s(d.dataset.lang==='ar'?'en':'ar')}})}})();</script>
</head>
<body>

<header class="bar"><div class="wrap">
  <a class="logo" href="/">{t("Abdelrahman", "عبدالرحمن")}<span>.</span></a>
  <div class="bar-right"><span class="tag">{t(E["tag"], A["tag"])}</span><button class="btn small lang-btn" data-toggle-lang>{t("عربي", "English")}</button></div>
</div></header>

<main class="wrap">
<div class="hero">
  <span class="eyebrow">{t(E["eyebrow"], A["eyebrow"])}</span>
  <h1>{t(E["h1"], A["h1"])}</h1>
  <p class="lead">{t(E["lead"], A["lead"])}</p>
  <div class="btns">
    <a class="btn primary" href="#talk">{t("Book 15 minutes", "نحجز 15 دقيقة")}</a>
    <a class="btn" href="{cv}" target="_blank">{t("Download CV", "تحميل السيرة الذاتية")}</a>
    <a class="btn" href="{PDF}" target="_blank">{t("Full portfolio with videos ↗", "البورتفوليو كامل بالفيديوهات ↗")}</a>
  </div>
</div>

<section>
  <div class="sec-head"><h2><small>{t("Why me", "لماذا أنا")}</small>{t(E["why_title"], A["why_title"])}</h2></div>
  <div class="grid g3">
{why}
  </div>
</section>

<section>
  <div class="sec-head"><h2><small>{t("How I work", "طريقة الشغل")}</small>{t(E["steps_title"], A["steps_title"])}</h2><p>{t(E["steps_sub"], A["steps_sub"])}</p></div>
  <div class="grid g2">
{steps}
  </div>
</section>

<section>
  <div class="sec-head"><h2><small>{t("Selected work", "نماذج من شغلي")}</small>{t("A few pieces", "بعض الأعمال")}</h2><p>{t(f'More in the <a href="{PDF}" target="_blank">full portfolio</a>, with the AI videos linked inside.', f'المزيد في <a href="{PDF}" target="_blank">البورتفوليو الكامل</a> ومعه روابط فيديوهات الذكاء الاصطناعي.')}</p></div>
  <div class="grid g2">
{imgs}
  </div>
</section>

<section>
  <div class="facts" style="margin-top:0">
    <span><b>{t("Nationality", "الجنسية")}</b> {t("Egyptian", "مصري")}</span>
    <span><b>{t("Relocation", "الانتقال")}</b> {t("ready to move to " + d.get("country_en","Oman"), "جاهز للانتقال إلى " + d.get("country_ar","عُمان"))}</span>
    <span><b>{t("Notice period", "فترة الإشعار")}</b> {t("1 week", "أسبوع واحد")}</span>
    <span><b>{t("Driving licence", "رخصة قيادة")}</b> {t("yes", "نعم")}</span>
    <span><b>{t("Languages", "اللغات")}</b> {t("Arabic, English", "العربية والإنجليزية")}</span>
  </div>
</section>

<div class="cta" id="talk">
  <h2>{t(E["cta_h"], A["cta_h"])}</h2>
  <p>{t(E["cta_p"], A["cta_p"])}</p>
  <div class="btns">
    <a class="btn primary en-t" href="https://wa.me/{WA}?text={wa_en}" target="_blank">WhatsApp me</a>
    <a class="btn primary ar-t" href="https://wa.me/{WA}?text={wa_ar}" target="_blank">تواصلوا واتساب</a>
    <a class="btn" href="mailto:abdelrahmanelsayed252@gmail.com?subject={quote(E["mail_subject"])}">{t("Email me", "راسلوني بالإيميل")}</a>
    <a class="btn" href="{cv}" target="_blank">{t("Download CV", "تحميل السيرة الذاتية")}</a>
  </div>
</div>
</main>

<footer><div class="wrap"><span>{t("Abdelrahman Elsayed", "عبدالرحمن السيد")} · <span dir="ltr">+20 101 981 5508</span></span><a href="https://www.linkedin.com/in/abdelrahman-elsayed-8a51b51ba" target="_blank">LinkedIn ↗</a></div></footer>
</body>
</html>
'''
    out = pathlib.Path(f"apply/{slug}/index.html"); out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(page)
    print(out, len(page.encode()))

for s in sys.argv[1:]:
    build(s)
