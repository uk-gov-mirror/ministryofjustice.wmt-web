const orgUnitFinder = require('./org-unit-finder')
const workloadTypeValidator = require('../../services/validators/workload-type-validator')

module.exports.fromReferenceAndWorkloadType = function (reference, workloadType) {
  const referenceRegex = /^[A-Z]{1}[0-9]*$/

  if (reference === undefined) {
    throw new TypeError('Organisation reference is undefined')
  }
  workloadTypeValidator.validate(workloadType)

  if (!referenceRegex.test(reference)) {
    throw new Error('Organisation reference ' + reference + ' is of an incorrect format')
  }

  const organisationRef = reference.substring(0, 1)
  const organisationId = reference.substring(1)
  const organisationUnit = orgUnitFinder('ref', organisationRef)

  if (organisationUnit === undefined) {
    throw new Error('Organisation ref ' + organisationRef + ' is not valid')
  }

  return module.exports.fromIdAndNameAndWorkloadType(organisationId, organisationUnit.name, workloadType)
}

module.exports.fromIdAndNameAndWorkloadType = function (id, name, workloadType) {
  if (name === undefined) {
    throw new TypeError('Organisational unit name is undefined')
  }
  workloadTypeValidator.validate(workloadType)

  let link
  const numberRegex = /^[0-9]+$/

  if (id === undefined || id === '') {
    link = '/' + name + '/0'
  } else {
    if (!numberRegex.test(id.toString())) {
      throw new TypeError('ID must be a number')
    }
    link = '/' + name + '/' + id
  }

  link = '/' + workloadType + link

  return link
}
