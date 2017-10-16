//const webClient = require('./lib').mercury.getWebClient();
let rtmClient;
let webClient;

const delay = time => new Promise(resolve => setTimeout(resolve, time));

/**
 * Wrapper function for postMessage from slack-client to handle formatting.
 *
 * @param  { object } slack-client Channel boject
 * @param  { string } message to send to Slack channel
 * @param  { boolean } flag to indicate block formatting
 * @return { none }
 *
 */
const postMessage = (channel, response, format) => {
  return new Promise ((resolve, reject)=>{
    format = format || true;
    response = (format && '```' + response + '```') || response;

    // more on this API here: https://api.slack.com/methods/chat.postMessage
    webClient.chat.postMessage(channel, response, {
      as_user: true
    }, (err, res) => {
      if (err) reject({
        name: 'util.postMessage',
        type: 'Slack',
        message: 'Slack error on postMessage.',
        error: err
      });
      else resolve(res);
    });
  })
};

const initialize = (mercury) => {
  rtmClient = mercury.getRTMClient();
  webClient = mercury.getWebClient();
};

exports.postMessage = postMessage;
exports.initialize = initialize;
exports.rtmClient = rtmClient;
exports.webClient = webClient;
exports.delay = delay;