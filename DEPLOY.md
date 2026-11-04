# How this site is deployed

Domain: https://abdelrahmanelsayed.vercel.app (Vercel project abdelrahman-elsayed, team_X4ldoYphcuyvyC50EY0oIJzB, prj_yzDBjujg302EeDSDe7erAQ9RUl3l)

- Static assets (images /w, CVs /cv, CSS + GE SS fonts /assets) are served through jsDelivr at a fixed commit. Page data (apply/<slug>.json) is served live from the main branch via raw.githubusercontent.com. Both via the rewrites in vercel.json.
- Every company page is rendered by ONE shell, apply.html, at /apply/<slug>. It loads /data/<slug>.json. Pages always open in English; the top button switches the whole page to Arabic (GE SS fonts).

## Templates
Start every new page from a file in templates/ (job-web-event, job-ai-realestate, job-uiux-brand, job-marketing-design, client-generic, client-gym, client-realestate, client-food, client-retail). templates/ is never served and never deleted. Copy to apply/<slug>.json and rewrite every string.

## Add a company page (NO Vercel deploy needed)
1. Copy a file from templates/ to apply/<slug>.json and rewrite every "en" and "ar" string for that company. No CV anywhere on pages.
2. Validate the JSON, commit, `git pull --rebase origin main`, push to main. That's it.
3. /data/<slug>.json is served live from GitHub (raw.githubusercontent.com, main branch) through the vercel.json rewrite, so the page https://abdelrahmanelsayed.vercel.app/apply/<slug> works within about 1-5 minutes of the push. Check it with Vercel web_fetch_vercel_url on https://abdelrahmanelsayed.vercel.app/data/<slug>.json (expect 200) before using the link.
4. Do NOT call Vercel create_deployment and do NOT edit vercel.json for new pages or expiries.

## When a Vercel deploy IS needed
Only when apply.html, index.html or vercel.json change (done manually in a chat, not by the daily agent): create_deployment with vercel.json inline and apply.html/index.html by {file, sha1, size}. The /w, /cv, /assets rewrites point to jsDelivr at a fixed commit; bump that sha only when images, CSS or fonts change.

Never proxy HTML through jsDelivr (it serves text/plain). Bump ?v= on the CSS link in apply.html when style.css changes.


## Expiry (30 days)
Each run: for every apply/<slug>.json except client-template, find its start date = the Sent date, or else the Date found, of the Jobs/Clients row whose page link ends with /apply/<slug> (or the To Send row date). If there is no sheet row, use the date of the commit that added the file (run `git fetch --unshallow` first if the clone is shallow). If that date is 30+ days ago AND the row status is not "Replied" AND its Notes do not contain "keep": `git rm apply/<slug>.json`. Commit "Expire old pages" and push (no deploy needed; the page 404s within ~5 minutes). In the sheet, change that row's page link cell to "expired <date>". The page then shows "Page not found" with a link to the portfolio.
