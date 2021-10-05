const db = require('./database')

const getChat = async ({ userId }) => {
  const result = await db('chats')
    .where('user_id', userId)
  return result
}

module.exports = {
  getChat
}
