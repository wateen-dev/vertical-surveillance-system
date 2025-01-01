const fs = require('fs-extra');
const path = require('path');

// Base URL from command line arguments
const baseUrl = process.argv[2] || 'http://172.29.27.86/SalesTrax/'; // Default to localhost if not provided
const filePath = path.join(__dirname, 'dist/sales-trax/browser/index.html');

// Read the index.html file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;

  // Replace base href
  let result = data.replace(/<base href=".*?">/, `<base href="${baseUrl}">`);

  // Replace href in <link> tags
  result = result.replace(/(<link[^>]*href=["'])(.*?)(["'][^>]*>)/g, (match, p1, p2, p3) => {
    return `${p1}${baseUrl}${p2}${p3}`;
  });

  // Replace src in <script> tags
  result = result.replace(/(<script[^>]*src=["'])(.*?)(["'][^>]*>)/g, (match, p1, p2, p3) => {
    return `${p1}${baseUrl}${p2}${p3}`;
  });

  // Write the modified content back to index.html
  fs.writeFile(filePath, result, 'utf8', (err) => {
    if (err) throw err;
    console.log('index.html modified successfully with base href:', baseUrl);
  });
});
