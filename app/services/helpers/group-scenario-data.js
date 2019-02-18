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
  scenarioArray.sort(sortScenarioArray)
  return scenarioArray
}

var sortScenarioArray = function (scenarioObj1, scenarioObj2) {
  if (scenarioObj1.name.toUpperCase() > scenarioObj2.name.toUpperCase()) {
    return 1
  }
  if (scenarioObj1.name.toUpperCase() < scenarioObj2.name.toUpperCase()) {
    return -1
  }
  return 0
}
