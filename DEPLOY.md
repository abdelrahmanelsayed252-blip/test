# How this site is deployed

- Images, CVs and CSS live in this repo and are served through jsDelivr at a fixed commit (see vercel.json rewrites).
- HTML pages are deployed to Vercel project `abdelrahman-elsayed` (team_X4ldoYphcuyvyC50EY0oIJzB, prj_yzDBjujg302EeDSDe7erAQ9RUl3l), domain https://abdelrahmanelsayed.vercel.app
- New application page: write `apply/<slug>.json` (copy abhar.json or misk.json; `en` + `ar` copy, `default_lang` = language of the job ad), run `python3 apply_build.py <slug>`, commit + push.
- After pushing, set the jsDelivr commit in vercel.json to the new HEAD only if images/CVs/CSS changed.
- Vercel create_deployment: vercel.json inline, unchanged HTML files by {file, sha1, size}, new/changed HTML inline (utf-8). If a sha is reported missing, send that file inline.
- Never proxy HTML through jsDelivr (it serves text/plain with immutable caching).
