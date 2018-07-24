require('dotenv').config()

const { sendMessage, sendMessageToAll} = require('./src/webhook-client')
const sendRtmMessage = require('./src/rtm-client')

const ids = {
    conversationId: 'oVlmyq1xE2yGZ7nSaHCKS3EF',
    personalMessageToMe: 'DBVKYLTJP',
    personalChannelWithWorkspace: 'TBVGRV5FW/BBVUCQ1A9/oVlmyq1xE2yGZ7nSaHCKS3EF',
    generalChannel: 'CBV7KF10R',
}

// sendMessage('Hello there! ... Ah General Kenobi!', ids.personalMessageToMe)
sendMessageToAll('Message to all').catch(console.error)

// sendRtmMessage('Mega Message', ids.generalChannel)
