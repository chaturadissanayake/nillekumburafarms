# Nillekumbura Farms

> Farm-fresh eggs and chicken, direct from Menikhinna, Kandy. No middlemen, no cold storage.

A static marketing website for Nillekumbura Farms ,  a family-run poultry farm in Menikhinna, Kandy, Sri Lanka. Built as a single-page site with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools, no dependencies beyond a font CDN and an icon library.

---

## Stack

| Layer | Choice |
|---|---|
| Markup | HTML5 |
| Styles | Vanilla CSS (custom properties, CSS Grid, Flexbox) |
| Scripts | Vanilla JavaScript (ES6+) |
| Fonts | DM Serif Display, DM Sans, Noto Sans Sinhala via Google Fonts |
| Icons | Phosphor Icons (CDN, deferred) |
| Images | `.webp` format throughout |

No npm. No bundler. Open `index.html` in a browser and it works.

---

## Project structure

```
/
├── index.html
├── style.css
├── script.js
├── privacy.html
├── terms.html
└── assets/
    ├── heroimage.webp
    ├── farmfresheggs.webp
    ├── freerangechicken.webp
    ├── ourstoryimage.webp
    ├── visualsloading.webp
    ├── collectingeggs.webp
    ├── farmlandscape.webp
    ├── sortingeggs.webp
    ├── flockoutdoors.webp
    ├── packingeggs.webp
    ├── panaromicfarm.webp
    ├── harvestexpanding.webp
    ├── farmfood.webp
    ├── homemadejam.webp
    ├── purehoney.webp
    └── juices.webp
```

---

## Sections

| Section | ID |
|---|---|
| Hero | `#home` |
| Products ,  What We Grow | `#products` |
| How to Order | `#how-to-order` |
| Our Story | `#story` |
| How We Farm | `#our-practice` |
| Our People | `#people` |
| Gallery | `#gallery` |
| Coming Soon | `#coming-soon` |
| Testimonials | `#testimonials` |
| Join the Harvest List | `#subscribe` |
| Contact | `#inquiry` |

---

## Features

- **Bilingual (EN / සිංහල)** ,  language toggle switches all `data-i18n` strings via `script.js`; Noto Sans Sinhala loads automatically when active
- **WhatsApp ordering** ,  primary conversion action links directly to `wa.me`; separate deep-links per product pre-fill the message
- **Scroll-triggered animations** ,  `IntersectionObserver` drives `.reveal`, `.reveal-horizontal`, and `.reveal-group` classes
- **Gallery lightbox** ,  click any gallery image to open full-screen; close with the button or `Escape`
- **Newsletter slide-in** ,  appears after 8 seconds on first visit; suppressed on return visits via `localStorage`
- **Cookie consent banner** ,  shown on first visit, preference stored in `localStorage`
- **Contact form** ,  posts to a backend endpoint; shows inline success/error states without a page reload
- **Subscribe form** ,  same pattern as contact form
- **Responsive** ,  mobile-first layout, tested down to 375px; hamburger menu slides in from the right

---

## Running locally

No server required for most features. Just open the file:

```bash
open index.html
```

The contact and subscribe forms POST to a backend endpoint ,  those will fail locally unless you update the fetch URLs in `script.js` to point at a local or staging server.

---

## Deployment

This is a static site. Drop the root folder onto any static host:

- **Netlify / Vercel** ,  drag and drop, or connect the repo and deploy from `main`
- **GitHub Pages** ,  enable Pages in repo settings, set source to `/ (root)` on `main`
- **Any web server** ,  upload files, ensure `.webp` MIME type is served correctly (`image/webp`)

No build step needed.

---

## Customisation notes

**Phone number** ,  appears in multiple places. Search for `94700000000` and replace all instances with the real number (include the country code, no `+` or spaces).

**Email** ,  `hello@nillekumburafarms.com` appears in the footer and the contact form error message.

**Map embed** ,  the Google Maps iframe in `#inquiry` uses placeholder coordinates. Replace the `src` with a real embed URL from [Google Maps](https://www.google.com/maps).

**Translations** ,  all Sinhala strings live in the `translations` object at the top of `script.js`. English strings are the `data-i18n` attribute values in `index.html`.

---

## Browser support

Targets the last two versions of Chrome, Firefox, Safari, and Edge. Uses `clamp()`, `aspect-ratio`, CSS Grid, and `IntersectionObserver` ,  all broadly supported since 2021.

---

## Credits

Designed and built by [Chatura Dissanayake](https://chaturadissanayake.vercel.app/).  
Farm photography by Nillekumbura Farms.