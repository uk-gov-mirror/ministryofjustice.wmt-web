const expect = require('chai').expect
const insertReductionReason = require('../../../../app/services/data/insert-reduction-reason')
const ReductionReason = require('../../../../app/services/domain/reduction-reason')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')

const getReductionReasonById = require('../../../../app/services/data/get-reduction-reason-by-id')

const ids = []

describe('/services/data/insert-reduction-reason', function () {
  it('should insert a reduction reason with blank optional fields', function () {
    const testReductionReason = new ReductionReason('Test Reduction Reason', 'TRR1', '1', '', '', '', 'true')
    return insertReductionReason(testReductionReason)
      .then(function (id) {
        ids.push(id)
        return getReductionReasonById(id)
          .then(function (reductionReason) {
            expect(reductionReason.category).to.equal('Personal Circumstances')
            expect(reductionReason.reason).to.equal('Test Reduction Reason')
            expect(reductionReason.reasonShortName).to.equal('TRR1')
            expect(reductionReason.allowancePercentage).to.equal(null)
            expect(reductionReason.maxAllowancePercentage).to.equal(null)
            expect(reductionReason.monthsToExpiry).to.equal(null)
            expect(reductionReason.isEnabled).to.equal(true)
          })
      })
  })

  it('should insert a reduction reason with optional fields filled in', function () {
    const testReductionReason = new ReductionReason('Test Reduction Reason', 'TRR1', '1', '20', '20', '6', 'true')
    return insertReductionReason(testReductionReason)
      .then(function (id) {
        ids.push(id)
        return getReductionReasonById(id)
          .then(function (reductionReason) {
            expect(reductionReason.category).to.equal('Personal Circumstances')
            expect(reductionReason.reason).to.equal('Test Reduction Reason')
            expect(reductionReason.reasonShortName).to.equal('TRR1')
            expect(reductionReason.allowancePercentage).to.equal(20)
            expect(reductionReason.maxAllowancePercentage).to.equal(20)
            expect(reductionReason.monthsToExpiry).to.equal(6)
            expect(reductionReason.isEnabled).to.equal(true)
          })
      })
  })

  after(function () {
    return dataHelper.deleteRecordsFromTableForIds('reduction_reason', ids)
  })
})
