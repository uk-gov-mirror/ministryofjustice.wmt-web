const Link = require('./domain/link')
const linkGenerator = require('./helpers/link-generator')
const organisationUnitConstants = require('../constants/organisation-unit')
const workloadConstants = require('../constants/workload-type')

module.exports = function (id, organisationalUnitName, currentPath, workloadType = workloadConstants.PROBATION) {
  var baseLink = linkGenerator.fromIdAndNameAndWorkloadType(id, organisationalUnitName, workloadType)
  var navigation = []

  var isOffenderManager = organisationalUnitName === organisationUnitConstants.OFFENDER_MANAGER.name
  switch (workloadType) {
    case workloadConstants.COURT_REPORTS:
      if (isOffenderManager) {
        navigation.push(new Link('Overview', baseLink + '/overview'))
        navigation.push(new Link('Contracted Hours', baseLink + '/contracted-hours'))
        navigation.push(new Link('Reductions', baseLink + '/reductions'))
      } else {
        navigation.push(new Link('Court Reports Overview', baseLink + '/overview'))
      }
      break

    case workloadConstants.PROBATION:
      if (isOffenderManager) {
        navigation.push(new Link('Overview', baseLink + '/overview'))
        navigation.push(new Link('Capacity', baseLink + '/caseload-capacity'))
        navigation.push(new Link('Contracted Hours', baseLink + '/contracted-hours'))
        navigation.push(new Link('Case Progress', baseLink + '/case-progress'))
        navigation.push(new Link('Reductions', baseLink + '/reductions'))
      } else {
        navigation.push(new Link('Overview', baseLink + '/overview'))
        navigation.push(new Link('Capacity', baseLink + '/caseload-capacity'))
        navigation.push(new Link('Caseload', baseLink + '/caseload'))
        navigation.push(new Link('Case Progress', baseLink + '/case-progress'))
        if (organisationalUnitName !== organisationUnitConstants.NATIONAL.name) {
          navigation.push(new Link('Export', baseLink + '/export'))
        }
      }
  }

  navigation[0].active = true

  navigation.forEach(function (item) {
    if (item.link === currentPath) {
      navigation[0].active = false
      item.active = true
    }
  })

  return navigation
}
