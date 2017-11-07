require('dotenv').config();
const COLLECTION = process.env.DB_COLLECTION;
const fs = require("fs");
const mongoose = require('./utilities/mongoose.js');
const mercury = require('./lib/index.js').mercury;
let rtmClient;

const token = process.env.SLACK_API_TOKEN;
const path = process.env.GITHUB_WEBHOOK_PATH;
const secret = process.env.GITHUB_API_SECRET;
const port = process.env.SERVER_PORT;

const channel = {
  system: process.env.SLACK_SYSTEM_CHANNEL
};

let util = require('./util.js');

const version = "Mercury Prototype Version " + require('./package.json')['version'];

//~~~~~ Slack Bot Server
const initSlackBot = () => {
  return new Promise(resolve => {
    mercury.init(token,
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
    .then(() => util.postMessage(userChannel, `${version}\nInitialized. Listening for commands. Type 'help' to start.`));
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

start();

exports.start 	  = start;
exports.end 	    = end;
exports.command 	= command;