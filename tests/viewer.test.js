const { test } = require('node:test');
const assert = require('node:assert/strict');
const viewer = require('../viewer-state');
const fs = require('node:fs');
const vm = require('node:vm');

test('rotation can cross a full revolution in either direction', () => {
  const state = viewer.create(); state.yaw = 0;
  viewer.rotate(state, Math.PI * 2 + Math.PI / 2);
  assert.ok(Math.abs(state.yaw - Math.PI / 2) < 1e-9);
  viewer.rotate(state, -Math.PI);
  assert.ok(Math.abs(state.yaw - Math.PI * 1.5) < 1e-9);
});
test('zoom and vertical rotation stay within usable bounds', () => {
  const state = viewer.create(); viewer.zoom(state, 100); assert.equal(state.zoom, 1.4);
  viewer.zoom(state, -100); assert.equal(state.zoom, .8);
  viewer.rotate(state, 0, 20); assert.equal(state.pitch, .55);
  viewer.rotate(state, 0, -20); assert.equal(state.pitch, -.55);
  viewer.zoom(state, NaN); assert.equal(state.zoom, .8);
});
test('reset restores rotation, zoom, and cap without changing scent data', () => {
  const state = viewer.create(); viewer.rotate(state, 5, .3); viewer.zoom(state,.4); state.capOpen = true;
  viewer.reset(state); assert.deepEqual(state, viewer.create());
  assert.equal(viewer.themes.after.name, 'After Hours');
});
test('every scent has its own atmosphere and material tint', () => {
  assert.deepEqual(Object.keys(viewer.themes), ['solar','after','soft']);
  assert.equal(new Set(Object.values(viewer.themes).map(theme => theme.atmosphere)).size, 3);
  for (const theme of Object.values(viewer.themes)) assert.ok(theme.tint.every(channel => channel >= 0 && channel <= 1));
});

test('devices without WebGL retain the illustration and hide unusable controls', () => {
  const elements = new Map();
  function element(id) {
    if (!elements.has(id)) elements.set(id, { hidden: false, textContent: '', dataset: {}, tabIndex: 0, setAttribute() {}, addEventListener() {}, classList: { add() {}, remove() {} } });
    return elements.get(id);
  }
  element('sculpture').getContext = () => null;
  const context = {
    window: { OreynViewer: viewer, addEventListener() {} },
    document: { getElementById: element, querySelector: () => ({ dataset: { active: 'solar' } }), addEventListener() {} },
    MutationObserver: class { observe() {} },
    cancelAnimationFrame() {}
  };
  vm.runInNewContext(fs.readFileSync(require.resolve('../scene.js'), 'utf8'), context);
  assert.equal(element('viewer-controls').hidden, true);
  assert.equal(element('sculpture').tabIndex, -1);
  assert.match(element('viewer-status').textContent, /still explore all three scent atmospheres/);
  assert.match(element('viewer-help').textContent, /3D IS UNAVAILABLE/);
});
