const expect = require('chai').expect
const caseloadHelper = require('../../../../app/services/helpers/caseload-helper')
const caseType = require('../../../../app/constants/case-type')
const helper = require('../../../helpers/caseload-helper')

describe('services/helpers/caseload-helper', function () {
  describe('getCaseloadTierTotalsByTeamByGrade', function () {
    it('should calculate the tier totals across locations for each individual(linkId) in team', function () {
      const result = caseloadHelper.getCaseloadTierTotalsByTeamByGrade(helper.TEAM_CASELOAD)
      expect(result[0]).to.eql(helper.OVERALL_CASELOAD_PO_0)
      expect(result[1]).to.eql(helper.OVERALL_CASELOAD_PO_1)
      expect(result[2]).to.eql(helper.OVERALL_CASELOAD_PO_2)
    })

    it('should calculate the tier totals across locations for each team(linkId)-grade combination', function () {
      const result = caseloadHelper.getCaseloadTierTotalsByTeamByGrade(helper.LDU_CASELOAD)
      expect(result[0]).to.eql(helper.OVERALL_CASELOAD_PO_0)
      expect(result[1]).to.eql(helper.OVERALL_CASELOAD_PO_1)
      expect(result[2]).to.eql(helper.OVERALL_CASELOAD_PO_2)
      expect(result[3]).to.eql(helper.OVERALL_CASELOAD_PSO_0)
      expect(result[4]).to.eql(helper.OVERALL_CASELOAD_PSO_1)
      expect(result[5]).to.eql(helper.OVERALL_CASELOAD_PSO_2)
    })
  })

  describe('getCaseloadSummaryTotalsByTeam', function () {
    it('should calculate the total number of custody, community, license and total per grade per team', function () {
      // pass in grouped people in team => ?
      const result = caseloadHelper.getCaseloadSummaryTotalsByTeam(helper.LDU_CASELOAD)
      expect(result.length).to.eql(3)
      expect(result[0]).to.eql(helper.LDU_OVERALL_SUMMARY_LINKID_2)
      expect(result[1]).to.eql(helper.LDU_OVERALL_SUMMARY_LINKID_3)
      expect(result[2]).to.eql(helper.LDU_OVERALL_SUMMARY_LINKID_4)
    })
  })

  describe('aggregateTeamTierTotals', function () {
    it('should sum the tiers totals for each team and for each location within a team', function () {
      const result = caseloadHelper.aggregateTeamTierTotals(helper.LDU_CUSTODY_RESULTS)
      expect(result).to.eql(helper.LDU_CUSTODY_AGGREGATED_RESULTS)
    })
  })

  describe('calculateTeamTierPercentages', function () {
    it('should calculate each grades tier totals as percentage of the team totals', function () {
      const result = caseloadHelper.calculateTeamTierPercentages(helper.LDU_CUSTODY_RESULTS)
      expect(result).to.eql(helper.LDU_CUSTODY_AGGREGATED_RESULTS)
    })
  })

  describe('getCaseloadByType', function () {
    it('should return any caseload rows of the given type', function () {
      expect(caseloadHelper.getCaseloadByType(helper.TEAM_CASELOAD, caseType.COMMUNITY)).to.eql(helper.TEAM_COMMUNITY_RESULTS)
      expect(caseloadHelper.getCaseloadByType(helper.TEAM_CASELOAD, caseType.CUSTODY)).to.eql(helper.TEAM_CUSTODY_RESULTS)
      expect(caseloadHelper.getCaseloadByType(helper.TEAM_CASELOAD, caseType.LICENSE)).to.eql(helper.TEAM_LICENSE_RESULTS)
    })
  })

  describe('getCaseloadTotalSummary', function () {
    it('should calculate the total totalCases for the entire results set', function () {
      expect(caseloadHelper.getCaseloadTotalSummary(helper.TEAM_COMMUNITY_RESULTS)).to.eql(18)
      expect(caseloadHelper.getCaseloadTotalSummary(helper.TEAM_CASELOAD)).to.eql(57)
    })
  })
})
