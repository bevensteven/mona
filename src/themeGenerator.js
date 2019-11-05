const fs = require('fs');
const util = require('./util');

module.exports = (sortedPalette) => {
  console.log('Working with sorted palette:');
  util.chalkPalette(sortedPalette);

  prepareTemplate();
}

function prepareTemplate() {
  fs.readFile('./color-theme-template.json', (err, data) => {
    if (err) throw err;
    let template = JSON.parse(data);
    console.log(template);
  })
}