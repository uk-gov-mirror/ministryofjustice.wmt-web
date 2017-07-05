module.exports = {
  // Session and Cookie security (defaults for development)
  APPLICATION_SECRET: process.env.WMT_WEB_APPLICATION_SECRET, // NO DEFAULT FOR SECURITY REASONS, WILL FAIL IF NOT SET
  SECURE_COOKIE: process.env.WMT_WEB_SECURE_COOKIE || 'false',
  SESSION_COOKIE_MAXAGE: process.env.WMT_WEB_SESSION_COOKIE_MAXAGE || '1200000', // 20 min default

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
