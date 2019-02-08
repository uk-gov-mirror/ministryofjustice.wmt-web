const workloadPointsService = require('./data/get-workload-points-export')
const getExportXlsx = require('./get-export-xlsx')
const getScenario = require('./data/get-scenario')

module.exports = function (id, organisationLevel) {
  return getScenario(id, organisationLevel).then(function (scenarioData) {
    return workloadPointsService(false).then(function (result) {
      return workloadPointsService(true).then(function (t2aResult) {
        var wb = getExportXlsx(result, t2aResult, scenarioData)
          return wb
      })
    })
  })
}
