require('dotenv').config()

const sendWebhookMessage = require('./src/webhook-client')

const ids = {
    conversationId: 'oVlmyq1xE2yGZ7nSaHCKS3EF',
    personalMessageToMe: 'DBVKYLTJP',
    personalChannelWithWorkspace: 'TBVGRV5FW/BBVUCQ1A9/oVlmyq1xE2yGZ7nSaHCKS3EF',
}

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const token = process.env.SLACK_TOKEN;

sendWebhookMessage('Hello there! ... Ah General Kenobi!')
