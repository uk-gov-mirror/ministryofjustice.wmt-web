const expect = require('chai').expect
const getExportXlsx = require('../../../app/services/get-export-xlsx')
const groupScenarioData = require('../../../app/services/helpers/group-scenario-data')
const rawScenarioData = require('../../helpers/data/raw-scenario-data')
const workloadPointsConfig = require('../../helpers/data/xlsx-test-data/workload-points-config')

const workloadPointsKeys = Object.keys(workloadPointsConfig.workloadPointsConfig)
const t2aWorkloadPointsKeys = Object.keys(workloadPointsConfig.t2aWorkloadPointsConfig)
let scenarioObjects
let workbook
let ws
const xlsxForumlas = require('../../helpers/data/xlsx-test-data/xlsx-formulas')

describe('services/get-export-xlsx', function () {
  describe('should create a scenario spreadsheet', function () {
    before(function () {
      scenarioObjects = groupScenarioData(rawScenarioData)
      workbook = getExportXlsx(workloadPointsConfig.workloadPointsConfig, workloadPointsConfig.t2aWorkloadPointsConfig, scenarioObjects)
      ws = workbook.sheets[0]
    })

    it('with the correct workload points configuration for t2a and non-t2a', function () {
      let columnNo = 26

      workloadPointsTester(workloadPointsConfig.workloadPointsConfig, workloadPointsKeys, columnNo)
      columnNo = 158
      workloadPointsTester(workloadPointsConfig.t2aWorkloadPointsConfig, t2aWorkloadPointsKeys, columnNo)
    })

    it('with the correct totals for each tier', function () {
      let rowStart = 5
      let columnStart = 26
      const tiersPerType = 11
      const typeTierGroupLength = 4

      scenarioObjects.forEach(function (scenarioObject) {
        let casesForThisTier = scenarioObject.communityCaseNumbers.filter(thisCase => thisCase.tier === 0)
        casesForThisTier = casesForThisTier[0]
        caseTotalsTester(rowStart, columnStart, casesForThisTier, false)
        columnStart = columnStart + typeTierGroupLength

        for (let i = tiersPerType - 1; i >= tiersPerType - 3; i--) {
          casesForThisTier = scenarioObject.communityCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, false)
          columnStart = columnStart + typeTierGroupLength
        }
        for (let i = 1; i < tiersPerType - 3; i++) {
          casesForThisTier = scenarioObject.communityCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, false)
          columnStart = columnStart + typeTierGroupLength
        }

        casesForThisTier = scenarioObject.licenceCaseNumbers.filter(thisCase => thisCase.tier === 0)
        casesForThisTier = casesForThisTier[0]
        caseTotalsTester(rowStart, columnStart, casesForThisTier, false)
        columnStart = columnStart + typeTierGroupLength

        for (let i = tiersPerType - 1; i >= tiersPerType - 3; i--) {
          casesForThisTier = scenarioObject.licenceCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, false)
          columnStart = columnStart + typeTierGroupLength
        }
        for (let i = 1; i < tiersPerType - 3; i++) {
          casesForThisTier = scenarioObject.licenceCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, false)
          columnStart = columnStart + typeTierGroupLength
        }

        casesForThisTier = scenarioObject.custodyCaseNumbers.filter(thisCase => thisCase.tier === 0)
        casesForThisTier = casesForThisTier[0]
        caseTotalsTester(rowStart, columnStart, casesForThisTier, false)
        columnStart = columnStart + typeTierGroupLength

        for (let i = tiersPerType - 1; i >= tiersPerType - 3; i--) {
          casesForThisTier = scenarioObject.custodyCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, false)
          columnStart = columnStart + typeTierGroupLength
        }
        for (let i = 1; i < tiersPerType - 3; i++) {
          casesForThisTier = scenarioObject.custodyCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, false)
          columnStart = columnStart + typeTierGroupLength
        }

        // t2a
        casesForThisTier = scenarioObject.communityCaseNumbers.filter(thisCase => thisCase.tier === 0)
        casesForThisTier = casesForThisTier[0]
        caseTotalsTester(rowStart, columnStart, casesForThisTier, true)
        columnStart = columnStart + typeTierGroupLength

        for (let i = tiersPerType - 1; i >= tiersPerType - 3; i--) {
          casesForThisTier = scenarioObject.communityCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, true)
          columnStart = columnStart + typeTierGroupLength
        }
        for (let i = 1; i < tiersPerType - 3; i++) {
          casesForThisTier = scenarioObject.communityCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, true)
          columnStart = columnStart + typeTierGroupLength
        }

        casesForThisTier = scenarioObject.licenceCaseNumbers.filter(thisCase => thisCase.tier === 0)
        casesForThisTier = casesForThisTier[0]
        caseTotalsTester(rowStart, columnStart, casesForThisTier, true)
        columnStart = columnStart + typeTierGroupLength

        for (let i = tiersPerType - 1; i >= tiersPerType - 3; i--) {
          casesForThisTier = scenarioObject.licenceCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, true)
          columnStart = columnStart + typeTierGroupLength
        }
        for (let i = 1; i < tiersPerType - 3; i++) {
          casesForThisTier = scenarioObject.licenceCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, true)
          columnStart = columnStart + typeTierGroupLength
        }

        casesForThisTier = scenarioObject.custodyCaseNumbers.filter(thisCase => thisCase.tier === 0)
        casesForThisTier = casesForThisTier[0]
        caseTotalsTester(rowStart, columnStart, casesForThisTier, true)
        columnStart = columnStart + typeTierGroupLength

        for (let i = tiersPerType - 1; i >= tiersPerType - 3; i--) {
          casesForThisTier = scenarioObject.custodyCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, true)
          columnStart = columnStart + typeTierGroupLength
        }
        for (let i = 1; i < tiersPerType - 3; i++) {
          casesForThisTier = scenarioObject.custodyCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, true)
          columnStart = columnStart + typeTierGroupLength
        }
        rowStart++
        columnStart = 26
      })
    })

    it('with the correct names', function () {
      expect(getCellString(5, 4)).to.eql(scenarioObjects[0].name)
      expect(getCellString(6, 4)).to.eql(scenarioObjects[1].name)
    })

    it('with the correct grades', function () {
      expect(getCellString(5, 5)).to.eql(scenarioObjects[0].grade)
      expect(getCellString(6, 5)).to.eql(scenarioObjects[1].grade)
    })

    it('with the correct total points formulas', function () {
      expect(getCellFormula(5, 20)).to.eql(xlsxForumlas.totalPointsFormula1)
      expect(getCellFormula(5, 21)).to.eql(xlsxForumlas.totalPointsFormulaT2A1)
      expect(getCellFormula(6, 20)).to.eql(xlsxForumlas.totalPointsFormula2)
      expect(getCellFormula(6, 21)).to.eql(xlsxForumlas.totalPointsFormulaT2A2)
    })

    it('with the correct total cases formulas', function () {
      expect(getCellFormula(5, 6)).to.eql(xlsxForumlas.totalCasesForumula1)
      expect(getCellFormula(6, 6)).to.eql(xlsxForumlas.totalCasesForumula2)
    })

    it('with the correct cms % formulas', function () {
      expect(getCellFormula(5, 12)).to.eql(xlsxForumlas.cmsFormula1)
      expect(getCellFormula(6, 12)).to.eql(xlsxForumlas.cmsFormula2)
    })

    it('with the correct gs % formulas', function () {
      expect(getCellFormula(5, 14)).to.eql(xlsxForumlas.gsFormula1)
      expect(getCellFormula(6, 14)).to.eql(xlsxForumlas.gsFormula2)
    })

    it('with the correct sdr formulas', function () {
      expect(getCellFormula(5, 15)).to.eql(xlsxForumlas.sdrFormula1)
      expect(getCellFormula(6, 15)).to.eql(xlsxForumlas.sdrFormula2)
    })

    it('with the correct fdr formulas', function () {
      expect(getCellFormula(5, 16)).to.eql(xlsxForumlas.fdrFormula1)
      expect(getCellFormula(6, 16)).to.eql(xlsxForumlas.fdrFormula2)
    })

    it('with the correct parom formulas', function () {
      expect(getCellFormula(5, 17)).to.eql(xlsxForumlas.paromFormula1)
      expect(getCellFormula(6, 17)).to.eql(xlsxForumlas.paromFormula2)
    })

    it('with the correct ARMS community formulas', function () {
      expect(getCellFormula(5, 18)).to.eql(xlsxForumlas.armsCommFormula1)
      expect(getCellFormula(6, 18)).to.eql(xlsxForumlas.armsCommFormula2)
    })

    it('with the correct ARMS licence formulas', function () {
      expect(getCellFormula(5, 19)).to.eql(xlsxForumlas.armsLicForumula1)
      expect(getCellFormula(6, 19)).to.eql(xlsxForumlas.armsLicForumula2)
    })

    it('with the correct Overall Total Points formulas', function () {
      expect(getCellFormula(5, 22)).to.eql(xlsxForumlas.overallTotalPointsFormula1)
      expect(getCellFormula(6, 22)).to.eql(xlsxForumlas.overallTotalPointsFormula2)
    })

    it('with the correct Available Points formulas', function () {
      expect(getCellFormula(5, 23)).to.eql(xlsxForumlas.availablePointsFormula1)
      expect(getCellFormula(6, 23)).to.eql(xlsxForumlas.availablePointsFormula2)
    })

    it('with the correct Remaining Points formulas', function () {
      expect(getCellFormula(5, 24)).to.eql(xlsxForumlas.remainingPointsFormula1)
      expect(getCellFormula(6, 24)).to.eql(xlsxForumlas.remainingPointsFormula2)
    })

    it('with the correct Capacity formulas', function () {
      expect(getCellFormula(5, 25)).to.eql(xlsxForumlas.capacityFormula1)
      expect(getCellFormula(6, 25)).to.eql(xlsxForumlas.capacityFormula2)
    })
  })
})

const workloadPointsTester = function (arrayToTest, keysToTest, columnNo) {
  const rowNo = 4
  let arrayIndex = 0
  for (let i = 0; i < 33; i++) {
    if (i % 11 !== 0) {
      expect(getCellValue(rowNo, columnNo)).to.eql(arrayToTest[keysToTest[arrayIndex]])
      expect(getCellValue(rowNo, columnNo + 1)).to.eql(0)
      expect(getCellValue(rowNo, columnNo + 2)).to.eql(0)
      expect(getCellValue(rowNo, columnNo + 3)).to.eql(0)
      arrayIndex++
    } else {
      expect(getCellValue(rowNo, columnNo)).to.eql(0)
      expect(getCellValue(rowNo, columnNo + 1)).to.eql(0)
      expect(getCellValue(rowNo, columnNo + 2)).to.eql(0)
      expect(getCellValue(rowNo, columnNo + 3)).to.eql(0)
    }
    columnNo = columnNo + 4
  }
}

const getCellValue = function (rowNo, columnNo) {
  const cell = ws.cell(rowNo, columnNo)
  const thisCell = ws.cells[cell.excelRefs[0]]
  return thisCell.v
}

const getCellFormula = function (rowNo, columnNo) {
  const cell = ws.cell(rowNo, columnNo)
  const thisCell = ws.cells[cell.excelRefs[0]]
  return thisCell.f
}

const getCellString = function (rowNo, columnNo) {
  const cell = ws.cell(rowNo, columnNo)
  const thisCell = ws.cells[cell.excelRefs[0]]
  return workbook.sharedStrings[thisCell.v]
}
const caseTotalsTester = function (rowStart, columnStart, casesForThisTier, t2a) {
  if (t2a) {
    expect(getCellValue(rowStart, columnStart)).to.eql(casesForThisTier.t2aTotalCases)
    expect(getCellValue(rowStart, columnStart + 1)).to.eql(casesForThisTier.t2aWarrantsTotal)
    expect(getCellValue(rowStart, columnStart + 2)).to.eql(casesForThisTier.t2aUPW)
    expect(getCellValue(rowStart, columnStart + 3)).to.eql(casesForThisTier.t2aOverdueTerminationsTotal)
  } else {
    expect(getCellValue(rowStart, columnStart)).to.eql(casesForThisTier.totalCases)
    expect(getCellValue(rowStart, columnStart + 1)).to.eql(casesForThisTier.warrantsTotal)
    expect(getCellValue(rowStart, columnStart + 2)).to.eql(casesForThisTier.UPW)
    expect(getCellValue(rowStart, columnStart + 3)).to.eql(casesForThisTier.overdueTerminationsTotal)
  }
}
