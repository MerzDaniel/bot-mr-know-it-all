require('dotenv').config()

const sendWebhookMessage = require('./src/webhook-client')

const ids = {
    conversationId: 'oVlmyq1xE2yGZ7nSaHCKS3EF',
    personalMessageToMe: 'DBVKYLTJP',
    personalChannelWithWorkspace: 'TBVGRV5FW/BBVUCQ1A9/oVlmyq1xE2yGZ7nSaHCKS3EF',
}


sendWebhookMessage('Hello there! ... Ah General Kenobi!', ids.personalMessageToMe)

