const knex = require('../../../knex').web
const getWorkloadPointsExport = require('./get-workload-points-export')
// const groupCaseReferenceNumbers = require('../helpers/group-case-reference-numbers')

module.exports = function (id, type) {
  var table = 'case_details_export_view'
  var selectList = [
    'regionName',
    'lduName',
    'teamName',
    'tierCode',
    'rowType',
    'caseReferenceNo',
    'caseType',
    'offenderManagerName',
    'gradeCode'
  ]

  var whereString
  var caseDetails

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString = ' WHERE ' + type + 'id = ' + id
  }

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
        ' FROM ' + table +
        whereString)
      .then(function (results) {
        caseDetails = results
        // groupCaseReferenceNumbers(results)
        return getWorkloadPointsExport().then(function (workloadPoints) {
          return {results: caseDetails, workloadPoints: workloadPoints}
        })
      })
}
