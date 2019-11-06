const _ = require('lodash');
const vibrant = require('node-vibrant');
const path = require('path');

const util = require('./util');
const themeGenerator = require('./themeGenerator');

module.exports = (imgPath) => {
  vibrant
  .from(imgPath)
  .getPalette()
  .then(palette => {
    console.log('Palette before sorting:');
    util.chalkPalette(palette);

    return sortColors(palette);
  }).then(sortedPalette => {
    let name = getName(imgPath);
    let primaryColors = computePrimaryColors(sortedPalette);
    
    themeGenerator(sortedPalette, primaryColors, name);
  });
}

/**
 * Sorts the palette colors by luminosity based on method defined in:
 * https://www.alanzucconi.com/2015/09/30/colour-sorting/
 * 
 * The sorted color array will be in increasing order of luminance.
 * 
 * @param palette the array of colors from the image's palette
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

// define primary color defaults based on default VS Code themes
const DARK_DEFAULT = {
  background: '#1e1e1e',
  foreground: '#d4d4d4',
  type: 'dark'
};
const LIGHT_DEFAULT = {
  background: '#ffffff',
  foreground: '#000000',
  type: 'light'
};

/**
 * Returns a dark or light default based on the color palette input.
 *
 * @param {object} palette the array of colors from the image's palette
 */
function computePrimaryColors(palette) {
  // compute background and foreground based on average lightness value
  let lightnessValues = _.map(palette, swatch => swatch.getHsl()[2]);
  let avgLightness = 
    _.reduce(lightnessValues, (prev, curr) => curr += prev, 0) / lightnessValues.length;
  
  if (avgLightness <= 0.40) {
    return LIGHT_DEFAULT;
  } else {
    return DARK_DEFAULT;
  }
}

/**
 * Returns the file name without its extension.
 *
 * @param {str} imgPath the path to the image
 */
function getName(imgPath) {
  let extension = path.extname(imgPath);
  return path.basename(imgPath, extension);
}