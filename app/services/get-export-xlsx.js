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
const tiersPerType = 8

module.exports = function (caseData, t2aCaseData, scenarioData) {
  var wb = new excel.Workbook()
  var ws = wb.addWorksheet('Sheet 1', {
    'sheetFormat': {
      'defaultColWidth': 8
    }
  })
  var styles = createStyles(wb)

  mergeCells(ws, styles.caseStyle)
  var start = 22
  var additionalHeading = ''
  setCaseHeaders(ws, start, styles, additionalHeading)
  start = 118
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
  ws.column(21).freeze()
  ws.column(21).setWidth(8)
  ws.column(1).setWidth(20)
  setRowHeights(ws)
  return wb
}

var setReportHeaders = function (ws, styles) {
  var start = 214
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
  ws.cell(1, 22, 1, 117, true).string('Cases').style(caseStyle)
  ws.cell(1, 118, 1, 213, true).string('T2A Cases').style(caseStyle)
  ws.cell(1, 214, 1, 218, true).string('Reports').style(caseStyle)
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
  for (i = 22; i < 214; i = i + typeTierGroupLength) {
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
    start = 118
  } else {
    start = 22
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
  var styleToApply = determineStyles.determineWeightingStyle(214, styles)
  ws.cell(4, 214).number(points['sdr']).style(styleToApply)
  ws.cell(4, 215).number(points['sdrConversion']).style(styleToApply)
  ws.cell(4, 216).number(points['parom']).style(styleToApply)
  ws.cell(4, 217).number(points['weightingArmsCommunity'] * armsCommMultiplier).style(styleToApply)
  ws.cell(4, 218).number(points['weightingArmsLicense'] * armsLicMultiplier).style(styleToApply)
}

var setRowHeights = function (ws) {
  ws.row(3).setHeight(75)
}
