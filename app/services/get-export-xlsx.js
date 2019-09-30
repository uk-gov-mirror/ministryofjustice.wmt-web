const excel = require('excel4node')
const caseHeaders = require('../constants/excel-headings').caseHeaders
const nameHeaders = require('../constants/excel-headings').nameHeaders
const reportHeaders = require('../constants/excel-headings').reportHeaders
const caseTypeHeaders = require('../constants/excel-headings').caseTypeHeaders
const inputScenarioCaseData = require('./excel/input-scenario-case-data')
const createStyles = require('./helpers/create-styles')
const determineStyles = require('./helpers/determine-styles')
const armsCommMultiplier = 4
const armsLicMultiplier = 2
const typeTierGroupLength = 4 // the number of fields for each tier and type of case
const tiersPerType = 8 // WMT0160: For Licence and Custody only, Community now has 11
const reportColumnStart = 217 // = WMT0160: Increase this due to new tiers
const casesColumnStart = 25
const t2aCasesColumnStart = 121 // WMT0160: Increase this due to new tiers: should now be 133
const numberOfReportColumns = 5

module.exports = function (caseData, t2aCaseData, scenarioData) {
  var wb = new excel.Workbook()
  var ws = wb.addWorksheet('Sheet 1', {
    'sheetFormat': {
      'defaultColWidth': 8
    }
  })
  var styles = createStyles(wb)

  mergeCells(ws, styles.caseStyle)
  var start = casesColumnStart
  var additionalHeading = ''
  setCaseHeaders(ws, start, styles, additionalHeading)
  start = t2aCasesColumnStart
  additionalHeading = 'T2A '
  setCaseHeaders(ws, start, styles, additionalHeading)
  setReportHeaders(ws, styles)
  setHeaders(ws, styles.nameHeadersStyle)
  setCaseTypeHeaders(ws, styles)
  setTierWeightings(ws, styles, caseData)
  setTierWeightings(ws, styles, t2aCaseData)
  setReportWeightings(ws, styles, caseData)
  inputScenarioCaseData(ws, scenarioData, typeTierGroupLength, tiersPerType, styles)
  ws.row(4).freeze()
  ws.column(24).freeze()
  ws.column(24).setWidth(8)
  ws.column(2).setWidth(12)
  ws.column(3).setWidth(12)
  ws.column(4).setWidth(12)
  ws.column(5).setWidth(5)
  ws.column(6).setWidth(5)
  ws.column(11).setWidth(5)
  ws.column(12).setWidth(5)
  ws.column(13).setWidth(5)
  ws.column(14).setWidth(5)
  ws.column(15).setWidth(5)
  ws.column(16).setWidth(5)
  ws.column(17).setWidth(5)
  ws.column(18).setWidth(5)
  ws.column(19).setWidth(5)
  ws.column(20).setWidth(7)
  ws.column(21).setWidth(7)
  setRowHeights(ws)
  return wb
}

var setReportHeaders = function (ws, styles) {
  var start = reportColumnStart
  var count = 0
  while (count < reportHeaders.length) {
    var styleToApply = determineStyles.determineWeightingStyle(start, styles)
    ws.cell(2, start).style(styleToApply)
    ws.cell(3, start).string(reportHeaders[count]).style(styleToApply)
    count = count + 1
    start = start + 1
  }
}

var mergeCells = function (ws, caseStyle) {
  ws.cell(1, casesColumnStart, 1, t2aCasesColumnStart - 1, true).string('Cases').style(caseStyle)
  ws.cell(1, t2aCasesColumnStart, 1, reportColumnStart - 1, true).string('T2A Cases').style(caseStyle)
  ws.cell(1, reportColumnStart, 1, reportColumnStart + numberOfReportColumns - 1, true).string('Reports').style(caseStyle)
}

var setCaseHeaders = function (ws, start, styles, additionalHeading) {
  var count = 0
  while (count < caseHeaders.length) {
    var completeHeader = additionalHeading + caseHeaders[count]
    var styleToApply = determineStyles.determineCaseStyle(completeHeader, styles)
    ws.cell(2, start, 2, start + 3, true).string(completeHeader).style(styleToApply)
    count = count + 1
    start = start + typeTierGroupLength
  }
}

var setHeaders = function (ws, nameHeadersStyle) {
  var i
  for (i = 0; i < nameHeaders.length; i++) {
    ws.cell(2, i + 1)
    .style(nameHeadersStyle)
    ws.cell(4, i + 1)
    .style(nameHeadersStyle)
  }
  for (i = 0; i < nameHeaders.length; i++) {
    ws.cell(3, i + 1)
    .string(nameHeaders[i])
    .style(nameHeadersStyle)
  }
}

var setCaseTypeHeaders = function (ws, styles) {
  var count = 0
  var i
  for (i = casesColumnStart; i < reportColumnStart; i = i + typeTierGroupLength) {
    var styleToApply = determineStyles.determineWeightingStyle(i, styles)
    ws.cell(3, i).string(caseTypeHeaders[count]).style(styleToApply)
    ws.cell(3, i + 1).string(caseTypeHeaders[count + 1]).style(styleToApply)
    ws.cell(3, i + 2).string(caseTypeHeaders[count + 2]).style(styleToApply)
    ws.cell(3, i + 3).string(caseTypeHeaders[count + 3]).style(styleToApply)
  }
}

var setTierWeightings = function (ws, styles, points) {
  var keys = Object.keys(points)
  var start
  if (points['isT2A']) {
    start = t2aCasesColumnStart
  } else {
    start = casesColumnStart
  }
  var count = 0
  var i
  for (i = 0; i < 24; i++) {
    var styleToApply = determineStyles.determineWeightingStyle(start, styles)
    switch (i % 8) {
      case 0:
        ws.cell(4, start).number(0).style(styleToApply)
        ws.cell(4, start + 1).number(0).style(styleToApply)
        ws.cell(4, start + 2).number(0).style(styleToApply)
        ws.cell(4, start + 3).number(0).style(styleToApply)
        break
      default:
        ws.cell(4, start).number(points[keys[count]]).style(styleToApply)
        ws.cell(4, start + 1).number(0 - points[keys[count]]).style(styleToApply)
        ws.cell(4, start + 2).number(0).style(styleToApply)
        ws.cell(4, start + 3).number(0 - points[keys[count]]).style(styleToApply)
        count = count + 1
        break
    }
    start = start + typeTierGroupLength
  }
}

var setReportWeightings = function (ws, styles, points) {
  var styleToApply = determineStyles.determineWeightingStyle(reportColumnStart, styles)
  ws.cell(4, reportColumnStart).number(points['sdr']).style(styleToApply)
  ws.cell(4, reportColumnStart + 1).number(points['sdrConversion']).style(styleToApply)
  ws.cell(4, reportColumnStart + 2).number(points['parom']).style(styleToApply)
  ws.cell(4, reportColumnStart + 3).number(points['weightingArmsCommunity'] * armsCommMultiplier).style(styleToApply)
  ws.cell(4, reportColumnStart + 4).number(points['weightingArmsLicense'] * armsLicMultiplier).style(styleToApply)
}

var setRowHeights = function (ws) {
  ws.row(3).setHeight(75)
}
