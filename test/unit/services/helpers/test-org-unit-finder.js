const expect = require('chai').expect
const orgUnitFinder = require('../../../../app/services/helpers/org-unit-finder')
const orgUnit = require('../../../../app/constants/organisation-unit')

describe('services/get-org-unit-finder', function () {
  it('should return the correct object when passed a org unit property', function () {
    expect(orgUnitFinder('name', 'team')).to.eql(orgUnit.TEAM)
    expect(orgUnitFinder('ref', 'R')).to.eql(orgUnit.REGION)
  })

  it('should return undefined when passed an invalid property name', function () {
    expect(orgUnitFinder('id', 'team')).to.eql(undefined)
    expect(orgUnitFinder('123', 'team')).to.eql(undefined)
  })

  it('should return undefined when passed a value that does not exist', function () {
    expect(orgUnitFinder('name', 'person')).to.eql(undefined)
  })
})
