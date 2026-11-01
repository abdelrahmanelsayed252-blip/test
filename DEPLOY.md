# How this site is deployed

Domain: https://abdelrahmanelsayed.vercel.app (Vercel project abdelrahman-elsayed, team_X4ldoYphcuyvyC50EY0oIJzB, prj_yzDBjujg302EeDSDe7erAQ9RUl3l)

- Static assets (images /w, CVs /cv, CSS + GE SS fonts /assets) and page data (apply/<slug>.json) live in this repo and are served through jsDelivr at a fixed commit, via the rewrites in vercel.json.
- Every company page is rendered by ONE shell, apply.html, at /apply/<slug>. It loads /data/<slug>.json. Pages always open in English; the top button switches the whole page to Arabic (GE SS fonts).

## Add a company page
1. Jobs: copy apply/abhar.json (web/event roles) or apply/misk.json (AI content / real estate). Clients (cafes, gyms, clinics, real estate, retail): copy apply/client-template.json, which has "kind": "client" (hides relocation/start facts). Rewrite every "en" and "ar" string for that company (Arabic in clean Gulf-friendly Arabic). Pick 4 images from /w/. No CV anywhere on pages.
2. Commit and push to main. Note the new HEAD sha.
3. In vercel.json replace the old 40-char commit sha with the new HEAD sha (all rewrites). Commit + push.
4. Vercel create_deployment with ONLY: vercel.json (inline, utf-8), apply.html and index.html referenced by {file, sha1, size} of the repo files (inline them only if Vercel says they are missing).
5. Check https://abdelrahmanelsayed.vercel.app/data/<slug>.json returns 200, then use https://abdelrahmanelsayed.vercel.app/apply/<slug>.

Never proxy HTML through jsDelivr (it serves text/plain). Bump ?v= on the CSS link in apply.html when style.css changes.
