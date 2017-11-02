const json2csv = require('json2csv')

const REDUCTIONS_FIELD_NAMES = ['Offender Manager', 'Reason', 'Hours', 'Start Date', 'End Date', 'Status', 'Additional Notes']
const REDUCTIONS_FIELDS = ['offenderManager', 'reason', 'amount', 'startDate', 'endDate', 'status', 'additionalNotes']

module.exports = function(result) {
    var filename = getFileName(result.title)

    formatDates(result.reductionNotes)

    var csv = generateCsv(result.reductionNotes)
    
    return { filename: filename, csv: csv}
}

// TODO: Do we have an agreed naming scheme they would like for these csvs? Org level? Date?
var getFileName = function (orgName) {
    var replaceSpaces = / /g
    return (orgName + ' Reductions Notes.csv').replace(replaceSpaces, '_')
}

var generateCsv = function(data) {
    return json2csv({ data: data, fields: REDUCTIONS_FIELDS, fieldNames: REDUCTIONS_FIELD_NAMES })
}

var formatDates = function(data) {
    data.forEach(function(record) {
        record.startDate = record.startDate.toString().substring(0, 24)
        record.endDate = record.endDate.toString().substring(0, 24)
    })
}