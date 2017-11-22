const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')
require('sinon-bluebird')
const proxyquire = require('proxyquire')

const archiveRawData = [{
    uniqueIdentifier: '1',
    lduName: 'Test LDU',
    teamName: 'Test Team',
    omName: 'Test Offender Manager',
    totalCases: 1,
    totalPoints: 6,
    nominalTarget: 2171,
    contractedHours: 0,
    hoursReduction: 0,
    reduction: null,
    comments: null
}]

const expectedArchiveRecord = {
    uniqueIdentifier: '1',
    lduName: 'Test LDU',
    teamName: 'Test Team',
    omName: 'Test Offender Manager',
    totalCases: 1,
    totalPoints: 6,
    nominalTarget: 2171,
    contractedHours: 0,
    hoursReduction: 0,
    reduction: 0,
    comments: '',
    capacity: '0.01%'
}

var archiveService
var getArchive

beforeEach(function () {
    getArchive = sinon.stub()
    archiveService = proxyquire('../../../app/services/archive-service', {'./data/get-archive': getArchive })
})

describe('services/archive-service', function() {
    it('should return a capacity percentage formatted to two decimal places and appended with a percentage symbol', function() {
        getArchive.resolves(archiveRawData)
        return archiveService().then(function(result) {
            expect(result[0].capacity).to.eql(firstArchiveRecord.capacity)
        })
    })
})