const getExpiringReductions = require('./data/get-expiring-reductions')
const Link = require('./domain/link')
const dateFormatter = require('./date-formatter')

module.exports.getExpiringReductions = function (userId) {
  var breadcrumbs = [
    new Link('Expiring Reductions', '/admin/expiring-reductions'),
    new Link('Admin', '/admin')
  ]

  return getExpiringReductions(userId).then(function (reductions) {
    reductions.forEach(function (reduction) {
      reduction.startDate = dateFormatter.formatDate(reduction.startDate, 'DD MMM YY')
      reduction.endDate = dateFormatter.formatDate(reduction.endDate, 'DD MMM YY')
    })
    var result = {}
    var title = breadcrumbs[0].title
    result.title = title
    result.subTitle = breadcrumbs[1].title
    result.breadcrumbs = breadcrumbs
    result.reductions = reductions
    return result
  })
}
