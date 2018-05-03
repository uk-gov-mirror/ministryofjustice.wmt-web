const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')
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

var archiveService
var getArchive

before(function () {
  getArchive = sinon.stub()
  archiveService = proxyquire('../../../app/services/archive-service', {'./data/get-daily-archive': getArchive})
  getArchive.resolves(archiveRawData)
})

describe('services/archive-service', function () {
  /*it('should return zero for reduction hours when a null value is passed', function () {
    return archiveService().then(function (result) {
      expect(result[0].reduction).to.eql(expectedArchiveRecord.reduction)
    })
  })
  it('should return an empty string for comments when a null value is passed', function () {
    return archiveService().then(function (result) {
      expect(result[0].comments).to.eql(expectedArchiveRecord.comments)
    })
  })*/
  it('should return a capacity percentage formatted to two decimal places and appended with a percentage symbol', function () {
    return archiveService(archiveOptions.DAILY).then(function (result) {
      expect(result[0].capacity).to.eql(expectedArchiveRecord.capacity)
    })
  })
})
