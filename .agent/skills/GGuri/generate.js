const fs = require('fs');
const path = require('path');

const palette = {
  0: null,
  1: '#8D6E63', // Brown (Fur)
  2: '#5D4037', // Dark Brown (Outline/Shadow)
  3: '#D7CCC8', // Cream (Belly/Muzzle)
  4: '#000000', // Eyes/Nose
  5: '#FFFFFF', // Glint
  6: '#FFAB91', // Blush
  7: '#EF5350', // Mouth (Happy)
};

const expressions = {
  default: [
    [0,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,1,1,1,4,1,1,4,1,1,1,0,0,0],
    [0,1,1,1,1,4,4,1,1,1,1,0,0,0],
    [0,0,1,1,3,3,3,3,1,1,0,0,0,0],
    [0,0,1,1,3,3,3,3,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [1,1,3,3,1,1,1,1,3,3,1,1,0,0],
    [1,1,3,3,1,1,1,1,3,3,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,2,2,0,0,2,2,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ],
  happy: [
    [0,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,1,1,1,5,1,1,5,1,1,1,0,0,0],
    [0,1,6,1,1,4,4,1,1,6,1,0,0,0],
    [0,0,1,1,3,7,7,3,1,1,0,0,0,0],
    [0,0,1,1,3,3,3,3,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [1,1,3,3,1,1,1,1,3,3,1,1,0,0],
    [1,1,3,3,1,1,1,1,3,3,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,2,2,0,0,2,2,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ]
};

function generateSVG(type = 'default') {
  const pixels = expressions[type] || expressions.default;
  const pixelSize = 10;
  const width = pixels[0].length * pixelSize;
  const height = pixels.length * pixelSize;

  let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  
  for (let y = 0; y < pixels.length; y++) {
    for (let x = 0; x < pixels[y].length; x++) {
      const colorKey = pixels[y][x];
      const color = palette[colorKey];
      if (color) {
        svg += `<rect x="${x * pixelSize}" y="${y * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${color}" />`;
      }
    }
  }
  
  svg += '</svg>';
  const filename = type === 'default' ? 'GGuri.svg' : `GGuri_${type}.svg`;
  fs.writeFileSync(path.join(__dirname, filename), svg);
  console.log(`Generated ${filename}`);
}

const arg = process.argv[2] || 'default';
generateSVG(arg);
