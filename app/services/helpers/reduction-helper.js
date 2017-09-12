
var dateFormatter = require('../date-formatter')
var reductionStatusType = require('../../constants/reduction-status-type')

module.exports.getReductionsByStatus = function (reductions) {
  var active = []
  var scheduled = []
  var archived = []
  var currentDate = new Date()
  if (reductions instanceof Array) {
    reductions.filter(function (reduction) {
      if ((reduction.reductionStartDate instanceof Date) &&
        (reduction.reductionEndDate instanceof Date)) {
        if ((reduction.status !== reductionStatusType.ARCHIVED) && (reduction.status !== reductionStatusType.DELETED) &&
          (currentDate.getTime() > reduction.reductionStartDate.getTime()) &&
          (currentDate.getTime() < reduction.reductionEndDate.getTime())) {
          active.push(reduction)
        } else if ((reduction.status !== reductionStatusType.ARCHIVED) && (reduction.status !== reductionStatusType.DELETED) &&
          (currentDate.getTime() < reduction.reductionStartDate.getTime())) {
          scheduled.push(reduction)
        } else if (reduction.status === reductionStatusType.ARCHIVED) {
          archived.push(reduction)
        }
        formatReductionDates(reduction)
      }
    })
  }

  var reductionsByStatus = {
    activeReductions: active,
    scheduledReductions: scheduled,
    archivedReductions: archived
  }
  return reductionsByStatus
}

var formatReductionDates = function (reduction) {
  reduction.reductionStartDate = dateFormatter.formatDate(reduction.reductionStartDate, 'DD MMM YY')
  reduction.reductionEndDate = dateFormatter.formatDate(reduction.reductionEndDate, 'DD MMM YY')
}
