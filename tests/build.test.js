const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('Vercel output includes the homepage and every referenced local asset', () => {
  const root = path.join(__dirname, '..');
  const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
  assert.equal(config.framework, null);
  assert.equal(config.buildCommand, 'npm run build');
  require('../build.js');
  const output = path.join(root, config.outputDirectory);
  const html = fs.readFileSync(path.join(output, 'index.html'), 'utf8');
  assert.match(html, /slice/);
  for (const [, href] of html.matchAll(/(?:src|href)="([^"?#]+)(?:[?#][^"]*)?"/g)) {
    if (/^(?:https?:|mailto:|tel:)/.test(href)) continue;
    assert.ok(fs.existsSync(path.join(output, href)), `Missing published asset: ${href}`);
  }
  for (const file of ['server.js', 'package.json', '.git', '.env', 'tests']) {
    assert.equal(fs.existsSync(path.join(output, file)), false, `${file} must not be published`);
  }
});
