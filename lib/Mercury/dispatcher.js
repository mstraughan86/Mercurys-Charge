'use strict';

var MemoryDataStore = require('@slack/client').MemoryDataStore,
	dataStore = new MemoryDataStore(),

	util = {
		config: require('./util/config'),
		command: require('./util/command')
	},

	path = require('path'),

	handlers,
	commands,
	slackClient;

/**
 * Get dispatcher status
 *
 * @return boolean
 */
var isInitialized = function() {
	return handlers !== undefined && handlers.length > 0;
}

/**
 * Reads commands.json from CONFIG_DIR and sets up handlers.
 * Handlers are expected to have the same name as the command, i.e.
 * of the pattern {command-name}.js
 *
 * @param  { object } Slack client
 * @return { none }
 *
 */
var init = function (client) {

	slackClient = client;
	handlers = {};
	
	util.command.init();

	commands = require(path.resolve(util.config.get('CONFIG_DIR'), 'commands'));

	Object.keys(commands).forEach(function (command) {
		handlers[command] = require(path.resolve(util.config.get('COMMAND_DIR'), command));
	});

	console.log('Mercury: Command dispatcher initialized.');

	// Make a promise chain to run any init() asyncronously before moving on.
	return new Promise((resolve, reject)=>{

    let promisedWork = [];

    for (var command in handlers) {
      if (handlers.hasOwnProperty(command) && typeof handlers[command].init === "function") {
        promisedWork = promisedWork.concat(handlers[command].init);
      }
    }

    return promisedWork
      .reduce((chain, promise) => chain.then(promise), Promise.resolve())
      .then(result => {
        console.log('Mercury: Finished Command Initialization Chain.');
        return result;
      });

	})
};

/**
 * Processes, using helpers, the user message posted and calls the appropriate command,
 * passing it an object with four parameters: the channel posted, the user posting,
 * the command entered by the user and the additional text as an array of tokens(args).
 * If no matching command is found, looks for and calls file named after the ERROR_COMMAND
 * config parameter set on initialization.
 * 
 * @param  { string } message posted by a user in Slack channel
 * @return { none }
 */
var handle = function (msg) {
	var data;

	// gets command and args parametrs
	data = util.command.parse(msg);

	data.user = msg.user;
	data.channel = msg.channel;
	data.commandConfig = commands[data.command];

	// respond only for non-bot user messages
	if (data.user && !slackClient.dataStore.getUserById(data.user).is_bot) {
		if (!handlers[data.command]) {
			throw new Error('Command ' + data.command + ' not found in ' + util.config.get('COMMAND_DIR') + ' directory');
		}

		if (typeof handlers[data.command].exec === "function") {
      handlers[data.command].exec(data);
		}
		else {
      handlers[data.command](data);
		}
	}
};

var internalHandle = function (msg) {
  var data;

  data = util.command.parse(msg);
  data.channel = msg.channel;
  data.commandConfig = commands[data.command];

	if (!handlers[data.command]) throw new Error('Command ' + data.command + ' not found in ' + util.config.get('COMMAND_DIR') + ' directory');
	if (typeof handlers[data.command].exec === "function") handlers[data.command].exec(data);
	else handlers[data.command](data);

};

exports.init 	= init;
exports.handle 	= handle;
exports.internalHandle 	= internalHandle;
exports.isInitialized = isInitialized;
