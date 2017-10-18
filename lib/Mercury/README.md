# Mercury
## Introduction
#### "Mercury, the herald diviner-god. Ask and recieve."
Built as a fork from Slack Terminalize, this is a chatbot that can simply be thought of as a script runner. I want to expand out Mercury with additional ease-of-life functionality for chatroom management.

## Description
#### What does this do?
This is the parent node module to create a Slack Chatbot. This particular bot allows for the configuration of a custom command-line-interface vocabulary that is accessible from a Slack Channel. This is built upon [Slack Terminalize](https://github.com/ggauravr/slack-terminalize).

#### Fork Differences:
- Very aggressive parsing [explained here](https://github.com/ggauravr/slack-terminalize/pull/13). Added an optional parameter, `STRICT_READ_MODE: true` to alleviate the issue.
- Initialization Function support. If your javascript requires a function ran prior to application use, its supported! `module.exports = {exec: someFuncExec, init: someFuncInit};`. If you don't require it, simply export a single function `module.exports = mainFunc;` as before.
- Module Export access to message handler. Have access to the script functions by command message parsing. Try something like `mercury.parseCommand({text:'...',channel:'...'})` to get going.

---
## Micro Knowledge Base
#### Links
- Software Architecture: [Example](https://github.com/ggauravr/slack-sample-cli)
- Implementation in Progress: [Mercury's Charge](https://github.com/mstraughan86/Mercurys-Charge)

#### Documentation
- [Slack API](https://api.slack.com/)
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- [Awesome Slack](https://github.com/matiassingers/awesome-slack#javascript)
- [Node Slack Client](https://github.com/slackhq/node-slack-client)
- [Node Slack SDK](https://github.com/slackapi/node-slack-sdk)
