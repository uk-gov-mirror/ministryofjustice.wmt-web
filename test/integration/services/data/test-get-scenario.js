const expect = require('chai').expect

const getScenario = require('../../../../app/services/data/get-scenario')

var scenarioData

describe('services/data/get-scenario team', function () {
  before(function () {
    return getScenario(10570, 'team').then(function (results) {
      scenarioData = results
    })
  })
  it('should retrieve all 120 raw scenario records for HMPPS > Division 1 > LDU Cluster 1 > Team 1', function () {
    expect(scenarioData.length).to.eql(120)
  })
})

describe('services/data/get-scenario ldu', function () {
  before(function () {
    return getScenario(9625, 'ldu').then(function (results) {
      scenarioData = results
    })
  })
  it('should retrieve all 240 raw scenario records for HMPPS > Division 1 > LDU Cluster 1', function () {
    expect(scenarioData.length).to.eql(240)
  })
})

describe('services/data/get-scenario division', function () {
  before(function () {
    return getScenario(8359, 'region').then(function (results) {
      scenarioData = results
    })
  })
  it('should retrieve all 240 raw scenario records for HMPPS > Division 1', function () {
    expect(scenarioData.length).to.eql(240)
  })
})
