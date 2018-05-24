module.exports = function (reductionReasonsQueryResults, woContractedHours) {
  var reasonsWithHours = []

  var reasonUpdatedWithHours
  for (var reason in reductionReasonsQueryResults) {
    reasonUpdatedWithHours = Object.assign({}, reductionReasonsQueryResults[reason], {
      allowanceHours: calculateHours(woContractedHours, reductionReasonsQueryResults[reason].allowancePercentage),
      maxAllowanceHours: calculateHours(woContractedHours, reductionReasonsQueryResults[reason].maxAllowancePercentage)
    })
    reasonsWithHours.push(reasonUpdatedWithHours)
  }
  return reasonsWithHours
}

var calculateHours = function (woContractedHours, percentage) {
  var result
  if (percentage === undefined) {
    result = undefined
  } else {
    result = (woContractedHours / 100) * percentage
    result = Number(result.toFixed(2)) // WMT0046 - Fixing issue of result being numbers like 1.1500000000001
  }
  return result
}
