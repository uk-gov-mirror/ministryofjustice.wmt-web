const expect = require('chai').expect
const ViewUtilisation = require('../../../../app/services/domain/view-utilisation')

var viewUtilisation
describe('services/domain/view-utilisation', function () {
  const VALID_USER_ID = 1
  const VALID_YEAR = 2016

  it('should construct a domain object given valid input', function () {
    viewUtilisation = new ViewUtilisation(VALID_USER_ID, VALID_YEAR)

    expect(viewUtilisation.userId).to.equal(VALID_USER_ID)
    expect(viewUtilisation.year).to.equal(VALID_YEAR)
  })


})
