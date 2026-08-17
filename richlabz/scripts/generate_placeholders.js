const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/assets/images');

const placeholders = [
  'hero/hero-placeholder.png',
  'construction/residential.png',
  'construction/commercial.png',
  'construction/land-development.png',
  'construction/industries.png',
  'property-care/property-care.png',
  'piece-works/placeholder.png',
  'additional-services/placeholder.png',
  'testimonials/placeholder.png',
  'vendor/vendor.png',
  'machinery/placeholder.png',
  'materials/placeholder.png'
];

// A minimal 1x1 transparent PNG base64
const transparentPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');

placeholders.forEach(p => {
  const fullPath = path.join(baseDir, p);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, transparentPng);
  }
});

console.log('Placeholders created successfully.');
