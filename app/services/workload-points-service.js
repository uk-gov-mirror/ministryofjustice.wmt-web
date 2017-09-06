const getWorkloadPoints = require('./data/get-workload-points')
// const getBreadcrumbs = require('./get-breadcrumbs')
const updateWorkloadPoints = require('./data/update-workload-points-effective-to')
const insertNewWorkloadPoints = require('./data/insert-workload-points')
const Link = require('./domain/link')

module.exports.getWorkloadPoints = function (id, organisationLevel) {
  var result = {}

  var breadcrumbs = [
    new Link('Workload Points', '/admin/workload-points'),
    new Link('Admin', '/admin')
  ]

  return getWorkloadPoints().then(function (results) {
    result.title = 'Workload Points'
    result.subTitle = 'Admin'
    result.workloadPoints = results
    // result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
    result.breadcrumbs = breadcrumbs
    return result
  })
}

module.exports.updateWorkloadPoints = function (workloadPoints) {
  var result = {}

  return updateWorkloadPoints(workloadPoints.previousWpId).then(function (results) {
    return insertNewWorkloadPoints(workloadPoints).then(function (results) {
      return result
    })
  })
}
