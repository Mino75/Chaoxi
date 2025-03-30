// 退潮 tuichao.js
const fs = require('fs');
const path = require('path');

// Define the default files with fallback content.
const defaultFiles = [
  { name: 'index.html', defaultContent: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My App</title>\n</head>\n<body>\n</body>\n</html>' },
  { name: 'dockerfile', defaultContent: '# Docker config' },
  { name: 'main.js', defaultContent: '// main.js' },
  { name: 'styles.js', defaultContent: '// styles.js' },
  { name: 'service-worker.js', defaultContent: '// service-worker.js' },
  { name: 'server.js', defaultContent: '// server.js' },
  { name: 'manifest.json', defaultContent: '{}' }
];

// Usage: node tuichao.js <projectName> [outputFile]
// The script looks for a folder named <projectName> in the current working directory.
// It then creates a JSON structure containing only the default files (no folders) and writes it to haidi.json (or a custom output file).
const projectName = process.argv[2];
if (!projectName) {
  console.error('Usage: node tuichao.js <projectName> [outputFile]');
  process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);
if (!fs.existsSync(projectPath)) {
  console.error(`Error: Folder "${projectName}" does not exist in ${process.cwd()}`);
  process.exit(1);
}

const structure = {
  files: defaultFiles.map(file => {
    const filePath = path.join(projectPath, file.name);
    let content = file.defaultContent;
    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, 'utf-8');
    }
    return { name: file.name, content };
  })
};

const outputFile = process.argv[3] || path.join(process.cwd(), 'haidi.json');
fs.writeFileSync(outputFile, JSON.stringify(structure, null, 2));
console.log(`haidi.json written to: ${outputFile}`);
