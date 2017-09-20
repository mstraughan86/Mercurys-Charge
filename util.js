const webClient = require('./lib').mercury.getWebClient();
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

exports.postMessage = postMessage;