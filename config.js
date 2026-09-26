/* Edit only confirmed business information here. Prices are in MAD.
   whatsappNumber: international digits without + (Morocco: 212...).
   Each size: { id: '...', label: { ar: '...', fr: '...' }, priceMAD: number }.
   availability: 'available', 'unavailable', or 'unknown'.
   Add real products by copying the structure below; never guess missing data. */
(function(root) {
  const config = {
    whatsappNumber: '',
    delivery: { feeMAD: null, time: { ar: '', fr: '' } },
    products: [{
      id: 'oreyn', name: { ar: 'OREYN', fr: 'OREYN' },
      description: { ar: '', fr: '' },
      image: 'assets/oreyn-original.jpg',
      availability: 'unknown', sizes: []
    }]
  };
  if (typeof module !== 'undefined') module.exports = config;
  else root.OREYN_CONFIG = config;
})(typeof window !== 'undefined' ? window : globalThis);
