# Mercury's Sundial
#### "We divide day by 2 and 12 and thrust order upon nature."

## Description
This is Cron for Slack, a time-based job scheduler that will execute slack commands for you! This is built to be a module addon for the [Mercury](https://github.com/mstraughan86/Mercury) based chatbot [Mercury's Charge](https://github.com/mstraughan86/Mercurys-Charge).

## Installation
See [Mercury's Charge](https://github.com/mstraughan86/Mercurys-Charge) installation instructions.

## Configuration && Execution
```
Cron Help

This is Cron for Slack, a time-based job scheduler that will execute
slack commands for you! You can schedule a job using a modified crontab
format shown here:

              Modified Crontab Format:

      +----------------------------> At 00 seconds, every minute.
      |  +-------------------------> Every 30th minute.
      |  |    +--------------------> On the 11th hour.
      |  |    |  +-----------------> Every day of the month.
      |  |    |  | +---------------> Every month of the year.
      +  +    +  + + +-------------> Mon thru Thu and Sat.

      00 */30 11 * * 1-4,6		+--> Anatomy of a crontab.

      +  +    +  + + +-------------> Day of Week: 0-6.
      |  |    |  | +---------------> Months: 0-11.
      |  |    |  +-----------------> Day of Month: 1-31.
      |  |    +--------------------> Hours: 0-23.
      |  +-------------------------> Minutes: 0-59.
      +----------------------------> Seconds: 0-59.

cron job name * * * * * * command args  : Run cron job at designated time. Saves it by name.
cron test name * * * * * * command args : Test cron job pattern and command right now.
cron save name * * * * * * command args : Save cron job. Does not run job.
cron load name                          : Start cron job by name.
cron delete name                        : Delete cron job by name.
cron stop name                          : Stop cron job by name.
cron list                               : List all currently running and saved cron jobs.
cron help                               : Displays this help text.

You must specify every job with a name. This is because
every job fires indefinitely until stopped, and is only referenced by its
designated name. No spaces are allowed in your name and quotes don't help.

You can fire any command available by this slack bot. For example,
'cron job help-everyday 00 00 00 * * * cron help' would fire this
help command everyday at midnight, if that is your thing.

If a name is used to save a cron job, you cannot reuse it, you can
only load or delete a job with that name.

To use jobs in specific channels, basically, the job will run from the
channel you run or load it from.

Cron jobs will automatically restart on application load! But only if the job
was running at the time of exit,and if the job was saved.

Running jobs that were not saved will not restart on load.
```

## Development
#### Installation
```
git remote add -f Mercurys-Sundial git@github.com:mstraughan86/Mercurys-Sundial.git
git merge -s ours --no-commit --allow-unrelated-histories Mercurys-Sundial/master
git read-tree --prefix=lib/Mercurys-Sundial -u Mercurys-Sundial/master
git commit -m "Subtree merged in Mercurys-Sundial"
```
#### Subtree Pushing
Because this is developed as a subtree in another project repository, I need to push and pull with these git commands:
```
git subtree push --prefix=lib/Mercurys-Sundial Mercurys-Sundial master
git push Mercurys-Sundial $(git subtree split --prefix=lib/Mercurys-Sundial --onto=Mercurys-Sundial/master):master
git subtree pull --prefix=lib/Mercurys-Sundial Mercurys-Sundial master
```

## Micro Knowledge Base
#### Links
- Implementation in Progress: [Mercury's Charge](https://github.com/mstraughan86/Mercurys-Charge)

#### Research
[node-cron](https://github.com/kelektiv/node-cron)
[hubot-cron-events](https://github.com/Gandi/hubot-cron-events)
[hubot-cronjob](https://github.com/PavelVanecek/hubot-cronjob)
[hubot-cron](https://github.com/miyagawa/hubot-cron)
