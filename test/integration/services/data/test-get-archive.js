const expect = require('chai').expect

const getArchive = require('../../../../app/services/data/get-archive')

var expectedResult = {
  uniqueIdentifier: '1',
  lduName: 'All NPS North West',
  teamName: 'Chesh & Gt Manch CRC - CRC Transfers',
  omName: 'A.N. Offender Manager 1',
  totalCases: 1,
  totalPoints: 6,
  sdrPoints: 0,
  sdrConversionPoints: 0,
  paromsPoints: 0,
  nominalTarget: 2171,
  contractedHours: 0,
  hoursReduction: 0,
  reduction: null,
  comments: null,
  omTypeId: 5
}

var archiveData

describe('services/data/get-archive', function () {
  before(function () {
    return getArchive().then(function (results) {
      archiveData = results
    })
  })
  it('should retrieve all twelve columns for archive data', function () {
    expect(archiveData[0]).to.eql(expectedResult)
  })
  it('should include offender managers without reductions', function () {
    let bool = false
    for (var i = 0; i < archiveData.length; i++) {
      if (archiveData[i].reduction === null) {
        bool = true
        break
      }
    }
    expect(bool).to.be.true //eslint-disable-line
  })
  it('should include offender mananagers with reductions', function () {
    let bool = false
    for (var i = 0; i < archiveData.length; i++) {
      if (archiveData[i].reduction !== null) {
        bool = true
        break
      }
    }
    expect(bool).to.be.true //eslint-disable-line
  })
})
