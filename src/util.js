const _ = require('lodash');
const chalk = require('chalk');

/**
 * Helper function that outputs the palette colors of an image.
 * 
 * @param palette the vibrant palette generated from applying vibrant to an image.
 */
exports.chalkPalette = (palette) => {
  _.forEach(palette, (swatch) => {
    var color = swatch.getHex();
    console.log(chalk.bgHex(color)(color));
  })
}