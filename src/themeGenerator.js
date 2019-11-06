const _ = require('lodash');
const fs = require('fs');
const util = require('./util');

const TEMPLATE_PATH = './color-theme-template.json';

module.exports = (sortedPalette, primaryColors, name) => {
  console.log('Working with sorted palette:');
  util.chalkPalette(sortedPalette);

  let template = loadTemplate();
  console.log(template);

  // fill template with found colors
  template = fillTemplate(template, sortedPalette, primaryColors, name);

  // write color theme file from template
  writeColorThemeFile(template);
}

/**
 * Loads the VS Code color theme template.
 *
 * @returns an object representing the JSON template
 */
function loadTemplate() {
  let templateBuffer = fs.readFileSync(TEMPLATE_PATH);
  return JSON.parse(templateBuffer);
}

/**
 * Writes a VS code color theme based on the template.
 *
 * @param {object} template object representing the json color theme
 */
function writeColorThemeFile(template) {
  let colorThemeContent = JSON.stringify(template);
  let path = `./${template.name}.vs-code-theme.json`;

  fs.writeFile(path, colorThemeContent, err => {
    if (err) {
      console.error('Error writing color theme file.', err);
    } else {
      console.log('Successfully wrote color theme file to ', path);
    }
  });
}

const COMMENTS = 'Comments';
const KEYWORDS_PUNCTS = 'Keywords, Punctuation';
const OBJECTS = 'Objects';
const CONSTANTS = 'Constants';
const STRINGS = 'Strings';
const METHOD_DEF = 'Method definitions';

// tokens are ordered in increasing luminance
const TOKENS = [
  COMMENTS,
  KEYWORDS_PUNCTS,
  OBJECTS,
  CONSTANTS,
  STRINGS,
  METHOD_DEF
];

/**
 * Function that fills out object that will be the color scheme.
 *
 * @param {object} template the template object representing the json color scheme
 * @param {array} sortedPalette sorted array of palette colors by luminance
 * @param {object} primaryColors data object that contains basic data
 * @param {string} name the name of the color scheme determined by the image file name
 */
function fillTemplate(template, sortedPalette, primaryColors, name) {
  // fill top level data from primary colors and name
  template.name = name;
  template.type = primaryColors.type;
  template.colors['editor.background'] = primaryColors.background;
  template.colors['editor.foreground'] = primaryColors.foreground;
  
  // filter by token type and add color
  // do so in increasing luminance
  let tokenColors = template.tokenColors;
  let getIndex = (name) => _.findIndex(tokenColors, color => color.name == name);

  // get indices and assign token colors
  for (var [i, token] of TOKENS.entries()) {
    let tokenIndex = getIndex(token);
    template.tokenColors[tokenIndex].settings.foreground = sortedPalette[i].getHex();
  }

  return template;
}