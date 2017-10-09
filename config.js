module.exports = {

  LOGGING_PATH: process.env.LOGGING_PATH || 'logs/wmt-web.log',
  LOGGING_LEVEL: process.env.LOGGING_LEVEL || 'DEBUG',

  // Authentication (defaults for development)
  AUTHENTICATION_ENABLED: process.env.WMT_WEB_AUTHENTICATION_ENABLED || false,
  ACTIVE_DIRECTORY_ENTRY_POINT: process.env.WMT_ACTIVE_DIRECTORY_ENTRY_POINT || 'enter here', // SAML-P Sign-On Endpoint
  ACTIVE_DIRECTORY_ISSUER: process.env.WMT_ACTIVE_DIRECTORY_ISSUER || 'app id', // APP-ID
  ACTIVE_DIRECTORY_RETURN_ADDRESS: process.env.WMT_ACTIVE_DIRECTORY_RETURN_ADDRESS || '/login',
  ACTIVE_DIRECTORY_DOMAIN: process.env.WMT_ACTIVE_DIRECTORY_DOMAIN || 'wmtdevelopment.onmicrosoft.com', // SAML CERT

  // Session and Cookie security (defaults for development)
  APPLICATION_SECRET: process.env.WMT_WEB_APPLICATION_SECRET, // NO DEFAULT FOR SECURITY REASONS, WILL FAIL IF NOT SET
  SECURE_COOKIE: process.env.WMT_WEB_SECURE_COOKIE || 'false',
  SESSION_COOKIE_MAXAGE: process.env.WMT_WEB_SESSION_COOKIE_MAXAGE || '3600000', // 60 min default
  RESAVE_SESSION: process.env.WMT_WEB_SESSION_COOKIE_RESAVE || 'true',
  SAVE_UNINITIALIZED_SESSION: process.env.WMT_WEB_SESSION_COOKIE_SAVE_UNINITIALISED || 'false',

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
