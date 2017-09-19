const fs = require("fs");

const token = fs.readFileSync("./config/token.txt").toString('utf-8');
const path = fs.readFileSync("./config/path.txt").toString('utf-8');
const secret = fs.readFileSync("./config/secret.txt").toString('utf-8');
const port = fs.readFileSync("./config/port.txt").toString('utf-8');

const channel = {
  default: '#event-importer',
  system: '#jeeves-system'
};

const version = "Mercury Prototype Version " + require('./package.json')['version'];

// Slack Bot Server
const mercury = require('./lib/index.js').mercury;

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

    util = require('./util.js');
    rtmClient = mercury.getRTMClient();
    CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

    const resolvePromise = () => {
      console.log('--- RTM_CONNECTION_OPENED');
      rtmClient.off(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, resolvePromise); // listener clean-up
      resolve();
    };

    rtmClient.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, resolvePromise); // Initiate eventListener
  });
};

//~~~~~ Main Function
const main = () => {
  initSlackBot()
    .then(() => util.postMessage(channel.system, `${version}\nInitialization finished. Listening for commands.`));
};

main();