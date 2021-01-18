
const dateFormatter = require('../date-formatter')
const reductionStatusType = require('../../constants/reduction-status-type')

module.exports.getReductionsByStatus = function (reductions) {
  const active = []
  const scheduled = []
  const archived = []

  if (reductions instanceof Array) {
    reductions.filter(function (reduction) {
      if (reduction.status === reductionStatusType.ACTIVE) {
        active.push(reduction)
      } else if (reduction.status === reductionStatusType.SCHEDULED) {
        scheduled.push(reduction)
      } else if (reduction.status === reductionStatusType.ARCHIVED) {
        archived.push(reduction)
      }
      return formatReductionDates(reduction)
    })
  }

  const reductionsByStatus = {
    activeReductions: active,
    scheduledReductions: scheduled,
    archivedReductions: archived
  }
  return reductionsByStatus
}

const formatReductionDates = function (reduction) {
  reduction.reductionStartDate = dateFormatter.formatDate(reduction.reductionStartDate, 'DD MMM YY')
  reduction.reductionEndDate = dateFormatter.formatDate(reduction.reductionEndDate, 'DD MMM YY')
}
