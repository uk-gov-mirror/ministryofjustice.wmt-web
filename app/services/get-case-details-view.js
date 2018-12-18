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
    return getCaseDetails (id)
      .then(function (result) {
        /* result.forEach(function (item) {
          switch(item.caseType) {
            case 'COMMUNITY':
              item.caseType = 'Community'
              break
            case 'CUSTODY':
              item.caseType = 'Custody'
              break
            case 'LICENCE':
              item.caseType = 'Licence'
              break
            case 'LICENSE':
              item.caseType = 'License'
              break
          }
        })*/
        return result
      })
  } else {
    return Promise.resolve(result)
  }
}
