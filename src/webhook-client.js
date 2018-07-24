const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
console.log('webhook-client connected')

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID

const sendMessage = (msg, channelId) => {
    // See: https://api.slack.com/methods/chat.postMessage
    web.chat.postMessage({ channel: channelId, text: msg })
        .then((res) => {
            // `res` contains information about the posted message
            console.log('Message sent: ', res.ts);
        })
        .catch(console.error);
}

module.exports = sendMessage
