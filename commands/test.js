const util = require('../util');
const CronJob = require('cron').CronJob;

const errorParseCommand = (args) => {
  let results = {errors: []};

  const regexCron = /^[0-9,\*\-\/]+$/;
  const commands = require('../config/commands.json');
  const commandslist = [];
  commandslist.push.apply(commandslist, Object.keys(commands));
  Object.keys(commands).forEach((command) => {
    commandslist.push.apply(commandslist, commands[command].alias);
  });

  const checkCronPattern = (pattern) => {
    let cronCheck;
    try {
      new CronJob(pattern, () => {
        cronCheck = true
      })
    }
    catch (ex) {
      cronCheck = false
    }

    if (cronCheck) {
      results.errors.push(`Cron Pattern '${cronPattern}': Doesn't pass the test!`);
    }
  };
  const checkRegexElement = (arg, i) => {
    if (!regexCron.test(arg)) {
      results.errors.push(`Position ${i}: ${arg} not accepted. Use: 0-9,*-/`);
    }
  };
  const checkCommandLength = (int) => {
    if (args.length <= int) {
      results.errors.push(`Insufficient command length. See 'cron help' for instructions.`);
      results.message = results.errors.join('\n');
      return results;
    }
  };
  const checkJobCommand = (arg) => {
    if (!commandslist.includes(arg)) {
      results.errors.push(`Command ${arg}: Is not a known command or alias.`);
    }
  };

  const command = args[0];
  if (command == ('job' || 'test' || 'save')) {
    const cronPattern = args.slice(1, 7).join(' ');

    checkCommandLength(8);
    checkJobCommand(args[7]);
    args.slice(1, 7).forEach(checkRegexElement);
    checkCronPattern(cronPattern);
  }
  else if (command == ('stop' || 'load')) {
    checkCommandLength(2);
    checkJobCommand(args[1]);
  }
  else if (command == ('list' || 'help')) {
  }
  else {
    results.errors.push(`Command ${command}: Is not a cron function. See 'cron help' for instructions.`);
  }

  results.message = results.errors.join('\n');
  return results;
};

// module.exports = function (param) {

//   let sitemapRegeneration = new CronJob({
//     cronTime: '*/5 * * * * *',       // Runs everyday at 04:30
//     onTick: util.postMessage.bind(null, param.channel, 'Cron.'),             // Execute updateEvents() at cronTime
//     //runOnInit: true,                // Fire immediately
//     start: true,                      // Start script (to fire at cronTime)
//     timeZone: 'America/Los_Angeles'   // ...?
//   });


// };

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
  const command = param.args[0];
  const arguments = param.args.slice(1);
  //const arguments = param.args;

  const error = errorParseCommand(param.args);
  if (error.message) {
    console.log(error.message);
    util.postMessage(channel, error.message);
    return;
  }

  switch (command) { //help, test, list, stop, save load, job
    case 'help':
      help();
      break;
    case 'test':
      /*
       I want to input a test command, have it evaluate the cron time and
       immediately fire the command itself.
       The cron time evaluation should specify when it would fire, a basic
       evaluation message.
       */
      testCronJob();
      break;
    case 'list':
      /*
       List the currently running cron jobs.
       This means I have to save every cron job we attempt to run.
       */
      list();
      break;
    case 'stop':
      stop();
      break;
    case 'save':
      save();
      break;
    case 'load':
      load();
      break;
    case 'job':
      job();
      break;
    default:
      util.postMessage(channel, "Expecting something else, type 'cron help'");
      break;
    // }
  }
  ;

  module.exports = main;