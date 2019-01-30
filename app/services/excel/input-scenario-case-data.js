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

  for (c of cases) {
    for (var i = 0; i < tiersPerType; i++) {
      var casesForThisTier = c.communityCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      ws.cell(rowStart, columnStart).number(casesForThisTier.totalCases)
      ws.cell(rowStart, columnStart + 1).number(casesForThisTier.warrantsTotal)
      ws.cell(rowStart, columnStart + 2).number(casesForThisTier.UPW)
      ws.cell(rowStart, columnStart + 3).number(casesForThisTier.overdueTerminationsTotal)
      columnStart = columnStart + typeTierGroupLength
    }
    for (var i = 0; i < tiersPerType; i++) {
      var casesForThisTier = c.licenceCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      ws.cell(rowStart, columnStart).number(casesForThisTier.totalCases)
      ws.cell(rowStart, columnStart + 1).number(casesForThisTier.warrantsTotal)
      ws.cell(rowStart, columnStart + 2).number(casesForThisTier.UPW)
      ws.cell(rowStart, columnStart + 3).number(casesForThisTier.overdueTerminationsTotal)
      columnStart = columnStart + typeTierGroupLength
    }
    for (var i = 0; i < tiersPerType; i++) {
      var casesForThisTier = c.custodyCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      ws.cell(rowStart, columnStart).number(casesForThisTier.totalCases)
      ws.cell(rowStart, columnStart + 1).number(casesForThisTier.warrantsTotal)
      ws.cell(rowStart, columnStart + 2).number(casesForThisTier.UPW)
      ws.cell(rowStart, columnStart + 3).number(casesForThisTier.overdueTerminationsTotal)
      columnStart = columnStart + typeTierGroupLength
    }
    // t2a
    for (var i = 0; i < tiersPerType; i++) {
      var casesForThisTier = c.communityCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      ws.cell(rowStart, columnStart).number(casesForThisTier.t2aTotalCases)
      ws.cell(rowStart, columnStart + 1).number(casesForThisTier.t2aWarrantsTotal)
      ws.cell(rowStart, columnStart + 2).number(casesForThisTier.t2aUPW)
      ws.cell(rowStart, columnStart + 3).number(casesForThisTier.t2aOverdueTerminationsTotal)
      columnStart = columnStart + typeTierGroupLength
    }
    for (var i = 0; i < tiersPerType; i++) {
      var casesForThisTier = c.licenceCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      ws.cell(rowStart, columnStart).number(casesForThisTier.t2aTotalCases)
      ws.cell(rowStart, columnStart + 1).number(casesForThisTier.t2aWarrantsTotal)
      ws.cell(rowStart, columnStart + 2).number(casesForThisTier.t2aUPW)
      ws.cell(rowStart, columnStart + 3).number(casesForThisTier.t2aOverdueTerminationsTotal)
      columnStart = columnStart + typeTierGroupLength
    }
    for (var i = 0; i < tiersPerType; i++) {
      var casesForThisTier = c.custodyCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      ws.cell(rowStart, columnStart).number(casesForThisTier.t2aTotalCases)
      ws.cell(rowStart, columnStart + 1).number(casesForThisTier.t2aWarrantsTotal)
      ws.cell(rowStart, columnStart + 2).number(casesForThisTier.t2aUPW)
      ws.cell(rowStart, columnStart + 3).number(casesForThisTier.t2aOverdueTerminationsTotal)
      columnStart = columnStart + typeTierGroupLength
    }
    // reports to go here
    columnStart = 22
    rowStart = rowStart + 1
  }
} 

module.exports = function (ws, scenarioData, typeTierGroupLength, tiersPerType) {
  // need to add name, contracted hours etc
  inputCaseData(ws, scenarioData, typeTierGroupLength, tiersPerType)
}
