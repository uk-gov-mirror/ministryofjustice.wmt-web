const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const workloadPointsService = require('../services/data/get-workload-points-export')
const getExportXlsx = require('../services/get-export-xlsx')
const getScenario = require('../services/data/get-scenario')

module.exports = function (router) {
  router.get('/scenario', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    return getScenario().then(function (scenarioData) {
      return workloadPointsService(false).then(function (result) {
        return workloadPointsService(true).then(function (t2aResult) {
          const wb = getExportXlsx(result, t2aResult, scenarioData)
          wb.write('ExcelFile.xlsx', res)
        })
      })
    })
  })
}
