const wdioConf = require('../e2e.conf.js')

module.exports = function (config) {
  var baseConfig = wdioConf.config
  for (var attrname in config) {
    baseConfig[attrname] = config[attrname]
  }

  return baseConfig
}
