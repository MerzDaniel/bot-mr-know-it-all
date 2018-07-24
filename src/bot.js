const {promisify} = require('util')
const jsdom = require('jsdom')
const wikipedia = require('node-wikipedia')

const wikiPageDataAsPromised = (pageName, opts)=> new Promise((resolve, reject) => {
    try {
        wikipedia.page.data(pageName, opts, resolve)
    } catch(err) {reject(err)}
})

async function loadPageTextWiki(pageName) {
    const page = await wikiPageDataAsPromised(pageName, {content: true})
    const html =page.text['*']

    const dom = new jsdom.JSDOM(html, {includeNodeLocations: true})
    const doc = dom.window.document
    const h2 = doc.querySelector('h2')
    const locationH2 = dom.nodeLocation(h2)
    const c = doc.querySelectorAll('.mw-parser-output > p')

    let resultText = ''
    for(let n of c ) {
        if (dom.nodeLocation(n).startOffset > locationH2.startOffset)
            continue
        resultText += n.innerHTML
    }
    return resultText.replace(/<(?:.|\n)*?>/gm, '')
}

async function sendMessage(client, text, channel) {
    return await client.chat.postMessage({ channel, text })
}

async function loadWrite() {
    wikipedia.page.data('Leek', {content: true}, (content) => {
        const html =content.text['*']

        const dom = new jsdom.JSDOM(html, {includeNodeLocations: true})
        const doc = dom.window.document
        const h2 = doc.querySelector('h2')
        const locationH2 = dom.nodeLocation(h2)
        const c = doc.querySelectorAll('.mw-parser-output > p')

        let resultText
        for(let n of c ) {
            if (dom.nodeLocation(n).startOffset > locationH2.startOffset)
                continue
            console.log(n.innerHTML)
            console.log(Object.keys(n))

        }
    })

}
async function loadFromWikiSendMessage(webClient, rtmClient, message) {
    const strippedMessage = message.text.split(' ').filter(t => (!t.includes(rtmClient.activeUserId))).join(' ');
    const description = await loadPageTextWiki(strippedMessage)

    const res = await sendMessage(webClient, description, message.channel)
    // console.log('sent message: ', res.ts)
    return res
}

const startBot = (webClient, rtmClient) => {
    // loadWrite()
    // return;

    console.log('start bot')
    rtmClient.on('message', message => {
        console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`)
        // Skip messages that are from a bot or my own bot_user ID
        if ((message.subtype && message.subtype === 'bot_message') ||
            (!message.subtype && message.user === rtmClient.activeUserId)) {
            return;
        }

        if (message.text.includes(rtmClient.activeUserId)) {

            const promise = new Promise((resolve, reject) => {
                    loadFromWikiSendMessage(webClient, rtmClient, message)
                        .then(res => resolve(res)).catch(err => reject(err))
            })
            promise.catch(err => console.error('got rejected :(', err))
        }
    })
}
module.exports = startBot
