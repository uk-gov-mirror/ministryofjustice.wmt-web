const expect = require('chai').expect
const createReductionReasonDBObject = require('../../../../app/services/helpers/create-reduction-reason-db-object')
const ReductionReason = require('../../../../app/services/domain/reduction-reason')

describe('services/helpers/create-reduction-reason-db-object', function () {
  it('should remove null optional fields from insert object', function () {
    const testReductionReason = new ReductionReason('Test Reduction Reason', 'TRR1', '1', '', '', '', 'true')
    const insertObject = createReductionReasonDBObject(testReductionReason)
    expect(insertObject).to.deep.eql({
      reason: 'Test Reduction Reason',
      reason_short_name: 'TRR1',
      category_id: 1,
      is_enabled: true
    })
  })

  it('should not remove optional fields from insert object when not null', function () {
    const testReductionReason = new ReductionReason('Test Reduction Reason', 'TRR1', '1', '20', '20', '6', 'true')
    const insertObject = createReductionReasonDBObject(testReductionReason)
    expect(insertObject).to.deep.eql({
      allowance_percentage: 20,
      max_allowance_percentage: 20,
      months_to_expiry: 6,
      reason: 'Test Reduction Reason',
      reason_short_name: 'TRR1',
      category_id: 1,
      is_enabled: true
    })
  })
})
