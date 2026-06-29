# progress doc
## 8/22
common --> footer ()
folio --> blogelements (page)
header --> topnav (top_nav)

## 8/10

- make taxonomy macros have proper links in them eh
- create proper links for tag taxonomy
- create proper link for category taxonomy


- caused some potential problems in both .html files contained inside of templates/tags
- trying to have proper links 

## to do

- rename top menu bar to read normal text
- make russian version of website
- fix /know on dekstop
- fix /know on mobile
- post education blog post
- set up google nalytucs
- finish creative coding post
- upload a / living / breathing with some explainer text

## mobile

- fix footer
- fix circle.

## new to do

- fix what appears in sidear

## 10-01-2024

- titles for diff pages all appear as "asya davydova lewis", not descriptive and needs to be repaired

---

## site audit — 2026-06-18

### what the site is
personal portfolio/blog for anastasia davydova lewis. static site built with zola (tera templates + scss), vanilla js, inter + jetbrains mono fonts, google analytics + statcounter.

five sections: `/` (home), `/do` (portfolio), `/you` (about), `/know` (blog w/ tabs), `/love` (interests)

---

### bugs & errors

#### critical — fixed 2026-06-18
- ~~`static/mode-switch.js:22` — calls `get_theme()` which is never defined; theme init silently fails on every page load~~ **fixed**
- ~~`templates/macros/footer.html:6-17` — script fetches github api and writes to `#version` but that element doesn't exist in dom; throws null error on every page load~~ **fixed** (added `#version` span, fixed element selector, wired up `config.extra.version` in config.toml)

#### high priority — remaining
- `templates/macros/topnav.html:6` — `shema.org` typo (should be `schema.org`); breaks structured data / seo
- `sass/macros/_topnav.scss:92` — `var(var(--foreground))` double-nested, invalid css
- `sass/page.scss:28` — `var(--backgorund)` typo; background never applies on mobile
- `sass/know.scss:124` — `stection {` typo (should be `section`); entire styling block silently ignored by browser
- `sass/you.scss:165` and `sass/love.scss:165` — `position: 75%` is invalid css

#### medium priority — remaining
- `templates/macros/blogelements.html:120,135,150,165` — tag/category links use placeholder hrefs `"swag"` and `"hmm"`; broken
- ~~`templates/head.html:13-18` — two `<meta name="theme-color">` tags, first one (`red`) is redundant~~ **fixed**
- `templates/head.html:31` — references `topnav.css` which doesn't exist as a separate compiled file
- ~~`templates/head.html:56` vs `mode-switch.js:2-8` — head sets theme fallback to `"auto"`, mode-switch only accepts `"light"` or `"black"`; inconsistency~~ **fixed**

---

### loose ends / unfinished
- `templates/do.html:19` — hardcoded `snorksnorrrk` placeholder text still live
- `templates/category/single.html` and `list.html` — both empty files; category pages completely unimplemented
- `/know/drafts/` — 11 draft posts sitting unpublished
- russian version — mentioned as todo, not started
- sidebar content — not finalized
- footer version display requires a github release to exist on the repo before it shows anything

---

### unnecessary / redundant
- `templates/index.html` — large block of commented-out html from old design
- `blogelements.html` — macros defined but never called: `taxonomies_authors()`, `taxonomies_tags()`, `taxonomies_category()`, `updatedDate()`
- `sass/know.scss:124-180` — entire `stection {}` block dead (typo)
- ~~`static/mode-switch.js:4` — `console.log` left in for production~~ **fixed**
- `templates/macros/topnav.html:38-69` — commented-out nav items
- ~~`templates/macros/footer.html:6-17` — dead github api fetch that writes nowhere and throws error~~ **fixed**

---

### top 5 to fix — remaining
1. fix `shema.org` → `schema.org` in topnav.html — seo issue
2. fix `stection` → `section` in `know.scss` — large chunk of blog styling silently ignored
3. replace `"swag"` / `"hmm"` hrefs in `blogelements.html` — tag/category links broken
4. fix css typos: `var(var(--foreground))` in `_topnav.scss`, `var(--backgorund)` in `page.scss`
5. fix `position: 75%` in `you.scss` and `love.scss`