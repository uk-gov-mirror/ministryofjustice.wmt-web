const expect = require('chai').expect
const linkGenerator = require('../../../../app/services/helpers/link-generator')
const workloadType = require('../../../../app/constants/workload-type')

describe('services/helpers/link-generator', function () {
  describe('fromReference', function () {
    it('should return the correct link for each organisational unit, including ID', function () {
      expect(linkGenerator.fromReference('R1')).to.eql('/probation/region/1')
      expect(linkGenerator.fromReference('L34')).to.eql('/probation/ldu/34')
      expect(linkGenerator.fromReference('T178')).to.eql('/probation/team/178')
    })

    it('should return the correct link for each organisational unit, including ID for court-reports', function () {
      expect(linkGenerator.fromReference('R1', workloadType.COURT_REPORTS)).to.eql('/court-reports/region/1')
      expect(linkGenerator.fromReference('L34', workloadType.COURT_REPORTS)).to.eql('/court-reports/ldu/34')
      expect(linkGenerator.fromReference('T178', workloadType.COURT_REPORTS)).to.eql('/court-reports/team/178')
    })

    it('should return the correct link for national level (no ID)', function () {
      expect(linkGenerator.fromReference('N')).to.eql('/probation/hmpps/0')
    })

    it('should return the correct link for national level (no ID) for court-reports', function () {
      expect(linkGenerator.fromReference('N', workloadType.COURT_REPORTS)).to.eql('/court-reports/hmpps/0')
    })

    it('should throw an error when passed undefined reference', function () {
      expect(() => linkGenerator.fromReference(undefined)).to.throw(/undefined/)
    })

    it('should throw an error when passed a reference with an organisational unit ID that does not exist', function () {
      expect(() => linkGenerator.fromReference('Y4')).to.throw(/not valid/)
    })

    it('should throw an error when passed a reference of an incorrect format', function () {
      expect(() => linkGenerator.fromReference('123')).to.throw(/incorrect format/)
      expect(() => linkGenerator.fromReference('r1')).to.throw(/incorrect format/)
      expect(() => linkGenerator.fromReference('Region1')).to.throw(/incorrect format/)
      expect(() => linkGenerator.fromReference('Team1A')).to.throw(/incorrect format/)
    })
  })
  describe('fromIdAndName', function () {
    it('should generate a link based on the id and name supplied', function () {
      expect(linkGenerator.fromIdAndName(1, 'offender-manager')).to.eql('/probation/offender-manager/1')
    })

    it('should generate a link based on the id and name supplied for court-reports', function () {
      expect(linkGenerator.fromIdAndName(1, 'offender-manager', workloadType.COURT_REPORTS)).to.eql('/court-reports/offender-manager/1')
    })

    it('should return no trailing slashes when an empty id is supplied', function () {
      expect(linkGenerator.fromIdAndName(undefined, 'hmpps')).to.eql('/probation/hmpps/0')
      expect(linkGenerator.fromIdAndName('', 'hmpps')).to.eql('/probation/hmpps/0')
    })

    it('should throw an error when passed an invalid name', function () {
      expect(() => linkGenerator.fromIdAndName(1, undefined)).to.throw(/undefined/)
    })

    it('should throw an error if an id field is supplied and isn\'t a number', function () {
      expect(() => linkGenerator.fromIdAndName('non-number', 'team')).to.throw(/number/)
    })
  })
})
