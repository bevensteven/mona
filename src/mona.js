const _ = require('lodash');
const vibrant = require('node-vibrant');

const util = require('./util');
const themeGenerator = require('./themeGenerator');

module.exports = (imgPath) => {
  vibrant
  .from(path)
  .getPalette()
  .then(palette => {
    console.log('Palette before sorting:');
    util.chalkPalette(palette);

    return sortColors(palette);
  }).then(sortedPalette => themeGenerator(sortedPalette));
}

/**
 * Sorts the palette colors by luminosity based on method defined in:
 * https://www.alanzucconi.com/2015/09/30/colour-sorting/
 * 
 * The sorted color array will be in increasing order of luminance.
 * 
 * @param colors the array of colors from the image's palette
 */
function sortColors(palette) {
  sortedPalette = _.sortBy(palette, [swatch => rgbToLuminance(swatch.getRgb())]);
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

function computePrimaryColors(palette) {
  
}