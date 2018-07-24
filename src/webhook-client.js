const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const token = process.env.SLACK_BOT_USER_TOKEN
const web = new WebClient(token);
console.log('webhook-client connected')

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
// web.channels.list().then( res => console.log(res.channels)).catch(err => {console.log('err web.channel()'); console.error(err)})

async function sendMessageToAll(msg) {
    const channelListResult = await web.channels.list()
    const writableChannelsIds = channelListResult.channels.filter(c => c.is_member).map(c => c.id)

    await Promise.all(
        writableChannelsIds.map(
            channel => web.chat.postMessage({ channel, text: msg })
        )
    )
}
const sendMessage = (msg, channelId) => {
    // See: https://api.slack.com/methods/chat.postMessage
    web.chat.postMessage({ channel: channelId, text: msg })
        .then((res) => {
            // `res` contains information about the posted message
            console.log('webhook Message sent: ', res.ts);
        })
        .catch((err) => {console.log('error in webhook.sendMessage: '); console.error(err)});
}

module.exports = {
    sendMessage,
    sendMessageToAll,
}
