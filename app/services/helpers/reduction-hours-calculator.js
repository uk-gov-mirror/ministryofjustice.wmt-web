module.exports = function (reductionReasonsQueryResults, woContractedHours) {
  var reasonsWithHours = []

  var reasonUpdatedWithHours
  for (var reason in reductionReasonsQueryResults) {
    reasonUpdatedWithHours = Object.assign({}, reductionReasonsQueryResults[reason], {
      allowance_hours: calculateHours(woContractedHours, reductionReasonsQueryResults[reason].allowance_percentage),
      max_allowance_hours: calculateHours(woContractedHours, reductionReasonsQueryResults[reason].max_allowance_percentage)
    })
    reasonsWithHours.push(reasonUpdatedWithHours)
  }
  return reasonsWithHours
}

var calculateHours = function (woContractedHours, percentage) {
  if (percentage === undefined) {
    return undefined
  } else {
    return (woContractedHours / 100) * percentage
  }
}
