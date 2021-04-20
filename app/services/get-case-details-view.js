const getCaseDetails = require('./data/get-case-details')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const organisationConstant = require('../constants/organisation-unit')

module.exports = function (id, organisationLevel) {
  const organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  if (organisationalUnitType === undefined) {
    throw new Error(organisationLevel + ' should be offender-manager, region, team, ldu or hmpps')
  }

  const result = {}

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

const formatTier = function (results) {
  results.forEach(function (result) {
    switch (result.tierCode) {
      case '0':
        result.tierCode = 'Untiered'
        break
      case '1':
        result.tierCode = 'A3'
        break
      case '2':
        result.tierCode = 'A2'
        break
      case '3':
        result.tierCode = 'A1'
        break
      case '4':
        result.tierCode = 'A0'
        break
      case '5':
        result.tierCode = 'B3'
        break
      case '6':
        result.tierCode = 'B2'
        break
      case '7':
        result.tierCode = 'B1'
        break
      case '8':
        result.tierCode = 'B0'
        break
      case '9':
        result.tierCode = 'C3'
        break
      case '10':
        result.tierCode = 'C2'
        break
      case '11':
        result.tierCode = 'C1'
        break
      case '12':
        result.tierCode = 'C0'
        break
      case '13':
        result.tierCode = 'D3'
        break
      case '14':
        result.tierCode = 'D2'
        break
      case '15':
        result.tierCode = 'D1'
        break
      case '16':
        result.tierCode = 'D0'
        break
      case 0:
        result.tierCode = 'Untiered'
        break
      case 1:
        result.tierCode = 'A3'
        break
      case 2:
        result.tierCode = 'A2'
        break
      case 3:
        result.tierCode = 'A1'
        break
      case 4:
        result.tierCode = 'A0'
        break
      case 5:
        result.tierCode = 'B3'
        break
      case 6:
        result.tierCode = 'B2'
        break
      case 7:
        result.tierCode = 'B1'
        break
      case 8:
        result.tierCode = 'B0'
        break
      case 9:
        result.tierCode = 'C3'
        break
      case 10:
        result.tierCode = 'C2'
        break
      case 11:
        result.tierCode = 'C1'
        break
      case 12:
        result.tierCode = 'C0'
        break
      case 13:
        result.tierCode = 'D3'
        break
      case 14:
        result.tierCode = 'D2'
        break
      case 15:
        result.tierCode = 'D1'
        break
      case 16:
        result.tierCode = 'D0'
        break
    }
  })
  return results
}
