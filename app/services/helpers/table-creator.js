const DisplayTable = require('../domain/display-table')
const capacityCalculator = require('../helpers/capacity-calculator')

module.exports.createCapacityTable = function (id, rowLabel, capacityDateRange, workloadReports) {
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
    capacityPercentageRow.values.push(customRound(capacity['capacity_percentage']))
    reductionRow.values.push(capacity['reductions'])
    reductionPercentageRow.values.push(customRound(capacity['reduction_percentage']))
  })

  rows.push(capacityPercentageRow)
  rows.push(reductionRow)
  rows.push(reductionPercentageRow)

  return new DisplayTable(headings, rows)
}

function customRound(number) {
	let decimal = number % 1;
	if(decimal < 0.6 && decimal >= 0.5) {
		number = Math.floor(number);
	} else {
		number = Math.round(number);
	}
	return number;
}