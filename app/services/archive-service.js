const getDailyArchive = require('./data/get-daily-archive')
const getFortnightlyArchive = require('./data/get-fortnightly-archive')
const getReductionArchive = require('./data/get-reduction-archive')
const calculateAvailablePoints = require('wmt-probation-rules').calculateAvailablePoints
const DefaultContractedHours = require('wmt-probation-rules').DefaultContractedHours
const archiveOptions = require('../constants/archive-options')

module.exports = function (archiveOption, archiveDateRange) {
  switch(archiveOption) {
    case archiveOptions.DAILY:
      return getDailyArchive(archiveDateRange).then(function (results) {
        return calculateCapacity(results)
      })
      break
    case archiveOptions.FORTNIGHTLY:
      return getFortnightlyArchive(archiveDateRange).then(function (results) {
        return calculateCapacity(results)
      })
      break
    case archiveOptions.REDUCTIONS:
      return getReductionArchive(archiveDateRange)
      break
  }
}



var calculateCapacity = function (results) {
  results.forEach(function (result) {
    if (result.contractedHours === 0) {
      result.capacity = '0.00%'
    } else {
      let defaultContractedHours = new DefaultContractedHours(37.5, 37.5, 37.5)
      let availablePoints = calculateAvailablePoints(result.nominalTarget, result.omTypeId, result.contractedHours, result.hoursReduction, defaultContractedHours)
      let acquiredPoints = calculateAcquiredPoints(result.totalPoints, result.sdrPoints, result.sdrConversionPoints, result.paromsPoints)
      result.capacity = parseFloat((acquiredPoints / availablePoints) * 100).toFixed(2) + '%'
    }
  })
  return results
}

var calculateAcquiredPoints = function (totalPoints, sdrPoints, sdrConversionPoints, paromsPoints) {
  return totalPoints + sdrPoints + sdrConversionPoints + paromsPoints
}
