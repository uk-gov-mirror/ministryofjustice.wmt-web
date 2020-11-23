const calculatePercentage = require('./percentage-calculator').calculatePercentage
const totalsRounder = require('./totals-rounder')

module.exports = function (results, isCSV) {
  let totals = { name: 'Total / Average', totalCapacityPercentage: 0, totalPoints: 0, totalAvailablePoints: 0, totalContractedHours: 0, totalReduction: 0, totalTotalCases: 0, totalRemainingPoints: 0, totalCMSPoints: 0, totalCMSPercentage: 0 }
  let totalsToReturn = {}
  if (!results.noCaseload) {
    if (results.length !== undefined) {
      results.forEach(function (result) {
        result.remainingPoints = result.availablePoints - result.totalPoints
        result.capacityPercentage = calculatePercentage(result.totalPoints, result.availablePoints)
        result.cmsPercentage = calculatePercentage(result.cmsAdjustmentPoints, result.availablePoints)
      })
      totalsToReturn = results
      if (!isCSV) {
        totalsToReturn.forEach(function (val, key) {
          totals.totalPoints += val.totalPoints
          totals.totalAvailablePoints += val.availablePoints
          totals.totalContractedHours += val.contractedHours
          totals.totalReduction += val.reductionHours
          totals.totalTotalCases += val.totalCases
          totals.totalRemainingPoints += val.remainingPoints
          totals.totalCMSPoints += val.cmsAdjustmentPoints
        })
        totals = totalsRounder(totals)
        totals.totalCapacityPercentage = calculatePercentage(totals.totalPoints, totals.totalAvailablePoints)
        totals.totalCMSPercentage = calculatePercentage(totals.totalCMSPoints, totals.totalAvailablePoints)
        totalsToReturn.push(totals)
      }
    } else {
      const capacityPercentage = calculatePercentage(results.totalPoints, results.availablePoints)
      const cmsPercentage = calculatePercentage(results.cmsAdjustmentPoints, results.availablePoints)
      totalsToReturn = Object.assign({}, results, { capacity: capacityPercentage, cmsPercentage: cmsPercentage })
    }
  } else {
    totalsToReturn = Object.assign(results, { availablePoints: 0, totalPoints: 0, cases: 0, cmsAdjustmentPoints: 0, reduction: 0, capacity: 0, cmsPercentage: 0 })
  }
  return totalsToReturn
}
