const moment = require('moment')

const { sendMessage, sendMedia, sendFile } = require('./send')
const { saveHistorial, saveMedia } = require('./save')

/**
 * Escuchamos cuando entre un mensaje
 */
async function replyMessage ({ msg, client }) {
  const { from, body } = msg
  saveHistorial({ number: from, message: body })

  if (msg.hasMedia) {
    const media = await msg.downloadMedia()

    if (!media.filename) {
      const [phone] = from.split('@')
      const fileName = `${phone}${moment().format('DD-MM-YYYY-hh-mm-ss')}`
      media.filename = fileName
    }
    saveMedia(media)
  } else if (from === 'status@broadcast') console.log('Un usuario publico un estado')
  else if (body === 'chao') sendMessage({ to: from, message: 'fue un gusto atenderte', client })
  else if (body === 'info') sendMedia({ to: from, fileName: 'foto-1.jpg', client })
  else if (body === 'catalogo') sendFile({ to: from, fileName: 'file-1.pdf', client })
  else sendMessage({ to: from, message: 'hola, este es un mensaje automatico desde el computador', client })
}

module.exports = replyMessage
