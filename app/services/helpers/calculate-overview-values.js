const calculatePercentage = require('./percentage-calculator').calculatePercentage
const totalsRounder = require('./totals-rounder')

module.exports = function (results, isCSV) {
  var totals = { name: 'Total / Average', totalCapacityPercentage: 0, totalCovidCapacityPercentage: 0, totalPoints: 0, totalCovidPoints: 0, totalAvailablePoints: 0, totalContractedHours: 0, totalReduction: 0, totalTotalCases: 0, totalRemainingPoints: 0, totalCovidRemainingPoints: 0, totalCMSPoints: 0, totalCMSPercentage: 0 }
  var totalsToReturn = {}
  if (results.length !== undefined) {
    results.forEach(function (result) {
      result.remainingPoints = result.availablePoints - result.totalPoints
      result.covidRemainingPoints = result.availablePoints - result.totalCovidPoints
      result.capacityPercentage = calculatePercentage(result.totalPoints, result.availablePoints)
      result.covidCapacityPercentage = calculatePercentage(result.totalCovidPoints, result.availablePoints)
      result.cmsPercentage = calculatePercentage(result.cmsAdjustmentPoints, result.availablePoints)
    })
    totalsToReturn = results
    if (!isCSV) {
      totalsToReturn.forEach(function (val, key) {
        totals.totalPoints += val.totalPoints
        totals.totalCovidPoints += val.totalCovidPoints
        totals.totalAvailablePoints += val.availablePoints
        totals.totalContractedHours += val.contractedHours
        totals.totalReduction += val.reductionHours
        totals.totalTotalCases += val.totalCases
        totals.totalRemainingPoints += val.remainingPoints
        totals.totalCovidRemainingPoints += val.covidRemainingPoints
        totals.totalCMSPoints += val.cmsAdjustmentPoints
      })
      totals = totalsRounder(totals)
      totals.totalCapacityPercentage = calculatePercentage(totals.totalPoints, totals.totalAvailablePoints)
      totals.totalCovidCapacityPercentage = calculatePercentage(totals.totalCovidPoints, totals.totalAvailablePoints)
      totals.totalCMSPercentage = calculatePercentage(totals.totalCMSPoints, totals.totalAvailablePoints)
      totalsToReturn.push(totals)
    }
  } else {
    var capacityPercentage = calculatePercentage(results.totalPoints, results.availablePoints)
    var covidCapacityPercentage = calculatePercentage(results.totalCovidPoints, results.availablePoints)
    var cmsPercentage = calculatePercentage(results.cmsAdjustmentPoints, results.availablePoints)
    totalsToReturn = Object.assign({}, results, {capacity: capacityPercentage, cmsPercentage: cmsPercentage, covidCapacity: covidCapacityPercentage})
  }
  return totalsToReturn
}
