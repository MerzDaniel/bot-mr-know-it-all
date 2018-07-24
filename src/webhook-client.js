
// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
// web.channels.list().then( res => console.log(res.channels)).catch(err => {console.log('err web.channel()'); console.error(err)})

async function sendMessageToAll(client, msg) {
    const channelListResult = await client.channels.list()
    const writableChannelsIds = channelListResult.channels.filter(c => c.is_member).map(c => c.id)
    console.log(writableChannelsIds)

    await Promise.all(
        writableChannelsIds.map(
            channel => client.chat.postMessage({ channel, text: msg })
        )
    )
}
const sendMessage = (client, msg, channelId) => {
    // See: https://api.slack.com/methods/chat.postMessage
    client.chat.postMessage({ channel: channelId, text: msg })
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
