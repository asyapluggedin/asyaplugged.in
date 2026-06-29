# DESIGN.md — asyaplugged.in Design System
# Canonical reference for Claude Design and AI agents.
# Generated from the live codebase: templates/, sass/, static/mode-switch.js
# Last updated: 2026-06-18

---

## TOKENS

```yaml
# ─────────────────────────────────────────────
# COLORS — raw palette
# ─────────────────────────────────────────────
palette:
  black:       "#080808"   # near-black, body bg in dark mode
  white:       "#ffffff"   # pure white, body bg in light mode
  red_vivid:   "#FF0101"   # unused in UI, available
  red_primary: "#DB1414"   # --red4, light-mode foreground/link color
  red_dark:    "#A80000"   # darker red, available
  red_hover:   "#ffc4c4"   # --redhover, light-mode hover background
  teal_vivid:  "#40FFF4"   # --teal, dark-mode foreground/link color
  teal_hover:  "#0E3535"   # --tealhover, dark-mode hover background
  gray_dark:   "#333333"   # $dark3, deep text
  gray_mid:    "#555555"   # $dark2
  gray_soft:   "#777777"   # $dark1, borders, blockquotes
  gray_border: "#2F3336"   # --twitterborder, default (unthemed) foreground
  gray_light:  "#f9f9f9"   # $light4, code-block bg in light mode
  near_black:  "#101010"   # --blackhover, hover color for default body state
  blue:        "#0074d9"   # available, not used in UI
  pink:        "#FC32FC"   # --pinkhover, available

# ─────────────────────────────────────────────
# SEMANTIC TOKENS (CSS custom properties)
# ─────────────────────────────────────────────
# These are the *only* values components should reference.
# Raw palette names above are for SCSS variables only.

tokens:
  # Theme-independent (defined on :root in index.scss)
  color_black:        "#080808"
  color_white:        "#ffffff"
  color_teal:         "#40FFF4"
  color_red:          "#DB1414"
  color_redhover:     "#ffc4c4"
  color_tealhover:    "#0E3535"

  # Theme-dependent (set via body[data-theme])
  # Light theme  (body[data-theme="light"])
  light:
    background:  "#ffffff"
    foreground:  "#DB1414"   # links, borders, interactive elements
    blogtext:    "#080808"   # body copy in articles
    hovercolor:  "#ffc4c4"   # hover / active backgrounds

  # Dark theme  (body[data-theme="black"])
  dark:
    background:  "#080808"
    foreground:  "#40FFF4"
    blogtext:    "#ffffff"
    hovercolor:  "#0E3535"

# ─────────────────────────────────────────────
# SEMANTIC INTENT MAP (for new component authors)
# ─────────────────────────────────────────────
semantic:
  background_default:    "var(--background)"
  background_surface:    "var(--background)"   # cards, overlays — same token
  background_hover:      "var(--hovercolor)"
  text_primary:          "var(--blogtext)"      # body copy, article prose
  text_ui:               "var(--foreground)"    # nav, borders, headings in UI
  text_accent:           "var(--foreground)"    # links, active states
  text_secondary:        "#777777"              # $dark1 — timestamps, meta, captions
  border_default:        "var(--foreground)"    # 1px solid
  border_subtle:         "#777777"              # $dark1 — interior dividers
  code_bg_light:         "#f6f7f6"
  code_bg_dark:          "transparent"          # inherits article bg in dark

# ─────────────────────────────────────────────
# TYPOGRAPHY
# ─────────────────────────────────────────────
typography:
  font_sans:   "'Inter', system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
  font_mono:   "'JetBrains Mono', monospace"
  font_serif:  "'Literata', serif"   # home page only (Google Fonts); do not use elsewhere without loading it

  base_size:    "16px"
  base_weight:  400
  base_lh:      1.5          # recommended; current SCSS uses 1.3rem in articles (inconsistency)

  scale:
    h1:   { size: "2.5rem",   weight: 700, lh: 1.15 }
    h2:   { size: "1.75rem",  weight: 700, lh: 1.2  }
    h3:   { size: "1.25rem",  weight: 700, lh: 1.3  }
    h4:   { size: "1rem",     weight: 700, lh: 1.4  }
    body: { size: "1rem",     weight: 400, lh: 1.5  }
    meta: { size: "0.875rem", weight: 400, lh: 1.4  }  # timestamps, tags, footnotes
    nav:  { size: "1rem",     weight: 400, lh: 1.0  }
    code: { size: "0.9375rem", weight: 400, lh: 1.4 }  # 15px / ~95% of body

  article_title:
    size:   "1.75rem"   # .title in _article.scss
    family: "font_sans" # NOTE: current SCSS references 'Jjannon' (not loaded) — use Inter until Jjannon is served
    align:  center

  max_line_length: "65ch"   # target; enforce with max-width on article/prose containers

# ─────────────────────────────────────────────
# SPACING
# ─────────────────────────────────────────────
spacing:
  space_2xs: "0.25rem"   # 4px
  space_xs:  "0.5rem"    # 8px
  space_sm:  "0.75rem"   # 12px
  space_md:  "1rem"      # 16px
  space_lg:  "1.5rem"    # 24px
  space_xl:  "2rem"      # 32px
  space_2xl: "3rem"      # 48px
  space_3xl: "3.5rem"    # 56px

# ─────────────────────────────────────────────
# BORDER RADIUS
# ─────────────────────────────────────────────
radius:
  none:     "0"
  sm:       "2px"    # kbd, small chips
  md:       "3px"    # inline code
  lg:       "10px"   # article tables
  pill:     "2.76rem"  # .you li tags on /you
  organic:  "48% 52% 43% 57% / 56% 35% 65% 44%"  # details/summary blob shape

# ─────────────────────────────────────────────
# BORDERS & SHADOWS
# ─────────────────────────────────────────────
borders:
  default:   "1px solid var(--foreground)"
  subtle:    "1px solid #777777"          # $dark1
  thick:     "2px solid var(--foreground)"
  left_accent: "3px solid #777777"        # blockquotes

shadows:
  card_hover: "0px 0px 5px 5px var(--foreground)"  # /do project cards on hover

# ─────────────────────────────────────────────
# LAYOUT
# ─────────────────────────────────────────────
layout:
  container_default:
    max_width: "min(90vw, 1100px)"    # home page main
    margin:    "0 auto"

  container_article:
    max_width: "calc(100% - 5rem)"    # article in /know pages
    padding:   "3rem"

  grid_home:
    columns: "0.25fr 1fr 0.25fr"     # left gutter | content | right gutter

  grid_do:
    columns: "repeat(auto-fit, minmax(22%, 1fr))"
    rows:    "24.5vw"
    gap:     "10px"

  grid_footer:
    columns: "repeat(6, 1fr)"        # col1: site nav | col2-3: credits | col4-6: top link | col7: analytics

  grid_page:
    columns: "0.25fr 1fr 0.25fr"     # sidebar | article | toc

  breakpoints:
    mobile:  "600px"
    tablet:  "1000px"    # primary breakpoint — most layout changes happen here

# ─────────────────────────────────────────────
# THEMES
# ─────────────────────────────────────────────
themes:
  light:
    data_attr:  'body[data-theme="light"]'
    background: "#ffffff"
    foreground: "#DB1414"   # red
    blogtext:   "#080808"
    hovercolor: "#ffc4c4"
    toggle_icon: ".toggle-black"  # moon outline shown in light mode

  dark:
    data_attr:  'body[data-theme="black"]'
    background: "#080808"
    foreground: "#40FFF4"   # teal
    blogtext:   "#ffffff"
    hovercolor: "#0E3535"
    toggle_icon: ".toggle-light"  # moon filled shown in dark mode

  persistence: "localStorage key: 'theme'"
  valid_values: ["light", "black"]
  default:     "light"
  toggle_behavior: "binary — light ↔ black, no system-preference default after first visit"
```

---

## 1. Brand & Tone

**Who this site is for:** Anastasia "Asya" Davydova Lewis — restorative aesthetic practitioner, interface designer, software engineer, and body-modification / prosthetics researcher. Moscow-born, Los Angeles-based, UCLA Design Media Arts.

**Tonal pillars:**

- **Clinical but humane.** Clean geometry, strong lines, minimal decoration — but never cold. The red-on-white palette reads like a medical chart that has been handled by someone who cares about beauty. In dark mode, teal-on-black invokes the surgical green of an operating theater viewed at midnight.
- **Speculative and folkloric.** Ornament is not crime here. The organic blob shape on `<details>` elements, the animated orbiting "YES" circle on the home page, the Statcounter "eyes" SVG in the footer — these are intentional nods to animism, prosthetics culture, and pre-digital decoration.
- **Text-forward.** Every page leads with words. The work is not shown through polished case studies with full-bleed hero images — it is described, listed, catalogued. Prioritise legibility above all visual choices.
- **Accessible and honest.** No dark patterns. No filler. Keyboard navigable. Strong contrast ratios (light: red on white is borderline — monitor WCAG AA for small text; dark: teal on black passes AA comfortably).

**Voice for placeholder/label copy:** lowercase preferred in nav. Terse, laconic. ("work", "info", "blog", "love" — not "Portfolio", "About Me", "Articles", "Likes".)

---

## 2. Layout & Page Types

### Home (`/`)

**Current state:** A self-contained static HTML file (not extending `head.html`). Uses Literata from Google Fonts, inline styles, and a `<marquee>` element. This is intentional retro-web aesthetic for the splash, not a bug.

**Structure:**
1. Scrolling `<marquee>` headline at top ("asya plugged in" repeating)
2. `<main>` with `max-width: min(87vw, 1100px)`
3. Sections: `<h2>` + `<ul>` or `<p>` for each of Do / You / Know / Love

**Do/Don't:**
- Do: Keep the marquee. It is load-bearing personality.
- Do: Keep Literata on the home page — it reads as a deliberate break from the Inter system used elsewhere.
- Don't: Port the home page to the Zola template system without preserving the visual feel. The old Zola-based index.html (commented out) should remain archived, not deleted.
- Don't: Add images or cards to the home page. It is intentionally text-only.

---

### Portfolio Index (`/do`)

**Template:** `do.html` → extends `head.html` → loads `do.css`

**Structure:**
1. `<section>` — full-width auto-fit grid of project cards
2. Each card: `<a>` with optional `<img>` (feature image), `<span>` (title), `<div>` (description, slides in on hover)

**Grid:** `repeat(auto-fit, minmax(22%, 1fr))` at `24.5vw` row height.  
**Mobile:** `repeat(auto-fit, minmax(32%, 2fr))` at `34.5vw`.

**Hover interaction:** Image blurs (`blur(10px)`), title inverts / flips (`scale(-1,-1)`), description div fades up. Outline + box-shadow glow with `--foreground` color.

**Do/Don't:**
- Do: Every card must have a `feature_image` in page frontmatter, or the card will render as a text-only tile (valid fallback).
- Don't: Use placeholder text like "snorksnorrrk" in production (currently present in `do.html:19`).
- Don't: Add more than one text span per card — the invert animation depends on a single centred span.

---

### Project Detail

**Template:** `page.html` → loads `page.css`

**Structure (3-column):**
1. Left: `<nav id="sidebar">` — section index, sticky
2. Centre: `<article>` — title, metadata `<details>` disclosure, content, prev/next navigation
3. Right: `<aside id="toc">` — table of contents, sticky

**Metadata disclosure:** Wrapped in `<details class="allsections">` with organic blob border-radius. Reveals word count, reading time, tags, category.

**Mobile:** Collapses to single column. Sidebar and ToC hidden, revealed via toggle icons in `.show-bar` strip at top.

---

### About (`/you`)

**Template:** `you.html` → loads `love.css`

**Structure:**
1. `<article>` containing `.you` div with page content
2. Content rendered from Markdown — typically a bio paragraph + social links as pill-shaped list items

**`.you` list items:** `border-radius: 2.76rem` (pill), `1px solid var(--foreground)`, center-aligned. Hover: `background: skyblue` (hardcoded — see Known Issues).

**Desktop grid:** `grid-template-columns: 1fr 1fr 1fr 1fr` (4 columns).  
**Mobile:** `grid-template-columns: 1fr 1fr` (2 columns).

---

### Blog Index (`/know`)

**Template:** `know.html` → loads `know.css`

**Structure:**
1. `.tab` strip — category filter buttons (auto-generated from Zola taxonomy)
2. `.tabcontent` divs, one per category (blog / essays / stubs)
3. Each tabcontent: `<table>` with columns: Date | Title | Tags

**Tab behavior:** JS-toggled display. First tab auto-clicked on `window.onload`. Active tab has `border-bottom: 2px solid var(--background)` (creates a "cut-out" illusion against the tab bar's bottom border).

**Table:** `width: 95%`, `border: 1px solid var(--foreground)`, hover row highlights with `--hovercolor`. On mobile, the Date column (`th:first-child`) is hidden.

---

### Blog Post / Essay Detail

**Template:** `page.html` (same as project detail)

The article prose lives inside `<article>`. Typography rules from `_article.scss` apply: square-bullet `<ul>`, decimal `<ol>`, bordered `<blockquote>`, `JetBrains Mono` `<code>`.

---

### Interests (`/love`)

**Template:** `love.html` → loads `love.css`

**Structure:**
1. `<article>` with `.you` div
2. Content from Markdown — typically a curated `<ul>` of personal interests

Same layout patterns as `/you`. The `.you` div provides the grid for link pills.

---

## 3. Typography System

**Primary font:** Inter. Used everywhere except the home page. Loaded at 400 and 700 weights.

**Monospace font:** JetBrains Mono. Used for `<code>`, `<pre>`, and `<kbd>`. Loaded at 400 weight.

**Home page only:** Literata (Google Fonts), 400/500/600. Do not use Literata on any other page.

**Heading reference font:** The SCSS references `'Jjannon'` for article headings (`_article.scss:43`). This font is not currently loaded in `head.html`. Until it is served, Inter is the effective heading font everywhere. Do not add `font-family: 'Jjannon'` to new pages without also loading the font file.

### Rules

- **Prose line length:** Target `65ch` max-width on `<article>` inner content. Current SCSS does not enforce this strictly — use `max-width: 65ch` on `<p>` blocks within articles when adding new page types.
- **Text alignment:** Left-aligned for body copy. Centre-aligned for `.title` (article/post title) and h1/h2 on the `/you` page. Never centre-align prose paragraphs.
- **Sizes:** Do not go below `0.875rem` (14px) for any body-facing text. Meta labels (date, tags) may use `0.875rem`. UI elements like the sidebar use `14px` (`font-size: 14px` in `_sidebar.scss`).
- **Weight:** Use 400 for body and navigation, 700 for headings and active states. Avoid intermediate weights unless Inter variable font is loaded.
- **Line height:** 1.5 recommended for prose. Current SCSS uses `line-height: 1.3rem` in `_article.scss` — this is a fixed value, not a ratio, and should be normalised to `1.5` on future rewrites.
- **Accessibility:** Minimum contrast must meet WCAG AA (4.5:1 for normal text, 3:1 for large text). Red (#DB1414) on white (#ffffff) is 4.56:1 — passes AA for normal text, barely. Do not reduce this red or add transparency.

---

## 4. Color Usage

### Backgrounds and Surfaces

| Use | Token | Light | Dark |
|---|---|---|---|
| Page background | `var(--background)` | `#ffffff` | `#080808` |
| Card / overlay bg | `var(--background)` | same | same |
| Hover / active bg | `var(--hovercolor)` | `#ffc4c4` | `#0E3535` |
| Code block bg | `#f6f7f6` (light) / transparent (dark) | — | — |

### Text

| Use | Token | Light | Dark |
|---|---|---|---|
| UI text (nav, borders) | `var(--foreground)` | `#DB1414` | `#40FFF4` |
| Article body copy | `var(--blogtext)` | `#080808` | `#ffffff` |
| Secondary / meta | `$dark1` (hardcoded) | `#777777` | `#777777` |

Note: `$dark1 = #777777` is an SCSS variable, not a CSS custom property. It does **not** adapt to dark mode. This is intentional for dividers and blockquotes (neutral grey at all times), but is a known limitation for meta text readability in dark mode.

### Links and Hover States

- Default link color: `var(--foreground)` (no underline)
- Link hover: `border-bottom: 1px solid var(--foreground)` (underline simulation)
- Footer link hover: `color: var(--background); background-color: var(--foreground)` (inverted)
- Tag span hover: `background-color: var(--foreground); color: var(--background)` (inverted)

### Accent and Speculative Elements

- Red (`#DB1414` / light) and Teal (`#40FFF4` / dark) are the **only** accent colors. They serve as foreground, link color, and border color simultaneously.
- The teal-on-black combination evokes a medical monitor or phosphor screen — lean into this in dark mode.
- The organic blob shape on `<details>` and the animated "YES" orbit are the primary "speculative/folkloric" visual markers. Preserve them.

### Do / Don't

- **Do** use `var(--foreground)` for borders, links, and interactive element outlines.
- **Do** use `var(--hovercolor)` as the hover background on interactive elements.
- **Don't** introduce new hex colors without adding them as CSS custom properties on `:root` first.
- **Don't** use `skyblue` (hardcoded in `.you li:hover`) — replace with `var(--hovercolor)` for theme consistency.
- **Don't** use red or teal as background fills for large areas — they are accent/foreground only.
- **Don't** add `!important` overrides for theme colors. Use specificity via `body[data-theme="black"]` selectors instead.

---

## 5. Components

### Navigation Bar (topnav / header)

**File:** `templates/macros/topnav.html`, `sass/macros/_topnav.scss`

**Structure:**
```
<header>
  <nav>
    <ul id="sitetitle">   ← site name / logotype (left)
    <form class="headline"> ← centred nav links (do / you / know / blog / love)
    <form class="search">  ← search input (if build_search_index = true)
    <ul>                   ← right: social links + theme toggle button
  </nav>
</header>
```

**Visual rules:**
- Height: `42px`, fixed.
- Border: `0.1rem solid var(--foreground)` on bottom.
- Background: `var(--background)` (theme-aware).
- Nav links: centered absolutely via `left: 50%; transform: translate(-50%, 0%)`. Width `34rem`.
- Active / hover state: `border-bottom: 2px solid var(--foreground)` + `padding-bottom: 3px`.
- Font: 16px / 400 weight.

**Theme toggle:** Two SVG moon icons — `.toggle-light` (outline) shown in dark mode, `.toggle-black` (filled) shown in light mode. Controlled by `body[data-theme]` attribute selectors in `_topnav.scss`. Button has `background: transparent`.

**Mobile (≤ 1000px):** Search form and `#suggestions` hidden. Nav links remain in the centred `<form>`. Social link icons remain in right `<ul>`.

**Do/Don't:**
- Do: Keep nav links lowercase and terse.
- Don't: Add more than 4–5 nav items. The centered form has a fixed width (`34rem`) — overflow breaks layout.
- Don't: Add color to the logo/site title that differs from `var(--foreground)`.

---

### Footer

**File:** `templates/macros/footer.html`, `sass/macros/_footer.scss`

**Structure:** 6-column grid (desktop) / 3-column (mobile)
- Col 1: site name + site navigation links
- Col 2–3: credits (Design + Engineering, Built with Zola)
- Col 4–6: "Top ↑" link (right-aligned)
- Col 1–6 (full row): Statcounter analytics widget + eyes SVG

**Visual rules:**
- `border-top: 1px solid var(--foreground)`
- `font-size: 16px` (desktop), `12px` (mobile)
- Link hover: inverted (background/foreground swap)
- Section spans have `hover: border-bottom: 2px solid var(--foreground)`
- The "eyes" SVG (`fill: var(--foreground)`) is the Statcounter visibility indicator — a decorative / semi-ironic flourish. Keep it.

**Do/Don't:**
- Do: Keep the footer's grid layout. It communicates structure at a glance.
- Don't: Add more than 3 groups of content. The 4th cell is reserved for analytics.

---

### Buttons & Links

**Primary interactive link (nav / UI):**
- Color: `var(--foreground)`
- Hover: `border-bottom: 1px solid var(--foreground)`
- No background fill, no border radius

**Inverted (footer links, tag spans on hover):**
- Background: `var(--foreground)`, Color: `var(--background)`
- Used exclusively for small, inline interactive elements (not buttons)

**Tab buttons (`.tab button` on /know):**
- Background: transparent
- Border: `1px solid var(--foreground)`
- Padding: `2px 5px`
- Hover: `background-color: var(--hovercolor)`
- Active: `border-bottom: 2px solid var(--background)` (cuts into tab border)
- Font: 16px, no weight change

**Theme toggle button:**
- `background: transparent`, `border: none`
- Contains two SVG icons — CSS visibility toggled by `body[data-theme]`

**Do/Don't:**
- Do: Use `var(--foreground)` for all button borders and hover indicators.
- Don't: Create filled CTA buttons with red/teal backgrounds. The design idiom is lines, not fills.
- Don't: Use `<button>` elements for navigation links — use `<a>`.

---

### Cards (Portfolio — /do)

**File:** `do.html`, `sass/do.scss`

**Structure:**
```html
<a href="...">
  <img>          ← feature image (optional), covers cell
  <span>         ← title, centred, color: var(--foreground)
  <div>          ← description, hidden, slides up on hover
    <p>          ← description text
  </div>
</a>
```

**Visual rules:**
- Cell: `background-color: var(--background)`, `border: 2px solid var(--foreground)` (light) or `$teal` (dark)
- Image: `position: absolute`, covers cell, blurs to `blur(10px) opacity(90%)` on hover
- Title span: `position: absolute`, centred, `font-size: 20px`. On hover: `scale(-1,-1)` flip + text shadow
- Description div: `opacity: 0`, `translateY(40px)` → fades to `opacity: 1`, `translateY(0)` on hover (0.4s ease)
- Hover outline: `1px solid var(--foreground)`, box-shadow glow `5px` in foreground color

**Do/Don't:**
- Do: Provide `page.description` in frontmatter — it appears in the hover reveal.
- Don't: Use more than a single short sentence for card descriptions.
- Don't: Mix portrait and landscape feature images — the fixed-height grid crops both; prefer square or landscape.

---

### Post Previews (Blog Table — /know)

**File:** `know.html`, `sass/know.scss`

**Structure:** `<table>` with 3 columns: Date | Title | Tags

**Visual rules:**
- Table: `width: 95%`, `border: 1px solid var(--foreground)`, `border-spacing: 0`
- `<th>`: left-aligned, `background-color: var(--hovercolor)`, `padding: 1rem`
- `<td>`: `padding: 1em`, `border-right: 1px solid`, `border-top: 1px solid`
- Row hover: `background-color: var(--hovercolor)`
- Tag spans: hover inverts (foreground/background swap)
- On mobile: Date column hidden

**Do/Don't:**
- Do: Use short, descriptive post titles — the title column has no fixed width cap.
- Don't: Add more columns. The table is already tight on mobile.

---

### Tabs / Category Filter (on /know)

**File:** `know.html`, `sass/know.scss`

**Structure:**
```html
<div class="tab">
  <button class="tablinks" onclick="toggleCategory(...)"><a>category name</a></button>
  ...
</div>
<div id="blog" class="tabcontent">...</div>
<div id="essays" class="tabcontent">...</div>
<div id="stubs" class="tabcontent">...</div>
```

**Visual rules:**
- Tab bar height: `39.3px` (pixel-locked for cross-browser consistency)
- `border-bottom: 1px solid var(--foreground)`
- First button: `margin-left: 3rem`
- Active tab class added by JS — renders `border-bottom: 2px solid var(--background)` to appear "open"
- Default displayed tab: first category (auto-clicked on `window.onload`)

**Do/Don't:**
- Do: Keep category names short (single word: "blog", "essays", "stubs").
- Don't: Nest tabs or add sub-categories — the JS toggling logic is simple and flat.
- Don't: Use `width: 175px` on `button a` for category names longer than ~15 characters (current hardcoded width).

---

### Sidebar (Page Navigation)

**File:** `templates/macros/blogelements.html` (sidebar macro), `sass/macros/_sidebar.scss`, `sass/_navs.scss`

**Visual rules:**
- `border-right: 1px solid #777777` (`$dark1`)
- `font-size: 14px`
- `background: var(--background)`, `color: var(--foreground)`
- Active / hover item: `border-right: 1px solid var(--foreground)`
- Sticky (desktop), fixed slide-in panel from left (mobile, via `#sidebar:target`)

**Mobile trigger:** `.show-bar` icon strip (two SVG icons) appears at `≤ 1000px`. Sidebar hidden by default, revealed via `<a href="#sidebar">` anchor.

---

### Table of Contents (aside)

**File:** `templates/macros/blogelements.html` (toc macro), `sass/macros/_toc.scss`, `sass/_navs.scss`

**Visual rules:**
- `border-left: 1px solid #777777`
- `font-size: 14px`
- Active indicator: `border-left: 3px solid var(--foreground)` via `::before` pseudo-element
- `.children` items: `margin-left: 1.5rem`, `font-size: 13px`

**Mobile:** Hidden by default, revealed via `<a href="#toc">` anchor (slide-in from right).

---

### `<details>` / `<summary>` (Metadata disclosure)

Used on article pages to collapse post metadata (word count, reading time, tags).

**Visual rules:**
- Border: `2px solid var(--foreground)` with `border-radius: 48% 52% 43% 57% / 56% 35% 65% 44%` (organic blob)
- Transition: `all 0.375s`
- Open state: different blob shape (`42% 64% 90% 37% / 70% 84% 59% 61%`) + wider padding
- Hover: `background: var(--hovercolor)`

**Do/Don't:**
- Do: Keep the blob border-radius — it is a key folkloric / organic accent element.
- Don't: Use `<details>` for anything other than supplementary/collapsible content.

---

### Lists, Quotes, Code Blocks (in articles)

**Unordered lists:** `list-style-type: square`, `padding-left: 1.2rem`, item `margin-top: 0.4rem`

**Ordered lists:** `list-style-type: decimal`, `margin: 0.2rem 0 0.4rem 0.8rem`

**Blockquotes:**
- `border-left: 3px solid #777777`
- `padding-left: 10px`
- `color: #777777`
- No background fill, no italics (don't add them)

**Inline code:**
- Font: JetBrains Mono, ~95% base size
- Background: `var(--hovercolor)`
- Border: `0.5px solid var(--foreground)`
- Radius: `3px`
- Padding: `0 0.15rem`

**Code blocks (`<pre>`):**
- Syntax highlight theme: `base16-ocean-dark` (set in `config.toml`)
- Light mode: `background-color: #f6f7f6`
- `padding: 8px`, `overflow-x: auto`
- Note: `box-shadow: 2px solid` in `_article.scss:130` is invalid CSS (missing color) — it renders no shadow. Replace with `box-shadow: 2px 2px 0 var(--foreground)` for a surgical feel, or remove.

**Tables (in articles):**
- `border-radius: 10px` (with clipped corners via first/last cell selectors)
- `text-align: center`
- Cell padding: `8px 10px`
- Mobile: `font-size: 12px`, `width: 80%`

---

## 6. Theming & Dark Mode

### How it works

**Step 1 — FOUC prevention** (inline script in `<body>`, before any CSS):
```html
<script>
  document.body.dataset.theme = localStorage.getItem("theme") || "light";
</script>
```
This runs synchronously and sets `data-theme` before the browser paints. Result: no flash of unstyled/wrong-theme content.

**Step 2 — CSS responds** to `body[data-theme="light"]` and `body[data-theme="black"]` selectors (defined in `index.scss`, duplicated with minor variations in each page's SCSS).

**Step 3 — JS toggle** (`mode-switch.js`):
- `get_theme()`: reads `localStorage` and calls `set_theme()`. Called on load.
- `set_theme(mode)`: validates mode is `"light"` or `"black"`, sets `document.body.dataset.theme`, writes to `localStorage`.
- `toggle_theme()`: reads current from `localStorage`, flips to opposite.
- All elements with class `toggle` get a click listener.

### Defined themes

| Theme | `data-theme` value | Foreground | Background |
|---|---|---|---|
| Light | `"light"` | Red `#DB1414` | White `#ffffff` |
| Dark | `"black"` | Teal `#40FFF4` | Near-black `#080808` |

**"black" not "dark":** The attribute value is `"black"`, not `"dark"`. This is non-obvious. All CSS selectors and JS logic must use `"black"`.

### System preference (`prefers-color-scheme`)

`index.scss` includes a fallback:
```css
@media (prefers-color-scheme: dark) {
  body:not([data-theme="light"]) {
    --background: var(--black);
    --foreground: var(--teal);
    --blogtext: var(--white);
  }
}
```
This activates only if `data-theme` is not `"light"` — i.e., on first load before any JS runs, if system is dark. After `get_theme()` fires, `data-theme` is always set to either `"light"` or `"black"`, bypassing this fallback.

**Canonical behavior going forward:** The system-preference media query is a pre-JS safety net, not the primary mechanism. Once JS loads, the `localStorage` value controls everything. The inline `<script>` in `<body>` ensures this is always the case even on first visit (defaulting to `"light"`).

### Which tokens differ by theme

| Token | Light | Dark |
|---|---|---|
| `--background` | `#ffffff` | `#080808` |
| `--foreground` | `#DB1414` | `#40FFF4` |
| `--blogtext` | `#080808` | `#ffffff` |
| `--hovercolor` | `#ffc4c4` | `#0E3535` |
| Code block bg | `#f6f7f6` | transparent |

Everything else (structural spacing, font sizes, border widths, `$dark1` grey) is theme-independent.

---

## 7. Known Issues & Cleanups (Design-Side)

### 1. Home page is outside the Zola template system
The live `index.html` is a self-contained HTML file, not a Zola template. It has its own inline styles, its own font (Literata), and no `<head>` managed by the template system. This means changes to `head.html` (analytics, favicons, font loading) do not propagate to the home page.

**Intended behavior:** The home page should either be kept as a fully self-contained file (acceptable — treat it as a custom shell, maintain it separately), or it should extend `head.html` with a minimal block override. If the latter, the marquee and inline Literata import must be explicitly preserved in the extending template.

---

### 2. Placeholder text in /do cards
`do.html:19` contains `snorksnorrrk ... snork` around the page title span. This is development scaffolding.

**Intended behavior:** The span should contain only the project title, rendered via `macros::title_or_last(component=page, offset=0)`.

---

### 3. Typo in know.scss: `stection` selector
`know.scss:124` defines styles for `stection` (a misspelled `<section>`). No element matches this selector; the styles are dead code.

**Intended behavior:** Remove the `stection` block, or correct to `section` if the styles are needed.

---

### 4. Hardcoded `skyblue` hover on pill links
`you.scss:170` and `love.scss` set `li:hover { background: skyblue }` on the `.you` pill list items. This color does not adapt to dark mode and has no relationship to the design token system.

**Intended behavior:** Replace with `var(--hovercolor)`. In light mode this yields `#ffc4c4` (warm pink), in dark mode `#0E3535` (dark teal) — both on-brand.

---

### 5. `box-shadow: 2px solid` is invalid CSS
`_article.scss:130` and `you.scss:99` / `love.scss:99` all have `box-shadow: 2px solid` on `<pre>` elements. This is not valid `box-shadow` syntax (missing the color component) and renders no shadow.

**Intended behavior:** Use `box-shadow: 2px 2px 0 var(--foreground)` for a clinical inset-border effect, or remove entirely.

---

### 6. Jjannon font referenced but not loaded
`_article.scss` sets `font-family: 'Jjannon'` on article headings and `.title`. `head.html` does not load this font. All article headings silently fall back to Inter.

**Intended behavior:** Either load Jjannon as a web font (add `@font-face` or a CDN link in `head.html`), or remove the `font-family: 'Jjannon'` declarations and make Inter the explicit heading font.

---

### 7. Duplicate theme variable definitions across SCSS files
`body[data-theme="black"]` and `body[data-theme="light"]` variable blocks are redefined in `index.scss`, `you.scss`, `love.scss`, and `_article.scss` with subtle differences. This creates maintenance risk.

**Intended behavior:** Define theme tokens exactly once in `index.scss` (the base stylesheet loaded on all pages). Remove all duplicate `body[data-theme]` blocks from page-specific SCSS. Code-block background overrides (`article > pre`) are the only legitimate per-page theme addition.

---

### 8. Tag and category links point to placeholder hrefs
`blogelements.html` macros `taxonomies_bags()` and `taxonomies_bategory()` link to literal strings `"swag"` and `"hmm"`.

**Intended behavior:** Use `get_taxonomy_url(kind='tags', name=tag)` and `get_taxonomy_url(kind='category', name=category)` (as already done correctly in `know.html`).

---

### 9. Typo in page.scss: `var(--backgorund)`
`page.scss:28` references `var(--backgorund)` (misspelled) in the `.show-bar` background.

**Intended behavior:** Replace with `var(--background)`.

---

### 10. Inconsistent `do.scss` theme border selector
`do.scss:6` targets `body:not([data-theme="dark"])` — but "dark" is not a valid theme value (the dark theme is `"black"`). This rule never matches the intended condition.

**Intended behavior:** Change to `body:not([data-theme="black"])` to correctly target the light theme.

---

## 8. Extending the System

### Adding a new page

1. Create a new template in `templates/`. Extend `head.html`:
   ```html
   {% extends "head.html" %}
   {% block styles %}{{ macros::styles(file='mypage.css') }}{% endblock %}
   ```
2. Create a corresponding `sass/mypage.scss`. Begin with `@import 'base';` to inherit color variables and body resets.
3. Do **not** redefine `body[data-theme]` blocks — they are inherited from `index.scss` via `@import 'base'` chain.
4. Keep the page's `<main>` inside the global 3-column pattern where possible (`grid-template-columns: 0.25fr 1fr 0.25fr`) or full-width for gallery/grid pages.

### Adding a new component

1. **Check existing tokens first.** Use `var(--foreground)`, `var(--background)`, `var(--hovercolor)`, `var(--blogtext)`. Do not introduce new hex values for border or text colors.
2. **Use the border idiom.** Prefer `border: 1px solid var(--foreground)` over background fills. The design language is lines, not blocks.
3. **Test both themes.** Set `localStorage.setItem("theme", "black")` in DevTools and reload to verify dark mode. Check that no hardcoded colors appear.
4. **No JS dependencies for layout.** Structure must be readable without JavaScript. Interactions (hover reveals, tab switching) are progressive enhancement only.

### Introducing new card types

Use the `/do` card as the canonical reference. The pattern is:
- Fixed-height grid cell
- Background image + centred text, layered with `position: absolute`
- Hover: blur image, reveal supplementary text
- Outline + box-shadow in `var(--foreground)` on hover

For text-only cards (no feature image), the fallback `<span>` title is already implemented. Ensure it has sufficient contrast against `var(--background)`.

### Non-negotiable constraints

| Constraint | Rationale |
|---|---|
| All colors via CSS custom properties | Theme switching must work without JS re-renders |
| `var(--foreground)` for all interactive borders | Ensures theme coherence |
| Inter for all non-home-page text | Consistency and loading budget |
| `max-width` on prose containers | Readability — never let lines exceed ~65ch |
| WCAG AA contrast for all text | Accessibility is not optional |
| `data-theme="black"` (not "dark") | Matches existing JS and CSS selectors |
| No inline `style=` for theme colors | Inline styles override CSS variables and break theming |

---

## 2026-06-28 — visual design refactor notes

### primary diagnosis

the current site feels visually inconsistent not because it is too strange, but because it mixes three partially incompatible languages:
- documentation shell inherited from karzok
- hacker / terminal color treatment
- speculative / editorial embellishments

result: the site can read as customized docs chrome rather than a fully authored visual system.

---

### what is working

- text-forward architecture
- strong underlying information design
- dark mode identity
- inter + jetbrains mono as ui / technical baseline
- clear thematic territory: clinical, technical, speculative, personal

---

### what feels wrong

#### 1. too much chrome, not enough authority
sidebars, toc, borders, metadata, and title all compete for attention with the actual prose.

**rule:** content must be the center of gravity; scaffolding should recede.

#### 2. title treatment is under-supported
page titles are trying to act like display typography, but the surrounding system still behaves like a documentation theme.

**rule:** if the title is expressive, everything around it must become quieter.

#### 3. metadata bubble is the wrong object
the rounded metadata capsule is too decorative and too loud. it interrupts trust and does not match the underlying rectangular documentation shell.

**replace with:**
- flat metadata row
- ledger-style stacked lines
- muted status labels in mono or small caps

#### 4. sidebars are too loud
left sidebar and right toc are too bright and dense relative to their utility.

**rule:** side rails are support systems, not co-stars.

#### 5. line weights are inconsistent
borders, dividers, and highlighted containers do not feel like members of one calibrated family.

**rule:** use only two line weights:
- 1px structural rule
- 2px emphasis rule, used sparingly

#### 6. font-weight hierarchy is weak
too many interface elements speak at similar volume.

**rule:** compress the weight scale:
- 400 body, nav, sidebar
- 500 active / metadata labels
- 700 section headings
- special display treatment only for page title

#### 7. font roles are unclear
inter is doing too much labor: ui, prose, and attempted display expression.

**rule:** separate roles:
- inter for ui + prose
- jetbrains mono for code, labels, status, taxonomy, tiny interface text
- one display serif or editorial face for page titles only

#### 8. accent color is over-broadcast
bright cyan on black is memorable, but currently too many elements use it at full intensity.

**rule:** brightest accent color should be rare.
use subdued accent values for rails and borders; reserve vivid cyan for:
- active states
- hovered links
- title or section accents
- selective emphasis only

#### 9. spacing is not doing enough hierarchy work
visual hierarchy currently depends too much on color and outline objects.

**rule:** use spacing before ornament.
increase separation between:
- title and metadata
- metadata and opening paragraph
- article column and side rails

---

### concrete page-level changes

#### article page
- remove rounded metadata bubble
- replace with flat metadata block above article
- reduce sidebar and toc contrast
- make prose column the strongest visual field
- tighten heading system so only the page title feels ceremonial
- use subtler divider lines throughout

#### sidebar
- dim non-active items
- show deeper hierarchy via indentation and spacing, not brightness
- reduce density on single-post pages if possible

#### toc
- reduce font size slightly
- reduce contrast of inactive items
- highlight active section only

#### title system
- keep one distinct title voice
- use it only for h1 / article title
- do not reuse it for nav, metadata, or section headings

#### color system
- keep black background and cyan identity in dark mode
- soften default ui cyan
- preserve brightest cyan for emphasis only
- ensure prose remains easier to read than navigation chrome

---

### non-negotiable design principles going forward

- prose first
- scaffolding second
- one expressive move per page, not five
- no decorative containers for secondary information
- no new line weights beyond the defined scale
- no new font roles beyond ui / mono / display
- no full-intensity accent on low-priority interface elements

---

### desired perception shift

move from:
"interesting hacker / body-tech blog with docs theme remnants"

toward:
"disciplined artist-engineer publication platform with technical credibility"

the goal is not to become less distinctive.
the goal is to make every eccentricity look deliberate, calm, and publishable.
