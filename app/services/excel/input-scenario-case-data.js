// cases is an array of Scenario Objects
// Each Scenario Object contains 3 arrays of case total objects
// 1 for community cases, 1 for custody and another for licence
// each c will be dealing with a different row
// within each row the cases are dealt with in case type (community, licence, custody) and case tier order
// there is a separate for loop for each case total array
// in the body of these loops the totals for that particular type and tier will be dealt with
// for example

var inputCaseData = function (ws, cases, typeTierGroupLength, tiersPerType) {
  var rowStart = 5
  var columnStart = 22

  for (var c of cases) {
    inputFormulas(ws, rowStart)
    inputOffenderManagerData(ws, c, rowStart)
    for (var i = 0; i < tiersPerType; i++) {
      var casesForThisTier = c.communityCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      ws.cell(rowStart, columnStart).number(casesForThisTier.totalCases)
      ws.cell(rowStart, columnStart + 1).number(casesForThisTier.warrantsTotal)
      ws.cell(rowStart, columnStart + 2).number(casesForThisTier.UPW)
      ws.cell(rowStart, columnStart + 3).number(casesForThisTier.overdueTerminationsTotal)
      columnStart = columnStart + typeTierGroupLength
    }
    for (i = 0; i < tiersPerType; i++) {
      casesForThisTier = c.licenceCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      ws.cell(rowStart, columnStart).number(casesForThisTier.totalCases)
      ws.cell(rowStart, columnStart + 1).number(casesForThisTier.warrantsTotal)
      ws.cell(rowStart, columnStart + 2).number(casesForThisTier.UPW)
      ws.cell(rowStart, columnStart + 3).number(casesForThisTier.overdueTerminationsTotal)
      columnStart = columnStart + typeTierGroupLength
    }
    for (i = 0; i < tiersPerType; i++) {
      casesForThisTier = c.custodyCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      ws.cell(rowStart, columnStart).number(casesForThisTier.totalCases)
      ws.cell(rowStart, columnStart + 1).number(casesForThisTier.warrantsTotal)
      ws.cell(rowStart, columnStart + 2).number(casesForThisTier.UPW)
      ws.cell(rowStart, columnStart + 3).number(casesForThisTier.overdueTerminationsTotal)
      columnStart = columnStart + typeTierGroupLength
    }
    // t2a
    for (i = 0; i < tiersPerType; i++) {
      casesForThisTier = c.communityCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      ws.cell(rowStart, columnStart).number(casesForThisTier.t2aTotalCases)
      ws.cell(rowStart, columnStart + 1).number(casesForThisTier.t2aWarrantsTotal)
      ws.cell(rowStart, columnStart + 2).number(casesForThisTier.t2aUPW)
      ws.cell(rowStart, columnStart + 3).number(casesForThisTier.t2aOverdueTerminationsTotal)
      columnStart = columnStart + typeTierGroupLength
    }
    for (i = 0; i < tiersPerType; i++) {
      casesForThisTier = c.licenceCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      ws.cell(rowStart, columnStart).number(casesForThisTier.t2aTotalCases)
      ws.cell(rowStart, columnStart + 1).number(casesForThisTier.t2aWarrantsTotal)
      ws.cell(rowStart, columnStart + 2).number(casesForThisTier.t2aUPW)
      ws.cell(rowStart, columnStart + 3).number(casesForThisTier.t2aOverdueTerminationsTotal)
      columnStart = columnStart + typeTierGroupLength
    }
    for (i = 0; i < tiersPerType; i++) {
      casesForThisTier = c.custodyCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      ws.cell(rowStart, columnStart).number(casesForThisTier.t2aTotalCases)
      ws.cell(rowStart, columnStart + 1).number(casesForThisTier.t2aWarrantsTotal)
      ws.cell(rowStart, columnStart + 2).number(casesForThisTier.t2aUPW)
      ws.cell(rowStart, columnStart + 3).number(casesForThisTier.t2aOverdueTerminationsTotal)
      columnStart = columnStart + typeTierGroupLength
    }
    // reports to go here
    ws.cell(rowStart, columnStart).number(c.sdrTotal)
    ws.cell(rowStart, columnStart + 1).number(c.sdrConversionsTotal)
    ws.cell(rowStart, columnStart + 2).number(c.paromsTotal)
    ws.cell(rowStart, columnStart + 3).number(c.armsCommunity)
    ws.cell(rowStart, columnStart + 4).number(c.armsLicense)
    columnStart = 22
    rowStart = rowStart + 1
  }
  inputTotals(ws, rowStart)
}

var inputOffenderManagerData = function (ws, offenderManager, row) {
  ws.cell(row, 1).string(offenderManager.name)
  ws.cell(row, 2).string(offenderManager.grade)
  ws.cell(row, 4).number(offenderManager.nominalTarget)
  ws.cell(row, 5).number(offenderManager.contractedHours)
  ws.cell(row, 6).number(offenderManager.defaultContractedHours)
  ws.cell(row, 7).number(offenderManager.reductionHours)
  ws.cell(row, 8).number(offenderManager.cms)
  ws.cell(row, 10).number(offenderManager.gs)
}

var totalPointsFormula = function (row) {
  return '=SUM(V4*V' + row + ',W4*W' + row + ',X4*X' + row + ',Y4*Y' + row + ',Z4*Z' + row + ',AA4*AA' + row + ',AB4*AB' + row + ',AC4*AC' + row + ',AD4*AD' + row + ',AE4*AE' + row + ',AF4*AF' + row + ',AG4*AG' + row + ',AH4*AH' + row + ',AI4*AI' + row + ',AJ4*AJ' + row + ',AK4*AK' + row + ',AL4*AL' + row + ',AM4*AM' + row + ',AN4*AN' + row + ',AO4*AO' + row + ',AP4*AP' + row + ',AQ4*AQ' + row + ',AR4*AR' + row + ',AS4*AS' + row + ',AT4*AT' + row + ',AU4*AU' + row + ',AV4*AV' + row + ',AW4*AW' + row + ',AX4*AX' + row + ',AZ4*AZ' + row + ',BA4*BA' + row + ',BB4*BB' + row + ',BC4*BC' + row + ',BD4*BD' + row + ',BE4*BE' + row + ',BF4*BF' + row + ',BG4*BG' + row + ',BH4*BH' + row + ',BI4*BI' + row + ',BJ4*BJ' + row + ',BK4*BK' + row + ',BL4*BL' + row + ',BM4*BM' + row + ',BN4*BN' + row + ',BO4*BO' + row + ',BP4*BP' + row + ',BQ4*BQ' + row + ',BR4*BR' + row + ',BS4*BS' + row + ',BT4*BT' + row + ',BU4*BU' + row + ',BV4*BV' + row + ',BW4*BW' + row + ',BX4*BX' + row + ',BZ4*BZ' + row + ',CA4*CA' + row + ',CB4*CB' + row + ',CC4*CC' + row + ',CD4*CD' + row + ',CE4*CE' + row + ',CF4*CF' + row + ',CG4*CG' + row + ',CH4*CH' + row + ',CI4*CI' + row + ',CJ4*CJ' + row + ',CK4*CK' + row + ',CL4*CL' + row + ',CM4*CM' + row + ',CN4*CN' + row + ',CO4*CO' + row + ',CP4*CP' + row + ',CQ4*CQ' + row + ',CR4*CR' + row + ',CS4*CS' + row + ',CT4*CT' + row + ',CU4*CU' + row + ',CV4*CV' + row + ',CW4*CW' + row + ',CX4*CX' + row + ',CZ4*CZ' + row + ',DA4*DA' + row + ',DB4*DB' + row + ',DC4*DC' + row + ',DD4*DD' + row + ',DE4*DE' + row + ',DF4*DF' + row + ',DG4*DG' + row + ',DH4*DH' + row + ',DI4*DI' + row + ',DJ4*DJ' + row + ',DK4*DK' + row + ',DL4*DL' + row + ',DM4*DM' + row + ',DN4*DN' + row + ',DO4*DO' + row + ',DP4*DP' + row + ',DQ4*DQ' + row + ',DR4*DR' + row + ',DS4*DS' + row + ',DT4*DT' + row + ',DU4*DU' + row + ',DV4*DV' + row + ',DW4*DW' + row + ',DX4*DX' + row + ',DZ4*DZ' + row + ',EA4*EA' + row + ',EB4*EB' + row + ',EC4*EC' + row + ',ED4*ED' + row + ',EE4*EE' + row + ',EF4*EF' + row + ',EG4*EG' + row + ',EH4*EH' + row + ',EI4*EI' + row + ',EJ4*EJ' + row + ',EK4*EK' + row + ',EL4*EL' + row + ',EM4*EM' + row + ',EN4*EN' + row + ',EO4*EO' + row + ',EP4*EP' + row + ',EQ4*EQ' + row + ',ER4*ER' + row + ',ES4*ES' + row + ',ET4*ET' + row + ',EU4*EU' + row + ',EV4*EV' + row + ',EW4*EW' + row + ',EX4*EX' + row + ',EZ4*EZ' + row + ', FA4*FA' + row + ',FB4*FB' + row + ',FC4*FC' + row + ',FD4*FD' + row + ',FE4*FE' + row + ',FF4*FF' + row + ',FG4*FG' + row + ',FH4*FH' + row + ',FI4*FI' + row + ',FJ4*FJ' + row + ',FK4*FK' + row + ',FL4*FL' + row + ',FM4*FM' + row + ',FN4*FN' + row + ',FO4*FO' + row + ',FP4*FP' + row + ',FQ4*FQ' + row + ',FR4*FR' + row + ',FS4*FS' + row + ',FT4*FT' + row + ',FU4*FU' + row + ',FV4*FV' + row + ',FW4*FW' + row + ',FX4*FX' + row + ',FZ4*FZ' + row + ',GA4*GA' + row + ',GB4*GB' + row + ',GC4*GC' + row + ',GD4*GD' + row + ',GE4*GE' + row + ',GF4*GF' + row + ',GG4*GG' + row + ',GH4*GH' + row + ',GI4*GI' + row + ',GJ4*GJ' + row + ',GK4*GK' + row + ',GL4*GL' + row + ',GM4*GM' + row + ',GN4*GN' + row + ',GO4*GO' + row + ',GP4*GP' + row + ',GQ4*GQ' + row + ',GR4*GR' + row + ',GS4*GS' + row + ',GT4*GT' + row + ',GU4*GU' + row + ',GV4*GV' + row + ',GW4*GW' + row + ',GX4*GX' + row + ',GZ4*GZ' + row + ',HA4*HA' + row + ',HB4*HB' + row + ',HC4*HC' + row + ',HD4*HD' + row + ',HE4*HE' + row + ')'
}

var inputFormulas = function (ws, row) {
  ws.cell(row, 3).formula('=SUM(V' + row + ':HE' + row + ')')
  ws.cell(row, 9).formula('=IFERROR((H' + row + '/R' + row + ')*100,0)').style(this.percentageStyle)
  ws.cell(row, 11).formula('=IFERROR((J' + row + '/R' + row + ')*100,0)').style(this.percentageStyle)
  ws.cell(row, 12).formula('=HF' + row + '*HF4')
  ws.cell(row, 13).formula('=HG' + row + '*HG4')
  ws.cell(row, 14).formula('=HH' + row + '*HH4')
  ws.cell(row, 15).formula('=HI' + row + '*HI4')
  ws.cell(row, 16).formula('=HJ' + row + '*HJ4')
  ws.cell(row, 17).formula(totalPointsFormula(row))
  ws.cell(row, 18).formula('=SUM(H' + row + ',J' + row + ',L' + row + ':Q' + row + ')')
  ws.cell(row, 19).formula('=IFERROR(((D' + row + ' * (E' + row + '/F' + row + '))*((E' + row + '-G' + row + ')/E' + row + ')),0)').style(this.roundedStyle)
  ws.cell(row, 20).formula('=S' + row + '-R' + row).style(this.roundedStyle)
  ws.cell(row, 21).formula('=IFERROR(R' + row + '/S' + row + ',0)').style(this.percentageStyle)
}

var inputTotals = function (ws, row) {
  var dataEndRow = row - 1
  ws.cell(row, 1).string('Total / Average')
  ws.cell(row, 3).formula('=SUM(C' + 5 + ':C' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 4).formula('=AVERAGE(D' + 5 + ':D' + dataEndRow + ')').style(this.averageStyle)
  ws.cell(row, 5).formula('=AVERAGE(E' + 5 + ':E' + dataEndRow + ')').style(this.averageStyle)
  ws.cell(row, 6).formula('=AVERAGE(F' + 5 + ':F' + dataEndRow + ')').style(this.averageStyle)
  ws.cell(row, 7).formula('=SUM(G' + 5 + ':G' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 8).formula('=SUM(H' + 5 + ':H' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 9).formula('=AVERAGE(I' + 5 + ':I' + dataEndRow + ')').style(this.averagePercentageStyle)
  ws.cell(row, 10).formula('=SUM(J' + 5 + ':J' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 11).formula('=AVERAGE(K' + 5 + ':K' + dataEndRow + ')').style(this.averagePercentageStyle)
  ws.cell(row, 12).formula('=SUM(L' + 5 + ':L' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 13).formula('=SUM(M' + 5 + ':M' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 14).formula('=SUM(N' + 5 + ':N' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 15).formula('=SUM(O' + 5 + ':O' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 16).formula('=SUM(P' + 5 + ':P' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 17).formula('=SUM(Q' + 5 + ':Q' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 18).formula('=SUM(R' + 5 + ':R' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 19).formula('=SUM(S' + 5 + ':S' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 20).formula('=SUM(T' + 5 + ':T' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 21).formula('=(R' + row + '/S' + row + ')').style(this.averagePercentageStyle)
  ws.cell(row, 22).formula('=SUM(V' + 5 + ':V' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 23).formula('=SUM(W' + 5 + ':W' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 24).formula('=SUM(X' + 5 + ':X' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 25).formula('=SUM(Y' + 5 + ':Y' + dataEndRow + ')').style(this.sumStyle)
  ws.cell(row, 26).formula('=SUM(Z' + 5 + ':Z' + dataEndRow + ')').style(this.sumStyle)

  var columnNo = 27
  var firstLetter
  var secondLetter
  var char1
  var char2
  for (firstLetter = 0; firstLetter < 7; firstLetter++) {
    for (secondLetter = 0; secondLetter < 26; secondLetter++) {
      char1 = String.fromCharCode(firstLetter + 65)
      char2 = String.fromCharCode(secondLetter + 65)
      ws.cell(row, columnNo).formula('=SUM(' + char1 + char2 + 5 + ':' + char1 + char2 + dataEndRow + ')').style(this.sumStyle)
      columnNo = columnNo + 1
    }
  }
  for (secondLetter = 0; secondLetter < 10; secondLetter++) {
    char1 = 'H'
    char2 = String.fromCharCode(secondLetter + 65)
    ws.cell(row, columnNo).formula('=SUM(' + char1 + char2 + 5 + ':' + char1 + char2 + dataEndRow + ')').style(this.sumStyle)
    columnNo = columnNo + 1
  }
}

module.exports = function (ws, scenarioData, typeTierGroupLength, tiersPerType, sumStyle, averageStyle, averagePercentageStyle, percentageStyle, roundedStyle) {
  this.sumStyle = sumStyle
  this.averageStyle = averageStyle
  this.averagePercentageStyle = averagePercentageStyle
  this.percentageStyle = percentageStyle
  this.roundedStyle = roundedStyle
  inputCaseData(ws, scenarioData, typeTierGroupLength, tiersPerType)
}
