# OREYN — slice of life.

A responsive perfume concept store built with HTML, CSS, and JavaScript, featuring the original product photograph supplied by the brand.

## Run locally

```sh
npm run dev
```

Open http://localhost:3000. Set `PORT` to choose another port. No dependency installation is required.

## Deploy on Vercel

Import this repository with the repository root as the Root Directory and `main` as the production branch. `vercel.json` selects the Other preset, runs `npm run build`, and publishes `dist/`. The build copies only the public storefront and assets; `server.js` is used only for local development.

After pushing a change, Vercel's connected Git integration should create a deployment. If automatic deployments are disabled, redeploy the latest commit from the Vercel dashboard. A previously deployed URL will not pick up new files until a deployment completes.

## Features

- Clean split-layout homepage, readable product cards, and direct add-to-bag actions.
- Original OREYN bottle photography in the hero, collection, product details, bag, search, quiz, and story. Earlier WebGL prototype source is retained but is not loaded by the page.
- Fragrance collection with mood filters, locally saved favorites, search, detailed scent views, 50/100 ml sizes, and shareable scent URLs.
- Three-question scent finder, discovery set, original campaign artwork, readable journal articles, and accessible FAQ accordions.
- Persistent size-specific bag, quantity controls, gift presentation, estimated delivery, and a clearly identified order preview.
- Mobile navigation, keyboard-accessible native dialogs, focus handling, responsive layouts, and local persistence validation.

## Before commercial launch

This is a **concept storefront**, not a connected commerce backend. Prices, compositions, and delivery estimates are illustrative. Checkout never takes payment or places an order. The newsletter explicitly reports that no email has been sent or stored.

Connect a commerce platform/payment provider, validate product data and business terms, add actual customer-care details, and connect a mailing-list service before accepting orders. Google Fonts is the only external runtime resource; the site uses system font fallbacks if unavailable.

## Original artwork

`assets/campaign.png` was made using the built-in image-generation tool. Prompt: “Premium landscape luxury niche fragrance campaign photograph for OREYN; surreal futuristic Mediterranean minimalism, ivory studio, monumental brushed chrome ribbon arch, transparent pale amber Solar Drift perfume bottle with silver cap on travertine, orange glass sphere, directional late-afternoon light, realistic refraction and caustics; label text ‘oreyn’, ‘SOLAR DRIFT’, ‘slice of life.’; no UI or overlay text.”

## Checks

```sh
npm run check
npm test
```
