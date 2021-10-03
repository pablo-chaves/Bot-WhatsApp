// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'youi_company',
      multipleStatements: true
    },
    migrations: {
      directory: __dirname + '/knex/migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'youi_company',
      multipleStatements: true
    },
    migrations: {
      directory: __dirname + '/knex/migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'youi_company',
      multipleStatements: true
    },
    migrations: {
      directory: __dirname + '/knex/migrations'
    }
  }
}
