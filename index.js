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



///////////////// Self Updater /////////////////
var AutoUpdater = require('auto-updater');

var autoupdater = new AutoUpdater({
 pathToJson: '',
 autoupdate: true,
 checkgit: false,
 jsonhost: 'raw.githubusercontent.com/mstraughan86/Emeralda-AI/master/package.json',
 contenthost: 'https://api.github.com/repos/mstraughan86/Emeralda-AI/zipball/master',
 progressDebounce: 0,
 devmode: true
});

// State the events
autoupdater.on('git-clone', function() {
  console.log("You have a clone of the repository. Use 'git pull' to be up-to-date");
});
autoupdater.on('check.up-to-date', function(v) {
  console.info("You have the latest version: " + v);
});
autoupdater.on('check.out-dated', function(v_old, v) {
  console.warn("Your version is outdated. " + v_old + " of " + v);
  autoupdater.fire('download-update'); // If autoupdate: false, you'll have to do this manually.
  // Maybe ask if the'd like to download the update.
});
autoupdater.on('update.downloaded', function() {
  console.log("Update downloaded and ready for install");
  autoupdater.fire('extract'); // If autoupdate: false, you'll have to do this manually.
});
autoupdater.on('update.not-installed', function() {
  console.log("The Update was already in your folder! It's read for install");
  autoupdater.fire('extract'); // If autoupdate: false, you'll have to do this manually.
});
autoupdater.on('update.extracted', function() {
  console.log("Update extracted successfully!");
  console.warn("RESTART THE APP!");
});
autoupdater.on('download.start', function(name) {
  console.log("Starting downloading: " + name);
});
autoupdater.on('download.progress', function(name, perc) {
  process.stdout.write("Downloading " + perc + "% \033[0G");
});
autoupdater.on('download.end', function(name) {
  console.log("Downloaded " + name);
});
autoupdater.on('download.error', function(err) {
  console.error("Error when downloading: " + err);
});
autoupdater.on('end', function() {
  console.log("The app is ready to function");
});
autoupdater.on('error', function(name, e) {
  console.error(name, e);
});

// Start checking
// autoupdater.fire('check');

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
	postRequest('IIIII X - Received a push event for ' + 
    event.payload.repository.name + 
	' to ' + 
    event.payload.ref);
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
	autoupdater.fire('check');
})

// and Finally
  console.log("Test Commit III");


