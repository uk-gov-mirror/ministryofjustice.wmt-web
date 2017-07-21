const Link = require('../../app/services/domain/link')

var offenderManagerBreadcrumb = new Link('John Doe', '/offender-manager/1')
var teamBreadcrumb = new Link('Team 1', '/team/1')
var lduBreadcrumb = new Link('LDU 1', '/ldu/1')
var regionBreadcrumb = new Link('Region 1', '/region/1')
var nationalBreadcrumb = new Link('HMPPS', '/hmpps/0')

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
