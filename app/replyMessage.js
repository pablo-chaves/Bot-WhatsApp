const moment = require('moment')
const usersServices = require('../services/users')
const { es } = require('../services/message/message')
const chatsServices = require('../services/chats')

const { sendMessage, sendMedia, sendFile } = require('./send')
const { saveHistorial, saveMedia, saveChat } = require('./save')

const removeAccents = (str) => {
  str = str.toLowerCase()
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

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
    } catch (err) {
      console.error(err)
    }
  }

  const chats = await chatsServices.getChats({ userId: user.id })
  const chat = chats.find((e) => moment().diff(e.updatedAt, 'hours') < 1)

  if (typeof body === 'string') body = removeAccents(body)
  console.log(body)
  if (!chat) {
    currentMessage = 'init'
    sendMessage({ to: from, message: es.init.join(''), client })
  } else if (chat.currentMessage !== 'init' && body === '0') {
    currentMessage = 'init'
    sendMessage({ to: from, message: es.init.join(''), client })
  } else if (msg.hasMedia) {
    const media = await msg.downloadMedia()

    if (!media.filename) {
      const fileName = `${phone}${moment().format('DD-MM-YYYY-hh-mm-ss')}`
      media.filename = fileName
    }
    saveMedia(media)
  } else if (from === 'status@broadcast') console.log('Un usuario publico un estado')
  else if (chat.currentMessage === 'init') {
    switch (body) {
      case '1':
        currentMessage = 'reduccion'
        sendMessage({ to: from, message: es.reduccion.join(''), client })
        break
      case '2':
        currentMessage = 'mejora'
        sendMessage({ to: from, message: es.mejora.join(''), client })
        break
      case '3':
        currentMessage = 'compra'
        sendMessage({ to: from, message: es.compra.join(''), client })
        break
      case '4':
        currentMessage = 'reportes'
        sendMessage({ to: from, message: es.reportes.join(''), client })
        break
      case '5':
        currentMessage = 'negociacion'
        sendMessage({ to: from, message: es.negociacion.join(''), client })
        break
      case '6':
        currentMessage = 'credito'
        sendMessage({ to: from, message: es.credito.join(''), client })
        break
      case '7':
        currentMessage = 'cambio'
        sendMessage({ to: from, message: es.cambio.join(''), client })
        break
      case '8':
        currentMessage = 'reversion'
        sendMessage({ to: from, message: es.reversion.join(''), client })
        break
      default:
        currentMessage = 'init'
        sendMessage({ to: from, message: es.error.join(''), client })
        sendMessage({ to: from, message: es.init.join(''), client })
        break
    }
  } else if (body === 'info') sendMedia({ to: from, fileName: 'foto-1.jpg', client })
  else if (body === 'catalogo') sendFile({ to: from, fileName: 'file-1.pdf', client })

  await saveChat({ chat, userId: user.id, currentMessage, anwer: body })
}

module.exports = replyMessage
