const _ = require('lodash');
const fs = require('fs');
const chalk = require('chalk');
const vibrant = require('node-vibrant');

module.exports = (imgPath) => {
  vibrant
  .from(path)
  .getPalette()
  .then(palette => sortColors(palette));
  // .then(sortedPalette => chalkPalette(sortedPalette));

  prepareTemplate();
}

/**
 * Helper function that outputs the palette colors of an image.
 * 
 * @param palette the vibrant palette generated from applying vibrant to an image.
 */
function chalkPalette(palette) {
  _.forEach(palette, (swatch) => {
    var color = swatch.getHex();
    console.log(chalk.bgHex(color)(color));
  })
}

function prepareTemplate() {
  fs.readFile('./color-theme-template.json', (err, data) => {
    if (err) throw err;
    let template = JSON.parse(data);
    console.log(template);
  })
}

/**
 * Sorts the palette colors by luminosity based on method defined in:
 * https://www.alanzucconi.com/2015/09/30/colour-sorting/
 * 
 * @param colors the array of colors from the image's palette
 */
function sortColors(palette) {
  console.log('Before:');
  chalkPalette(palette);
  sortedPalette = _.sortBy(palette, [swatch => rgbToLuminance(swatch.getRgb())]);
  console.log('After:');
  chalkPalette(sortedPalette);
  return sortedPalette;
}

/**
 * Calculates relative luminance from RGB values based on formula from:
 * https://en.wikipedia.org/wiki/Relative_luminance
 * 
 * @param rgb array of a color's r, g, b values in respective order
 */
function rgbToLuminance(rgb) {
  return 0.2126 * rgb[0] + 0.7152 * rgb [1] + 0.0722 * rgb[2]
}