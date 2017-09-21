const util = require('../util');
const CronJob = require('cron').CronJob;

const errorParseCommand = (args) => {
  let results = {errors: []};

  const regexCron = /^[0-9,\*\-\/]+$/;
  const commands = require('../config/commands.json');
  const commandsList = [];
  commandsList.push.apply(commandsList, Object.keys(commands));
  Object.keys(commands).forEach((command) => {
    commandsList.push.apply(commandsList, commands[command].alias);
  });

  const checkCronPattern = (pattern) => {
    try {
      new CronJob(pattern, () => {
      })
    }
    catch (ex) {
      results.errors.push(`Cron Pattern '${pattern}': Doesn't pass the test!`);
    }
  };
  const checkRegexElement = (arg, i) => {
    if (!regexCron.test(arg)) {
      results.errors.push(`Position ${i}: ${arg} not accepted. Use: 0-9,*-/`);
    }
  };
  const checkCommandLength = (int) => {
    if (args.length < int) {
      results.errors.push(`Insufficient command length. See 'cron help' for instructions.`);
      results.message = results.errors.join('\n');
      return results;
    }
  };
  const checkJobCommand = (arg) => {
    if (!commandsList.includes(arg)) {
      results.errors.push(`Command ${arg}: Is not a known command or command alias.`);
    }
  };

  const command = args[0] || '"No Command"';
  if (['job', 'test', 'save'].includes(command)) {
    const cronPattern = args.slice(2, 8).join(' ');

    checkCommandLength(9);
    checkJobCommand(args[8]);
    args.slice(2, 8).forEach(checkRegexElement);
    checkCronPattern(cronPattern);
    // Check deeper, if no symbol, each number range.
    // or deconstruct with certain symbol, check each number.
    // YES

  }
  else if (['stop', 'load'].includes(command)) {
    checkCommandLength(2);
    checkJobCommand(args[1]);
  }
  else if (['list', 'help'].includes(command)) {
  }
  else {
    results.errors.push(`Command ${command}: Is not a cron function. See 'cron help' for instructions.`);
  }

  results.message = results.errors.join('\n');
  if (!!results.message) {
    return Promise.reject({
      name: 'cron.errorParseCommand',
      type: 'Cron',
      message: 'User entered incorrect command.',
      error: results.message
    })
  }
  else {
    return Promise.resolve(args)
  }
};
const helpMessage = () => {
  const intro = "Cron Help\n\n";
  const description = "This is Cron for Slack, a time-based job scheduler that will execute slack commands for you! " +
    "You can schedule a job using a modified crontab format: second minute hour monthdate month weekday. The ranges " +
    "for each value are: \n" +
    "     second: 0-59\n" +
    "     minute: 0-59\n" +
    "       hour: 0-23\n" +
    "  monthdate: 1-31\n" +
    "      month: 0-11\n" +
    "    weekday: 0-6\n" +
    "You also have Asterisks (*), Ranges (1-3,5), and Steps (*/2) available to use. For example, '00 30 11 * * 1-5' " +
    "means it runs every weekday (Monday through Friday) at 11:30:00 AM. It does not run on Saturday or Sunday. \n\n" +
    "You must specify every job with a name. This is because every job fires indefinitely until stopped, and is only " +
    "referenced by its designated name. No spaces are allowed in your name and quotes don't help. \n\n" +
    "You can only fire any command available by this slack bot. For example, 'cron job help-everyday 00 00 00 * * * help' " +
    "would fire the help command everyday at midnight, if that is your thing.\n\n";
  const commandsDescription = [
    "cron job name * * * * * * command args...  :    Run cron job at designated time. Saves it by name.",
    "cron test name * * * * * * command args... :    Test cron job pattern and command right now.",
    "cron save name * * * * * * command args... :    Save cron job. Does not run job.",
    "cron load name              :    Start cron job by name.",
    "cron delete name            :    Delete cron job by name.",
    "cron stop name              :    Stop cron job by name.",
    "cron list                   :    List all currently running cron jobs and saved cron jobs.",
    "cron help                   :    Displays this help text.",
  ].join('\n');

  return Promise.resolve(intro + description + commandsDescription);
};
const testCronPattern = (args) => {
  const input = args.join(' ');
  const cronPattern = args.slice(2, 8);
  const name = args[1];
  const command = args.slice(8, args.length).join(' ');
  const dayMap = {0:'Sun',1:'Mon',2:'Tues',3:'Wed',4:'Thu',5:'Fri',6:'Sat'};

  cronPattern[5] = cronPattern[5]
    .split('')
    .map(c => dayMap[c] || c)
    .join('');

  cronPattern.forEach((element, index, array) => {
    if (/[,\*\-\/]/.test(element)) {
      element = element.replace(/[\*]/, "every");
      element = element.replace(/[\-]/, " through ");
      element = element.replace(/[,]/, " and ");
      if (/[\/]/.test(element)) {
        element = element.replace(/[\/]/, " ");
        element = element + '-th';
      }
      array[index] = element;
    }
  });

  const parsedSchedule = `
Your input: ${input}
Your cron job name: ${name}
Your cron job schedule:
          second: ${cronPattern[0]}
          minute: ${cronPattern[1]}
            hour: ${cronPattern[2]}
       monthdate: ${cronPattern[3]}
           month: ${cronPattern[4]}
         weekday: ${cronPattern[5]}\n`;
  const parsedCommand = "Your cron job command: \n" + command;

  return Promise.resolve(parsedSchedule + parsedCommand);
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

const main = (param) => {
  const user = param.user;
  const channel = param.channel;

  errorParseCommand(param.args)
    .then((args) => {
      const command = param.args[0];
      switch (command) {
        case 'help':
          return helpMessage().then(msg => util.postMessage(channel, msg));
        case 'test':
          /*
           I want to input a test command, have it evaluate the cron time and
           immediately fire the command itself.
           The cron time evaluation should specify when it would fire, a basic
           evaluation message.
           */
          return testCronPattern(args).then(msg => util.postMessage(channel, msg));
        case 'list':
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
          return util.postMessage(channel, "Expecting something else, type 'cron help'");
        // }
      }
    })
    .then()
    .catch((error) => {util.postMessage(channel, error.error)});
};

module.exports = main;