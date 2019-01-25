const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const workloadPointsService = require('../services/data/get-workload-points-export')
const getExportXlsx = require('../services/get-export-xlsx')

module.exports = function (router) {
  router.get('/scenario', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    return workloadPointsService(false).then(function (result) {
      return workloadPointsService(true).then(function (t2aResult) {
        var wb = getExportXlsx(result, t2aResult)
        wb.write('ExcelFile.xlsx', res)
      })
    })
  })
}
