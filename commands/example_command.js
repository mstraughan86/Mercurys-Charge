const util = require('../util');
const moment = require('moment');

const main = (param) => {
  // param object contains the following keys:
  // 1. command - the primary command name
  // 2. args - an array of strings, which is user's message posted in the channel, separated by space
  // 3. user - Slack client user id
  // 4. channel - Slack client channel id
  // 5. commandConfig - the json object for this command from config/commands.json

  // implement your logic here..
  const currentTime = moment().format('h:mm:ss a');

  // send back the response, @see: https://api.slack.com/methods/chat.postMessage
  util.postMessage(param.channel, "Mercury's Charge, example command. Time: " +  currentTime);
};
const init = () => {
  console.log('Example Command: Example initialization command.');
};

module.exports = {
  exec: main,
  init: init
};