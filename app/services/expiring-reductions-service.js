const getExpiringReductions = require('./data/get-expiring-reductions')
const dateFormatter = require('./date-formatter')

module.exports = function (userId) {
  return getExpiringReductions(userId).then(function (reductions) {
    reductions.forEach(function (reduction) {
      reduction.startDate = dateFormatter.formatDate(reduction.startDate, 'DD MMM YY')
      reduction.endDate = dateFormatter.formatDate(reduction.endDate, 'DD MMM YY')
    })
    return reductions
  })
}
