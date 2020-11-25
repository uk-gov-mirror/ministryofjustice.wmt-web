const expect = require('chai').expect
const sinon = require('sinon')

const proxyquire = require('proxyquire')
const archiveOptions = require('../../../app/constants/archive-options')

const archiveRawData = [{
  uniqueIdentifier: '1',
  lduName: 'Test LDU',
  teamName: 'Test Team',
  omName: 'Test Offender Manager',
  totalCases: 23,
  totalPoints: 1183,
  sdrPoints: 0,
  sdrConversionPoints: 0,
  paromsPoints: 0,
  nominalTarget: 2171,
  contractedHours: 37,
  hoursReduction: 0,
  reduction: null,
  comments: null,
  omTypeId: 1
}]

const newArchiveRawData = [{
  uniqueIdentifier: '1',
  lduName: 'New Test LDU',
  teamName: 'New Test Team',
  omName: 'New Test Offender Manager',
  totalCases: 11,
  totalPoints: 900,
  sdrPoints: 0,
  sdrConversionPoints: 0,
  paromsPoints: 0,
  nominalTarget: 1222,
  contractedHours: 37,
  hoursReduction: 0,
  reduction: null,
  comments: null,
  omTypeId: 1
}]

const expectedArchiveRecord = {
  uniqueIdentifier: '1',
  lduName: 'Test LDU',
  teamName: 'Test Team',
  omName: 'Test Offender Manager',
  totalCases: 23,
  totalPoints: 1183,
  sdrPoints: 0,
  sdrConversionPoints: 0,
  paromsPoints: 0,
  nominalTarget: 2171,
  contractedHours: 37,
  hoursReduction: 0,
  reduction: 0,
  comments: '',
  omTypeId: 1,
  capacity: '55.2%'
}

let archiveService
let getArchive
let getArchiveNewDB

before(function () {
  getArchive = sinon.stub()
  getArchiveNewDB = sinon.stub()
  archiveService = proxyquire('../../../app/services/archive-service',
    {
      './data/get-daily-archive': getArchive,
      './data/get-daily-archive-from-new-db': getArchiveNewDB
    })
  getArchive.resolves(archiveRawData)
  getArchiveNewDB.resolves(newArchiveRawData)
})

describe('services/archive-service', function () {
  it('should return a capacity percentage formatted to two decimal places and appended with a percentage symbol', function () {
    return archiveService(archiveOptions.DAILY).then(function (result) {
      expect(result[0].capacity).to.eql(expectedArchiveRecord.capacity)
    })
  })
})
