const excel = require('excel4node')
const caseHeaders = require('../constants/excel-headings').caseHeaders
const nameHeaders = require('../constants/excel-headings').nameHeaders
const reportHeaders = require('../constants/excel-headings').reportHeaders
const caseTypeHeaders = require('../constants/excel-headings').caseTypeHeaders
const armsCommMultiplier = 4
const armsLicMultiplier = 2

module.exports = function (caseData, t2aCaseData) {
  var wb = new excel.Workbook()
  var ws = wb.addWorksheet('Sheet 1')
  var caseStyle = wb.createStyle({
    alignment: {
      horizontal: 'center'
    },
    font: {
      size: 12,
    }
  })

  mergeCells(ws, caseStyle)
  var start = 22
  setCaseHeaders(ws, start, caseStyle)
  start = 118
  setCaseHeaders(ws, start, caseStyle)
  setReportHeaders(ws, caseStyle)
  setHeaders(ws)
  setCaseTypeHeaders(ws, caseStyle)
  setTierWeightings(ws, caseStyle, caseData)
  setTierWeightings(ws, caseStyle, t2aCaseData)
  setReportWeightings(ws, caseStyle, caseData)
  return wb
}

var setReportHeaders = function(ws, caseStyle) {
  var start = 214
  var count = 0
  while (count < reportHeaders.length) {
    ws.cell(3, start).string(reportHeaders[count]).style(caseStyle)
    count = count + 1
    start = start + 1
  }
}

var mergeCells = function(ws, caseStyle) {
  ws.cell(1, 22, 1, 117, true).string('Cases').style(caseStyle)
  ws.cell(1, 118, 1, 213, true).string('T2A Cases').style(caseStyle)
  ws.cell(1, 214, 1, 218, true).string('Reports').style(caseStyle)
}

var setCaseHeaders = function(ws, start, caseStyle) {
  var count = 0
  while (count < caseHeaders.length) {
    ws.cell(2, start, 2, start + 3, true).string(caseHeaders[count]).style(caseStyle)
    count = count + 1
    start = start + 4
  }
}

var setHeaders = function(ws) {
  for (i = 0; i < nameHeaders.length; i++) {
    ws.cell(3, i + 1 )
    .string(nameHeaders[i])
  }
}

var setCaseTypeHeaders = function(ws, caseStyle) {
  var count = 0
  for (i = 22; i < 214; i = i + 4) {
    ws.cell(3, i).string(caseTypeHeaders[count]).style(caseStyle)
    ws.cell(3, i + 1).string(caseTypeHeaders[count + 1]).style(caseStyle)
    ws.cell(3, i + 2).string(caseTypeHeaders[count + 2]).style(caseStyle)
    ws.cell(3, i + 3).string(caseTypeHeaders[count + 3]).style(caseStyle)
  }
}

var setTierWeightings = function(ws, caseStyle, points) {
  var keys = Object.keys(points)
  var start
  if (points['isT2A']) {
    start = 118
  } else {
    start = 22
  }
  var count = 0
  for (i = 0; i < 24; i++){
    switch(i % 8) {
      case 0:
        ws.cell(4, start).number(0).style(caseStyle)
        ws.cell(4, start + 1).number(0).style(caseStyle)
        ws.cell(4, start + 2).number(0).style(caseStyle)
        ws.cell(4, start + 3).number(0).style(caseStyle)
        break
      default:
        ws.cell(4, start).number(points[keys[count]]).style(caseStyle)
        ws.cell(4, start + 1).number(0 - points[keys[count]]).style(caseStyle)
        ws.cell(4, start + 2).number(0).style(caseStyle)
        ws.cell(4, start + 3).number(0 - points[keys[count]]).style(caseStyle)
        count = count + 1
        break
    }
    start = start + 4
  }
}

var setReportWeightings = function(ws, caseStyle, points) {
  ws.cell(4, 214).number(points['sdr']).style(caseStyle)
  ws.cell(4, 215).number(points['sdrConversion']).style(caseStyle)
  ws.cell(4, 216).number(points['parom']).style(caseStyle)
  ws.cell(4, 217).number(points['weightingArmsCommunity'] * armsCommMultiplier).style(caseStyle)
  ws.cell(4, 218).number(points['weightingArmsLicense'] * armsLicMultiplier).style(caseStyle)
}