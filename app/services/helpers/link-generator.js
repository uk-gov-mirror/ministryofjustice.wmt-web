const orgUnitFinder = require('./org-unit-finder')

module.exports.fromReference = function (reference) {
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

  return module.exports.fromIdAndName(organisationId, organisationUnit.name)
}

module.exports.fromIdAndName = function (id, name) {
  if (name === undefined) {
    throw new TypeError('Organisational unit name is undefined')
  }

  var link
  var numberRegex = /^[0-9]+$/

  if (id === undefined || id === '') {
    link = '/' + name
  } else {
    if (!numberRegex.test(id.toString())) {
      throw new TypeError('ID must be a number')
    }
    link = '/' + name + '/' + id
  }

  return link
}
