const expect = require('chai').expect
const tableCreator = require('../../../../app/services/helpers/table-creator')

describe('services/helpers/table-creator custom round', function () {
  it('should return undefined when passed an undefined value', function () {
    var empty
    expect(tableCreator.customRound(empty).to.eql(undefined))
  })

  it('should return zero when passed a zero value', function () {
    expect(tableCreator.customRound(0).to.eql(0))
  })

  it('should return round down when less than 0.6', function () {
    expect(tableCreator.customRound(4.5).to.eql(4))
  })

  it('should return round up when equal to 0.6', function () {
    expect(tableCreator.customRound(155.6).to.eql(156))
  })

  it('should return round up when greater than 0.6', function () {
    expect(tableCreator.customRound(9023.999382).to.eql(9024))
  })

  it('should still work when passed a string', function () {
    expect(tableCreator.customRound('15.59').to.eql(15))
  })

  it('should return undefined when passed an empty string', function () {
    expect(tableCreator.customRound('').to.eql(undefined))
  })
})
