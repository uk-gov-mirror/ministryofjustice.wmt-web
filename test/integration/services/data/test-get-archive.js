const expect = require('chai').expect

const getArchive = require('../../../../app/services/data/get-daily-archive')
const ArchiveDateRange = require('../../../../app/services/domain/archive-date-range')

const expectedResult = {
  workloadID: 2745,
  workloadDate: new Date('2014-06-18T14:18:46.000Z'),
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
  hoursReduction: 0
}

let archiveData

const archiveDateRange = new ArchiveDateRange(18, 6, 2014, 26, 8, 2016)

describe('services/data/get-daily-archive', function () {
  before(function () {
    return getArchive(archiveDateRange).then(function (results) {
      archiveData = results
    })
  })
  it('should retrieve all twelve columns for archive data', function () {
    expect(archiveData[0].workloadID).to.eql(expectedResult.workloadID)
    expect(archiveData[0].lduName).to.eql(expectedResult.lduName)
    expect(archiveData[0].teamName).to.eql(expectedResult.teamName)
    expect(archiveData[0].omName).to.eql(expectedResult.omName)
    expect(archiveData[0].totalCases).to.eql(expectedResult.totalCases)
    expect(archiveData[0].totalPoints).to.eql(expectedResult.totalPoints)
    expect(archiveData[0].sdrPoints).to.eql(expectedResult.sdrPoints)
    expect(archiveData[0].sdrConversionPoints).to.eql(expectedResult.sdrConversionPoints)
    expect(archiveData[0].paromsPoints).to.eql(expectedResult.paromsPoints)
    expect(archiveData[0].nominalTarget).to.eql(expectedResult.nominalTarget)
    expect(archiveData[0].contractedHours).to.eql(expectedResult.contractedHours)
    expect(archiveData[0].hoursReduction).to.eql(expectedResult.hoursReduction)
  })
})
