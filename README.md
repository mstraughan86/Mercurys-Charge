# Mercury
## Introduction
#### "Mercury, the herald diviner-god. Ask and recieve."
Built as a fork from Slack Terminalize, this is a chatbot that can simply be thought of as a script runner. I want to expand out Mercury with additional ease-of-life functionality for chatroom management.

## Description
#### What does this do?
This is the parent node module to create a Slack Chatbot. This particular bot allows for the configuration of a custom command-line-interface vocabulary that is accessible from a Slack Channel. This is built upon [Slack Terminalize](https://github.com/ggauravr/slack-terminalize).

#### Fork Differences:
The basis of this fork is summed up in this [pull request](https://github.com/ggauravr/slack-terminalize/pull/13). The original command parse function was way too aggressive with no option to dial it down, so I created a boolean arg to pass on initialization.

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
