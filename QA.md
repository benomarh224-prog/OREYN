# Oreyn validation

## Bottle interaction and Trio light sweep — 3 October 2026

- The hero photography tilts gently with mouse movement or an active touch. Selector controls stay stationary. Pointer release, cancellation, leaving the image, scrolling, and window blur restore its resting position. Passive handlers preserve vertical scrolling and pinch zoom.
- The Trio gets one diagonal light sweep when at least 35% of its artwork enters the viewport. It does not loop or replay after pausing. Reduced motion and the site's motion control disable the new effects.
- Chromium: checked mouse response/reset, a fragrance image change, the sweep's start/end, cancellation while playing, and reduced-motion behavior.
- Touch emulation: checked pointer cancellation and a native CDP touch swipe over the hero; the page scrolled and the tilt reset. No horizontal overflow at 320, 375, 390, 430, 768, or 1440 px. Swatches remained beneath the image. Inspected the 390 px hero screenshot; the complete bottle remained visible. This was not a physical-phone test.
- `npm run check`, `npm test` (24 passed), `npm run build`, and `git diff --check` passed. Prices remain 45 DH per fragrance and 129 DH for the Trio.

## Trio price correction — 1 October 2026

- Restored the OREYN Trio to 129 DH in product data, the homepage, and mobile menu; individual fragrances remain 45 DH for every existing size.
- Updated price regression checks: one individual fragrance plus one Trio totals 174 DH. Syntax checks, 24 tests, the build asset check, and `git diff --check` passed.

## Mobile collection filters — October 2026

- The reported incorrect mobile filtering was not reproduced in the previous deployment with Chromium or WebKit. All seven filters returned the expected catalogue entries in those checks.
- Phone screens now use a labelled native selector. Desktop filter buttons and the native selection stay synchronized, including the Saved count.
- Result transitions now change opacity only. There is no animated card transform inside the scroll-snap carousel. Selecting a filter resets its carousel using an explicit instant scroll.
- Verified all seven filters at 320, 375, 390, 430, 768, and 1440 px in Chromium with touch support and WebKit with iPhone settings: expected products, exclusive filter state, first-card alignment, and no horizontal page overflow.
- Verified rapid navigation/filter changes, empty Saved recovery, favorite removal focus, bag actions, and reduced-motion behavior. Browser automation is not a test on a physical iPhone.
- `npm run check`, `npm test` (24 passing tests), and the static build passed. The filter regression test checks synchronization of the native selection and Saved count.

## 360° scent-studio upgrade

- Browser-verified: drag rotation, keyboard arrows, cap lift/replacement, zoom, reset, and manual interaction while ambient motion is paused.
- All three scent environments update their atmosphere, caption, bottle label, and material lighting.
- Mobile viewer has no horizontal page overflow at 390 px. Vertical page scrolling remains available over the canvas.
- The bottle model includes rounded front/back/sides, a metal cap, neck, nozzle, and a locally rendered label.
- Rendering pauses offscreen, behind dialogs, and when the tab is hidden. A static illustration remains available if WebGL initialization fails; context restoration reinitializes the renderer.
- Automated viewer tests cover full rotation, zoom/pitch bounds, reset, distinct themes, and WebGL-unavailable fallback.
- Glass reflections and the liquid are stylized shader approximations rather than a physically accurate optical simulation.

## Browser checks

Verified in Edge at desktop and 390 px mobile widths:

- Hero scent changes update the bottle label, fragrance name, and active selector.
- Pause/resume control changes its pressed state and motion label.
- WebGL initializes; CSS provides a fallback when WebGL is unavailable.
- No horizontal page overflow at the checked desktop/mobile sizes.
- Campaign artwork loads at its original 1536 px width.
- Product dialog opens, exposes notes, and changes 50 ml / €89 to 100 ml / €139.
- A 100 ml item appears with its matching size, label, and €139 price in the bag.
- Gift presentation produces a €144 order preview for a €139 bottle.
- Quantity two produces €278; removing the item empties the bag and disables preview.
- Discovery set produces €24 merchandise + €6 estimated delivery = €30.
- Bag and saved scent persist across reloads; test items and favorites were removed afterward.
- Saved filter and empty-favorites state work.
- Search for `iris` returns After Hours and Soft Static; unmatched input shows a useful empty state.
- Three bright/citrus quiz answers recommend Solar Drift.
- Order preview completes without placing an order, collecting payment, or storing a name.
- Mobile menu opens, navigates to the collection, and closes.
- Journal opens full article content; FAQ expands.
- Newsletter states that the email has not been transmitted or saved.
- No browser warnings or errors in the checked session.

## Automated checks

`npm run check` checks all runtime JavaScript syntax.

`npm test` verifies the homepage and all linked local assets, response content types, HEAD behavior, private-file restrictions, malformed paths, and unsupported HTTP methods using an ephemeral local server.

## Boundaries

No commerce, payments, email marketing, or shipping backend is connected. Product and policy copy is clearly identified as a concept. No live order, email subscription, or payment was submitted.
# Pricing update — 1 October 2026

- All six fragrances, every existing size option, and the OREYN Trio now use 45 DH pricing. The Trio's homepage and menu prices match its bag price.
- Replaced mixed EUR/MAD bag totals with one MAD total; removed legacy euro delivery and gift fees from the bag, preview, and delivery information. Ordering remains a preview pending launch.
- Chromium verification at 390 px and 1440 px: six 45 DH cards; the 45 DH filter returns six products; no horizontal page overflow.
- Checked Solar Drift's 50 ml and 100 ml details at 45 DH, a brand perfume at 45 DH, and comparison of Solar Drift 100 ml with Sauvage Elixir at 45 DH each.
- Added a 100 ml bottle, increased quantity to two, and verified 90 DH in the bag and order preview. Reload preserved its size, quantity, and 90 DH total. Adding the Trio produced 135 DH; adding Le Male produced 180 DH.
- Inspected the desktop bag screenshot. No real order was placed. The phone checks used browser emulation, not a physical phone.
- `npm run check`, `npm test` (24 passed), `npm run build`, and `git diff --check` passed.
