const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const server = require('../server');
let origin;
before(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { await new Promise(resolve => server.close(resolve)); });

test('homepage references working local styles, scripts, and original artwork', async () => {
  const response = await fetch(origin);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /OREYN — slice of life/);
  const urls = [...html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)]
    .map(match => match[1]).filter(url => !url.startsWith('http'));
  assert.ok(urls.includes('assets/oreyn-original.jpg'));
  for (const url of urls) {
    const asset = await fetch(`${origin}/${url}`);
    assert.equal(asset.status, 200, url);
    assert.ok(Number(asset.headers.get('content-length')) > 0, url);
    assert.equal(asset.headers.get('x-content-type-options'), 'nosniff');
    await asset.arrayBuffer();
  }
});

test('HEAD serves asset metadata without a body', async () => {
  const response = await fetch(`${origin}/assets/campaign.png`, { method: 'HEAD' });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'image/png');
  assert.ok(Number(response.headers.get('content-length')) > 1000);
  assert.equal((await response.arrayBuffer()).byteLength, 0);
});

test('all three fragrance choices serve their matching bottle artwork', async () => {
  for (const assetName of ['oreyn-solar-gold.jpg', 'oreyn-after-lavender.jpg', 'oreyn-soft-sage.jpg']) {
    const response = await fetch(`${origin}/assets/${assetName}`);
    assert.equal(response.status, 200, assetName);
    assert.equal(response.headers.get('content-type'), 'image/jpeg');
    assert.ok(Number(response.headers.get('content-length')) > 90000, assetName);
    await response.arrayBuffer();
  }
});

test('private project files and missing assets are not exposed', async () => {
  for (const route of ['/package.json', '/server.js', '/README.md', '/assets/missing.png', '/assets/..%5cserver.js']) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 404, route);
    await response.text();
  }
});

test('invalid paths and unsupported methods fail without stopping the server', async () => {
  for (const route of ['/%00', '/%ZZ']) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 400);
    await response.text();
  }
  const post = await fetch(origin, { method: 'POST', body: 'preview' });
  assert.equal(post.status, 405);
  assert.equal(post.headers.get('allow'), 'GET, HEAD');
  await post.text();
  assert.equal((await fetch(origin)).status, 200);
});
