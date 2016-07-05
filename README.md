# Slack Terminalize

[![Build Status](https://travis-ci.org/ggauravr/slack-terminalize.svg?branch=develop)](https://travis-ci.org/ggauravr/slack-terminalize) [![Coverage Status](https://coveralls.io/repos/ggauravr/slack-terminalize/badge.svg?branch=develop&service=github)](https://coveralls.io/github/ggauravr/slack-terminalize?branch=develop)

---
Helps build a command-line system in Slack, to create a custom vocabulary for your bot.

---
## Motivation

This module was built to abstract away some of the basic tasks of massaging a message posted on Slack channel, before giving it to the bot.
That said, this is an opinionated implementation, because as it is, it limits to building a linux shell-like environment, where the first word
of the message is taken as the command and the words that follow, the arguments. You can find a sample app built to use this module from the links below.

---
## Usage

```javascript

var slackTerminal = require('slack-terminalize');

slackTerminal.init('<your-slack-token-here>', 
    {}, // slack-client options: https://github.com/slackhq/node-slack-client/blob/master/lib/clients/rtm/client.js
    {} // configurations for the app: https://github.com/ggauravr/slack-terminalize/blob/master/util/config.js
});

```

Checkout [this](https://github.com/ggauravr/slack-sample-cli) app to get started and to know more about the options and configuration parameters to customize the behavior.

---
## Installation

`npm install --save slack-terminalize`

---
## Tests

`npm test`

---
### Code Coverage

`npm run cover`

---
### Help and Links

- [Sample app to get started](https://github.com/ggauravr/slack-sample-cli)
- [Slack's awesome API](https://api.slack.com/)
- [Slack Node Client](https://github.com/slackhq/node-slack-client)
- [How to create and publish your first npm module](https://medium.com/@jdaudier/how-to-create-and-publish-your-first-node-js-module-444e7585b738#.blw7wmjwl)
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)