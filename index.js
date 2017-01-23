// Imports
var slackTerminal = require('slack-terminalize');

//Retrieve Slack Custom Integration API Token from 'cfg,txt' file
var fs = require("fs");
var token = fs.readFileSync("./config/cfg.txt").toString('utf-8');
var path = fs.readFileSync("./config/path.txt").toString('utf-8');
var secret = fs.readFileSync("./config/secret.txt").toString('utf-8');

///////////////// Slack Bot Server /////////////////

slackTerminal.init(token, {
    // slack rtm client options here
    // more info at: https://github.com/slackhq/node-slack-client/blob/master/lib/clients/rtm/client.js
}, {
    // app configurations to suit your project structure
    // to see the list of all possible config,
    // check this out: https://github.com/ggauravr/slack-terminalize/blob/master/util/config.js
	CONFIG_DIR: __dirname + '/config',
	COMMAND_DIR: __dirname + '/commands'
});

///////////////// GitHiub Listener Server /////////////////

var http = require('http');
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: path, secret: secret });

var postRequest = require('./commands/postRequest.js');

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(4567)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
	postRequest('Received a push event for ' + 
    event.payload.repository.name + 
	' to ' + 
    event.payload.ref);
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})

///////////////// The Rest /////////////////
console.log('hello');



