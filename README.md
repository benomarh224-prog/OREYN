# OREYN — slice of life

Arabic/French perfume storefront for Tetouan, Morocco. Original brand bottle photography, MAD pricing, and WhatsApp ordering. No payment collection or automatic order confirmation.

## Business configuration
Edit `config.js` only with verified information:
- `whatsappNumber`: international digits without spaces or `+`, e.g. country code followed by the real business number. Blank disables all WhatsApp links.
- `products`: real IDs, Arabic/French names and descriptions, original image paths, and availability (`available`, `unavailable`, `unknown`).
- `sizes`: real size IDs, translated labels, and numeric `priceMAD` values. No conversion from earlier fictional EUR prices was performed.
- `delivery.feeMAD`: verified fee, or `null` to confirm via WhatsApp.
- `delivery.time.ar` / `.fr`: verified delivery timing, or empty strings.

The initial OREYN photo entry identifies the brand only. Its sizes, price, description and availability have not been supplied, so customers see contact-for-details messaging. A product must be available and have a priced, labelled size before it can enter a bag. A valid configured number and nonempty valid cart are required for ordering. Opening WhatsApp prepares a request; customers still send it and confirm details with the business.

## Local development and checks
`npm run dev` serves http://localhost:3000. No dependencies to install.
`npm run check`, `npm test`, and `npm run build` validate JavaScript, server restrictions, static output, and WhatsApp/cart business logic.

## Vercel
`vercel.json` uses the Other preset, `npm run build`, and `dist/`. Use the repository root and the `main` production branch. The Git integration deploys pushes automatically.

## Privacy
Language and the bag are stored only in localStorage when available. No newsletter, tracking, payment, or customer-information form is used. WhatsApp opens only after an explicit customer click.

Legacy prototype files remain in the source history/workspace, but are not loaded by the storefront. The public build contains the current storefront files and brand assets.
