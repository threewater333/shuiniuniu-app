const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'www');

function rm(target) {
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
}

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copy(path.join(src, name), path.join(dest, name));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

rm(out);
fs.mkdirSync(out, { recursive: true });

copy(path.join(root, 'reading-writing-workbench.html'), path.join(out, 'index.html'));
copy(path.join(root, 'reading-writing-workbench.html'), path.join(out, 'reading-writing-workbench.html'));
copy(path.join(root, 'assets'), path.join(out, 'assets'));
copy(path.join(root, '_shared'), path.join(out, '_shared'));
copy(path.join(root, 'manifest.json'), path.join(out, 'manifest.json'));
copy(path.join(root, 'sw.js'), path.join(out, 'sw.js'));

console.log('已准备安卓 App 打包目录：www');
