/* eslint-disable no-new */
const moment = require('moment')
const expect = require('chai').expect
const Reduction = require('../../../../app/services/domain/reduction')
const reductionStatusType = require('../../../../app/constants/reduction-status-type')

let activeStartDate = moment().subtract(30, 'days').toDate()
let activeEndDate = moment().add(30, 'days').toDate()
const reductionReason = {
  maxAllowanceHours: 11
}

describe('services/domain/reduction', function () {
  it('should construct a new-reduction object with the correct values', function () {
    const reduction = new Reduction('1', '10',
      [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
      [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'active note', reductionReason, 150)
    expect(reduction.hours).to.equal(10)
    expect(reduction.reasonForReductionId).to.equal(1)
    expect(reduction.reductionStartDate).to.be.a('date')
    expect(reduction.reductionEndDate).to.be.a('date')
    expect(reduction.notes).to.be.a('string')
    expect(reduction.status).to.be.equal(reductionStatusType.ACTIVE)
    expect(reduction.reductionSubmitter).to.equal(150)
  })

  it('should raise a ValidationError if Hours is not supplied', function () {
    expect(function () {
      new Reduction('1', '',
        [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
        [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'active note', reductionReason)
    }).to.throw()
      .that.has.a.property('validationErrors')
      .that.has.a.property('reductionHours')
  })

  it('should raise a ValidationError if Reason is not supplied', function () {
    expect(function () {
      new Reduction('', '10',
        [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
        [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'active note', reductionReason)
    }).to.throw()
      .that.has.a.property('validationErrors')
      .that.has.a.property('reasonForReductionId')
      .that.contains('Reason for reduction is required')
  })

  it('should raise a ValidationError if Start Date is not valid', function () {
    activeStartDate = moment().add(200, 'years').toDate()
    activeEndDate = moment().add(201, 'years').toDate()
    expect(function () {
      new Reduction('1', '10',
        [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
        [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'active note', reductionReason)
    }).to.throw()
      .that.has.a.property('validationErrors')
      .that.has.a.property('reductionStartDate')
      .that.contains('Reduction start date was invalid')
  })

  it('should raise a ValidationError if End Date is before Start Date', function () {
    activeStartDate = moment().subtract(30, 'days').toDate()
    activeEndDate = moment().subtract(2, 'months').toDate()
    expect(function () {
      new Reduction('1', '10',
        [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
        [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'active note', reductionReason)
    }).to.throw()
      .that.has.a.property('validationErrors')
      .that.has.a.property('reductionEndDate')
      .that.contains('Reduction end date must be after Reduction start date')
  })

  it('should raise a ValidationError if Notes exceed max length', function () {
    expect(function () {
      const longNote = getLongString()
      new Reduction('1', '10',
        [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
        [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], longNote, reductionReason)
    }).to.throw()
      .that.has.a.property('validationErrors')
      .that.has.a.property('notes')
  })

  it('should raise a ValidationError if the hours are outside the range permitted for the reduction reason', function () {
    const hours = '20'
    expect(function () {
      new Reduction('1', hours,
        [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
        [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'active note', reductionReason)
    }).to.throw()
      .that.has.a.property('validationErrors')
      .that.has.a.property('reductionHours')
      .that.contains('Reduction hours must be a number between 0 and ' + reductionReason.maxAllowanceHours)
  })

  function getLongString () {
    return '*'.repeat(4001)
  }
})
