const path = require('path');
const fs = require('fs-extra');
const readdir = require('recursive-readdir');

fs.ensureDirSync('./dist');
fs.ensureDirSync('./dist/cards');

const copyAllCardImages = async () => {
  const allCardImages = await readdir('./content/card-images');
  const filenameMapping = {};

  const productLocales = new Set();

  allCardImages.forEach((f) => {
    const [, , game, locale, filename] = f.split(path.sep);
    filenameMapping[f] = `${game}/${locale}/${filename}`;

    productLocales.add(`${game}/${locale}`);
  });

  productLocales.forEach((prodLocale) => {
    fs.ensureDirSync(`./dist/cards/${prodLocale}`);
  });

  allCardImages.forEach((img) => {
    fs.copyFileSync(img, `./dist/cards/${filenameMapping[img]}`);
  });

  console.log(`Got ${allCardImages.length} card images!`);
};

copyAllCardImages();
