
var dateFormatter = require('../date-formatter')

module.exports.getReductionsByStatus = function (reductions) {
  var active = []
  var scheduled = []
  var archived = []
  var currentDate = new Date()
  reductions.filter(function (reduction) {
    if ((reduction.status !== 'ARCHIVED') && (reduction.status !== 'DELETED') &&
        (currentDate.getTime() > reduction.reductionStartDate.getTime()) &&
        (currentDate.getTime() < reduction.reductionEndDate.getTime())) {
      active.push(reduction)
    } else if ((reduction.status !== 'ARCHIVED') && (reduction.status !== 'DELETED') &&
      (currentDate.getTime() < reduction.reductionStartDate.getTime())) {
      scheduled.push(reduction)
    } else if (reduction.status === 'ARCHIVED') {
      archived.push(reduction)
    }
    formatReductionDates(reduction)
  })

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
