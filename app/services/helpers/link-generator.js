const orgUnitFinder = require('./org-unit-finder')
const workloadTypes = require('../../constants/workload-type')

module.exports.fromReference = function (reference, workloadType = workloadTypes.STANDARD) {
  var referenceRegex = /^[A-Z]{1}[0-9]*$/

  if (reference === undefined) {
    throw new TypeError('Organisation reference is undefined')
  }

  if (!referenceRegex.test(reference)) {
    throw new Error('Organisation reference ' + reference + ' is of an incorrect format')
  }

  var organisationRef = reference.substring(0, 1)
  var organisationId = reference.substring(1)
  var organisationUnit = orgUnitFinder('ref', organisationRef)

  if (organisationUnit === undefined) {
    throw new Error('Organisation ref ' + organisationRef + ' is not valid')
  }

  return module.exports.fromIdAndName(organisationId, organisationUnit.name, workloadType)
}

module.exports.fromIdAndName = function (id, name, workloadType = workloadTypes.STANDARD) {
  if (name === undefined) {
    throw new TypeError('Organisational unit name is undefined')
  }

  var link
  var numberRegex = /^[0-9]+$/

  if (id === undefined || id === '') {
    link = '/' + name + '/0'
  } else {
    if (!numberRegex.test(id.toString())) {
      throw new TypeError('ID must be a number')
    }
    link = '/' + name + '/' + id
  }

  if(workloadType === workloadTypes.COURT_REPORTS) {
    link = '/court-reports' + link
  }

  return link
}
