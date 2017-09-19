const util = require('../util');
const CronJob = require('cron').CronJob;

const checkCronPattern = (pattern) => {
  try { new CronJob(pattern, () => { return true }) }
  catch (ex) { return false }
};
const errorParseCommand = (args) => {
  let results = {errors: []};

  const commands = require('../config/commands.json');
  const regexCron = /^[0-9,\*\-\/]+$/;
  const commandslist = [];
  commandslist.push.apply(commandslist, Object.keys(commands));
  Object.keys(commands).forEach((command)=>{
    commandslist.push.apply(commandslist, commands[command].alias);
  });

  if (args.length <= 6) {
    results.errors.push(`Insufficient command length. See 'cron help' for instructions.`);
    results.errorMessage = results.errors.join('\n');
    return results;
  }

  args.slice(0,6)
    .forEach((arg, i)=>{
      if (!regexCron.test(arg)) {
        results.errors.push(`Position ${i}: ${arg} not accepted. Use: 0-9,*-/`);
      }
    });

  if (!commandslist.includes(args[6])) {
    results.errors.push(`Command ${args[6]}: Is not a known command or alias.`);
  }

  results.errorMessage = results.errors.join('\n');
  return results;
};

module.exports = function (param) {

  let sitemapRegeneration = new CronJob({
    cronTime: '*/5 * * * * *',       // Runs everyday at 04:30
    onTick: util.postMessage.bind(null, param.channel, 'Cron.'),             // Execute updateEvents() at cronTime
    //runOnInit: true,                // Fire immediately
    start: true,                      // Start script (to fire at cronTime)
    timeZone: 'America/Los_Angeles'   // ...?
  });


};

// I need to record
// parse the input.
// record the requested job
// fire the job
/*
 Input
 cron * * * * * * start
 */

const main = (param) => {
  const user = param.user;
  const channel = param.channel;
  //const command = param.args[0];
  //const arguments = param.args.slice(1);
  const arguments = param.args;

  const verificationResults = errorParseCommand(arguments);
  if (verificationResults.errorMessage) {
    console.log(verificationResults.errorMessage);
    util.postMessage(channel, verificationResults.errorMessage);
    return;
  }

  
  // switch (command) {
  //   case 'help':
  //     help();
  //     break;
  //   case 'import':
  //     var venuesToScrape = createImportVenueList(commandArguments);
  //     var venueScrapers = createScrapingCommand(venuesToScrape);
  //     executeScrapersInSeries(venueScrapers, venuesToScrape);
  //     break;
  //   case 'blacklist':
  //     // add to blacklist HERE.
  //     setBlacklist(commandArguments);
  //     break;
  //   case 'whitelist':
  //     setWhitelist(commandArguments);
  //     break;
  //   case 'show':
  //     showBlacklist();
  //     break;
  //   default:
  //     util.promisePostMessage(channel, "Expecting something else, type 'scraper help'");
  //     break;
  // }
};

module.exports = main;