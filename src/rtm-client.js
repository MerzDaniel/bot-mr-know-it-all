



// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
// See the "Combining with the WebClient" topic below for an example of how to get this ID
// const conversationId = 'C1232456';

// The RTM client can send simple string messages
const sendRtmMessage = (client, msg, conversationId) => client.sendMessage(msg, conversationId)
    .then((res) => {
        // `res` contains information about the posted message
        console.log('rtm Message sent: ', res.ts);
    })
    .catch((err) => {console.log('err in rtm.sendMessage: '); console.error(err)})

module.exports = sendRtmMessage
