const calculatePercentage = require('./percentage-calculator').calculatePercentage
const totalsRounder = require('./totals-rounder')

module.exports = function (results, isCSV) {
  var totals = { name: 'Total / Average', totalCapacityPercentage: 0, totalPoints: 0, totalAvailablePoints: 0, totalContractedHours: 0, totalReduction: 0, totalTotalCases: 0, totalRemainingPoints: 0, totalCMSPoints: 0, totalCMSPercentage: 0 }
  var totalsToReturn = {}
  if (results.length !== undefined) {
    results.forEach(function (result) {
      result.remainingPoints = result.availablePoints - result.totalPoints
      result.capacityPercentage = calculatePercentage(result.totalPoints, result.availablePoints)
      result.cmsPercentage = calculatePercentage(result.cmsAdjustmentPoints, result.totalPoints)
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
      totals.totalCMSPercentage = calculatePercentage(totals.totalCMSPoints, totals.totalPoints)
      totalsToReturn.push(totals)
    }
  } else {
    var capacityPercentage = calculatePercentage(results.totalPoints, results.availablePoints)
    totalsToReturn = Object.assign({}, results, {capacity: capacityPercentage})
  }
  return totalsToReturn
}
