module.exports = function (reductionReasonsQueryResults, woContractedHours) {
  const reasonsWithHours = []

  let reasonUpdatedWithHours
  for (const reason in reductionReasonsQueryResults) {
    reasonUpdatedWithHours = Object.assign({}, reductionReasonsQueryResults[reason], {
      allowanceHours: calculateHours(woContractedHours, reductionReasonsQueryResults[reason].allowancePercentage),
      maxAllowanceHours: calculateHours(woContractedHours, reductionReasonsQueryResults[reason].maxAllowancePercentage)
    })
    reasonsWithHours.push(reasonUpdatedWithHours)
  }
  return reasonsWithHours
}

const calculateHours = function (woContractedHours, percentage) {
  let result
  if (percentage === null || percentage === undefined) {
    result = woContractedHours
  } else {
    result = (woContractedHours / 100) * percentage
    result = Number(result.toFixed(2)) // WMT0046 - Fixing issue of result being numbers like 1.1500000000001
    result = Math.min(result, woContractedHours) // WMT0059 - enusring the maximum allowance hours or allowance hours is no greater than the Offender manager's contracted hours
  }
  return result
}
