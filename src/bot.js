const requestPromise = require('request-promise')
const jsdom = require('jsdom')

async function loadPage(pageName) {
    const uri = 'https://en.wikipedia.org/wiki/' + pageName.replace(' ','_')

    const page = await requestPromise({
        uri,
    }, )

    return new jsdom.JSDOM(page, {includeNodeLocations: true})
}

function notAMainArticle(doc) {
    const c = doc.querySelector('.mw-parser-output > p')
    return c.innerHTML.includes('may refer to:')
}
async function loadFirstLinkDom(doc) {
    const firstLink = doc.querySelector('.mw-parser-output > ul > li > a')
    const newPageName = firstLink.attributes[0].value.replace('/wiki/', '')
    return await loadPage(newPageName)
}

async function loadPageTextWiki(pageName) {
    let dom = await loadPage(pageName)

    if(notAMainArticle(dom.window.document)) {
        dom = await loadFirstLinkDom(dom.window.document)
    }

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

async function test() {
    const dom = await loadPage('asdf')
    const doc = dom.window.document
    console.log(notAMainArticle(doc))
    console.log(await loadFirstLinkDom(doc))
}

async function loadFromWikiSendMessage(webClient, rtmClient, message) {
    const strippedMessage = message.text.split(' ').filter(t => (!t.includes(rtmClient.activeUserId))).join(' ');
    const description = await loadPageTextWiki(strippedMessage)

    const res = await sendMessage(webClient, description, message.channel)
    // console.log('sent message: ', res.ts)
    return res
}

const startBot = (webClient, rtmClient) => {
    // new Promise((resolve, reject) => {
    //     test().then(resolve).catch(reject)
    // }).catch(console.error)
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
