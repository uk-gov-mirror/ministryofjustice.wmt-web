const Scenario = require('../domain/scenario')

module.exports = function (results) {
  var scenarioMap = new Map()
  var scenarioArray = []
  results.forEach(function (result) {
    scenarioMap.set(result['workload_id'], [])
  })
  results.forEach(function (result) {
    var temporaryMappedItems = []
    temporaryMappedItems = scenarioMap.get(result['workload_id'])
    temporaryMappedItems.push(result)
    scenarioMap.set(result['workload_id'], temporaryMappedItems)
  })
  for (var value of scenarioMap.values()) {
    var scenarioObj = new Scenario(value)
    scenarioArray.push(scenarioObj)
  }
  scenarioArray.sort(fieldSorter(['ldu', 'team', 'name']))
  return scenarioArray
}

function fieldSorter(fields) {
  return function (a, b) {
    return fields
      .map(function (o) {
        var dir = 1
        if (o[0] === '-') {
          dir = -1;
          o = o.substring(1)
        }
        if (a[o] > b[o]) return dir
        if (a[o] < b[o]) return -(dir)
        return 0
      })
      .reduce(function firstNonZeroValue (p, n) {
        return p ? p : n
      }, 0)
  }
}
