const expect = require('chai').expect
const groupScenarioData = require('../../../../app/services/helpers/group-scenario-data')
const scenarioData = require('../../../helpers/data/raw-scenario-data')

var scenarioObjectsArray

describe('services/helpers/group-scenario-data', function () {
  before(function () {
    scenarioObjectsArray = groupScenarioData(scenarioData)
  })

  it('should return an array with 2 objects', function () {
    expect(scenarioObjectsArray.length).to.eql(2)
  })

  it('should return 3 arrays of 8 objects within each Scenario Object', function () {
    scenarioObjectsArray.forEach(function (scenarioObject) {
      expect(scenarioObject.licenceCaseNumbers.length).to.eql(8)
      expect(scenarioObject.custodyCaseNumbers.length).to.eql(8)
      expect(scenarioObject.communityCaseNumbers.length).to.eql(8)
    })
  })
})
