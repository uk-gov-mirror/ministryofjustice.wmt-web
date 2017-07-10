const orgUnitFinder = require('./org-unit-finder')

module.exports = function (reference) {
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

  var link

  switch (organisationRef) {
    case 'N':
      link = '/' + organisationUnit.name
      break
    default:
      link = '/' + organisationUnit.name + '/' + organisationId
  }

  return link
}
