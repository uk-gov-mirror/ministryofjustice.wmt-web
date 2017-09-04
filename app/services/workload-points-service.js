const getWorkloadPoints = require('./data/get-workload-points')
const Link = require('./domain/link')

module.exports.getWorkloadPoints = function () {
  var result = {}

  var breadcrumbs = [
    new Link('Workload Points', '/admin/workload-points'),
    new Link('Admin', '/admin')
  ]

  return getWorkloadPoints().then(function (results) {
    result.title = 'Workload Points'
    result.subTitle = 'Admin'
    result.breadcrumbs = breadcrumbs
    result.workloadPoints = results
    return result
  })
}
