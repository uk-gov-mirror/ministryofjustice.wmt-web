const workloadTypes = require('../../../app/constants/workload-type')

module.exports.validate = function (workloadType) {
  const validWorkloadTypes = [
    workloadTypes.COURT_REPORTS,
    workloadTypes.PROBATION,
    workloadTypes.OMIC
  ]

  if (!validWorkloadTypes.includes(workloadType)) {
    throw new Error(workloadType + ' is not a valid workload type')
  }
}
