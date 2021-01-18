const getDailyArchive = require('./data/get-daily-archive')
const getDailyArchiveFromNewDB = require('./data/get-daily-archive-from-new-db')
const getFortnightlyArchive = require('./data/get-fortnightly-archive')
const getReductionArchive = require('./data/get-reduction-archive')
const getReductionArchiveFromNewDB = require('./data/get-reduction-archive-from-new-db')
const calculateAvailablePoints = require('wmt-probation-rules').calculateAvailablePoints
const DefaultContractedHours = require('wmt-probation-rules').DefaultContractedHours
const archiveOptions = require('../constants/archive-options')
const moment = require('moment')
let archiveDataLimit
const log = require('../logger')

module.exports = function (archiveOption, archiveDateRange, extraCriteria) {
  archiveDataLimit = require('../../config').ARCHIVE_DATA_LIMIT
  if (archiveOption === archiveOptions.DAILY) {
    return getDailyArchive(archiveDateRange, extraCriteria).then(function (results) {
      results = calculateCapacity(results)
      results.forEach(function (result) {
        result.cmsPoints = 'N/A'
        result.gsPoints = 'N/A'
        result.cmsPercentage = 'N/A'
        result.gsPercentage = 'N/A'
        result.cmsColumn = 'N/A'
        result.gsColumn = 'N/A'
        result.armsTotalCases = 'N/A'
      })
      if (results.length < archiveDataLimit) {
        archiveDataLimit = archiveDataLimit - results.length
        return getDailyArchiveFromNewDB(archiveDateRange, extraCriteria, archiveDataLimit).then(function (newResults) {
          newResults.forEach(function (result) {
            result = calculateCapacityCMSAndGS(result)
          })
          const concatenatedResults = results.concat(newResults)
          concatenatedResults.sort(caseloadDataArraySort)
          return concatenatedResults
        })
      } else {
        return results
      }
    })
  } else if (archiveOption === archiveOptions.FORTNIGHTLY) {
    return getFortnightlyArchive(archiveDateRange, extraCriteria).then(function (results) {
      return calculateCapacity(results)
    })
      .catch(function (error) {
        log.error(error)
        throw error
      })
  } else if (archiveOption === archiveOptions.REDUCTIONS) {
    return getReductionArchive(archiveDateRange, extraCriteria).then(function (oldReductions) {
      oldReductions.forEach(function (oldReduction) {
        oldReduction.reductionReason = 'N/A'
        oldReduction.startDate = 'N/A'
        oldReduction.endDate = 'N/A'
        oldReduction.reductionStatus = 'N/A'
      })
      return getReductionArchiveFromNewDB(archiveDateRange, extraCriteria).then(function (newReductions) {
        const results = oldReductions.concat(newReductions)
        results.sort(reductionDataArraySort)
        return formatReductionTo1DP(results)
      })
    })
  } else {
    return getDailyArchiveFromNewDB(archiveDateRange, extraCriteria, archiveDataLimit).then(function (results) {
      results.sort(caseloadDataArraySort)
      results.forEach(function (result) {
        result = calculateCapacityCMSAndGS(result)
      })
      return results
    })
  }
}

const calculateCapacity = function (results) {
  results.forEach(function (result) {
    if (result.contractedHours === 0 || result.contractedHours === null) {
      result.capacity = '0%'
      const defaultContractedHours = new DefaultContractedHours(37.5, 37.5, 37.5)
      const availablePoints = calculateAvailablePoints(result.nominalTarget, result.omTypeId, result.contractedHours, result.hoursReduction, defaultContractedHours)
      const acquiredPoints = calculateAcquiredPoints(result.totalPoints, result.sdrPoints, result.sdrConversionPoints, result.paromsPoints)
      result.totalPoints = acquiredPoints
      result.availablePoints = availablePoints
    } else {
      const defaultContractedHours = new DefaultContractedHours(37.5, 37.5, 37.5)
      const availablePoints = calculateAvailablePoints(result.nominalTarget, result.omTypeId, result.contractedHours, result.hoursReduction, defaultContractedHours)
      const acquiredPoints = calculateAcquiredPoints(result.totalPoints, result.sdrPoints, result.sdrConversionPoints, result.paromsPoints)
      result.totalPoints = acquiredPoints
      result.availablePoints = availablePoints
      if (availablePoints !== 0) {
        result.capacity = capacityCalculation(acquiredPoints, availablePoints)
      } else {
        result.capacity = '0%'
      }
      result.hoursReduction = Number(parseFloat(result.hoursReduction).toFixed(1))
    }
  })
  return results
}

const calculateAcquiredPoints = function (totalPoints, sdrPoints, sdrConversionPoints, paromsPoints) {
  return totalPoints + sdrPoints + sdrConversionPoints + paromsPoints
}

const formatReductionTo1DP = function (results) {
  results.forEach(function (result) {
    result.hoursReduced = Number(parseFloat(result.hoursReduced).toFixed(1))
  })
  return results
}

const capacityCalculation = function (thisTotalPoints, thisAvailablePoints) {
  return Number(parseFloat((thisTotalPoints / thisAvailablePoints) * 100).toFixed(1)) + '%'
}

const caseloadDataArraySort = function (obj1, obj2) {
  const obj1Date = moment(obj1.workloadDate, 'DD-MM-YYYY')
  const obj2Date = moment(obj2.workloadDate, 'DD-MM-YYYY')
  if (obj1Date.isAfter(obj2Date)) {
    return 1
  }
  if (obj1Date.isBefore(obj2Date)) {
    return -1
  }
  return 0
}

const reductionDataArraySort = function (obj1, obj2) {
  const obj1Date = moment(obj1.lastUpdatedDate, 'DD/MM/YYYY')
  const obj2Date = moment(obj2.lastUpdatedDate, 'DD/MM/YYYY')
  if (obj1Date.isAfter(obj2Date)) {
    return 1
  }
  if (obj1Date.isBefore(obj2Date)) {
    return -1
  }
  return 0
}

const calculateCapacityCMSAndGS = function (result) {
  result.capacity = '0%'
  result.cmsColumn = '0 - 0%'
  result.cmsPercentage = '0%'
  result.gsColumn = '0 - 0%'
  result.gsPercentage = '0%'

  if (result.availablePoints) {
    if (result.availablePoints !== 0) {
      result.capacity = capacityCalculation(result.totalPoints, result.availablePoints)
      if (result.cmsPoints) {
        result.cmsPercentage = capacityCalculation(result.cmsPoints, result.availablePoints)
        result.cmsColumn = result.cmsPoints + ' - ' + result.cmsPercentage
      } else {
        result.cmsPoints = 0
      }
    }
  } else {
    result.availablePoints = 0
  }

  if (result.totalPoints) {
    if (result.totalPoints !== 0) {
      if (result.gsPoints) {
        result.gsPercentage = capacityCalculation(result.gsPoints, result.totalPoints)
        result.gsColumn = result.gsPoints + ' - ' + result.gsPercentage
      } else {
        result.gsPoints = 0
      }
    }
  } else {
    result.totalPoints = 0
  }
  return result
}
