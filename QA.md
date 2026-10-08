# Oreyn validation

## Oud and musk publication — 9 October 2026

- Prepared the category section for publication at the user's request. Musk uses the generic category name and the confirmed 10 ml volume. Its price is explicitly pending; Oud size and price remain pending. No invented product photograph, scent notes, or purchasable item with an unknown price was added.
- Added compact metadata rows and a volume badge; removed the previous generic contact note. Scoped the hero's 45 DH wording to the existing perfume collection, so it does not imply a confirmed musk price.
- Chromium at 320, 375, 390, 430, 768, and 1440 px: verified the volume and pricing state, side-by-side cards, natural text wrapping, no overlapping section boundaries, and no page overflow. Card heights are 166–221 px. No runtime errors. Syntax, all 24 tests, production build, and whitespace checks passed.

## Oud and musk category draft — 9 October 2026

- Added a compact two-card section after the collection: dark green/gold Oud and cream Musk, with English and Arabic category names. It is a local draft and has not been committed or deployed. No products, photos, notes, volumes, prices, or availability have been invented for these categories. Specific product names, sizes, and prices remain pending the user's answer.
- Chromium at 320, 375, 390, 430, 768, and 1440 px: cards stay side by side, text wraps without clipping, card heights remain 120–169 px, section boundaries do not overlap, and the page has no horizontal overflow. No runtime errors. Syntax and build checks passed.

## Editorial hero refinement — 9 October 2026

- Rebalanced the hero typography and bottle proportions; added Cormorant Garamond with a Georgia fallback for the italic slogan. Simplified the swatches and details link, made shopping the primary action, and added the confirmed 45 DH perfume / 129 DH Trio prices. Original photographs and all existing motion and selection behavior remain intact.
- Chromium with touch emulation at 320, 375, 390, 430, 768, and 1440 px: checked normal-flow section boundaries, complete bottle framing, centered controls beneath the bottle, 44 px swatch targets, and no horizontal page overflow. All three choices updated the image, name, exclusive pressed state, announcement, and correct details dialog without changing hero height. Photo crossfades completed without leftover outgoing images.
- Verified visible keyboard focus, Escape to close details, reduced-motion suppression, Shop scrolling, adding a 45 DH perfume to the bag, and opening the scent finder. No browser runtime errors. These were emulated browser checks, not physical-phone testing.
- Syntax checks, all 24 tests, build, and whitespace validation passed. The HTTP tests required execution outside the restricted socket sandbox.
- Requested Higgsfield design generation did not start: the connected service requires a Basic plan or higher. The hero was implemented directly in the existing project; no generated asset or replacement hosting project was created.

## Simplified product opening — 4 October 2026

- Removed the card-to-details flying photo, manual popover layer, and its lifecycle code after the user disliked the visual result. Details now open with only a 180 ms opacity fade; the photograph is visible immediately.
- Chromium at 390 and 1440 px: verified opening, no flying layer or hidden image, Escape/focus restoration, size selection, Add to bag, and no desktop horizontal page overflow. Reduced motion disables the fade. No runtime errors. These were viewport checks, not physical-phone testing.
- Syntax checks, 24 tests, build validation, and `git diff --check` passed. Earlier hero, swatch, bag, and Trio effects remain intact.

## Card-to-details photo transition — 3 October 2026

- A fully visible, loaded card photo moves and resizes into the details image over 420 ms. A decorative, non-interactive manual popover keeps the real photo above the dialog; the final image returns immediately when the animation ends. The dialog suppresses its competing entrance animation for this flow.
- Keyboard focus stays inside the dialog and returns to the card on close. Escape, resize, scrolling, motion pause, and opening another modal cancel the transition and clean up its layer. Reduced motion, unsupported popovers, offscreen images, and direct scent URLs use the ordinary details flow.
- Chromium: inspected the mobile transition mid-flight; verified completion, Escape/focus restoration, resizing while active, pausing while active, reduced motion, Add to bag, and direct scent URLs. Verified details and 50/100 ml controls at 320, 375, 390, 430, 768, and 1440 px with no horizontal page overflow or hidden final image. No runtime errors. These were browser viewport checks, not a physical-phone test.
- Syntax checks, 24 tests, production build, and `git diff --check` passed. Pricing is unchanged.

## Swatch feedback and bag total motion — 3 October 2026

- Added a small pulse to the newly selected fragrance circle and a 300 ms fade/slide to its name. Selection, image updates, and live announcements remain immediate. Rapid selections cancel prior animations.
- Refined the existing bag total transition: amounts move upward when increasing and downward when decreasing, with a smooth 400 ms overall transition. Actual totals update immediately; decorative outgoing numbers remain hidden from assistive technology.
- Chromium at 390 px: verified circle/name animations, rapid selections, exclusive selection, 45→90→45 DH quantity changes, five rapid increases to 270 DH, and cancellation during a change to 315 DH. No leftover number overlays. Verified motion pause and reduced-motion suppression for both effects.
- Checked desktop selection at 1440 px without page overflow. No runtime errors. Tests used browser viewport emulation, not a physical phone.
- JavaScript checks, 24 tests, build asset validation, and `git diff --check` passed.

## Frameless hero bottle — 3 October 2026

- Removed the hero's oval border, clipped frame, colored halo, mist, and tinted backdrop. The photography stage is transparent and composites its white studio background into the cream page with `mix-blend-mode: multiply`; source photographs are unchanged.
- Retained the bottle entrance, light sweep, interactive tilt, and fragrance crossfade. Removed the unused decoration styles and keyframes.
- Chromium: visually inspected the complete bottle at 390 px; checked all three image changes and exclusive swatch states, mouse tilt/reset, and reduced motion. No page overflow at 320, 375, 390, 430, 768, or 1440 px; controls remained below the bottle. No runtime errors. Browser viewport checks were not physical-phone testing.
- Syntax checks, 24 tests, the production build, and `git diff --check` passed.

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
