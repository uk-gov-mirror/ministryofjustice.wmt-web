const expect = require('chai').expect

const getScenario = require('../../../../app/services/data/get-scenario')

var scenarioData

describe('services/data/get-scenario team', function () {
  before(function () {
    return getScenario(10570, 'team').then(function (results) {
      scenarioData = results
    })
  })
  it('should retrieve all 5 Scenario Objects for HMPPS > Division 1 > LDU Cluster 1 > Team 1', function () {
    expect(scenarioData.length).to.eql(5)
  })
  it('Each Licence Case Numbers Array should contain 8 objects', function () {
    scenarioData.forEach(function (scenario) {
      expect(scenario.licenceCaseNumbers.length).to.eql(8)
    })
  })
  it('Each Community Case Numbers Array should contain 8 objects', function () {
    scenarioData.forEach(function (scenario) {
      expect(scenario.communityCaseNumbers.length).to.eql(8)
    })
  })
  it('Each Custody Case Numbers Array should contain 8 objects', function () {
    scenarioData.forEach(function (scenario) {
      expect(scenario.custodyCaseNumbers.length).to.eql(8)
    })
  })
})

describe('services/data/get-scenario ldu', function () {
  before(function () {
    return getScenario(9625, 'ldu').then(function (results) {
      scenarioData = results
    })
  })
  it('should retrieve all 5 Scenario Objects for HMPPS > Division 1 > LDU Cluster 1', function () {
    expect(scenarioData.length).to.eql(10)
  })
  it('Each Licence Case Numbers Array should contain 8 objects', function () {
    scenarioData.forEach(function (scenario) {
      expect(scenario.licenceCaseNumbers.length).to.eql(8)
    })
  })
  it('Each Community Case Numbers Array should contain 8 objects', function () {
    scenarioData.forEach(function (scenario) {
      expect(scenario.communityCaseNumbers.length).to.eql(8)
    })
  })
  it('Each Custody Case Numbers Array should contain 8 objects', function () {
    scenarioData.forEach(function (scenario) {
      expect(scenario.custodyCaseNumbers.length).to.eql(8)
    })
  })
})

describe('services/data/get-scenario division', function () {
  before(function () {
    return getScenario(8359, 'region').then(function (results) {
      scenarioData = results
    })
  })
  it('should retrieve all 5 Scenario Objects for HMPPS > Division 1', function () {
    expect(scenarioData.length).to.eql(10)
  })
  it('Each Licence Case Numbers Array should contain 8 objects', function () {
    scenarioData.forEach(function (scenario) {
      expect(scenario.licenceCaseNumbers.length).to.eql(8)
    })
  })
  it('Each Community Case Numbers Array should contain 8 objects', function () {
    scenarioData.forEach(function (scenario) {
      expect(scenario.communityCaseNumbers.length).to.eql(8)
    })
  })
  it('Each Custody Case Numbers Array should contain 8 objects', function () {
    scenarioData.forEach(function (scenario) {
      expect(scenario.custodyCaseNumbers.length).to.eql(8)
    })
  })
})
