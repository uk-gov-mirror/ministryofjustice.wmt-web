const excel = require('excel4node')
const caseHeaders = require('../constants/excel-headings').caseHeaders
const nameHeaders = require('../constants/excel-headings').nameHeaders
const reportHeaders = require('../constants/excel-headings').reportHeaders
const caseTypeHeaders = require('../constants/excel-headings').caseTypeHeaders
const inputScenarioCaseData = require('./excel/input-scenario-case-data')
const createStyles = require('./helpers/create-styles')
const determineStyles = require('./helpers/determine-styles')
const armsCommMultiplier = require('../../config').ARMS_COMMUNITY_MULTIPLIER
const armsLicMultiplier = require('../../config').ARMS_LICENCE_MULTIPLIER
const typeTierGroupLength = 4 // the number of fields for each tier and type of case
const tiersPerType = 17
const casesColumnStart = 26
const t2aCasesColumnStart = casesColumnStart + (tiersPerType * typeTierGroupLength * 3)
const numberOfReportColumns = 5
const reportColumnStart = t2aCasesColumnStart + (tiersPerType * typeTierGroupLength * 3)

module.exports = function (caseData, t2aCaseData, scenarioData) {
  const wb = new excel.Workbook()
  const ws = wb.addWorksheet('Sheet 1', {
    sheetFormat: {
      defaultColWidth: 8
    }
  })
  const styles = createStyles(wb)

  mergeCells(ws, styles.caseStyle)
  let start = casesColumnStart
  let additionalHeading = ''
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
  ws.column(25).setWidth(8)
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

const setReportHeaders = function (ws, styles) {
  let start = reportColumnStart
  let count = 0
  while (count < reportHeaders.length) {
    const styleToApply = determineStyles.determineWeightingStyle(start, styles)
    ws.cell(2, start).style(styleToApply)
    ws.cell(3, start).string(reportHeaders[count]).style(styleToApply)
    count = count + 1
    start = start + 1
  }
}

const mergeCells = function (ws, caseStyle) {
  ws.cell(1, casesColumnStart, 1, t2aCasesColumnStart - 1, true).string('Cases').style(caseStyle)
  ws.cell(1, t2aCasesColumnStart, 1, reportColumnStart - 1, true).string('T2A Cases').style(caseStyle)
  ws.cell(1, reportColumnStart, 1, reportColumnStart + numberOfReportColumns - 1, true).string('Reports').style(caseStyle)
}

const setCaseHeaders = function (ws, start, styles, additionalHeading) {
  let count = 0
  while (count < caseHeaders.length) {
    const completeHeader = additionalHeading + caseHeaders[count]
    const styleToApply = determineStyles.determineCaseStyle(completeHeader, styles)
    ws.cell(2, start, 2, start + 3, true).string(completeHeader).style(styleToApply)
    count = count + 1
    start = start + typeTierGroupLength
  }
}

const setHeaders = function (ws, nameHeadersStyle) {
  let i
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

const setCaseTypeHeaders = function (ws, styles) {
  const count = 0
  let i
  for (i = casesColumnStart; i < reportColumnStart; i = i + typeTierGroupLength) {
    const styleToApply = determineStyles.determineWeightingStyle(i, styles)
    ws.cell(3, i).string(caseTypeHeaders[count]).style(styleToApply)
    ws.cell(3, i + 1).string(caseTypeHeaders[count + 1]).style(styleToApply)
    ws.cell(3, i + 2).string(caseTypeHeaders[count + 2]).style(styleToApply)
    ws.cell(3, i + 3).string(caseTypeHeaders[count + 3]).style(styleToApply)
  }
}

const setTierWeightings = function (ws, styles, points) {
  const keys = Object.keys(points)
  let start
  if (points.isT2A) {
    start = t2aCasesColumnStart
  } else {
    start = casesColumnStart
  }
  let count = 0
  let i
  for (i = 0; i < (tiersPerType * 3); i++) {
    const styleToApply = determineStyles.determineWeightingStyle(start, styles)
    switch (i % tiersPerType) {
      case 0:
        ws.cell(4, start).number(0).style(styleToApply)
        ws.cell(4, start + 1).number(0).style(styleToApply)
        ws.cell(4, start + 2).number(0).style(styleToApply)
        ws.cell(4, start + 3).number(0).style(styleToApply)
        break
      default:
        ws.cell(4, start).number(points[keys[count]]).style(styleToApply)
        ws.cell(4, start + 1).number(0).style(styleToApply)
        ws.cell(4, start + 2).number(0).style(styleToApply)
        ws.cell(4, start + 3).number(0).style(styleToApply)
        count = count + 1
        break
    }
    start = start + typeTierGroupLength
  }
}

const setReportWeightings = function (ws, styles, points) {
  const styleToApply = determineStyles.determineWeightingStyle(reportColumnStart, styles)
  ws.cell(4, reportColumnStart).number(points.sdr).style(styleToApply)
  ws.cell(4, reportColumnStart + 1).number(points.sdrConversion).style(styleToApply)
  ws.cell(4, reportColumnStart + 2).number(points.parom).style(styleToApply)
  ws.cell(4, reportColumnStart + 3).number(points.weightingArmsCommunity * armsCommMultiplier).style(styleToApply)
  ws.cell(4, reportColumnStart + 4).number(points.weightingArmsLicense * armsLicMultiplier).style(styleToApply)
}

const setRowHeights = function (ws) {
  ws.row(3).setHeight(75)
}
