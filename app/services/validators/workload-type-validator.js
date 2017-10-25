const workloadTypes = require('../../../app/constants/workload-type')

module.exports.validate = function (workloadType) {
  var validWorkloadTypes = [
    workloadTypes.COURT_REPORTS,
    workloadTypes.PROBATION
  ]

  if (!validWorkloadTypes.includes(workloadType)) {
    throw new Error(workloadType + ' is not a valid workload type')
  }
}
