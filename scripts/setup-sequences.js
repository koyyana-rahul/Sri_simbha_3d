const fs = require('fs');
const path = require('path');

const mappings = [
  { src: 'LedPrinting', dest: 'led' },
  { src: 'AdonWheels_exploded', dest: 'van' },
  { src: 'TeaCupPrinting_exploded', dest: 'teacup' },
  { src: 'digital marketing exploded', dest: 'digital' },
  { src: 'WevDev_exploded', dest: 'website' },
  { src: 'adSHoots', dest: 'film' }
];

const destBase = path.join(__dirname, '..', 'public', 'assets', 'sequences');

mappings.forEach(({ src, dest }) => {
  const srcDir = path.resolve(__dirname, '..', '..', src);
  const outDir = path.join(destBase, dest);
  fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));
  files.sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, ''), 10);
    const numB = parseInt(b.replace(/\D/g, ''), 10);
    return numA - numB;
  });

  console.log('Copying ' + files.length + ' frames from ' + src + ' to ' + dest + '...');
  files.forEach((file, index) => {
    const frameNum = String(index + 1).padStart(3, '0');
    fs.copyFileSync(path.join(srcDir, file), path.join(outDir, 'frame_' + frameNum + '.jpg'));
  });
  console.log('Finished ' + dest + ': ' + files.length + ' frames.');
});
