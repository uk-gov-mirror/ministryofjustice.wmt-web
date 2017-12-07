const DisplayTable = require('../domain/display-table')
const capacityCalculator = require('../helpers/capacity-calculator')
const customRound = require('./custom-round')

module.exports.createCapacityTable = function (id, rowLabel, workloadReports) {
  var headings = []
  var rows = []
  var orgLabel

  if (id !== undefined) {
    orgLabel = rowLabel + ' ' + id
  } else {
    orgLabel = rowLabel
  }

  var capacityPercentageRow = { label: orgLabel + ' Capacity', values: [] }
  var reductionRow = { label: orgLabel + ' Reduction Hours', values: [] }
  var reductionPercentageRow = { label: orgLabel + ' Reduction Hours Percentage', values: [] }

  var capacityResults = capacityCalculator.calculate(workloadReports)
  capacityResults.forEach(function (capacity) {
    headings.push(capacity['workload_report_date'])
    //if(capacity['capacity_percentage'] === Infinity) {
    //  capacityPercentageRow.values.push(customRound(0))
    //} else {
      capacityPercentageRow.values.push(customRound(capacity['capacity_percentage']))
    //}
    reductionRow.values.push(capacity['reductions'])
    //if(capacity['reduction_percentage'] === NaN) {
    //  reductionPercentageRow.values.push(customRound(0))
    //} else {
      reductionPercentageRow.values.push(customRound(capacity['reduction_percentage']))
    //}
  })

  rows.push(capacityPercentageRow)
  rows.push(reductionRow)
  rows.push(reductionPercentageRow)

  return new DisplayTable(headings, rows)
}
