const _ = require('lodash');
const fs = require('fs');
const util = require('./util');

const TEMPLATE_PATH = './color-theme-template.json';

module.exports = (sortedPalette) => {
  console.log('Working with sorted palette:');
  util.chalkPalette(sortedPalette);

  let template = loadTemplate();
  console.log(template);

  // fill template with found colors
  fillTemplate(template, sortedPalette);
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

const COMMENTS = 'Comments';
const KEYWORDS_PUNCTS = 'Keywords, Punctuation';
const OBJECTS = 'Objects';
const CONSTANTS = 'Constants';
const STRINGS = 'Strings';
const METHOD_DEF = 'Method definitions';

function fillTemplate(template, sortedPalette) {
  let tokenColors = template.tokenColors;

  // filter by token type and add color
  // do so in increasing luminance

  let getIndex = (name) => _.findIndex(tokenColors, color => color.name == name);

  // TODO: express the following in a for loop instead
  // get indices
  let commentIndex = getIndex(COMMENTS); 
  let stringIndex = getIndex(STRINGS);
  let keywordIndex = getIndex(KEYWORDS_PUNCTS);
  let constantsIndex = getIndex(CONSTANTS);
  let methodIndex = getIndex(METHOD_DEF);
  let objectIndex = getIndex(OBJECTS);

  // mutate the template
  template.tokenColors[commentIndex].settings.foreground = sortedPalette[0].getHex();
  template.tokenColors[stringIndex].settings.foreground = sortedPalette[1].getHex();
  template.tokenColors[keywordIndex].settings.foreground = sortedPalette[2].getHex();
  template.tokenColors[constantsIndex].settings.foreground = sortedPalette[3].getHex();
  template.tokenColors[methodIndex].settings.foreground = sortedPalette[4].getHex();
  template.tokenColors[objectIndex].settings.foreground = sortedPalette[5].getHex();

}