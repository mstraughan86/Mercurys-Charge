require('dotenv').config();
const COLLECTION = process.env.DB_COLLECTION;
const fs = require("fs");
const mongoose = require('./utilities/mongoose.js');
const mercury = require('./lib/index.js').mercury;
let rtmClient;

const token = fs.readFileSync("./config/token.txt").toString('utf-8');
const path = fs.readFileSync("./config/path.txt").toString('utf-8');
const secret = fs.readFileSync("./config/secret.txt").toString('utf-8');
const port = fs.readFileSync("./config/port.txt").toString('utf-8');

const channel = {
  default: '#default',
  system: '#jeeves-system'
};

let util = require('./util.js');

const version = "Mercury Prototype Version " + require('./package.json')['version'];

//~~~~~ Slack Bot Server
const initSlackBot = () => {
  return new Promise(resolve => {
    const slackToken = fs.readFileSync("./config/token.txt").toString('utf-8');

    mercury.init(slackToken,
      {
        // slack rtm client options: https://github.com/slackhq/node-slack-client/blob/master/lib/clients/rtm/client.js
      },
      {
        STRICT_READ_MODE: true,
        CONFIG_DIR: __dirname + '/config',
        COMMAND_DIR: __dirname + '/commands'
      }
    );

    rtmClient = mercury.getRTMClient();
    const CLIENT_EVENTS = mercury.CLIENT_EVENTS;

    const resolvePromise = () => {
      console.log('Mercury: RTM Connection Opened.');
      util.initialize(mercury);
      rtmClient.off(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, resolvePromise); // listener clean-up
      resolve();
    };

    rtmClient.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, resolvePromise); // Initiate eventListener
  });
};

const start = (userChannel = channel.system) => {
  return mongoose.initialize()
    .then(initSlackBot)
    //.then(mongoose.connect.bind(null, COLLECTION))
    .then(() => util.postMessage(userChannel, `${version}\nInitialization finished. Listening for commands.`));
};
const end = (userChannel = channel.system) => {
  return util.postMessage(userChannel, 'Shutting down Mercury system.')
    .then(mongoose.disconnect)
    .then(util.delay.bind(null, 3000))
    .then(mongoose.terminate)
    .then(()=>{rtmClient.disconnect();});
};
const command = (obj) => {
  // obj = {text:'', channel:''}
  mercury.parseCommand(obj);
};
const test = () => {return 'hello'};

start();

/*
  Why wont these work? I am stumped.

  module.exports = {
    start,
    end,
    command
  };
 */

exports.start 	  = start;
exports.end 	    = end;
exports.command 	= command;