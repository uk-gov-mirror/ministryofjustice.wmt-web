const Link = require('../../app/services/domain/link')

var offenderManagerBreadcrumb = new Link('John Doe', '/probation/offender-manager/1')
var teamBreadcrumb = new Link('Team 1', '/probation/team/1')
var lduBreadcrumb = new Link('LDU 1', '/probation/ldu/1')
var regionBreadcrumb = new Link('Region 1', '/probation/region/1')
var nationalBreadcrumb = new Link('HMPPS', '/probation/hmpps/0')

var crOffenderManagerBreadcrumb = new Link('John Doe', '/court-reports/offender-manager/1')
var crTeamBreadcrumb = new Link('Team 1', '/court-reports/team/1')
var crLduBreadcrumb = new Link('LDU 1', '/court-reports/ldu/1')
var crRegionBreadcrumb = new Link('Region 1', '/court-reports/region/1')
var crNationalBreadcrumb = new Link('HMPPS', '/court-reports/hmpps/0')

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

module.exports.COURT_REPORTER_OFFENDER_MANAGER_BREADCRUMBS = [
  crOffenderManagerBreadcrumb,
  crTeamBreadcrumb,
  crLduBreadcrumb,
  crRegionBreadcrumb,
  crNationalBreadcrumb
]

module.exports.COURT_REPORTER_TEAM_BREADCRUMBS = [
  crTeamBreadcrumb,
  crLduBreadcrumb,
  crRegionBreadcrumb,
  crNationalBreadcrumb
]

module.exports.COURT_REPORTER_LDU_BREADCRUMBS = [
  crLduBreadcrumb,
  crRegionBreadcrumb,
  crNationalBreadcrumb
]

module.exports.COURT_REPORTER_REGION_BREADCRUMBS = [
  crRegionBreadcrumb,
  crNationalBreadcrumb
]

module.exports.COURT_REPORTER_NATIONAL_BREADCRUMBS = [
  crNationalBreadcrumb
]
