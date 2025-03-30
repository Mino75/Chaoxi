// zhangchao.js 涨潮
const fs = require('fs');
const path = require('path');

// This function creates files (no folders) in the given basePath.
function createFiles(basePath, data) {
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }
  (data.files || []).forEach(file => {
    fs.writeFileSync(path.join(basePath, file.name), file.content || '', 'utf-8');
  });
}

// Usage: node zhangchao.js <projectName> [inputFile]
// The script will create a folder named <projectName> in the current working directory,
// then scaffold it with the file list from haidi.json (or a custom input file).
const projectName = process.argv[2];
const inputFile = process.argv[3] || path.join(process.cwd(), 'haidi.json');

if (!projectName) {
  console.error('Usage: node zhangchao.js <projectName> [inputFile]');
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`Error: Input file "${inputFile}" does not exist in ${process.cwd()}`);
  process.exit(1);
}

const baseDir = path.join(process.cwd(), projectName);
const structure = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

createFiles(baseDir, structure);
console.log(`Project scaffolded to: ${baseDir}`);
