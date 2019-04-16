const Promise = require('bluebird')
const python = require('python-shell')
const config = require('../../config')
const log = require('../logger')
const getReductionNotesDashboard = require('./data/get-reduction-notes-dashboard')
const getFullOverview = require('./data/get-full-overview')
const calculateOverviewValues = require('./helpers/calculate-overview-values')
const getScenario = require('./data/get-scenario')
const groupScenarioData = require('./helpers/group-scenario-data')

module.exports = function () {

  return new Promise(function (resolve, reject) {
    var options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: config.PYTHON_SHELL_DASHBOARD_SCRIPT_PATH
    }

    var filePath = path.join(outputPath, getFileName())

    var capacity = null
    return getReductionNotesDashboard()
      .then(function (reductions) {
        return getFullOverview('hmpps')
          .then(function (results) {
            capacity = calculateOverviewValues(results, true)
            return getScenario()
              .then(function (scenarioData) {
                var scenarioArray = groupScenarioData(scenarioData)
                options.args = [reductions, filePath, accountingDate]
                python.run('dashboard.py', options, function (error, results) {
                  if (error) {
                    log.error('Error calling python to generate Dashboard')
                    log.error(error)
                    reject(error)
                  }
                  log.info('Generated Dashboard file, results: ' + results)
                  resolve(filePath)
                })
              })
          })
      })  
  })
}