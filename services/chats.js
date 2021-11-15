const db = require('./database')

const getChats = async ({ userId }) => {
  const result = await db('chats')
    .select({
      id: 'id',
      userId: 'user_id',
      questions: 'questions',
      currentMessage: 'current_message',
      status: 'status',
      updatedAt: 'updated_at'
    })
    .where('user_id', userId)
  return result
}

const createChats = async ({ userId, questions, currentMessage }) => {
  const result = await db('chats')
    .insert({
      user_id: userId,
      questions,
      current_message: currentMessage
    })
  return result
}

const updateChats = async ({ chatId, questions, currentMessage }) => {
  const result = await db('chats')
    .update({
      questions,
      current_message: currentMessage
    })
    .where('id', chatId)
  return result
}

module.exports = {
  getChats,
  createChats,
  updateChats
}
