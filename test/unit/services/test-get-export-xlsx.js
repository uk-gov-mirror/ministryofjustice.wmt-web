const expect = require('chai').expect
const getExportXlsx = require('../../../app/services/get-export-xlsx')
const groupScenarioData = require('../../../app/services/helpers/group-scenario-data')
const rawScenarioData = require('../../helpers/data/raw-scenario-data')
const workloadPointsConfig = { commD2: 29, commD1: 41, commC2: 50, commC1: 63, commB2: 102, commB1: 115, commA: 158, licD2: 31, licD1: 43, licC2: 52, licC1: 65, licB2: 119, licB1: 132, licA: 175, cusD2: 13, cusD1: 14, cusC2: 23, cusC1: 24, cusB2: 47, cusB1: 48, cusA: 60, sdr: 138, sdrConversion: 65, parom: 120, weightingArmsCommunity: 69, weightingArmsLicense: 35, isT2A: false }
const t2aWorkloadPointsConfig = { commD2: 13, commD1: 14, commC2: 23, commC1: 24, commB2: 47, commB1: 48, commA: 60, licD2: 13, licD1: 14, licC2: 23, licC1: 24, licB2: 47, licB1: 48, licA: 60, cusD2: 13, cusD1: 14, cusC2: 23, cusC1: 24, cusB2: 47, cusB1: 48, cusA: 60, sdr: 0, sdrConversion: 0, parom: 0, weightingArmsCommunity: 0, weightingArmsLicense: 0, isT2A: true }

var workloadPointsKeys = Object.keys(workloadPointsConfig)
var t2aWorkloadPointsKeys = Object.keys(t2aWorkloadPointsConfig)
var scenarioObjects
var workbook
var ws
const log = require('../../../app/logger')
var totalPointsFormula1 = '=SUM(V4*V5,W4*W5,X4*X5,Y4*Y5,Z4*Z5,AA4*AA5,AB4*AB5,AC4*AC5,AD4*AD5,AE4*AE5,AF4*AF5,AG4*AG5,AH4*AH5,AI4*AI5,AJ4*AJ5,AK4*AK5,AL4*AL5,AM4*AM5,AN4*AN5,AO4*AO5,AP4*AP5,AQ4*AQ5,AR4*AR5,AS4*AS5,AT4*AT5,AU4*AU5,AV4*AV5,AW4*AW5,AX4*AX5,AY4*AY5,AZ4*AZ5,BA4*BA5,BB4*BB5,BC4*BC5,BD4*BD5,BE4*BE5,BF4*BF5,BG4*BG5,BH4*BH5,BI4*BI5,BJ4*BJ5,BK4*BK5,BL4*BL5,BM4*BM5,BN4*BN5,BO4*BO5,BP4*BP5,BQ4*BQ5,BR4*BR5,BS4*BS5,BT4*BT5,BU4*BU5,BV4*BV5,BW4*BW5,BX4*BX5,BY4*BY5,BZ4*BZ5,CA4*CA5,CB4*CB5,CC4*CC5,CD4*CD5,CE4*CE5,CF4*CF5,CG4*CG5,CH4*CH5,CI4*CI5,CJ4*CJ5,CK4*CK5,CL4*CL5,CM4*CM5,CN4*CN5,CO4*CO5,CP4*CP5,CQ4*CQ5,CR4*CR5,CS4*CS5,CT4*CT5,CU4*CU5,CV4*CV5,CW4*CW5,CX4*CX5,CY4*CY5,CZ4*CZ5,DA4*DA5,DB4*DB5,DC4*DC5,DD4*DD5,DE4*DE5,DF4*DF5,DG4*DG5,DH4*DH5,DI4*DI5,DJ4*DJ5,DK4*DK5,DL4*DL5,DM4*DM5,DN4*DN5,DO4*DO5,DP4*DP5,DQ4*DQ5,DR4*DR5,DS4*DS5,DT4*DT5,DU4*DU5,DV4*DV5,DW4*DW5,DX4*DX5,DY4*DY5,DZ4*DZ5,EA4*EA5,EB4*EB5,EC4*EC5,ED4*ED5,EE4*EE5,EF4*EF5,EG4*EG5,EH4*EH5,EI4*EI5,EJ4*EJ5,EK4*EK5,EL4*EL5,EM4*EM5,EN4*EN5,EO4*EO5,EP4*EP5,EQ4*EQ5,ER4*ER5,ES4*ES5,ET4*ET5,EU4*EU5,EV4*EV5,EW4*EW5,EX4*EX5,EY4*EY5,EZ4*EZ5,FA4*FA5,FB4*FB5,FC4*FC5,FD4*FD5,FE4*FE5,FF4*FF5,FG4*FG5,FH4*FH5,FI4*FI5,FJ4*FJ5,FK4*FK5,FL4*FL5,FM4*FM5,FN4*FN5,FO4*FO5,FP4*FP5,FQ4*FQ5,FR4*FR5,FS4*FS5,FT4*FT5,FU4*FU5,FV4*FV5,FW4*FW5,FX4*FX5,FY4*FY5,FZ4*FZ5,GA4*GA5,GB4*GB5,GC4*GC5,GD4*GD5,GE4*GE5,GF4*GF5,GG4*GG5,GH4*GH5,GI4*GI5,GJ4*GJ5,GK4*GK5,GL4*GL5,GM4*GM5,GN4*GN5,GO4*GO5,GP4*GP5,GQ4*GQ5,GR4*GR5,GS4*GS5,GT4*GT5,GU4*GU5,GV4*GV5,GW4*GW5,GX4*GX5,GY4*GY5,GZ4*GZ5,HA4*HA5,HB4*HB5,HC4*HC5,HD4*HD5,HE4*HE5)'
var totalPointsFormula2 = '=SUM(V4*V6,W4*W6,X4*X6,Y4*Y6,Z4*Z6,AA4*AA6,AB4*AB6,AC4*AC6,AD4*AD6,AE4*AE6,AF4*AF6,AG4*AG6,AH4*AH6,AI4*AI6,AJ4*AJ6,AK4*AK6,AL4*AL6,AM4*AM6,AN4*AN6,AO4*AO6,AP4*AP6,AQ4*AQ6,AR4*AR6,AS4*AS6,AT4*AT6,AU4*AU6,AV4*AV6,AW4*AW6,AX4*AX6,AY4*AY6,AZ4*AZ6,BA4*BA6,BB4*BB6,BC4*BC6,BD4*BD6,BE4*BE6,BF4*BF6,BG4*BG6,BH4*BH6,BI4*BI6,BJ4*BJ6,BK4*BK6,BL4*BL6,BM4*BM6,BN4*BN6,BO4*BO6,BP4*BP6,BQ4*BQ6,BR4*BR6,BS4*BS6,BT4*BT6,BU4*BU6,BV4*BV6,BW4*BW6,BX4*BX6,BY4*BY6,BZ4*BZ6,CA4*CA6,CB4*CB6,CC4*CC6,CD4*CD6,CE4*CE6,CF4*CF6,CG4*CG6,CH4*CH6,CI4*CI6,CJ4*CJ6,CK4*CK6,CL4*CL6,CM4*CM6,CN4*CN6,CO4*CO6,CP4*CP6,CQ4*CQ6,CR4*CR6,CS4*CS6,CT4*CT6,CU4*CU6,CV4*CV6,CW4*CW6,CX4*CX6,CY4*CY6,CZ4*CZ6,DA4*DA6,DB4*DB6,DC4*DC6,DD4*DD6,DE4*DE6,DF4*DF6,DG4*DG6,DH4*DH6,DI4*DI6,DJ4*DJ6,DK4*DK6,DL4*DL6,DM4*DM6,DN4*DN6,DO4*DO6,DP4*DP6,DQ4*DQ6,DR4*DR6,DS4*DS6,DT4*DT6,DU4*DU6,DV4*DV6,DW4*DW6,DX4*DX6,DY4*DY6,DZ4*DZ6,EA4*EA6,EB4*EB6,EC4*EC6,ED4*ED6,EE4*EE6,EF4*EF6,EG4*EG6,EH4*EH6,EI4*EI6,EJ4*EJ6,EK4*EK6,EL4*EL6,EM4*EM6,EN4*EN6,EO4*EO6,EP4*EP6,EQ4*EQ6,ER4*ER6,ES4*ES6,ET4*ET6,EU4*EU6,EV4*EV6,EW4*EW6,EX4*EX6,EY4*EY6,EZ4*EZ6,FA4*FA6,FB4*FB6,FC4*FC6,FD4*FD6,FE4*FE6,FF4*FF6,FG4*FG6,FH4*FH6,FI4*FI6,FJ4*FJ6,FK4*FK6,FL4*FL6,FM4*FM6,FN4*FN6,FO4*FO6,FP4*FP6,FQ4*FQ6,FR4*FR6,FS4*FS6,FT4*FT6,FU4*FU6,FV4*FV6,FW4*FW6,FX4*FX6,FY4*FY6,FZ4*FZ6,GA4*GA6,GB4*GB6,GC4*GC6,GD4*GD6,GE4*GE6,GF4*GF6,GG4*GG6,GH4*GH6,GI4*GI6,GJ4*GJ6,GK4*GK6,GL4*GL6,GM4*GM6,GN4*GN6,GO4*GO6,GP4*GP6,GQ4*GQ6,GR4*GR6,GS4*GS6,GT4*GT6,GU4*GU6,GV4*GV6,GW4*GW6,GX4*GX6,GY4*GY6,GZ4*GZ6,HA4*HA6,HB4*HB6,HC4*HC6,HD4*HD6,HE4*HE6)'

describe('services/get-export-xlsx', function () {
  describe('should create a scenario spreadsheet', function () {
    before(function () {
      scenarioObjects = groupScenarioData(rawScenarioData)
      workbook = getExportXlsx(workloadPointsConfig, t2aWorkloadPointsConfig, scenarioObjects)
      ws = workbook.sheets[0]
    })

    it('with the correct workload points configuration for t2a and non-t2a', function () {
      var columnNo = 22
      
      workloadPointsTester(workloadPointsConfig, workloadPointsKeys, columnNo)
      columnNo = 118
      workloadPointsTester(t2aWorkloadPointsConfig, t2aWorkloadPointsKeys, columnNo)
      
      cell = ws.cell(5, 1)
      thisCell = ws.cells[cell.excelRefs[0]]
      log.info(workbook.sharedStrings[thisCell.v])
    })

    it('with the correct totals for each tier', function () {
      var rowStart = 5
      var columnStart = 22
      var tiersPerType = 8
      var typeTierGroupLength = 4

      scenarioObjects.forEach(function (scenarioObject) {
        for (var i = 0; i < tiersPerType; i++) {
          var casesForThisTier = scenarioObject.communityCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, false)
          columnStart = columnStart + typeTierGroupLength
        }
        for (i = 0; i < tiersPerType; i++) {
          casesForThisTier = scenarioObject.licenceCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, false)
          columnStart = columnStart + typeTierGroupLength
        }
        for (i = 0; i < tiersPerType; i++) {
          casesForThisTier = scenarioObject.custodyCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, false)
          columnStart = columnStart + typeTierGroupLength
        }
        // t2a
        for (i = 0; i < tiersPerType; i++) {
          casesForThisTier = scenarioObject.communityCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, true)
          columnStart = columnStart + typeTierGroupLength
        }
        for (i = 0; i < tiersPerType; i++) {
          casesForThisTier = scenarioObject.licenceCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, true)
          columnStart = columnStart + typeTierGroupLength
        }
        for (i = 0; i < tiersPerType; i++) {
          casesForThisTier = scenarioObject.custodyCaseNumbers.filter(thisCase => thisCase.tier === i)
          casesForThisTier = casesForThisTier[0]
          caseTotalsTester(rowStart, columnStart, casesForThisTier, true)
          columnStart = columnStart + typeTierGroupLength
        }
        rowStart++
        columnStart = 22
      })
    })

    it('with the correct total points formulas', function () {
      expect(getCellFormula(5, 17)).to.eql(totalPointsFormula1)
      expect(getCellFormula(6, 17)).to.eql(totalPointsFormula2)
    })
  })
})

var workloadPointsTester = function(arrayToTest, keysToTest, columnNo) {
  var rowNo = 4
  var arrayIndex = 0
  for (let i = 0; i < 24; i++) {
    if (i % 8 !== 0) {
      expect(getCellValue(rowNo, columnNo)).to.eql(arrayToTest[keysToTest[arrayIndex]])
      expect(getCellValue(rowNo, columnNo + 1)).to.eql(-arrayToTest[keysToTest[arrayIndex]])
      expect(getCellValue(rowNo, columnNo + 2)).to.eql(0)
      expect(getCellValue(rowNo, columnNo + 3)).to.eql(-arrayToTest[keysToTest[arrayIndex]])
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

var getCellValue = function (rowNo, columnNo) {
  cell = ws.cell(rowNo, columnNo)
  thisCell = ws.cells[cell.excelRefs[0]]
  return thisCell.v
}

var getCellFormula = function (rowNo, columnNo) {
  cell = ws.cell(rowNo, columnNo)
  thisCell = ws.cells[cell.excelRefs[0]]
  return thisCell.f
}

var caseTotalsTester = function (rowStart, columnStart, casesForThisTier, t2a) {
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
