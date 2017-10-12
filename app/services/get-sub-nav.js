const Link = require('./domain/link')
const linkGenerator = require('./helpers/link-generator')
const organisationUnitConstants = require('../constants/organisation-unit')
const workloadConstants = require('../constants/workload-type')

module.exports = function (id, organisationalUnitName, currentPath, workloadType = workloadConstants.PROBATION) {
  var baseLink = linkGenerator.fromIdAndName(id, organisationalUnitName, workloadType)
  var navigation = []

  if (workloadType === workloadConstants.COURT_REPORTS &&
    organisationalUnitName === organisationUnitConstants.OFFENDER_MANAGER.name) {
    navigation.push(new Link('Overview', baseLink + '/overview'))
    navigation.push(new Link('Contracted Hours', baseLink + '/contracted-hours'))
    navigation.push(new Link('Reductions', baseLink + '/reductions'))
  } else if (workloadType === workloadConstants.PROBATION &&
    organisationalUnitName === organisationUnitConstants.OFFENDER_MANAGER.name) {
    navigation.push(new Link('Overview', baseLink + '/overview'))
    navigation.push(new Link('Capacity', baseLink + '/caseload-capacity'))
    navigation.push(new Link('Contracted Hours', baseLink + '/contracted-hours'))
    navigation.push(new Link('Case Progress', baseLink + '/case-progress'))
    navigation.push(new Link('Reductions', baseLink + '/reductions'))
  } else if (workloadType === workloadConstants.COURT_REPORTS &&
     organisationalUnitName !== organisationUnitConstants.OFFENDER_MANAGER.name) {
    navigation.push(new Link('Court Reports Overview', baseLink + '/overview'))
  } else if (workloadType === workloadConstants.PROBATION &&
     organisationalUnitName !== organisationUnitConstants.OFFENDER_MANAGER.name) {
    navigation.push(new Link('Overview', baseLink + '/overview'))
    navigation.push(new Link('Capacity', baseLink + '/caseload-capacity'))
    navigation.push(new Link('Caseload', baseLink + '/caseload'))
    navigation.push(new Link('Case Progress', baseLink + '/case-progress'))
  }

  navigation.forEach(function (item) {
    if (item.link === currentPath) {
      item.active = true
    }
  })

  return navigation
}
