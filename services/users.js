const db = require('./database')

const getUser = async ({ phone }) => {
  const [result] = await db('users')
    .select({
      id: 'id'
    })
    .where('phone', phone)
  return result
}

const createUser = async ({ phone }) => {
  const [userId] = await db('users').insert({
    phone
  })
  return userId
}

module.exports = {
  getUser,
  createUser
}
