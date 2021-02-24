const expect = require('chai').expect

const getArchivedReductions = require('../../../../app/services/data/get-reduction-archive')
const ArchiveDateRange = require('../../../../app/services/domain/archive-date-range')

const expectedResult = {
  omName: 'A.N. Offender Manager KNTK042PSO',
  hoursReduced: 18.8,
  comments: '67A1623',
  lastUpdatedDate: new Date('2014-10-24T10:14:14.093Z'),
  reductionAddedBy: 'Reduction Submitter 5'
}

let archiveReductionData

const archiveDateRange = new ArchiveDateRange(24, 10, 2014, 20, 1, 2017)

describe('services/data/get-archived-reductions', function () {
  before(function () {
    return getArchivedReductions(archiveDateRange).then(function (results) {
      archiveReductionData = results
    })
  })
  it('should retrieve all 5 columns for archive data', function () {
    expect(archiveReductionData[0].omName).to.eql(expectedResult.omName)
    expect(archiveReductionData[0].reductionAddedBy).to.eql(expectedResult.reductionAddedBy)
    expect(archiveReductionData[0].comments).to.eql(expectedResult.comments)
    expect(archiveReductionData[0].reductionAddedBy).to.eql(expectedResult.reductionAddedBy)
  })
})
