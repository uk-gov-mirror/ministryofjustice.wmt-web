const config = require('./config')

module.exports = {
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
}
