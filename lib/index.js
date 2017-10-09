const path = require("path");
const mercury = require(path.join(__dirname, 'Mercury', 'index.js'));
const mercurys_sundial = require(path.join(__dirname, 'Mercurys-Sundial'));

module.exports = {
  mercury,
  mercurys_sundial,
  //library_name: require(path.join(__dirname, 'Directory_Name'))
};