# Mercury's Sundial
#### "We divide day by 2 and 12 and thrust order upon nature."

## Description
This is Cron for Slack, a time-based job scheduler that will execute slack commands for you! This is built to be a module addon for the [Mercury](https://github.com/mstraughan86/Mercury) based chatbot [Mercury's Charge](https://github.com/mstraughan86/Mercurys-Charge).

## Installation
See [Mercury's Charge](https://github.com/mstraughan86/Mercurys-Charge) installation instructions.

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

You can only fire any command available by this slack bot. Inputting 'cron job example 00 00 00 * * * cron help'
would fire this help command everyday at midnight, if that is your thing.

If a name is used to save a cron job, you cannot reuse it, you can only load or delete a job with that name.
To use jobs in specific channels, basically, the job will run from the channel you run or load it from.
Cron jobs will automatically restart on application load! But only if the job was running at the time of exit,
and if the job was saved. Running jobs that were not saved will not restart on load.

cron job name * * * * * * command args...  :    Run cron job at designated time. Saves it by name.
cron test name * * * * * * command args... :    Test cron job pattern and command right now.
cron save name * * * * * * command args... :    Save cron job. Does not run job.
cron load name                             :    Start cron job by name.
cron delete name                           :    Delete cron job by name.
cron stop name                             :    Stop cron job by name.
cron list                                  :    List all currently running and saved cron jobs.
cron help                                  :    Displays this help text.
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
