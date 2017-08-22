const expect = require('chai').expect
const caseloadHelper = require('../../../../app/services/helpers/caseload-helper')
const caseType = require('../../../../app/constants/case-type.js')

const CASELOAD = {
  name: 'Todd Umptious',
  caseType: caseType.CUSTODY,
  gradeCode: 'PO',
  teamId: '1',
  linkId: '2',
  totalCases: 3,
  untiered: 1,
  d2: 1,
  d1: 0,
  c2: 0,
  c1: 1,
  b2: 0,
  b1: 1,
  a: 0
}

const CUSTODY_CASELOAD_0 = Object.assign({}, CASELOAD, { caseType: caseType.CUSTODY })
const COMMUNITY_CASELOAD_0 = Object.assign({}, CASELOAD, { totalCases: 6, caseType: caseType.COMMUNITY })
const LICENSE_CASELOAD_0 = Object.assign({}, CASELOAD, { totalCases: 9, caseType: caseType.LICENSE })
const OVERALL_CASELOAD_0 = Object.assign({}, CASELOAD, { totalCases: 18, untiered: 3, d2: 3, c1: 3, b1: 3 })

const CUSTODY_CASELOAD_1 = Object.assign({}, CASELOAD, { linkId: 3, caseType: caseType.CUSTODY })
const COMMUNITY_CASELOAD_1 = Object.assign({}, CASELOAD, { linkId: 3, totalCases: 6, caseType: caseType.COMMUNITY })
const LICENSE_CASELOAD_1 = Object.assign({}, CASELOAD, { linkId: 3, totalCases: 10, caseType: caseType.LICENSE })
const OVERALL_CASELOAD_1 = Object.assign({}, CASELOAD, { linkId: 3, totalCases: 19, untiered: 3, d2: 3, c1: 3, b1: 3 })

const CUSTODY_CASELOAD_2 = Object.assign({}, CASELOAD, { linkId: 4, caseType: caseType.CUSTODY })
const COMMUNITY_CASELOAD_2 = Object.assign({}, CASELOAD, { linkId: 4, totalCases: 6, caseType: caseType.COMMUNITY })
const LICENSE_CASELOAD_2 = Object.assign({}, CASELOAD, { linkId: 4, totalCases: 11, caseType: caseType.LICENSE })
const OVERALL_CASELOAD_2 = Object.assign({}, CASELOAD, { linkId: 4, totalCases: 20, untiered: 3, d2: 3, c1: 3, b1: 3 })

const TEAM_CASELOAD = [CUSTODY_CASELOAD_0, CUSTODY_CASELOAD_1, CUSTODY_CASELOAD_2,
  COMMUNITY_CASELOAD_0, COMMUNITY_CASELOAD_1, COMMUNITY_CASELOAD_2,
  LICENSE_CASELOAD_0, LICENSE_CASELOAD_1, LICENSE_CASELOAD_2]

const COMMUNITY_RESULTS = [COMMUNITY_CASELOAD_0, COMMUNITY_CASELOAD_1, COMMUNITY_CASELOAD_2]
const CUSTODY_RESULTS = [CUSTODY_CASELOAD_0, CUSTODY_CASELOAD_1, CUSTODY_CASELOAD_2]
const LICENSE_RESULTS = [LICENSE_CASELOAD_0, LICENSE_CASELOAD_1, LICENSE_CASELOAD_2]

describe('services/helpers/caseload-helper', function () {
  describe('getOverallCaseload', function () {
    it('should calculate caseload totals per linkId', function () {
      expect(caseloadHelper.getOverallCaseload(TEAM_CASELOAD)[0]).to.eql(OVERALL_CASELOAD_0)
      expect(caseloadHelper.getOverallCaseload(TEAM_CASELOAD)[1]).to.eql(OVERALL_CASELOAD_1)
      expect(caseloadHelper.getOverallCaseload(TEAM_CASELOAD)[2]).to.eql(OVERALL_CASELOAD_2)
    })
  })

  describe('getCaseloadByType', function () {
    it('should return any caseload rows of the given type', function () {
      expect(caseloadHelper.getCaseloadByType(TEAM_CASELOAD, caseType.COMMUNITY)).to.eql(COMMUNITY_RESULTS)
      expect(caseloadHelper.getCaseloadByType(TEAM_CASELOAD, caseType.CUSTODY)).to.eql(CUSTODY_RESULTS)
      expect(caseloadHelper.getCaseloadByType(TEAM_CASELOAD, caseType.LICENSE)).to.eql(LICENSE_RESULTS)
    })
  })

  describe('getCaseloadTotalSummary', function () {
    it('should calculate the total totalCases for the entire results set', function () {
      expect(caseloadHelper.getCaseloadTotalSummary(COMMUNITY_RESULTS)).to.eql(18)
      expect(caseloadHelper.getCaseloadTotalSummary(TEAM_CASELOAD)).to.eql(57)
    })
  })
})
