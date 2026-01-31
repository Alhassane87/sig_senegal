const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'images');
const src192Svg = path.join(imagesDir, 'icon-192.svg');
const src512Svg = path.join(imagesDir, 'icon-512.svg');
const out192 = path.join(imagesDir, 'icon-192.png');
const out512 = path.join(imagesDir, 'icon-512.png');
const outApple = path.join(imagesDir, 'apple-touch-icon.png');

async function fileExists(p) {
  try { await fs.promises.access(p); return true; } catch(e){ return false; }
}

async function generate() {
  if (!(await fileExists(src192Svg)) && !(await fileExists(src512Svg))) {
    console.error('Aucun SVG source trouvé dans images/. Ajoutez icon-192.svg et/ou icon-512.svg');
    process.exit(1);
  }

  try {
    if (await fileExists(src192Svg)) {
      await sharp(src192Svg).png().resize(192,192).toFile(out192);
      console.log('Généré', out192);
    } else if (await fileExists(src512Svg)) {
      await sharp(src512Svg).png().resize(192,192).toFile(out192);
      console.log('Généré (dérivé de 512)', out192);
    }

    if (await fileExists(src512Svg)) {
      await sharp(src512Svg).png().resize(512,512).toFile(out512);
      console.log('Généré', out512);
    } else if (await fileExists(src192Svg)) {
      await sharp(src192Svg).png().resize(512,512).toFile(out512);
      console.log('Généré (dérivé de 192)', out512);
    }

    // apple-touch-icon 180x180
    if (await fileExists(src512Svg)) {
      await sharp(src512Svg).png().resize(180,180).toFile(outApple);
      console.log('Généré', outApple);
    } else if (await fileExists(src192Svg)) {
      await sharp(src192Svg).png().resize(180,180).toFile(outApple);
      console.log('Généré (dérivé de 192)', outApple);
    }

    console.log('Terminé. Mettez à jour votre service worker/manifest si nécessaire et rechargez la page.');
  } catch (err) {
    console.error('Erreur lors de la génération des icônes:', err);
    process.exit(1);
  }
}

generate();