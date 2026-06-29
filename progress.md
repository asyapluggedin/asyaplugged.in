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

#### high priority — fixed 2026-06-28
- ~~`templates/macros/topnav.html:6` — `shema.org` typo (should be `schema.org`); breaks structured data / seo~~ **fixed**
- ~~`sass/macros/_topnav.scss:92` — `var(var(--foreground))` double-nested, invalid css~~ **fixed**
- ~~`sass/page.scss:28` — `var(--backgorund)` typo; background never applies on mobile~~ **fixed**
- ~~`sass/know.scss:124` — `stection {` typo block removed (was /do card grid styles copy-pasted into know.scss; never belonged here; activating it broke blog layout)~~ **fixed**
- ~~`sass/you.scss:165` and `sass/love.scss:165` — `position: 75%` is invalid css~~ **fixed** (→ `max-width: 100%`)

#### medium priority — fixed 2026-06-28
- ~~`templates/macros/blogelements.html:120,135,150,165` — tag/category links use placeholder hrefs `"swag"` and `"hmm"`; broken~~ **fixed** (→ `get_taxonomy_url()`)
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
- ~~`sass/know.scss:124-180` — entire `stection {}` block dead (typo)~~ **removed**
- ~~`static/mode-switch.js:4` — `console.log` left in for production~~ **fixed**
- `templates/macros/topnav.html:38-69` — commented-out nav items
- ~~`templates/macros/footer.html:6-17` — dead github api fetch that writes nowhere and throws error~~ **fixed**

---

### visual design refactor — 2026-06-28

- flattened metadata bubble: removed blob border-radius, replaced with 1px `$dark1` top border
- h2–h6 headings now `var(--blogtext)`; only `.title` retains accent color — heading hierarchy now clear
- `.title` size increased 1.75rem → 2rem, bottom margin 1.25rem → 2rem
- metadata (`.sections`) now JetBrains Mono, 0.8rem, `$dark1` — reads as status text
- spacing before prose increased (metadata margin-bottom 1rem → 2.5rem)
- fixed `line-height: 1.3rem` (broken fixed value) → `1.6` ratio
- fixed invalid `box-shadow: 2px solid` on `<pre>` → `2px 2px 0 var(--foreground)`
- sidebar default link color dimmed to `$dark1`; accent reserved for active/hover border only
- toc inactive items dimmed to `$dark1`; font sizes tightened (14→13px, children 13→12px)
- toc section label now mono, uppercase, letter-spaced

---

### top 5 to fix — remaining
- `templates/head.html:31` — references `topnav.css` which doesn't exist as a separate compiled file
- `templates/do.html:19` — remove `snorksnorrrk` placeholder text
- `templates/category/single.html` + `list.html` — implement category pages (currently empty)
- `blogelements.html` — remove unused macros: `taxonomies_authors()`, `taxonomies_tags()`, `taxonomies_category()`, `updatedDate()`
- `templates/macros/topnav.html:38-69` — remove commented-out nav items