const knex = require('../../knex').web
const orgUnitFinder = require('./helpers/org-unit-finder')
const orgUnitConstants = require('../constants/organisation-unit')

module.exports = function(id, type) {
    var orgUnit = orgUnitFinder('name', type)
    var table = 'team_reductions_notes_view'
    var whereClause = ''

    if(id !== undefined) {
        whereClause = ' WHERE ' + orgUnit.name + '_id = ' + id //+ orgUnit.name + '_id = ' + id
    }

    var selectColumns = [
        'name AS offenderManager',
        'reduction_reason AS reason',
        'amount',
        'start_date AS startDate',
        'end_date AS endDate',
        'reduction_status AS status',
        'additional_notes AS additionalNotes'
    ]
    
    return knex.raw(
        'SELECT ' + selectColumns.join(', ') +
        ' FROM ' + table +
        whereClause)
    .then(function (results) {
        return results
    })
}