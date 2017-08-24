const expect = require('chai').expect
const Reduction = require('../../../../app/services/domain/new-reduction')

describe('services/domain/new-reduction', function () {
  it('should construct a new-redution object with the correct values', function () {
    var reduction = new Reduction(1, 5, new Date(), new Date(), 'This is a test note')

    expect(reduction.hours).to.equal(5)
    expect(reduction.reasonForReductionId).to.equal(1)
    expect(reduction.reductionStartDate).to.be.a('date')
    expect(reduction.reductionEndDate).to.be.a('date')
    expect(reduction.notes).to.be.a('string')
  })
})
