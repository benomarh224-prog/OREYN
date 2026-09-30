'use strict';

// Run before the document is parsed, so a reload cannot jump to an old anchor.
(() => {
  const navigation = performance.getEntriesByType?.('navigation')?.[0];
  const reloaded = navigation?.type === 'reload' || performance.navigation?.type === 1;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (reloaded && location.hash) history.replaceState(null, '', location.pathname + location.search);
  function resetScroll() {
    if (reloaded || !location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
  resetScroll();
  function settleScroll() {
    resetScroll();
    requestAnimationFrame(() => requestAnimationFrame(resetScroll));
  }
  window.addEventListener('load', settleScroll, { once: true });
  window.addEventListener('pageshow', settleScroll);
})();
