var util = require('../util');

var user;
var channel;
//var endpoint;
var command;
var argument;

var AutoUpdater = require('auto-updater');

var autoupdater = new AutoUpdater({
    pathToJson: '/',
    autoupdate: true,
    checkgit: false,
    jsonhost: 'raw.githubusercontent.com',
    contenthost: 'codeload.github.com',
    progressDebounce: 0,
    devmode: false
});

// State the events
    autoupdater.on('git-clone', function () {
        util.postMessage(channel, 'You have a clone of the repository. Use \'git pull\' to be up-to-date.');
    });
    autoupdater.on('check.up-to-date', function (v) {
        util.postMessage(channel, 'You have the latest version: ' + v);
    });
    autoupdater.on('check.out-dated', function (v_old, v) {
        util.postMessage(channel, 'Your version is outdated. ' + v_old + ' of ' + v);
        // autoupdater.fire('download-update'); // If autoupdate: false, you'll have to do this manually.
        // Maybe ask if the'd like to download the update.
    });
    autoupdater.on('update.downloaded', function () {
        util.postMessage(channel, 'Update downloaded and ready for install.');
        autoupdater.fire('extract'); // If autoupdate: false, you'll have to do this manually.
    });
    autoupdater.on('update.not-installed', function () {
        util.postMessage(channel, 'Shutting down.');
        console.log("The Update was already in your folder! It's read for install");
        autoupdater.fire('extract'); // If autoupdate: false, you'll have to do this manually.
    });
    autoupdater.on('update.extracted', function () {
        util.postMessage(channel, 'Update extracted successfully! RESTART THE APP!');
    });
    autoupdater.on('download.start', function (name) {
        util.postMessage(channel, '"Starting downloading: ' + name);
    });
    autoupdater.on('download.progress', function (name, perc) {
        util.postMessage(channel, 'Downloading... ' + perc + '% \033[0G');
    });
    autoupdater.on('download.end', function (name) {
        util.postMessage(channel, 'Downloaded ' + name);
    });
    autoupdater.on('download.error', function (err) {
        util.postMessage(channel, 'Error when downloading: ' + err);
    });
    autoupdater.on('end', function () {
        util.postMessage(channel, 'The app is ready to function');
    });
    autoupdater.on('error', function (name, e) {
        console.error(name, e);
    });
    
var version = function(){}
var update = function(){}
var check = function(){
    
    
    autoupdater.fire('check');
    autoupdater.fire('download-update'); 
}
var shutdown = function() {
    process.exit(0);
    // This doesn't appear to actually stop the process.
    //process.exitCode = 1;
}

var main = function(param) {
    // param object contains the following keys:
    // 1. command - the primary command name
    // 2. args - an array of strings, which is user's message posted in the channel, separated by space
    // 3. user - Slack client user id
    // 4. channel - Slack client channel id
    // 5. commandConfig - the json object for this command from config/commands.json

    // implement your logic here.. 
    // .. 

    // send back the response
    // more on this method here: https://api.slack.com/methods/chat.postMessage
    
    user = param.user;
    channel = param.channel;
    //var endpoint = param.commandConfig.endpoint.replace('{gem}', param.args[0]);
    command = param.args[0];
    argument = param.args[1];
    
    switch(command) {
    case 'shutdown':
        util.postMessage(channel, 'Shutting down.');
        shutdown();
        break;
    case 'restart':
        util.postMessage(channel, 'Restarting.');
        shutdown();
        break;
    case 'check':
        util.postMessage(channel, 'Checking current code against Github repository!');
        check();
        break;
    case 'update':
        util.postMessage(channel, 'Updating code from Github repository!');
        update();
        break;
    case 'version':
        util.postMessage(channel, 'Checking current Emeralda version.');
        version();
        break;
    
    default:
        util.postMessage(channel, 'No arguments were used with command \'system\'');
    }
}

module.exports = main;
