const _ = require('lodash')
const orgUnit = require('../../constants/organisation-unit')

module.exports = function (property, value) {
  return _.find(orgUnit, [property, value])
}
