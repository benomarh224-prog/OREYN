# Current storefront QA — 2026-09-27

- Arabic RTL and French LTR rendered at desktop 1440px and narrow 320px widths in Edge.
- No horizontal page overflow at 320px in either language.
- Language choice persists after reload; navigation, details and bag translate.
- Search and available-only filter produce appropriate empty states with incomplete business data.
- The actual configuration contains no phone, invented price, size or stock claim. It exposes no WhatsApp links and disables order submission.
- Product dialog shows missing details and a clear contact-unavailable notice.
- Local-only fixture on a separate port (not deployed) verified size selection, add to bag, quantity two, MAD subtotal, cart persistence across reload/language changes, and removal to zero.
- Unit tests verify encoded Arabic/French WhatsApp messages with product, size, quantities, subtotal and confirmation disclaimer, invalid phone rejection and invalid cart rejection.
- No WhatsApp message was sent. No payment or order confirmation was performed.
- JavaScript syntax, static build, server and business logic tests pass (14 tests, including retained prototype tests).

Real ordering remains unavailable until the owner supplies confirmed business details in config.js.
