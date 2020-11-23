const workloadPointsService = require('./data/get-workload-points-export')
const getExportXlsx = require('./get-export-xlsx')
const getScenario = require('./data/get-scenario')
const groupScenarioData = require('./helpers/group-scenario-data')

module.exports = function (id, organisationLevel) {
  return getScenario(id, organisationLevel).then(function (scenarioData) {
    const scenarioArray = groupScenarioData(scenarioData)
    return workloadPointsService(false).then(function (result) {
      return workloadPointsService(true).then(function (t2aResult) {
        const wb = getExportXlsx(result, t2aResult, scenarioArray)
        return wb
      })
    })
  })
}
