const UnauthorizedError = require('../../../../app/services/errors/authentication-error.js').Unauthorized
const ForbiddenError = require('../../../../app/services/errors/authentication-error.js').Forbidden

const expect = require('chai').expect

describe('services/errors/validation-error', function () {
  it('should construct an Unauthorization error with status code of 401', function (done) {
    const Unauthorized = new UnauthorizedError('error message', '/')
    expect(Unauthorized.message).to.equal('error message')
    expect(Unauthorized.statusCode).to.equal(401)
    expect(Unauthorized.redirect).to.equal('/')
    done()
  })

  it('should construct a Forbidden error with status code of 403', function (done) {
    const Forbidden = new ForbiddenError('error message', '/')
    expect(Forbidden.message).to.equal('error message')
    expect(Forbidden.statusCode).to.equal(403)
    expect(Forbidden.redirect).to.equal('/')
    done()
  })
})
