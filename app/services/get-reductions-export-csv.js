const json2csv = require('json2csv')

const REDUCTIONS_FIELD_NAMES = ['Offender Manager', 'Reason', 'Hours', 'Start Date', 'End Date', 'Status', 'Additional Notes']
const REDUCTIONS_FIELDS = ['offenderManager', 'reason', 'amount', 'startDate', 'endDate', 'status', 'additionalNotes']

module.exports = function(result) {
    var filename = 'ReductionsExports.csv'

    var csv = generateCsv(result)

    return { filename: filename, csv: csv}
}

var generateCsv = function(data) {
    return json2csv({ data: data, fields: REDUCTIONS_FIELDS, fieldNames: REDUCTIONS_FIELD_NAMES })
}