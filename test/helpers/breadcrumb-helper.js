const Breadcrumb = require('../../app/services/domain/breadcrumb')

var offenderManagerBreadcrumb = new Breadcrumb('John Doe', '/offendermanager/1')
var teamBreadcrumb = new Breadcrumb('Team 1', '/team/1')
var lduBreadcrumb = new Breadcrumb('LDU 1', '/ldu/1')
var regionBreadcrumb = new Breadcrumb('Region 1', '/region/1')
var nationalBreadcrumb = new Breadcrumb('NPS', '/nps')

module.exports.OFFENDER_MANAGER_BREADCRUMBS = [
  offenderManagerBreadcrumb,
  teamBreadcrumb,
  lduBreadcrumb,
  regionBreadcrumb,
  nationalBreadcrumb
]

module.exports.TEAM_BREADCRUMBS = [
  teamBreadcrumb,
  lduBreadcrumb,
  regionBreadcrumb,
  nationalBreadcrumb
]

module.exports.LDU_BREADCRUMBS = [
  lduBreadcrumb,
  regionBreadcrumb,
  nationalBreadcrumb
]

module.exports.REGION_BREADCRUMBS = [
  regionBreadcrumb,
  nationalBreadcrumb
]

module.exports.NATIONAL_BREADCRUMBS = [
  nationalBreadcrumb
]
