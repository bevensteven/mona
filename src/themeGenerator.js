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

const TOKENS = [
  COMMENTS,
  KEYWORDS_PUNCTS,
  OBJECTS,
  CONSTANTS,
  STRINGS,
  METHOD_DEF
];

function fillTemplate(template, sortedPalette) {
  let tokenColors = template.tokenColors;

  // filter by token type and add color
  // do so in increasing luminance

  let getIndex = (name) => _.findIndex(tokenColors, color => color.name == name);

  // get indices
  for (var [i, token] of TOKENS) {
    let tokenIndex = getIndex(token);
    template.tokenColors[tokenIndex].settings.foreground = sortedPalette[i].getHex();
  }
}