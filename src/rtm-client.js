const { RTMClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - usually xoxb)
const token = process.env.SLACK_BOT_USER_TOKEN

// The client is initialized and then started to get an active connection to the platform
const rtm = new RTMClient(token);
rtm.start()
// rtm.start().catch(err => {console.log('err rtm.start()'); console.error(err)})
console.log('rtm-client connected')

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
// See the "Combining with the WebClient" topic below for an example of how to get this ID
// const conversationId = 'C1232456';

// The RTM client can send simple string messages
const sendRtmMessage = (msg, conversationId) => rtm.sendMessage(msg, conversationId)
    .then((res) => {
        // `res` contains information about the posted message
        console.log('rtm Message sent: ', res.ts);
    })
    .catch((err) => {console.log('err in rtm.sendMessage: '); console.error(err)})

module.exports = sendRtmMessage
