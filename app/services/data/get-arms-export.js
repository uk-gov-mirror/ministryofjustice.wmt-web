const knex = require('../../../knex').web
const getWorkloadPointsExport = require('./get-workload-points-export')

module.exports = function (id, type) {
  var table = 'arms_export_view'
  var selectList = [
    'regionName',
    'lduName',
    'teamName',
    'assessmentDate',
    'CRN',
    'omName',
    'grade_code AS omGrade',
    'sentencetype',
    'releaseDate'
  ]

  var whereString
  var armsDetails

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString = ' WHERE ' + type + 'id = ' + id
  }

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
        ' FROM ' + table +
        whereString)
      .then(function (results) {
        armsDetails = results
        return getWorkloadPointsExport().then(function (workloadPoints) {
          return {results: armsDetails, workloadPoints: workloadPoints}
        })
      })
}
