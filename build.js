const fs = require('node:fs');
const path = require('node:path');

// Publish only the storefront, never local server code or project metadata.
const output = path.join(__dirname, 'dist');
const files = ['index.html', 'style.css', 'refinement.css', 'bottle.css',
  'script.js', 'page-start.js', 'scene.js', 'viewer-state.js'];
fs.mkdirSync(output, { recursive: true });
for (const file of files) {
  fs.copyFileSync(path.join(__dirname, file), path.join(output, file));
}
fs.cpSync(path.join(__dirname, 'assets'), path.join(output, 'assets'), { recursive: true });
console.log('OREYN static site built in dist/');
