const expect = require('chai').expect
const linkGenerator = require('../../../app/services/helpers/link-generator')

describe('services/helpers/link-generator', function () {
  it('should return the correct link for each organisational unit, including ID', function () {
    expect(linkGenerator('R1')).to.eql('/region/1')
    expect(linkGenerator('L34')).to.eql('/ldu/34')
    expect(linkGenerator('T178')).to.eql('/team/178')
  })

  it('should return the correct link for national level (no ID)', function () {
    expect(linkGenerator('N')).to.eql('/nps')
  })

  it('should throw an error when passed undefined reference', function () {
    expect(() => linkGenerator(undefined)).to.throw(/undefined/)
  })

  it('should throw an error when passed a reference with an organisational unit ID that does not exist', function () {
    expect(() => linkGenerator('Y4')).to.throw(/not valid/)
  })

  it('should throw an error when passed a reference of an incorrect format', function () {
    expect(() => linkGenerator('123')).to.throw(/incorrect format/)
    expect(() => linkGenerator('r1')).to.throw(/incorrect format/)
    expect(() => linkGenerator('Region1')).to.throw(/incorrect format/)
    expect(() => linkGenerator('Team1A')).to.throw(/incorrect format/)
  })
})
