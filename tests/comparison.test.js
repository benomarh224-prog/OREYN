const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('comparison is removed from navigation, product details, handlers and styles', () => {
  for (const filename of ['index.html', 'script.js', 'refinement.css']) {
    const source = fs.readFileSync(path.join(__dirname, '..', filename), 'utf8');
    assert.doesNotMatch(source, /data-open-compare|compare-dialog|compareIds|compareSizes|renderComparison|openComparison|compare-photo|compare-launch/);
    assert.doesNotMatch(source, /Compare scents|Compare this scent|compare fragrances|compare two fragrances/);
  }
});
