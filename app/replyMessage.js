const moment = require('moment')
const usersServices = require('../services/users')
const { es } = require('../services/message/message')

const { sendMessage, sendMedia, sendFile } = require('./send')
const { saveHistorial, saveMedia, saveChat } = require('./save')

/**
 * Escuchamos cuando entra un mensaje
 */
async function replyMessage ({ msg, client }) {
  let { from, body } = msg
  let currentMessage = null
  const [phone] = from.split('@')
  await saveHistorial({ number: from, message: body })
  let user = await usersServices.getUser({ phone })
  if (!user) {
    try {
      const userId = await usersServices.createUser({ phone })
      user = { id: userId }
      console.log({ userId: user.id })
    } catch (err) {
      console.error(err)
    }
  }

  const removeAccents = (str) => {
    str = str.toLowerCase()
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  if (typeof body === 'string') body = removeAccents(body)
  console.log(body)
  if (msg.hasMedia) {
    const media = await msg.downloadMedia()

    if (!media.filename) {
      const fileName = `${phone}${moment().format('DD-MM-YYYY-hh-mm-ss')}`
      media.filename = fileName
    }
    saveMedia(media)
  } else if (from === 'status@broadcast') console.log('Un usuario publico un estado')
  else if (body === 'chao') sendMessage({ to: from, message: 'fue un gusto atenderte', client })
  else if (body === 'info') sendMedia({ to: from, fileName: 'foto-1.jpg', client })
  else if (body === 'catalogo') sendFile({ to: from, fileName: 'file-1.pdf', client })
  else {
    currentMessage = 'init'
    sendMessage({ to: from, message: es.init.join(''), client })
  }

  await saveChat({ userId: user.id, currentMessage, anwer: body })
}

module.exports = replyMessage
