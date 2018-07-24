require('dotenv').config()

const { WebClient } = require('@slack/client');

const ids = {
    conversationId: 'oVlmyq1xE2yGZ7nSaHCKS3EF',
    personalMessageToMe: 'DBVKYLTJP',
    personalChannelWithWorkspace: 'TBVGRV5FW/BBVUCQ1A9/oVlmyq1xE2yGZ7nSaHCKS3EF',
}

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);
console.log('connected')

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID

// See: https://api.slack.com/methods/chat.postMessage
web.chat.postMessage({ channel: ids.personalMessageToMe, text: 'Hello there' })
    .then((res) => {
        // `res` contains information about the posted message
        console.log('Message sent: ', res.ts);
    })
    .catch(console.error);