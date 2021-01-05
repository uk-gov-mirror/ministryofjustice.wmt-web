const workloadPointsService = require('./data/get-workload-points-export')
const getExportXlsx = require('./get-omic-export-xlsx')
const getScenario = require('./data/get-omic-scenario')
const groupScenarioData = require('./helpers/group-omic-scenario-data')

module.exports = function (id, organisationLevel) {
  return getScenario(id, organisationLevel).then(function (scenarioData) {
    var scenarioArray = groupScenarioData(scenarioData)
    return workloadPointsService(false).then(function (result) {
      return workloadPointsService(true).then(function (t2aResult) {
        var wb = getExportXlsx(result, t2aResult, scenarioArray)
        return wb
      })
    })
  })
}
