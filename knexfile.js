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
        requestTimeout: 120000
      }
    },
    debug: false,
    pool: {
      max: 500
    }
  },
  newArchive: {
    client: 'mssql',
    connection: {
      host: config.DATABASE_SERVER,
      user: config.WEB_APP_DATABASE_USERNAME,
      password: config.WEB_APP_DATABASE_PASSWORD,
      database: config.NEW_ARCHIVE_DATABASE,
      options: {
        encrypt: true,
        requestTimeout: 120000
      }
    },
    debug: false,
    pool: {
      max: 500
    }
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
        requestTimeout: 120000
      }
    },
    debug: false
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
        requestTimeout: 60000
      }
    },
    debug: false
  }
}
