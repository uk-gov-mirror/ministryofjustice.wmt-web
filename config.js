module.exports = {
  // DB
  DATABASE_SERVER: process.env.WMT_DB_SERVER || 'localhost',
  DATABASE: process.env.WMT_DB_NAME || 'wmt_db',
  DB_APP_SCHEMA: 'app',

  // App
  WEB_APP_DATABASE_USERNAME: process.env.WMT_WEB_APP_DATABASE_USERNAME || 'wmt_web',
  WEB_APP_DATABASE_PASSWORD: process.env.WMT_WEB_APP_DATABASE_PASSWORD || 'wmt_web',

  // Migration
  MIGRATION_APP_DATABASE_USERNAME: process.env.WMT_MIGRATION_APP_DATABASE_USERNAME || 'wmt_app',
  MIGRATION_APP_DATABASE_PASSWORD: process.env.WMT_MIGRATION_APP_DATABASE_PASSWORD || 'wmt_app'
}
