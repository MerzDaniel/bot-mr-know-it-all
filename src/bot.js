const startBot = (rtmClient) =>
    rtmClient.on('message', message => {
        // Skip messages that are from a bot or my own user ID
        if ( (message.subtype && message.subtype === 'bot_message') ||
            (!message.subtype && message.user === rtmClient.activeUserId) ) {
            return;
        }
        // Log the message
        if (message.text.includes(rtmClient.activeUserId)) {
            const strippedMessage = message.text.split(' ').filter(t => (!t.includes(rtmClient.activeUserId))).join(' ')

            console.log('message for me:', strippedMessage)
        }
        console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`)
    })
module.exports = startBot
