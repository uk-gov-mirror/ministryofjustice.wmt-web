module.exports = function (caseload) {
  caseArray = []
  caseArray.push(formatCase(caseload.caseloadDetails.licenseCaseloadDetails.details, 'Licence'))
  caseArray.push(formatCase(caseload.caseloadDetails.custodyCaseloadDetails.details, 'Custody'))
  caseArray.push(formatCase(caseload.caseloadDetails.communityCaseloadDetails.details, 'Community'))
  return caseArray
}

var formatCase = function (ldus, sentenceType) {
  var thisCaseArray = []
  ldus.forEach(function (ldu) {
    var lduName = ldu.name
    var regionName = ldu.regionName
    ldu.grades.forEach(function (grade) {
      var thisCase = Object.assign({}, grade)
      thisCase.lduName = lduName
      thisCase.regionName = regionName
      thisCase.sentenceType = sentenceType
      thisCaseArray.push(thisCase)
    })
  })
  return thisCaseArray
}
