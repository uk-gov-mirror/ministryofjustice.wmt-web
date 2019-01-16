const getCaseDetails = require('./data/get-case-details')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const organisationConstant = require('../constants/organisation-unit')

module.exports = function (id, organisationLevel) {
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  if (organisationalUnitType === undefined) {
    throw new Error(organisationLevel + ' should be offender-manager, region, team, ldu or hmpps')
  }

  var result = {}

  if (organisationalUnitType === organisationConstant.OFFENDER_MANAGER) {
    return getCaseDetails(id)
      .then(function (result) {
        result = formatTier(result)
        return result
      })
  } else {
    return Promise.resolve(result)
  }
}

var formatTier = function (results) {
  results.forEach(function (result) {
    switch (result.tierCode) {
      case '0':
        result.tierCode = 'Untiered'
        break
      case '1':
        result.tierCode = 'D2'
        break
      case '2':
        result.tierCode = 'D1'
        break
      case '3':
        result.tierCode = 'C2'
        break
      case '4':
        result.tierCode = 'C2'
        break
      case '5':
        result.tierCode = 'B2'
        break
      case '6':
        result.tierCode = 'B1'
        break
      case '7':
        result.tierCode = 'A'
        break
      case 0:
        result.tierCode = 'Untiered'
        break
      case 1:
        result.tierCode = 'D2'
        break
      case 2:
        result.tierCode = 'D1'
        break
      case 3:
        result.tierCode = 'C2'
        break
      case 4:
        result.tierCode = 'C2'
        break
      case 5:
        result.tierCode = 'B2'
        break
      case 6:
        result.tierCode = 'B1'
        break
      case 7:
        result.tierCode = 'A'
        break
    }
  })
  return results
}
