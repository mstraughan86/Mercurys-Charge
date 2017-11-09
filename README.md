## Introduction
###### My word is your command; everything I command, I will empower you to fulfill. Make this pact with me now.
Mercury's Charge is a Slack chatbot built in Node.js to act as a development platform for custom tooling.

## Description
This is a generic purpose chatbot that takes user input and executes pre-designated javascript files. I have tried to make it:

1. Modular - for development ease
2. Stateless - philosophical development approach
3. Modern - utilize latest language features

#### Modular
I imagine that a task runner with access to multiple input channels could be developed into something much more complex, therefore I want to build in modularity from the beginning. I think this is a good approach even from the start as it has eased my transition to [Mercury](https://github.com/mstraughan86/Mercury) and my development of cron functionality with the [Sundial](https://github.com/mstraughan86/Mercurys-Sundial).

#### Stateless
I have found stateless programming to make handling asynchronous web development relatively easier and more complex interactions can be accommodated using CLI-style input parsing. I am not sure if I can truly say this application is stateless, as it does have memory utilizing MongooseDB, but I digress!

#### Modern
This is a learning tool as much as it is a professional tool. I want to learn modern coding practices, especially transitioning my asynchronous code to fully Promise-based and afterwards weigh the pros/cons of Async/Await. I also want to develop out chatbot technologies and see if I can integrate bleeding-edge development into this project!

## Preparation
Create a new Slack [Bot](https://my.slack.com/services/new/bot), give it a name and copy its API token. The token will start with ```xoxb-```.

## Installation
Install [MongoDB](https://www.mongodb.com/). Then:
```
git clone https://github.com/mstraughan86/Mercurys-Charge.git
cd Mercurys-Charge
npm install
npm --prefix ./lib/Mercury install ./lib/Mercury
npm --prefix ./lib/Mercurys-Sundial install ./lib/Mercurys-Sundial
npm --prefix ./lib/Example-Library install ./lib/Example-Library
```

## Configuration
Open the file in root named ```.env``` and insert Bot API Token:
```
SLACK_API_TOKEN=xoxb-example
```

## Execution
```
npm start
```

## Development

#### Technology Stack
- MongoDB
- Mongoose
- NodeJS
- Mercury

#### Making a example command:
1. Make ```./commands/example_command.js```
2. Add example_command to ```./config/commands.json```

#### Making an example library:
1. Make ```./commands/example_library.js```
2. Add example_library to ```./config/commands.json```
3. Make ```./lib/Example-Library directory```
4. Add example_library to ```./lib/index.js```

I have created this project so that it utilizes git's subtree functionality, to allow for a "project" within a "project" design. This enables me to keep each subtree within its own repository and the ability to update/upgrade individual subtree modules segregated away from my main application. This goes hand-in-hand with making this project as modular as possible.

#### Subtree Integration
This is how [Mercury's Sundial](https://github.com/mstraughan86/Mercurys-Sundial) is imported for development:
```
git remote add -f Mercurys-Sundial git@github.com:mstraughan86/Mercurys-Sundial.git
git merge -s ours --no-commit --allow-unrelated-histories Mercurys-Sundial/master
git read-tree --prefix=lib/Mercurys-Sundial -u Mercurys-Sundial/master
git commit -m "Subtree merged in Mercurys-Sundial"
```

#### Subtree Git Commands
We push and pull to the subtree repository from within our main project repository. For [Mercury's Sundial](https://github.com/mstraughan86/Mercurys-Sundial), it would look like:
###### Push
```
git subtree push --prefix=lib/Mercurys-Sundial Mercurys-Sundial master
```
###### Force Push
```
git push Mercurys-Sundial $(git subtree split --prefix=lib/Mercurys-Sundial --onto=Mercurys-Sundial/master):master
```
###### Pull
```
git subtree pull --prefix=lib/Mercurys-Sundial Mercurys-Sundial master
```

#### Miscellaneous Notes
- Config ```.env``` files are locked down using a git command. If you want to update the file for development, try these:
```
git update-index --skip-worktree .env
git update-index --no-skip-worktree .env
```
Remember, if the subtree module also uses an ```.env``` file, please do the same.

## Submodules
- [Mercury's Sundial](https://github.com/mstraughan86/Mercurys-Sundial): Cron for Slack

## Roadmap
#### System Infrastructure
- [x] ~~Mercury Fork~~
- [x] ~~Cron~~
- [ ] Advanced Message Management
- [ ] Advanced User Profiles
- [ ] Automatic Archive Mode
- [ ] Free Tier Enhancements
- [ ] Continuous Integration with Github
- [ ] Self-Join Channels Hack
- [ ] Refactor ./util.js and ./utilities
- [ ] Raspberry Pi Deployment Instructions
- [ ] Dockerfile

#### Cross Platform Goals
- [ ] SMS via Twilio
- [ ] FB Messenger Integration
- [ ] IRC Integration
- [ ] Intercomm Integration
- [ ] Rocket.Chat Compatibility

#### Games
- [ ] Legend of the Green Dragon
- [ ] Other BBS Games
