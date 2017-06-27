const getCapacityTable = require('../services/get-capacity-table')
const CapacityDateRange = require('../services/domain/capacity-date-range')
const dateFormatter = require('../services/date-formatter')

module.exports = function (router) {
  router.get('/team', function (req, res, next) {
    // TODO ; Add base get all for getting region
  })
  router.get('/team/:id', function (req, res, next) {
    // TODO ; Add base get all for getting region data based on id
  })
}
