const util = require('../util');
const mercury = require('../index.js');

var user;
var channel;
//var endpoint;
var command;
var argument;

var AutoUpdater = require('auto-updater');

var autoupdater = new AutoUpdater({
    pathToJson: '/',
    autoupdate: false,
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
var update = function(){
    autoupdater.fire('download-update'); 
}
var check = function(){
    autoupdater.fire('check');
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
    case 'shutdown': return mercury.end(channel);
    case 'restart': return mercury.end(channel);
    case 'check':
        console.log('check');
        util.postMessage(channel, 'Checking current code against Github repository!');
        //check();
        break;
    case 'update':
        console.log('update');
        util.postMessage(channel, 'Updating code from Github repository!');
        //update();
        break;
    case 'version':
        console.log('version');
        util.postMessage(channel, 'Checking current Mercury version.');
        //version();
        break;
    
    default:
        util.postMessage(channel, 'No arguments were used with command \'system\'');
    }
};

module.exports = main;


/*
 let CronJob = require('cron').CronJob;

 // Helper Functions
 const updateEvents = () => {
 venueKeyIdPair.forEach((venue) => {
 let venueName = Object.keys(venue);
 let date = `?date=` + moment().add(daysRangeForEvents, 'days').format('YYYY-MM-DD');
 let yesterday = `?date=` + moment().add(-1, 'days').format('YYYY-MM-DD');
 sitemap.add({
 "url": currentCity + venueName + date,
 "changefreq": defaultChangefreq,
 "priority": defaultPriority,
 "lastmodrealtime": true
 });
 sitemap.del(currentCity + venueName + yesterday);
 });
 };
 const generate90DaysOfEvents = (urlArray) => {
 venueKeyIdPair.forEach((venue) => {
 let venueName = Object.keys(venue);
 for (let i = 0; i <= daysRangeForEvents; i++) {
 let date = `?date=` + moment().add(i, 'days').format('YYYY-MM-DD');
 urlArray.push({
 "url": currentCity + venueName + date,
 "changefreq": defaultChangefreq,
 "priority": defaultPriority,
 "lastmodrealtime": true
 });
 }
 });
 return urlArray;
 };
 const generateStaticUrlArray = () => {
 const urlArray = [];
 staticPages.forEach((page) => {
 if (page['hide'] !== undefined || page['httpreq'] === 'post') {
 // Do not include this page
 } else {
 urlArray.push({
 "url": page.url,
 "changefreq": page.changefreq,
 "priority": page.priority,
 "lastmodrealtime": true
 });
 }
 });
 venueKeyIdPair.forEach((venue) => {
 let venueName = Object.keys(venue);
 urlArray.push({
 "url": (currentCity + venueName),
 "changefreq": defaultChangefreq,
 "priority": defaultPriority,
 "lastmodrealtime": true
 });
 });
 return urlArray;
 };

 let sitemapRegeneration = new CronJob({
 cronTime: '00 30 04 * * *',       // Runs everyday at 04:30
 onTick: updateEvents,             // Execute updateEvents() at cronTime
 //runOnInit: true,                // Fire immediately
 start: true,                      // Start script (to fire at cronTime)
 timeZone: 'America/Los_Angeles'   // ...?
 });


 */
