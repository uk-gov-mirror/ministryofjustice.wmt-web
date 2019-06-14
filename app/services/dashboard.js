const Promise = require('bluebird')
const python = require('python-shell')
const config = require('../../config')
const log = require('../logger')
const getReductionNotesDashboard = require('./data/get-reduction-notes-dashboard')
const getFullOverview = require('./data/get-full-overview')
const calculateOverviewValues = require('./helpers/calculate-overview-values')
const getCaseload = require('../services/get-caseload')
const formatDashboardCaseload = require('./helpers/format-dashboard-caseload')

module.exports = function () {

  return new Promise(function (resolve, reject) {
    var options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: config.PYTHON_SHELL_DASHBOARD_SCRIPT_PATH
    }

    var capacity = null
    return getReductionNotesDashboard()
      .then(function (reductions) {
        return getFullOverview(undefined, 'hmpps')
          .then(function (results) {
            capacity = calculateOverviewValues(results, true)
            return getCaseload(1, 'region', true, true)
              .then(function (caseloadData) {
                var formattedCaseloadData = formatDashboardCaseload(caseloadData)
                options.args = [reductions, capacity, formattedCaseloadData]
                python.run('dashboard.py', options, function (error, results) {
                  if (error) {
                    log.error('Error calling python to generate Dashboard')
                    log.error(error)
                    reject(error)
                  }
                  log.info('Generated Dashboard file, results: ' + results)
                  resolve(results)
                })
              })
          })
      })  
  })
}