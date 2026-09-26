const fs = require('node:fs');
const path = require('node:path');

// Publish only the storefront, never local server code or project metadata.
const output = path.join(__dirname, 'dist');
// The generated directory is always inside this project; reject symlink targets.
if (path.dirname(path.resolve(output)) !== path.resolve(__dirname)) throw new Error('Invalid output path');
if (fs.existsSync(output)) {
  if (fs.lstatSync(output).isSymbolicLink()) throw new Error('Output must not be a symlink');
  fs.rmSync(output, { recursive: true, force: true });
}
const files = ['index.html', 'shop.css', 'config.js', 'store.js', 'script.js'];
fs.mkdirSync(output, { recursive: true });
for (const file of files) {
  fs.copyFileSync(path.join(__dirname, file), path.join(output, file));
}
fs.cpSync(path.join(__dirname, 'assets'), path.join(output, 'assets'), { recursive: true });
console.log('OREYN static site built in dist/');
