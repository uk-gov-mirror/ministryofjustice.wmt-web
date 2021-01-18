const Link = require('../../app/services/domain/link')
const workloadTypes = require('../../app/constants/workload-type')

const offenderManagerBreadcrumb = new Link('John Doe', '/' + workloadTypes.PROBATION + '/offender-manager/1')
const teamBreadcrumb = new Link('Team 1', '/' + workloadTypes.PROBATION + '/team/1')
const lduBreadcrumb = new Link('LDU 1', '/' + workloadTypes.PROBATION + '/ldu/1')
const regionBreadcrumb = new Link('Region 1', '/' + workloadTypes.PROBATION + '/region/1')
const nationalBreadcrumb = new Link('HMPPS', '/' + workloadTypes.PROBATION + '/hmpps/0')

const crOffenderManagerBreadcrumb = new Link('John Doe', '/' + workloadTypes.COURT_REPORTS + '/offender-manager/1')
const crTeamBreadcrumb = new Link('Team 1', '/' + workloadTypes.COURT_REPORTS + '/team/1')
const crLduBreadcrumb = new Link('LDU 1', '/' + workloadTypes.COURT_REPORTS + '/ldu/1')
const crRegionBreadcrumb = new Link('Region 1', '/' + workloadTypes.COURT_REPORTS + '/region/1')
const crNationalBreadcrumb = new Link('HMPPS', '/' + workloadTypes.COURT_REPORTS + '/hmpps/0')

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
