const db = require('./database')

const getUser = async ({ phone }) => {
  const result = await db('users')
    .where('phone', phone)
  return result
}

const createUser = async () => {
  await db('users')
}

module.exports = {
  getUser,
  createUser
}
