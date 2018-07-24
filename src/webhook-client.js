const { WebClient } = require('@slack/client');

const ids = {
    conversationId: 'oVlmyq1xE2yGZ7nSaHCKS3EF',
    personalMessageToMe: 'DBVKYLTJP',
    personalChannelWithWorkspace: 'TBVGRV5FW/BBVUCQ1A9/oVlmyq1xE2yGZ7nSaHCKS3EF',
}

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
console.log('connected')

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID

const sendMessage = (msg) => {
    // See: https://api.slack.com/methods/chat.postMessage
    web.chat.postMessage({ channel: ids.personalMessageToMe, text: msg })
        .then((res) => {
            // `res` contains information about the posted message
            console.log('Message sent: ', res.ts);
        })
        .catch(console.error);
}

module.exports = sendMessage
