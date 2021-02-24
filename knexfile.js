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
        encrypt: true,
        requestTimeout: 120000,
        enableArithAbort: true
      }
    },
    debug: false,
    pool: {
      max: 500
    },
    acquireConnectionTimeout: 120000
  },
  archive: {
    client: 'mssql',
    connection: {
      host: config.ARCHIVE_DATABASE_SERVER,
      user: config.ARCHIVE_DATABASE_USERNAME,
      password: config.ARCHIVE_DATABASE_PASSWORD,
      database: config.ARCHIVE_DATABASE,
      options: {
        encrypt: true,
        requestTimeout: 120000,
        enableArithAbort: true
      }
    },
    debug: false,
    pool: {
      max: 500
    },
    acquireConnectionTimeout: 120000
  },
  integrationTests: {
    client: 'mssql',
    connection: {
      host: config.DATABASE_SERVER,
      user: config.MIGRATION_APP_DATABASE_USERNAME,
      password: config.MIGRATION_APP_DATABASE_PASSWORD,
      database: config.DATABASE,
      options: {
        encrypt: true,
        requestTimeout: 120000,
        enableArithAbort: true
      }
    },
    debug: false,
    pool: {
      max: 500
    },
    acquireConnectionTimeout: 120000
  }
}
