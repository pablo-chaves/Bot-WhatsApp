const replyMessage = require('./replyMessage')

/**
 * Escuchamos cuando entre un mensaje
 */
function listenMessage (client) {
  client.on('message', async (msg) => {
    const { from, body } = msg

    console.log({ from, body })
    replyMessage({ msg, client })
  })
}

module.exports = listenMessage
