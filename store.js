(function(root) {
  const validPhone = number => typeof number === 'string' && /^[1-9]\d{7,14}$/.test(number);
  const priced = size => size && Number.isFinite(size.priceMAD) && size.priceMAD >= 0;
  const local = (value, lang) => value?.[lang] || '';
  function lines(config, cart) {
    return cart.flatMap(item => {
      const product = config.products.find(p => p.id === item.productId);
      const size = product?.sizes.find(s => s.id === item.sizeId);
      return product && product.availability === 'available' && priced(size) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99 ? [{ product, size, quantity: item.quantity }] : [];
    });
  }
  const subtotal = rows => rows.reduce((sum, row) => sum + Math.round(row.size.priceMAD * 100) * row.quantity, 0) / 100;
  const money = (amount, lang) => new Intl.NumberFormat(lang === 'ar' ? 'ar-MA' : 'fr-MA', { style: 'currency', currency: 'MAD' }).format(amount);
  function order(config, cart, lang) {
    const rows = lines(config, cart);
    if (!validPhone(config.whatsappNumber) || !rows.length || rows.length !== cart.length) return null;
    const ar = lang === 'ar';
    const message = [ar ? 'مرحباً OREYN، أود طلب العطور التالية:' : 'Bonjour OREYN, je souhaite commander les parfums suivants :',
      ...rows.map(r => `${local(r.product.name, lang)} — ${local(r.size.label, lang)} × ${r.quantity} — ${money(r.size.priceMAD * r.quantity, lang)}`),
      `${ar ? 'المجموع الفرعي' : 'Sous-total'} : ${money(subtotal(rows), lang)}`,
      ar ? 'التوصيل إلى تطوان. يرجى تأكيد التوفر وتكلفة وموعد التوصيل والمبلغ النهائي.' : 'Livraison à Tétouan. Merci de confirmer la disponibilité, les frais, le délai de livraison et le montant final.',
      ar ? 'هذه رسالة طلب وليست تأكيداً للطلب أو الدفع.' : 'Ce message est une demande, pas une confirmation de commande ou de paiement.'].join('\n');
    return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
  const api = {validPhone, priced, local, lines, subtotal, money, order};
  if (typeof module !== 'undefined') module.exports = api; else root.OREYN_STORE = api;
})(typeof window !== 'undefined' ? window : globalThis);
