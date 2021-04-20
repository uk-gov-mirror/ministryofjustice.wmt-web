// cases is an array of Scenario Objects
// Each Scenario Object contains 3 arrays of case total objects
// 1 for community cases, 1 for custody and another for licence
// each c will be dealing with a different row
// within each row the cases are dealt with in case type (community, licence, custody) and case tier order
// there is a separate for loop for each case total array
// in the body of these loops the totals for that particular type and tier will be dealt with
// for example

const inputCaseData = function (ws, cases, typeTierGroupLength, tiersPerType) {
  let rowStart = 5
  let columnStart = 26

  for (const c of cases) {
    inputMainBodyFormulas(ws, rowStart)
    inputOffenderManagerData(ws, c, rowStart)
    // WMT0160: Change tiersPerType for community cases
    let casesForThisTier = c.communityCaseNumbers.filter(thisCase => thisCase.tier === 0)
    casesForThisTier = casesForThisTier[0]
    setTierTotals(ws, rowStart, columnStart, casesForThisTier, false)
    columnStart = columnStart + typeTierGroupLength

    for (let i = tiersPerType - 1; i >= 1; i--) {
      casesForThisTier = c.communityCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      setTierTotals(ws, rowStart, columnStart, casesForThisTier, false)
      columnStart = columnStart + typeTierGroupLength
    }

    casesForThisTier = c.licenceCaseNumbers.filter(thisCase => thisCase.tier === 0)
    casesForThisTier = casesForThisTier[0]
    setTierTotals(ws, rowStart, columnStart, casesForThisTier, false)
    columnStart = columnStart + typeTierGroupLength

    for (let i = tiersPerType - 1; i >= 1; i--) {
      casesForThisTier = c.licenceCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      setTierTotals(ws, rowStart, columnStart, casesForThisTier, false)
      columnStart = columnStart + typeTierGroupLength
    }

    casesForThisTier = c.custodyCaseNumbers.filter(thisCase => thisCase.tier === 0)
    casesForThisTier = casesForThisTier[0]
    setTierTotals(ws, rowStart, columnStart, casesForThisTier, false)
    columnStart = columnStart + typeTierGroupLength

    for (let i = tiersPerType - 1; i >= 1; i--) {
      casesForThisTier = c.custodyCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      setTierTotals(ws, rowStart, columnStart, casesForThisTier, false)
      columnStart = columnStart + typeTierGroupLength
    }
    // t2a
    // WMT0160: Change tiersPerType for community cases
    casesForThisTier = c.communityCaseNumbers.filter(thisCase => thisCase.tier === 0)
    casesForThisTier = casesForThisTier[0]
    setTierTotals(ws, rowStart, columnStart, casesForThisTier, true)
    columnStart = columnStart + typeTierGroupLength

    for (let i = tiersPerType - 1; i >= 1; i--) {
      casesForThisTier = c.communityCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      setTierTotals(ws, rowStart, columnStart, casesForThisTier, true)
      columnStart = columnStart + typeTierGroupLength
    }

    casesForThisTier = c.licenceCaseNumbers.filter(thisCase => thisCase.tier === 0)
    casesForThisTier = casesForThisTier[0]
    setTierTotals(ws, rowStart, columnStart, casesForThisTier, true)
    columnStart = columnStart + typeTierGroupLength

    for (let i = tiersPerType - 1; i >= 1; i--) {
      casesForThisTier = c.licenceCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      setTierTotals(ws, rowStart, columnStart, casesForThisTier, true)
      columnStart = columnStart + typeTierGroupLength
    }

    casesForThisTier = c.custodyCaseNumbers.filter(thisCase => thisCase.tier === 0)
    casesForThisTier = casesForThisTier[0]
    setTierTotals(ws, rowStart, columnStart, casesForThisTier, true)
    columnStart = columnStart + typeTierGroupLength

    for (let i = tiersPerType - 1; i >= 1; i--) {
      casesForThisTier = c.custodyCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      setTierTotals(ws, rowStart, columnStart, casesForThisTier, true)
      columnStart = columnStart + typeTierGroupLength
    }
    // reports to go here
    ws.cell(rowStart, columnStart).number(c.sdrTotal).style(this.styles.editableStyle)
    ws.cell(rowStart, columnStart + 1).number(c.sdrConversionsTotal).style(this.styles.editableStyle)
    ws.cell(rowStart, columnStart + 2).number(c.paromsTotal).style(this.styles.editableStyle)
    ws.cell(rowStart, columnStart + 3).number(c.armsCommunity).style(this.styles.editableStyle)
    ws.cell(rowStart, columnStart + 4).number(c.armsLicense).style(this.styles.editableStyle)
    columnStart = 26
    rowStart = rowStart + 1
  }
  inputBottomTotals(ws, rowStart)
  // var endRow = rowStart - 1
  // var lockedCellRanges = [
  //   'F5:' + 'F' + endRow,
  //   'K5:' + 'K' + endRow,
  //   'L5:' + 'L' + endRow,
  //   'M5:' + 'M' + endRow,
  //   'N5:' + 'N' + endRow,
  //   'O5:' + 'O' + endRow,
  //   'P5:' + 'P' + endRow,
  //   'Q5:' + 'Q' + endRow,
  //   'R5:' + 'R' + endRow,
  //   'S5:' + 'S' + endRow,
  //   'T5:' + 'T' + endRow,
  //   'U5:' + 'U' + endRow,
  //   'V5:' + 'V' + endRow,
  //   'W5:' + 'W' + endRow,
  //   'X5:' + 'X' + endRow
  // ]
  // lockedCellRanges.forEach(function (lockedCellRange) {
  //   lockCells(ws, lockedCellRange)
  // })
}

// Input Offender Manager Name, Grade to the left side of the produced spreadsheet
const inputOffenderManagerData = function (ws, offenderManager, row) {
  ws.cell(row, 1).string(offenderManager.division).style(this.styles.editableStyle)
  ws.cell(row, 2).string(offenderManager.ldu).style(this.styles.editableStyle)
  ws.cell(row, 3).string(offenderManager.team).style(this.styles.editableStyle)
  ws.cell(row, 4).string(offenderManager.name).style(this.styles.editableStyle)
  ws.cell(row, 5).string(offenderManager.grade).style(this.styles.editableStyle)
  ws.cell(row, 7).number(offenderManager.nominalTarget).style(this.styles.editableStyle)
  ws.cell(row, 8).number(offenderManager.contractedHours).style(this.styles.editableStyle)
  ws.cell(row, 9).number(offenderManager.defaultContractedHours).style(this.styles.editableStyle)
  ws.cell(row, 10).number(offenderManager.reductionHours).style(this.styles.editableStyle)
  ws.cell(row, 11).number(offenderManager.cms).style(this.styles.nonEditableCaseStyle)
  ws.cell(row, 13).number(offenderManager.gs).style(this.styles.nonEditableCaseStyle)
}

const totalPointsFormulaPart1 = function (row) {
  // WMT0160: Update this
  // return '=SUM(V4*V' + row + ',W4*W' + row + ',X4*X' + row + ',Y4*Y' + row + ',Z4*Z' + row + ',AA4*AA' + row + ',AB4*AB' + row + ',AC4*AC' + row + ',AD4*AD' + row + ',AE4*AE' + row + ',AF4*AF' + row + ',AG4*AG' + row + ',AH4*AH' + row + ',AI4*AI' + row + ',AJ4*AJ' + row + ',AK4*AK' + row + ',AL4*AL' + row + ',AM4*AM' + row + ',AN4*AN' + row + ',AO4*AO' + row + ',AP4*AP' + row + ',AQ4*AQ' + row + ',AR4*AR' + row + ',AS4*AS' + row + ',AT4*AT' + row + ',AU4*AU' + row + ',AV4*AV' + row + ',AW4*AW' + row + ',AX4*AX' + row + ',AY4*AY' + row + ',AZ4*AZ' + row + ',BA4*BA' + row + ',BB4*BB' + row + ',BC4*BC' + row + ',BD4*BD' + row + ',BE4*BE' + row + ',BF4*BF' + row + ',BG4*BG' + row + ',BH4*BH' + row + ',BI4*BI' + row + ',BJ4*BJ' + row + ',BK4*BK' + row + ',BL4*BL' + row + ',BM4*BM' + row + ',BN4*BN' + row + ',BO4*BO' + row + ',BP4*BP' + row + ',BQ4*BQ' + row + ',BR4*BR' + row + ',BS4*BS' + row + ',BT4*BT' + row + ',BU4*BU' + row + ',BV4*BV' + row + ',BW4*BW' + row + ',BX4*BX' + ',BY4*BY' + row + ',BZ4*BZ' + row + ',CA4*CA' + row + ',CB4*CB' + row + ',CC4*CC' + row + ',CD4*CD' + row + ',CE4*CE' + row + ',CF4*CF' + row + ',CG4*CG' + row + ',CH4*CH' + row + ',CI4*CI' + row + ',CJ4*CJ' + row + ',CK4*CK' + row + ',CL4*CL' + row + ',CM4*CM' + row + ',CN4*CN' + row + ',CO4*CO' + row + ',CP4*CP' + row + ',CQ4*CQ' + row + ',CR4*CR' + row + ',CS4*CS' + row + ',CT4*CT' + row + ',CU4*CU' + row + ',CV4*CV' + row + ',CW4*CW' + row + ',CX4*CX' + row + ',CY4*CY' + row + ',CZ4*CZ' + row + ',DA4*DA' + row + ',DB4*DB' + row + ',DC4*DC' + row + ',DD4*DD' + row + ',DE4*DE' + row + ',DF4*DF' + row + ',DG4*DG' + row + ',DH4*DH' + row + ',DI4*DI' + row + ',DJ4*DJ' + row + ',DK4*DK' + row + ',DL4*DL' + row + ',DM4*DM' + row + ',DN4*DN' + row + ',DO4*DO' + row + ',DP4*DP' + row + ',DQ4*DQ' + row + ',DR4*DR' + row + ',DS4*DS' + row + ',DT4*DT' + row + ',DU4*DU' + row + ',DV4*DV' + row + ',DW4*DW' + row + ',DX4*DX' + row + ',DY4*DY' + row + ',DZ4*DZ' + row + ',EA4*EA' + row + ',EB4*EB' + row + ',EC4*EC' + row + ',ED4*ED' + row + ',EE4*EE' + row + ',EF4*EF' + row + ',EG4*EG' + row + ',EH4*EH' + row + ',EI4*EI' + row + ',EJ4*EJ' + row + ',EK4*EK' + row + ',EL4*EL' + row + ',EM4*EM' + row + ',EN4*EN' + row + ',EO4*EO' + row + ',EP4*EP' + row + ',EQ4*EQ' + row + ',ER4*ER' + row + ',ES4*ES' + row + ',ET4*ET' + row + ',EU4*EU' + row + ',EV4*EV' + row + ',EW4*EW' + row + ',EX4*EX' + row + ',EY4*EY' + row + ',EZ4*EZ' + row + ', FA4*FA' + row + ',FB4*FB' + row + ',FC4*FC' + row + ',FD4*FD' + row + ',FE4*FE' + row + ',FF4*FF' + row + ',FG4*FG' + row + ',FH4*FH' + row + ',FI4*FI' + row + ',FJ4*FJ' + row + ',FK4*FK' + row + ',FL4*FL' + row + ',FM4*FM' + row + ',FN4*FN' + row + ',FO4*FO' + row + ',FP4*FP' + row + ',FQ4*FQ' + row + ',FR4*FR' + row + ',FS4*FS' + row + ',FT4*FT' + row + ',FU4*FU' + row + ',FV4*FV' + row + ',FW4*FW' + row + ',FX4*FX' + row + ',FY4*FY' + row + ',FZ4*FZ' + row + ',GA4*GA' + row + ',GB4*GB' + row + ',GC4*GC' + row + ',GD4*GD' + row + ',GE4*GE' + row + ',GF4*GF' + row + ',GG4*GG' + row + ',GH4*GH' + row + ',GI4*GI' + row + ',GJ4*GJ' + row + ',GK4*GK' + row + ',GL4*GL' + row + ',GM4*GM' + row + ',GN4*GN' + row + ',GO4*GO' + row + ',GP4*GP' + row + ',GQ4*GQ' + row + ',GR4*GR' + row + ',GS4*GS' + row + ',GT4*GT' + row + ',GU4*GU' + row + ',GV4*GV' + row + ',GW4*GW' + row + ',GX4*GX' + row + ',GY4*GY' + row + ',GZ4*GZ' + row + ',HA4*HA' + row + ',HB4*HB' + row + ',HC4*HC' + row + ',HD4*HD' + row + ',HE4*HE' + row + ')'
  // Deal with first 5 Columns separately
  let formula = '=SUM($Z$4*Z' + row
  let firstLetter
  let secondLetter
  let char1
  let char2
  // A,B,C,D,E,F,G,H
  // 0,1,2,3,4,5,6,7
  // Deal with AA..AZ columns to GA..GZ columns next in a nested loop
  for (firstLetter = 0; firstLetter < 7; firstLetter++) {
    for (secondLetter = 0; secondLetter < 26; secondLetter++) {
      char1 = String.fromCharCode(firstLetter + 65)
      char2 = String.fromCharCode(secondLetter + 65)
      formula = formula + ',$' + char1 + char2 + '$' + 4 + '*' + char1 + char2 + row
    }
  }

  firstLetter = 7
  for (secondLetter = 0; secondLetter < 21; secondLetter++) {
    char1 = String.fromCharCode(firstLetter + 65)
    char2 = String.fromCharCode(secondLetter + 65)
    formula = formula + ',$' + char1 + char2 + '$' + 4 + '*' + char1 + char2 + row
  }
  // Close Formula
  formula = formula + ')'
  return formula
}

const totalPointsFormulaPart2 = function (row) {
  // WMT0160: Update this
  // return '=SUM(V4*V' + row + ',W4*W' + row + ',X4*X' + row + ',Y4*Y' + row + ',Z4*Z' + row + ',AA4*AA' + row + ',AB4*AB' + row + ',AC4*AC' + row + ',AD4*AD' + row + ',AE4*AE' + row + ',AF4*AF' + row + ',AG4*AG' + row + ',AH4*AH' + row + ',AI4*AI' + row + ',AJ4*AJ' + row + ',AK4*AK' + row + ',AL4*AL' + row + ',AM4*AM' + row + ',AN4*AN' + row + ',AO4*AO' + row + ',AP4*AP' + row + ',AQ4*AQ' + row + ',AR4*AR' + row + ',AS4*AS' + row + ',AT4*AT' + row + ',AU4*AU' + row + ',AV4*AV' + row + ',AW4*AW' + row + ',AX4*AX' + row + ',AY4*AY' + row + ',AZ4*AZ' + row + ',BA4*BA' + row + ',BB4*BB' + row + ',BC4*BC' + row + ',BD4*BD' + row + ',BE4*BE' + row + ',BF4*BF' + row + ',BG4*BG' + row + ',BH4*BH' + row + ',BI4*BI' + row + ',BJ4*BJ' + row + ',BK4*BK' + row + ',BL4*BL' + row + ',BM4*BM' + row + ',BN4*BN' + row + ',BO4*BO' + row + ',BP4*BP' + row + ',BQ4*BQ' + row + ',BR4*BR' + row + ',BS4*BS' + row + ',BT4*BT' + row + ',BU4*BU' + row + ',BV4*BV' + row + ',BW4*BW' + row + ',BX4*BX' + ',BY4*BY' + row + ',BZ4*BZ' + row + ',CA4*CA' + row + ',CB4*CB' + row + ',CC4*CC' + row + ',CD4*CD' + row + ',CE4*CE' + row + ',CF4*CF' + row + ',CG4*CG' + row + ',CH4*CH' + row + ',CI4*CI' + row + ',CJ4*CJ' + row + ',CK4*CK' + row + ',CL4*CL' + row + ',CM4*CM' + row + ',CN4*CN' + row + ',CO4*CO' + row + ',CP4*CP' + row + ',CQ4*CQ' + row + ',CR4*CR' + row + ',CS4*CS' + row + ',CT4*CT' + row + ',CU4*CU' + row + ',CV4*CV' + row + ',CW4*CW' + row + ',CX4*CX' + row + ',CY4*CY' + row + ',CZ4*CZ' + row + ',DA4*DA' + row + ',DB4*DB' + row + ',DC4*DC' + row + ',DD4*DD' + row + ',DE4*DE' + row + ',DF4*DF' + row + ',DG4*DG' + row + ',DH4*DH' + row + ',DI4*DI' + row + ',DJ4*DJ' + row + ',DK4*DK' + row + ',DL4*DL' + row + ',DM4*DM' + row + ',DN4*DN' + row + ',DO4*DO' + row + ',DP4*DP' + row + ',DQ4*DQ' + row + ',DR4*DR' + row + ',DS4*DS' + row + ',DT4*DT' + row + ',DU4*DU' + row + ',DV4*DV' + row + ',DW4*DW' + row + ',DX4*DX' + row + ',DY4*DY' + row + ',DZ4*DZ' + row + ',EA4*EA' + row + ',EB4*EB' + row + ',EC4*EC' + row + ',ED4*ED' + row + ',EE4*EE' + row + ',EF4*EF' + row + ',EG4*EG' + row + ',EH4*EH' + row + ',EI4*EI' + row + ',EJ4*EJ' + row + ',EK4*EK' + row + ',EL4*EL' + row + ',EM4*EM' + row + ',EN4*EN' + row + ',EO4*EO' + row + ',EP4*EP' + row + ',EQ4*EQ' + row + ',ER4*ER' + row + ',ES4*ES' + row + ',ET4*ET' + row + ',EU4*EU' + row + ',EV4*EV' + row + ',EW4*EW' + row + ',EX4*EX' + row + ',EY4*EY' + row + ',EZ4*EZ' + row + ', FA4*FA' + row + ',FB4*FB' + row + ',FC4*FC' + row + ',FD4*FD' + row + ',FE4*FE' + row + ',FF4*FF' + row + ',FG4*FG' + row + ',FH4*FH' + row + ',FI4*FI' + row + ',FJ4*FJ' + row + ',FK4*FK' + row + ',FL4*FL' + row + ',FM4*FM' + row + ',FN4*FN' + row + ',FO4*FO' + row + ',FP4*FP' + row + ',FQ4*FQ' + row + ',FR4*FR' + row + ',FS4*FS' + row + ',FT4*FT' + row + ',FU4*FU' + row + ',FV4*FV' + row + ',FW4*FW' + row + ',FX4*FX' + row + ',FY4*FY' + row + ',FZ4*FZ' + row + ',GA4*GA' + row + ',GB4*GB' + row + ',GC4*GC' + row + ',GD4*GD' + row + ',GE4*GE' + row + ',GF4*GF' + row + ',GG4*GG' + row + ',GH4*GH' + row + ',GI4*GI' + row + ',GJ4*GJ' + row + ',GK4*GK' + row + ',GL4*GL' + row + ',GM4*GM' + row + ',GN4*GN' + row + ',GO4*GO' + row + ',GP4*GP' + row + ',GQ4*GQ' + row + ',GR4*GR' + row + ',GS4*GS' + row + ',GT4*GT' + row + ',GU4*GU' + row + ',GV4*GV' + row + ',GW4*GW' + row + ',GX4*GX' + row + ',GY4*GY' + row + ',GZ4*GZ' + row + ',HA4*HA' + row + ',HB4*HB' + row + ',HC4*HC' + row + ',HD4*HD' + row + ',HE4*HE' + row + ')'
  // Deal with first 5 Columns separately
  let formula = '=SUM('
  let firstLetter
  let secondLetter
  let char1
  let char2
  // A,B,C,D,E,F,G,H,I,J,K, L, M, N, O, P
  // 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15
  firstLetter = 7
  for (secondLetter = 21; secondLetter < 26; secondLetter++) {
    char1 = String.fromCharCode(firstLetter + 65)
    char2 = String.fromCharCode(secondLetter + 65)
    formula = formula + '$' + char1 + char2 + '$' + 4 + '*' + char1 + char2 + row + ','
  }
  // Deal with AA..AZ columns to GA..GZ columns next in a nested loop
  for (firstLetter = 8; firstLetter < 15; firstLetter++) {
    for (secondLetter = 0; secondLetter < 26; secondLetter++) {
      char1 = String.fromCharCode(firstLetter + 65)
      char2 = String.fromCharCode(secondLetter + 65)
      formula = formula + '$' + char1 + char2 + '$' + 4 + '*' + char1 + char2 + row + ','
    }
  }

  firstLetter = 15
  for (secondLetter = 0; secondLetter < 17; secondLetter++) {
    char1 = String.fromCharCode(firstLetter + 65)
    char2 = String.fromCharCode(secondLetter + 65)
    formula = formula + ',$' + char1 + char2 + '$' + 4 + '*' + char1 + char2 + row
  }

  formula = formula + ')'
  return formula
}

const totalCasesFormula = function (row) {
  let formula = '=SUM(Z' + row
  let firstLetter = 0
  let lastChar2 = 68
  let secondLetter = 3
  let char1
  let char2
  const lastCasesCellNumber = 403
  while (secondLetter <= lastCasesCellNumber) {
    if (lastChar2 > ((secondLetter % 26) + 65)) {
      firstLetter++
    }
    lastChar2 = (secondLetter % 26) + 65
    char1 = String.fromCharCode(firstLetter + 65)
    char2 = String.fromCharCode((secondLetter % 26) + 65)
    formula = formula + ',' + char1 + char2 + row
    secondLetter += 4
  }
  formula = formula + ')'
  return formula
  // return '=SUM(Z' + row + ',AD' + row + ',AH' + row + ',AL' + row + ',AP' + row + ',AT' + row + ',AX' + row + ',BB' + row + ',BF' + row + ',BJ' + row + ',BN' + row + ',BR' + row + ',BV' + row + ',BZ' + row + ',CD' + row + ',CH' + row + ',CL' + row + ',CP' + row + ',CT' + row + ',CX' + row + ',DB' + row + ',DF' + row + ',DJ' + row + ',DN' + row + ',DR' + row + ',DV' + row + ',DZ' + row + ',ED' + row + ',EH' + row + ',EL' + row + ',EP' + row + ',ET' + row + ',EX' + row + ',FB' + row + ',FF' + row + ',FJ' + row + ',FN' + row + ',FR' + row + ',FV' + row + ',FZ' + row + ',GD' + row + ',GH' + row + ',GL' + row + ',GP' + row + ',GT' + row + ',GX' + row + ',HB' + row + ',HF' + row + ',HJ' + row + ',HN' + row + ',HR' + row + ',HV' + row + ',HZ' + row + ',ID' + row + ',IH' + row + ',IL' + row + ',IP' + row + ',IT' + row + ',IX' + row + ',JB' + row + ',JF' + row + ',JJ' + row + ',JN' + row + ',JR' + row + ',JV' + row + ',JZ' + row + ')'
}

// Add formulas to Cells C to U (Data below "Total Cases" Column to "Current % Capacity" Column in produced spreadsheet)
const inputMainBodyFormulas = function (ws, row) {
  ws.cell(row, 6).formula(totalCasesFormula(row)).style(this.styles.nonEditableCaseStyle) // Total Cases
  ws.cell(row, 12).formula('=IFERROR((K' + row + '/W' + row + '),0)').style(this.styles.percentageStyle) // CMS %
  ws.cell(row, 14).formula('=IFERROR((M' + row + '/V' + row + '),0)').style(this.styles.percentageStyle) // GS %
  ws.cell(row, 15).formula('=PR' + row + '*$PR$4').style(this.styles.nonEditableCaseStyle) // SDR Points
  ws.cell(row, 16).formula('=PS' + row + '*$PS$4').style(this.styles.nonEditableCaseStyle) // FDR Points
  ws.cell(row, 17).formula('=PT' + row + '*$PT$4').style(this.styles.nonEditableCaseStyle) // Parom Points
  ws.cell(row, 18).formula('=PU' + row + '*$PU$4').style(this.styles.nonEditableCaseStyle) // ARMS Comm Points
  ws.cell(row, 19).formula('=PV' + row + '*$PV$4').style(this.styles.nonEditableCaseStyle) // ARMS Licence Points
  ws.cell(row, 20).formula(totalPointsFormulaPart1(row)).style(this.styles.nonEditableCaseStyle) // Total Caseload Points - Non T2A
  ws.cell(row, 21).formula(totalPointsFormulaPart2(row)).style(this.styles.nonEditableCaseStyle) // Total Caseload Points - T2A
  ws.cell(row, 22).formula('=SUM(K' + row + ',M' + row + ',O' + row + ':U' + row + ')').style(this.styles.nonEditableCaseStyle) // Overall Total Points
  ws.cell(row, 23).formula('=IFERROR(ROUNDDOWN(((G' + row + ' * (H' + row + '/I' + row + '))*((H' + row + '-J' + row + ')/H' + row + ')),0),0)').style(this.styles.roundedStyle) // Available Points
  ws.cell(row, 24).formula('=W' + row + '-V' + row).style(this.styles.roundedStyle) // Remaining Points
  ws.cell(row, 25).formula('=IFERROR(V' + row + '/W' + row + ',0)').style(this.styles.percentageStyle) // Current % Capacity
}

const inputBottomTotals = function (ws, row) {
  const dataEndRow = row - 1
  ws.cell(row, 1).string('Total / Average').style(this.styles.totalAverageStyle)
  ws.cell(row, 2).style(this.styles.totalAverageStyle)
  ws.cell(row, 3).style(this.styles.totalAverageStyle)
  ws.cell(row, 4).style(this.styles.totalAverageStyle)
  ws.cell(row, 5).style(this.styles.totalAverageStyle)
  ws.cell(row, 6).formula('=SUM($F$' + 5 + ':F' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 7).formula('=AVERAGE($G$' + 5 + ':G' + dataEndRow + ')').style(this.styles.averageStyle)
  ws.cell(row, 8).formula('=SUM($H$' + 5 + ':H' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 9).formula('=SUM($I$' + 5 + ':I' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 10).formula('=SUM($J$' + 5 + ':J' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 11).formula('=SUM($K$' + 5 + ':K' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 12).formula('=IFERROR((K' + row + '/W' + row + '),0)').style(this.styles.cmsGsPercentageStyle)
  ws.cell(row, 13).formula('=SUM($M$' + 5 + ':M' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 14).formula('=IFERROR((M' + row + '/v' + row + '),0)').style(this.styles.cmsGsPercentageStyle)
  ws.cell(row, 15).formula('=SUM($O$' + 5 + ':O' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 16).formula('=SUM($P$' + 5 + ':P' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 17).formula('=SUM($Q$' + 5 + ':Q' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 18).formula('=SUM($R$' + 5 + ':R' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 19).formula('=SUM($S$' + 5 + ':S' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 20).formula('=SUM($T$' + 5 + ':T' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 21).formula('=SUM($U$' + 5 + ':U' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 22).formula('=SUM($V$' + 5 + ':V' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 23).formula('=SUM($W$' + 5 + ':W' + dataEndRow + ')').style(this.styles.roundedSumStyle)
  ws.cell(row, 24).formula('=SUM($X$' + 5 + ':X' + dataEndRow + ')').style(this.styles.roundedSumStyle)
  ws.cell(row, 25).formula('=IFERROR(V' + row + '/W' + row + ',0)').style(this.styles.averagePercentageStyle)
  ws.cell(row, 26).formula('=SUM($Z$' + 5 + ':Z' + dataEndRow + ')').style(this.styles.sumStyle)

  let columnNo = 27
  let firstLetter
  let secondLetter
  let char1
  let char2
  // WMT0160: Update this too
  for (firstLetter = 0; firstLetter < 15; firstLetter++) {
    for (secondLetter = 0; secondLetter < 26; secondLetter++) {
      char1 = String.fromCharCode(firstLetter + 65)
      char2 = String.fromCharCode(secondLetter + 65)
      ws.cell(row, columnNo).formula('=SUM(' + char1 + char2 + 5 + ':' + char1 + char2 + dataEndRow + ')').style(this.styles.sumStyle)
      columnNo = columnNo + 1
    }
  }
  for (secondLetter = 0; secondLetter < 22; secondLetter++) {
    char1 = 'P'
    char2 = String.fromCharCode(secondLetter + 65)
    ws.cell(row, columnNo).formula('=SUM(' + char1 + char2 + 5 + ':' + char1 + char2 + dataEndRow + ')').style(this.styles.sumStyle)
    columnNo = columnNo + 1
  }
}

const setTierTotals = function (ws, rowStart, columnStart, casesForThisTier, t2a) {
  if (t2a) {
    ws.cell(rowStart, columnStart).number(casesForThisTier.t2aTotalCases).style(this.styles.editableStyle)
    ws.cell(rowStart, columnStart + 1).number(casesForThisTier.t2aWarrantsTotal).style(this.styles.editableStyle)
    ws.cell(rowStart, columnStart + 2).number(casesForThisTier.t2aUPW).style(this.styles.editableStyle)
    ws.cell(rowStart, columnStart + 3).number(casesForThisTier.t2aOverdueTerminationsTotal).style(this.styles.editableStyle)
  } else {
    ws.cell(rowStart, columnStart).number(casesForThisTier.totalCases).style(this.styles.editableStyle)
    ws.cell(rowStart, columnStart + 1).number(casesForThisTier.warrantsTotal).style(this.styles.editableStyle)
    ws.cell(rowStart, columnStart + 2).number(casesForThisTier.UPW).style(this.styles.editableStyle)
    ws.cell(rowStart, columnStart + 3).number(casesForThisTier.overdueTerminationsTotal).style(this.styles.editableStyle)
  }
}

// const lockCells = (ws, range) => {
//   ws.addDataValidation({
//     type: 'textLength',
//     error: 'This cell is locked',
//     operator: 'equal',
//     sqref: range,
//     formulas: ['']
//   })
// }

module.exports = function (ws, scenarioData, typeTierGroupLength, tiersPerType, styles) {
  this.styles = styles
  inputCaseData(ws, scenarioData, typeTierGroupLength, tiersPerType)
}
