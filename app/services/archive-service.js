const getArchive = require('./data/get-archive')
const calculateAvailablePoints = require('../../../wmt-probation-rules').calculateAvailablePoints
const DefaultContractedHours = require('../../../wmt-probation-rules').DefaultContractedHours

module.exports = function (archiveDateRange) {
  return getArchive(archiveDateRange).then(function (results) {
    return calculateCapacity(results)
  })
}

var calculateCapacity = function (results) {
  results.forEach(function (result) {
    if (result.reduction === null) {
      result.reduction = 0
    }
    if (result.comments === null) {
      result.comments = ''
    }
    if (result.contractedHours === 0) {
      result.capacity = '0.00%'
    } else {
      let defaultContractedHours = new DefaultContractedHours(37.5, 37.5)
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