/* eslint-disable node/no-path-concat */
// Update with your config settings.

require('dotenv').config()

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      multipleStatements: true
    },
    migrations: {
      directory: __dirname + '/knex/migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      multipleStatements: true
    },
    migrations: {
      directory: __dirname + '/knex/migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      multipleStatements: true
    },
    migrations: {
      directory: __dirname + '/knex/migrations'
    }
  }
}
