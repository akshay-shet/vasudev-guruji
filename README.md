# Vasudev Guruji — Official Website

React + TypeScript + Vite + Tailwind CSS. Mobile-first, day (cream & gold) and night (cosmic) themes, English / हिन्दी.

## Run on Windows

```bat
cd D:\Astrologer
npm.cmd install
npm.cmd run dev
```

The site opens at http://localhost:5173. Build for production with `npm.cmd run build` (output in `dist/`).

## Edit your details — one file

Everything personal lives in **`src/data/site.ts`**: name, WhatsApp number (digits only, with country code, e.g. `919876543210`), phone, email, address, map location, biography, lineage and the latest discourse (YouTube ID).

**Guruji's photo:** save a transparent PNG as **`public/guruji.png`**. Until then an illustrated placeholder is shown.

Other content: `src/data/content.ts` (services, events, shop products, discourses, mantras, reviews — mark real reviews `sample: false`), `src/data/vedic.ts` (rashi / nakshatra / graha reference data).

## Artwork

`public/img/` holds the scenery taken from the approved design mockups (temple landscape, pillars, discourse scene, temple gateway). The mandala, bells, lotus logo, arch tiles, diyas and icons are drawn in code.

## Deploy

- **Vercel** (recommended): import the repo, framework “Vite”, click Deploy. No environment variables are needed.
- **Netlify**: build `npm run build`, publish `dist` (`netlify.toml` included).

## Pages

Home · About · Services (+ each topic with enquiry form) · Kundali Matching (36 Guna calculator) · Vimshottari Dasha calculator · Rashis · Nakshatras · Navagraha · Daily Horoscope · Mantras, Japa Mala (108) & Diya · Discourses · Events (countdown) · Shop (WhatsApp orders) · Reviews · Q&A chat (src/data/faq.ts — edit questions & answers there; no API key) · Contact · Privacy / Terms / Disclaimer.

## Language

The site opens in **Kannada** every time. Visitors can switch to English from the EN/ಕ menu (lasts for that visit).
All Kannada wording lives in `src/lib/kn-dict.ts` — edit the Kannada text on the right-hand side to change any translation.
When you add new English text to the site, add its Kannada translation there too.
