const expect = require('chai').expect
const linkGenerator = require('../../../../app/services/helpers/link-generator')
const workloadType = require('../../../../app/constants/workload-type')

describe('services/helpers/link-generator', function () {
  describe('fromReferenceAndWorkloadType', function () {
    it('should return the correct link for each organisational unit, including ID', function () {
      expect(linkGenerator.fromReferenceAndWorkloadType('R1', workloadType.PROBATION)).to.eql('/probation/region/1')
      expect(linkGenerator.fromReferenceAndWorkloadType('L34', workloadType.PROBATION)).to.eql('/probation/ldu/34')
      expect(linkGenerator.fromReferenceAndWorkloadType('T178', workloadType.PROBATION)).to.eql('/probation/team/178')
    })

    it('should return the correct link for each organisational unit, including ID for court-reports', function () {
      expect(linkGenerator.fromReferenceAndWorkloadType('R1', workloadType.COURT_REPORTS)).to.eql('/court-reports/region/1')
      expect(linkGenerator.fromReferenceAndWorkloadType('L34', workloadType.COURT_REPORTS)).to.eql('/court-reports/ldu/34')
      expect(linkGenerator.fromReferenceAndWorkloadType('T178', workloadType.COURT_REPORTS)).to.eql('/court-reports/team/178')
    })

    it('should return the correct link for national level (no ID)', function () {
      expect(linkGenerator.fromReferenceAndWorkloadType('N', workloadType.PROBATION)).to.eql('/probation/hmpps/0')
    })

    it('should return the correct link for national level (no ID) for court-reports', function () {
      expect(linkGenerator.fromReferenceAndWorkloadType('N', workloadType.COURT_REPORTS)).to.eql('/court-reports/hmpps/0')
    })

    it('should throw an error when passed undefined reference', function () {
      expect(() => linkGenerator.fromReferenceAndWorkloadType(undefined, workloadType.COURT_REPORTS)).to.throw(/undefined/)
    })

    it('should throw an error when passed a reference with an organisational unit ID that does not exist', function () {
      expect(() => linkGenerator.fromReferenceAndWorkloadType('Y4', workloadType.PROBATION)).to.throw(/not valid/)
    })

    it('should throw an error when passed an invalid workload type', function () {
      expect(() => linkGenerator.fromReferenceAndWorkloadType('R1', 'invalid workload type')).to.throw(/invalid workload type is not a valid workload type/)
    })

    it('should throw an error when passed a reference of an incorrect format', function () {
      expect(() => linkGenerator.fromReferenceAndWorkloadType('123', workloadType.PROBATION)).to.throw(/incorrect format/)
      expect(() => linkGenerator.fromReferenceAndWorkloadType('r1', workloadType.PROBATION)).to.throw(/incorrect format/)
      expect(() => linkGenerator.fromReferenceAndWorkloadType('Region1', workloadType.PROBATION)).to.throw(/incorrect format/)
      expect(() => linkGenerator.fromReferenceAndWorkloadType('Team1A', workloadType.PROBATION)).to.throw(/incorrect format/)
    })
  })
  describe('fromIdAndNameAndWorkloadType', function () {
    it('should generate a link based on the id and name supplied', function () {
      expect(linkGenerator.fromIdAndNameAndWorkloadType(1, 'offender-manager', workloadType.PROBATION)).to.eql('/probation/offender-manager/1')
    })

    it('should generate a link based on the id and name supplied for court-reports', function () {
      expect(linkGenerator.fromIdAndNameAndWorkloadType(1, 'offender-manager', workloadType.COURT_REPORTS)).to.eql('/court-reports/offender-manager/1')
    })

    it('should return no trailing slashes when an empty id is supplied', function () {
      expect(linkGenerator.fromIdAndNameAndWorkloadType(undefined, 'hmpps', workloadType.PROBATION)).to.eql('/probation/hmpps/0')
      expect(linkGenerator.fromIdAndNameAndWorkloadType('', 'hmpps', workloadType.PROBATION)).to.eql('/probation/hmpps/0')
    })

    it('should throw an error when passed an invalid name', function () {
      expect(() => linkGenerator.fromIdAndNameAndWorkloadType(1, undefined, workloadType.PROBATION)).to.throw(/undefined/)
    })

    it('shoud throw an error when passed an invalid workload type', function () {
      expect(() => linkGenerator.fromIdAndNameAndWorkloadType(1, 'offender-manager', 'invalid workload type')).to.throw(/invalid workload type is not a valid workload type/)
    })

    it('should throw an error if an id field is supplied and isn\'t a number', function () {
      expect(() => linkGenerator.fromIdAndNameAndWorkloadType('non-number', 'team', workloadType.PROBATION)).to.throw(/number/)
    })
  })
})
