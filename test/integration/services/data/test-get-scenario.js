const expect = require('chai').expect

const getScenario = require('../../../../app/services/data/get-scenario')
const getTeam = require('../../../../app/services/data/get-team-by-name')
const getLDU = require('../../../../app/services/data/get-ldu-by-name')
const getRegion = require('../../../../app/services/data/get-region-by-name')

var scenarioData

describe('services/data/get-scenario team', function () {
  before(function () {
    return getTeam('Team 1').then(function (id) {
      return getScenario(id, 'team').then(function (results) {
        scenarioData = results
      })
    })
  })
  it('should retrieve all 120 raw scenario records for HMPPS > Division 1 > Probation Delivery Unit 1 > Team 1', function () {
    expect(scenarioData.length).to.eql(120)
  })
})

describe('services/data/get-scenario ldu', function () {
  before(function () {
    return getLDU('LDU Cluster 1').then(function (id) {
      return getScenario(id, 'ldu').then(function (results) {
        scenarioData = results
      })
    })
  })
  it('should retrieve all 240 raw scenario records for HMPPS > Division 1 > Probation Delivery Unit 1', function () {
    expect(scenarioData.length).to.eql(240)
  })
})

describe('services/data/get-scenario division', function () {
  before(function () {
    return getRegion('Division 1').then(function (id) {
      return getScenario(id, 'region').then(function (results) {
        scenarioData = results
      })
    })
  })
  it('should retrieve all 240 raw scenario records for HMPPS > Division 1', function () {
    expect(scenarioData.length).to.eql(240)
  })
})
