const path = require("path");
const example_library = require(path.join(__dirname, 'Example-Library'));
const mercury = require(path.join(__dirname, 'Mercury')); // check out this line and the one beneath it. Experiment. Currently!
const mercurys_sundial = require(path.join(__dirname, 'Mercurys-Sundial'));

module.exports = {
  example_library,
  mercury,
  mercurys_sundial
};