const wdioConf = require('../e2e.conf.js')

module.exports = function (config) {
  const baseConfig = wdioConf.config
  for (const attrname in config) {
    baseConfig[attrname] = config[attrname]
  }

  return baseConfig
}
