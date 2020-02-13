const log = require('../../logger')
// const fs = require('fs')

module.exports = function (results) {
  var crnMap = new Map()
  var countableCaseDetailsArray = []
  results.forEach(function (result) {
    delete result.offenderManagerName
    crnMap.set(result['caseReferenceNo'], [])
  })
  results.forEach(function (result) {
    var temporaryMappedItems = []
    temporaryMappedItems = crnMap.get(result['caseReferenceNo'])
    temporaryMappedItems.push(result)
    crnMap.set(result['caseReferenceNo'], temporaryMappedItems)
  })
  var count = 0
  for (var value of crnMap.values()) {
    var countable = false
    var containsNormal = false
    value.forEach(function (v) {
      if (v.rowType == 'Unpaid Work' || v.rowType == 'Integrated Offender Management' || v.rowType == 'Persistent Prolific Offender') {
        countable = true
      }
      if (v.rowType == 'Normal') {
        containsNormal = true
      }
    })
    if (countable) {
      count ++
      countableCaseDetailsArray.push(value[0])
    }
    if (!containsNormal) {
      log.info(value)
    }
    if (value.length === 1) {
      if (value[0].rowType == 'Normal') {
        count ++
        countableCaseDetailsArray.push(value[0])
      }
    }
  }
  log.info(count)
  log.info(countableCaseDetailsArray.length)
  // fs.appendFile('filename', JSON.stringify(results), function (err) {
  //   if (err) throw err;
  //   console.log('Updated!');
  // });
}
