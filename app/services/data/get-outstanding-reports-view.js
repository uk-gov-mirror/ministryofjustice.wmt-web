const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const ORGANISATION_UNIT = require('../../constants/organisation-unit')

module.exports = function (id, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.outstandingReportsView

  var selectList = [
    'link_id AS linkId',
    'grade_code AS grade',
    'ow',
    'ot',
    'upw'
  ]

  var requiresWorkloadOwnerName = (type === ORGANISATION_UNIT.TEAM.name)

  if (requiresWorkloadOwnerName) {
    selectList.push('CONCAT(forename, \' \', surname) AS name')
  } else {
    selectList.push('name')
  }

  var whereString = ''

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString = ' WHERE id = ' + id
  }

  var noExpandHint = ' WITH (NOEXPAND)'

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
        ' FROM ' + table +
        noExpandHint +
        whereString)
        .then(function (results) {
          return results
        })
}
