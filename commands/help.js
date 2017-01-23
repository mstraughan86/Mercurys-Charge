var slackTerminal 	= require('slack-terminalize'),
	commands 		= slackTerminal.getCommands(),
	util			= require('../util');

var _helpAll = function () {
	var name,
		index,
		command,
		response = [];

	index = 1;
	for (name in commands) {
		command = commands[name];

		if (!command.exclude) {
			response.push(index++  + '. ' + _helpCommand(name));
		}
	}

	return response.join('\n\n');
};

var _helpCommand = function (name) {
	var response = [ commands[name].help, 'Alias: ' + commands[name].alias.join(', '), commands[name].description ];

	return response.join('\n\n');
};

module.exports = function (param) {
	var	channel		= param.channel,
		response;

	if (!param.args.length) {
		response = _helpAll();
	}
	else {
		response = _helpCommand(param.args[0]);
	}

	util.postMessage(channel, response);
};
