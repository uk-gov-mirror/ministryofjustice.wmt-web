const config = require('../config')
const bunyan = require('bunyan')
const PrettyStream = require('bunyan-prettystream')

// Add logging
const prettyStream = new PrettyStream()
prettyStream.pipe(process.stdout)

const logger = bunyan.createLogger({
  name: 'wmt-web',
  streams: [],
  serializers: {
    error: errorSerializer
  }
})

logger.addStream({
  level: 'DEBUG',
  stream: prettyStream
})

// Add file stream.
logger.addStream({
  type: 'rotating-file',
  level: config.LOGGING_LEVEL,
  path: config.LOGGING_PATH,
  period: '1d',
  count: 7
})

function errorSerializer (error) {
  return {
    message: error.message,
    name: error.name,
    stack: error.stack
  }
}

module.exports = logger
