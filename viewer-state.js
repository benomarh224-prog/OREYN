/* Shared, deterministic interaction state for the bottle studio. */
(function (root) {
  'use strict';
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const themes = {
    solar: { name: 'Solar Drift', number: '001', atmosphere: '18:42 / GOLDEN HOUR', description: 'Sun-warmed glass. A little light to carry.', tint: [.78, .59, .25], dark: 0 },
    after: { name: 'After Hours', number: '002', atmosphere: '00:17 / THE CITY IS YOURS', description: 'Midnight chrome. Leave a little mystery.', tint: [.48, .39, .63], dark: 1 },
    soft: { name: 'Soft Static', number: '003', atmosphere: '07:06 / SLOW SUNDAY', description: 'Soft mist. The world can wait.', tint: [.50, .68, .55], dark: 0 }
  };
  function create() { return { yaw: -.30, pitch: -.10, zoom: 1, capOpen: false }; }
  function rotate(state, x, y = 0) { if (Number.isFinite(x)) state.yaw = ((state.yaw + x) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2); if (Number.isFinite(y)) state.pitch = clamp(state.pitch + y, -.55, .55); return state; }
  function zoom(state, delta) { if (Number.isFinite(delta)) state.zoom = Math.round(clamp(state.zoom + delta, .8, 1.4) * 100) / 100; return state; }
  function reset(state) { return Object.assign(state, create()); }
  const api = { create, rotate, zoom, reset, themes };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.OreynViewer = api;
})(typeof window !== 'undefined' ? window : globalThis);
