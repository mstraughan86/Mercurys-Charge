const util			= require('../util');
const moment = require('moment');

const main = (param) => {
  util.postMessage(param.channel, "Mercury's Charge, test message. Time: " +  moment().format('h:mm:ss a'));
};
const init = () => {
  console.log('Test: Test initialization command.');
};

module.exports = {
  exec: main,
  init: init
};