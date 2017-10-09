require('dotenv').config();
const COLLECTION = process.env.DB_COLLECTION;
const fs = require("fs");
const mongoose = require('./utilities/mongoose.js');
const mercury = require('./lib/index.js').mercury;

const token = fs.readFileSync("./config/token.txt").toString('utf-8');
const path = fs.readFileSync("./config/path.txt").toString('utf-8');
const secret = fs.readFileSync("./config/secret.txt").toString('utf-8');
const port = fs.readFileSync("./config/port.txt").toString('utf-8');

const channel = {
  default: '#event-importer',
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
    CLIENT_EVENTS = mercury.CLIENT_EVENTS;

    const resolvePromise = () => {
      console.log('Mercury: RTM Connection Opened.');
      util.initialize(mercury);
      rtmClient.off(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, resolvePromise); // listener clean-up
      resolve();
    };

    rtmClient.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, resolvePromise); // Initiate eventListener
  });
};

//~~~~~ Main Function
const main = () => {
  initSlackBot()
    .then(mongoose.initialize)
    //.then(mongoose.connect.bind(null, COLLECTION))
    .then(() => util.postMessage(channel.system, `${version}\nInitialization finished. Listening for commands.`));
};

main();

// I DO WANT TO SOLVE THIS MONGO PROBLEM!
