/* eslint-disable no-new */
const moment = require('moment')
const expect = require('chai').expect
const Reduction = require('../../../../app/services/domain/reduction')
const ValidationError = require('../../../../app/services/errors/validation-error')
const reductionStatusType = require('../../../../app/constants/reduction-status-type')

describe('services/domain/reduction', function () {
  it('should construct a new-reduction object with the correct values', function () {
    var activeStartDate = moment().subtract(30, 'days').toDate()
    var activeEndDate = moment().add(30, 'days').toDate()
    var reduction = new Reduction('1', '10',
      [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
      [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'active note')
    expect(reduction.hours).to.equal(10)
    expect(reduction.reasonForReductionId).to.equal(1)
    expect(reduction.reductionStartDate).to.be.a('date')
    expect(reduction.reductionEndDate).to.be.a('date')
    expect(reduction.notes).to.be.a('string')
    expect(reduction.status).to.be.equal(reductionStatusType.ACTIVE)
  })

  it('should raise a ValidationError if Hours is not supplied', function () {
    var activeStartDate = moment().subtract(30, 'days').toDate()
    var activeEndDate = moment().add(30, 'days').toDate()
    expect(function () {
      new Reduction('1', '',
        [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
        [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'active note')
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if Reason is not supplied', function () {
    var activeStartDate = moment().subtract(30, 'days').toDate()
    var activeEndDate = moment().add(30, 'days').toDate()
    expect(function () {
      new Reduction('select', '10',
        [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
        [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'active note')
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if Start Date is not valid', function () {
    var activeStartDate = moment().subtract(200, 'years').toDate()
    var activeEndDate = moment().add(30, 'days').toDate()
    expect(function () {
      new Reduction('1', '10',
        [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
        [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'active note')
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if End Date is before Start Date', function () {
    var activeStartDate = moment().subtract(30, 'days').toDate()
    var activeEndDate = moment().subtract(2, 'months').toDate()
    expect(function () {
      new Reduction('1', '10',
        [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
        [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'active note')
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if Notes exceed max length', function () {
    var activeStartDate = moment().subtract(30, 'days').toDate()
    var activeEndDate = moment().add(30, 'days').toDate()
    expect(function () {
      var longNote = getLongString()
      new Reduction('1', '10',
        [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
        [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], longNote)
    }).to.throw(ValidationError)
  })

  function getLongString () {
    return '*'.repeat(4001)
  }
})
