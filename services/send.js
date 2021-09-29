const { MessageMedia } = require('whatsapp-web.js')

const sendMessage = ({ to, message, client }) => {
  client.sendMessage(to, message)
}

const sendMedia = ({ to, fileName, client }) => {
  const media = MessageMedia.fromFilePath(`./assets/mediaSend/images/${fileName}`)
  client.sendMessage(to, media)
}

const sendFile = ({ to, fileName, client }) => {
  const media = MessageMedia.fromFilePath(`./assets/mediaSend/files/${fileName}`)
  client.sendMessage(to, media)
}
module.exports = {
  sendMessage,
  sendMedia,
  sendFile
}
