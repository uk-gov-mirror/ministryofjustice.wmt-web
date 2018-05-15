const getDailyArchive = require('./data/get-daily-archive')
const getFortnightlyArchive = require('./data/get-fortnightly-archive')
const getReductionArchive = require('./data/get-reduction-archive')
const calculateAvailablePoints = require('wmt-probation-rules').calculateAvailablePoints
const DefaultContractedHours = require('wmt-probation-rules').DefaultContractedHours
const archiveOptions = require('../constants/archive-options')

module.exports = function (archiveOption, archiveDateRange, extraCriteria) {
  if (archiveOption === archiveOptions.DAILY) {
    return getDailyArchive(archiveDateRange, extraCriteria).then(function (results) {
      return calculateCapacity(results)
    })
  } else if (archiveOption === archiveOptions.FORTNIGHTLY) {
    return getFortnightlyArchive(archiveDateRange, extraCriteria).then(function (results) {
      return calculateCapacity(results)
    })
  } else {
    return getReductionArchive(archiveDateRange, extraCriteria)
  }
}

var calculateCapacity = function (results) {
  results.forEach(function (result) {
    if (result.contractedHours === 0 || result.contractedHours === null) {
      result.capacity = '0%'
    } else {
      let defaultContractedHours = new DefaultContractedHours(37.5, 37.5, 37.5)
      let availablePoints = calculateAvailablePoints(result.nominalTarget, result.omTypeId, result.contractedHours, result.hoursReduction, defaultContractedHours)
      let acquiredPoints = calculateAcquiredPoints(result.totalPoints, result.sdrPoints, result.sdrConversionPoints, result.paromsPoints)
      result.capacity = Number(parseFloat((acquiredPoints / availablePoints) * 100).toFixed(1)) + '%'
    }
  })
  return results
}

var calculateAcquiredPoints = function (totalPoints, sdrPoints, sdrConversionPoints, paromsPoints) {
  return totalPoints + sdrPoints + sdrConversionPoints + paromsPoints
}
