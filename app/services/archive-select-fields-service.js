const getOffenderManagers = require('./data/get-offender-managers')
const getTeams = require('./data/get-teams')
const getLDUClusters = require('./data/get-ldu-clusters')

module.exports = function () {
  var seacrhFieldsData = {}
  return getOffenderManagers()
    .then(function (omResults) {
      seacrhFieldsData.offenderManagers = omResults
      return getTeams()
    })
    .then(function (teamResults) {
      seacrhFieldsData.teams = teamResults
      return getLDUClusters()
    })
    .then(function (lduResults) {
      seacrhFieldsData.lduClusters = lduResults
      return seacrhFieldsData
    })
}
