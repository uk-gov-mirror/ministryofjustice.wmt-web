const expect = require('chai').expect
const UserRole = require('../../../../app/services/domain/user-role')

describe('services/domain/user-role', function () {
  it('should construct a new-user-role object', function () {
    const userRole = new UserRole(1, 2, new Date(), 3)

    expect(userRole.userId).to.equal(1)
    expect(userRole.roleId).to.equal(2)
    expect(userRole.lastUpdated).to.be.a('date')
    expect(userRole.lastUpdatedBy).to.equal(3)
  })
})
