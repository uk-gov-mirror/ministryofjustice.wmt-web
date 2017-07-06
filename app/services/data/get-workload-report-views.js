const config = require('../../../knexfile').web
const knex = require('knex')(config)
const organisationUnit = require('../../constants/organisation-unit')
const CapacityType = require('../constants/capacity-type')

module.exports = function (id, fromDate, toDate, type) {
  if (type === undefined ||
      (organisationUnit.LDU.name !== type &&
      organisationUnit.REGION.name !== type &&
      organisationUnit.TEAM.name !== type)) {
    throw new Error(type + ' should be REGION, TEAM or LDU')
  }
  var table = ''
  switch (type) {
    case organisationUnit.LDU.name:
      table = CapacityType.LDU
      break
    case organisationUnit.REGION.name:
      table = CapacityType.REGION
      break
    case organisationUnit.TEAM.name:
      table = CapacityType.TEAM
      break
  }

  return knex('app.' + table)
    .where('app.' + table + '.id', id)
    .where('app.' + table + '.effective_from', '>=', fromDate)
    .where('app.' + table + '.effective_from', '<=', toDate)
    .select('app.' + table + '.total_points',
            'app.' + table + '.sdr_points',
            'app.' + table + '.sdr_conversion_points',
            'app.' + table + '.paroms_points',
            'app.' + table + '.available_points',
            'app.' + table + '.effective_from',
            'app.' + table + '.reduction_hours')
    .then(function (results) {
      return results
    })
}
