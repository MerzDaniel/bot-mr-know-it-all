require('dotenv').config()
const {WebClient, RTMClient } = require('@slack/client');

// The client is initialized and then started to get an active connection to the platform
// An access token (from your Slack app or custom integration - usually xoxb)
const token = process.env.SLACK_BOT_USER_TOKEN
const rtm = new RTMClient(token);
const web = new WebClient(token);
rtm.start()

rtm.on('message', message => {
    // Skip messages that are from a bot or my own user ID
    if ( (message.subtype && message.subtype === 'bot_message') ||
        (!message.subtype && message.user === rtm.activeUserId) ) {
        return;
    }
    // Log the message
    if (message.text.includes(rtm.activeUserId)) {
        const strippedMessage = message.text.split(' ').filter(t => (!t.includes(rtm.activeUserId))).join(' ')

        console.log('message for me:', strippedMessage)
    }
    console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`)
})

const { sendMessage, sendMessageToAll} = require('./src/webhook-client')
const sendRtmMessage = require('./src/rtm-client')

const ids = {
    conversationId: 'oVlmyq1xE2yGZ7nSaHCKS3EF',
    personalMessageToMe: 'DBVKYLTJP',
    personalChannelWithWorkspace: 'TBVGRV5FW/BBVUCQ1A9/oVlmyq1xE2yGZ7nSaHCKS3EF',
    generalChannel: 'CBV7KF10R',

}

sendMessage(web, 'Hello there! ... Ah General Kenobi!', ids.generalChannel)
sendMessageToAll(web, 'Message to all').catch(console.error)

sendRtmMessage(rtm, 'Mega Message', ids.generalChannel)
