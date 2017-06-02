# Mercury's Sundial
## Introduction
#### "We divide day by 2 and 12 and thrust order upon nature."

## Description
This is Cron for Slack, a time-based job scheduler that will execute slack commands for you!

## Installation
```
git remote add -f Mercury git@github.com:mstraughan86/Mercury.git
git merge -s ours --no-commit --allow-unrelated-histories Mercury/master
git read-tree --prefix=lib/Mercury -u Mercury/master
git commit -m "Subtree merged in Mercury"
```

## Configuration && Execution
```
You can schedule a job using a modified crontab format: second minute hour monthdate month weekday. 
The ranges for each value are:
      second: 0-59
      minute: 0-59
        hour: 0-23
   monthdate: 1-31
       month: 0-11
     weekday: 0-6
	 
You also have Asterisks (*), Ranges (1-3,5), and Steps (*/2) available to use. For example, '00 30 11 * * 1-5'
means it runs every weekday (Monday through Friday) at 11:30:00 AM. It does not run on Saturday or Sunday.
You must specify every job with a name. This is because every job fires indefinitely until stopped, and is only
referenced by its designated name. No spaces are allowed in your name and quotes don't help.
You can only fire any command available by this slack bot. For example, 'cron job help-everyday 00 00 00 * * * help'
would fire the help command everyday at midnight, if that is your thing.

cron job name * * * * * * command args...  :    Run cron job at designated time. Saves it by name.
cron test name * * * * * * command args... :    Test cron job pattern and command right now.
cron save name * * * * * * command args... :    Save cron job. Does not run job.
cron load name              :    Start cron job by name.
cron delete name            :    Delete cron job by name.
cron stop name              :    Stop cron job by name.
cron list                   :    List all currently running cron jobs and saved cron jobs.
cron help                   :    Displays this help text.
```

## Micro Knowledge Base
#### Links
- Implementation in Progress: [Mercury's Charge](https://github.com/mstraughan86/Mercurys-Charge)

#### Research
[node-cron](https://github.com/kelektiv/node-cron)
[hubot-cron-events](https://github.com/Gandi/hubot-cron-events)
[hubot-cronjob](https://github.com/PavelVanecek/hubot-cronjob)
[hubot-cron](https://github.com/miyagawa/hubot-cron)
