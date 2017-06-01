const config = require('./config')

module.exports = {
    web: {
      client: 'mssql',
      connection: {
        host: config.DATABASE_SERVER,
        user: config.WEB_APP_DATABASE_USERNAME,
        password: config.WEB_APP_DATABASE_PASSWORD,
        database: config.DATABASE,
        options: {
          encrypt: true
        }
      },
      debug: true
    },
    integrationTests: {
      client: 'mssql',
      connection: {
        host: config.DATABASE_SERVER,
        user: config.MIGRATION_APP_DATABASE_USERNAME,
        password: config.MIGRATION_APP_DATABASE_PASSWORD,
        database: config.DATABASE,
        options: {
          encrypt: true
        }
      },
      debug: true
    }
}
