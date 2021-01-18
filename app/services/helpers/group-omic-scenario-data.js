const Scenario = require('../domain/omic-scenario')

module.exports = function (results) {
  const scenarioMap = new Map()
  const scenarioArray = []
  results.forEach(function (result) {
    scenarioMap.set(result.workload_id, [])
  })
  results.forEach(function (result) {
    let temporaryMappedItems = []
    temporaryMappedItems = scenarioMap.get(result.workload_id)
    temporaryMappedItems.push(result)
    scenarioMap.set(result.workload_id, temporaryMappedItems)
  })
  for (const value of scenarioMap.values()) {
    const scenarioObj = new Scenario(value)
    scenarioArray.push(scenarioObj)
  }
  scenarioArray.sort(fieldSorter(['ldu', 'team', 'name']))
  return scenarioArray
}

function fieldSorter (fields) {
  return function (a, b) {
    return fields
      .map(function (o) {
        let dir = 1
        if (o[0] === '-') {
          dir = -1
          o = o.substring(1)
        }
        if (a[o] > b[o]) return dir
        if (a[o] < b[o]) return -(dir)
        return 0
      })
      .reduce(function firstNonZeroValue (p, n) {
        if (p) {
          return p
        } else {
          return n
        }
      }, 0)
  }
}
