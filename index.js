var fs = require("fs");
var token = fs.readFileSync("./config/token.txt").toString('utf-8');
var path = fs.readFileSync("./config/path.txt").toString('utf-8');
var secret = fs.readFileSync("./config/secret.txt").toString('utf-8');
var port = fs.readFileSync("./config/port.txt").toString('utf-8');
var channel = {
    default : '#event-importer',
    system : '#jeeves-system'    
}
var version = "Jeeves Prototype Version 0.3.0";

// Slack Bot Server
var slackTerminal = require('slack-terminalize');

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


// GitHiub Listener Server
var http = require('http');
var createHandler = require('github-webhook-handler');
var handler = createHandler({path: path, secret: secret});

var util = require('./util');
var updater = require('./commands/system.js')

http.createServer(function (req, res) {
    console.log(req.url);
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(port);

handler.on('error', function (err) {
    console.error('Error:', err.message);
});

handler.on('push', function (event) {
    util.postMessage(channel.system, 'Received a push event for ' +
            event.payload.repository.name +
            ' to ' +
            event.payload.ref);
    console.log('Received a push event for %s to %s',
            event.payload.repository.name,
            event.payload.ref);

    // exectute the auto update code
    updater( { command:'update', channel:channel.system } );

});


// Inform Slack that we have come online.
util.postMessage(channel.system, "Online, as " + version);
