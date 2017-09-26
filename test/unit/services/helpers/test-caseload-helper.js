const expect = require('chai').expect
const caseloadHelper = require('../../../../app/services/helpers/caseload-helper')
const caseType = require('../../../../app/constants/case-type.js')

const CASELOAD = {
  name: 'Todd Umptious',
  caseType: caseType.CUSTODY,
  grade: 'PO',
  id: 1,
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

// linkId = 2, grade = PO
const CUSTODY_CASELOAD_PO_0 = Object.assign({}, CASELOAD, { linkId: 2, caseType: caseType.CUSTODY })
const COMMUNITY_CASELOAD_PO_0 = Object.assign({}, CASELOAD, { linkId: 2, totalCases: 6, caseType: caseType.COMMUNITY })
const LICENSE_CASELOAD_PO_0 = Object.assign({}, CASELOAD, { linkId: 2, totalCases: 9, caseType: caseType.LICENSE })
const OVERALL_CASELOAD_PO_0 = Object.assign({}, CASELOAD, { linkId: 2, totalCases: 18, untiered: 3, d2: 3, c1: 3, b1: 3 })

// linkId = 3, grade = PO
const CUSTODY_CASELOAD_PO_1 = Object.assign({}, CASELOAD, { linkId: 3, caseType: caseType.CUSTODY, name: 'Jerry Twig' })
const COMMUNITY_CASELOAD_PO_1 = Object.assign({}, CASELOAD, { linkId: 3, totalCases: 6, caseType: caseType.COMMUNITY, name: 'Jerry Twig' })
const LICENSE_CASELOAD_PO_1 = Object.assign({}, CASELOAD, { linkId: 3, totalCases: 10, caseType: caseType.LICENSE, name: 'Jerry Twig' })
const OVERALL_CASELOAD_PO_1 = Object.assign({}, CASELOAD, { linkId: 3, totalCases: 19, untiered: 3, d2: 3, c1: 3, b1: 3, name: 'Jerry Twig' })

// linkId = 4, grade = PO
const CUSTODY_CASELOAD_PO_2 = Object.assign({}, CASELOAD, { linkId: 4, caseType: caseType.CUSTODY, name: 'Jemima Racktool' })
const COMMUNITY_CASELOAD_PO_2 = Object.assign({}, CASELOAD, { linkId: 4, totalCases: 6, caseType: caseType.COMMUNITY, name: 'Jemima Racktool' })
const LICENSE_CASELOAD_PO_2 = Object.assign({}, CASELOAD, { linkId: 4, totalCases: 11, caseType: caseType.LICENSE, name: 'Jemima Racktool' })
const OVERALL_CASELOAD_PO_2 = Object.assign({}, CASELOAD, { linkId: 4, totalCases: 20, untiered: 3, d2: 3, c1: 3, b1: 3, name: 'Jemima Racktool' })

// linkId = 2, grade = PSO
const CUSTODY_CASELOAD_PSO_0 = Object.assign({}, CASELOAD, { linkId: 2, grade: 'PSO', caseType: caseType.CUSTODY })
const COMMUNITY_CASELOAD_PSO_0 = Object.assign({}, CASELOAD, { linkId: 2, grade: 'PSO', totalCases: 6, caseType: caseType.COMMUNITY })
const LICENSE_CASELOAD_PSO_0 = Object.assign({}, CASELOAD, { linkId: 2, grade: 'PSO', totalCases: 9, caseType: caseType.LICENSE })
const OVERALL_CASELOAD_PSO_0 = Object.assign({}, CASELOAD, { linkId: 2, grade: 'PSO', totalCases: 18, untiered: 3, d2: 3, c1: 3, b1: 3 })

// linkId = 3, grade = PSO
const CUSTODY_CASELOAD_PSO_1 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 3, caseType: caseType.CUSTODY, name: 'Jerry Twig' })
const COMMUNITY_CASELOAD_PSO_1 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 3, totalCases: 6, caseType: caseType.COMMUNITY, name: 'Jerry Twig' })
const LICENSE_CASELOAD_PSO_1 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 3, totalCases: 10, caseType: caseType.LICENSE, name: 'Jerry Twig' })
const OVERALL_CASELOAD_PSO_1 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 3, totalCases: 19, untiered: 3, d2: 3, c1: 3, b1: 3, name: 'Jerry Twig' })

// linkId = 4, grade = PSO
const CUSTODY_CASELOAD_PSO_2 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 4, caseType: caseType.CUSTODY, name: 'Jemima Racktool' })
const COMMUNITY_CASELOAD_PSO_2 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 4, totalCases: 6, caseType: caseType.COMMUNITY, name: 'Jemima Racktool' })
const LICENSE_CASELOAD_PSO_2 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 4, totalCases: 11, caseType: caseType.LICENSE, name: 'Jemima Racktool' })
const OVERALL_CASELOAD_PSO_2 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 4, totalCases: 20, untiered: 3, d2: 3, c1: 3, b1: 3, name: 'Jemima Racktool' })

const LDU_OVERALL_SUMMARY_LINKID_2 = {name: 'Todd Umptious', linkId: 2, totalCases: 36, custodyTotalCases: 6, communityTotalCases: 12, licenseTotalCases: 18}
const LDU_OVERALL_SUMMARY_LINKID_3 = {name: 'Jerry Twig', linkId: 3, totalCases: 38, custodyTotalCases: 6, communityTotalCases: 12, licenseTotalCases: 20}
const LDU_OVERALL_SUMMARY_LINKID_4 = {name: 'Jemima Racktool', linkId: 4, totalCases: 40, custodyTotalCases: 6, communityTotalCases: 12, licenseTotalCases: 22}

// In team caseload the linkId is workloadOwner Id so is unique
// ie only 3 entries (commuity, custody,license) for each linkId
// Means we don't worry about grade in team caseloads
const TEAM_CASELOAD = [CUSTODY_CASELOAD_PO_0, CUSTODY_CASELOAD_PO_1, CUSTODY_CASELOAD_PO_2,
  COMMUNITY_CASELOAD_PO_0, COMMUNITY_CASELOAD_PO_1, COMMUNITY_CASELOAD_PO_2,
  LICENSE_CASELOAD_PO_0, LICENSE_CASELOAD_PO_1, LICENSE_CASELOAD_PO_2]

const TEAM_COMMUNITY_RESULTS = [COMMUNITY_CASELOAD_PO_0, COMMUNITY_CASELOAD_PO_1, COMMUNITY_CASELOAD_PO_2]
const TEAM_CUSTODY_RESULTS = [CUSTODY_CASELOAD_PO_0, CUSTODY_CASELOAD_PO_1, CUSTODY_CASELOAD_PO_2]
const TEAM_LICENSE_RESULTS = [LICENSE_CASELOAD_PO_0, LICENSE_CASELOAD_PO_1, LICENSE_CASELOAD_PO_2]

// In ldu linkId is teamId, shared by multiple workload owners
// Means we need to have same linkIds with mulitple grades
const LDU_CASELOAD = [CUSTODY_CASELOAD_PO_0, CUSTODY_CASELOAD_PO_1, CUSTODY_CASELOAD_PO_2,
  COMMUNITY_CASELOAD_PO_0, COMMUNITY_CASELOAD_PO_1, COMMUNITY_CASELOAD_PO_2,
  LICENSE_CASELOAD_PO_0, LICENSE_CASELOAD_PO_1, LICENSE_CASELOAD_PO_2,
  CUSTODY_CASELOAD_PSO_0, CUSTODY_CASELOAD_PSO_1, CUSTODY_CASELOAD_PSO_2,
  COMMUNITY_CASELOAD_PSO_0, COMMUNITY_CASELOAD_PSO_1, COMMUNITY_CASELOAD_PSO_2,
  LICENSE_CASELOAD_PSO_0, LICENSE_CASELOAD_PSO_1, LICENSE_CASELOAD_PSO_2]

const LDU_CUSTODY_RESULTS = [CUSTODY_CASELOAD_PO_0, CUSTODY_CASELOAD_PO_1, CUSTODY_CASELOAD_PO_2,
  CUSTODY_CASELOAD_PSO_0, CUSTODY_CASELOAD_PSO_1, CUSTODY_CASELOAD_PSO_2]

const LDU_CUSTODY_AGGREGATED_RESULTS = [
  {linkId: 2,
    name: 'Todd Umptious',
    grades: [
      {grade: CUSTODY_CASELOAD_PO_0.grade,
        totalCases: CUSTODY_CASELOAD_PO_0.totalCases,
        untiered: CUSTODY_CASELOAD_PO_0.untiered,
        d2: CUSTODY_CASELOAD_PO_0.d2,
        d1: CUSTODY_CASELOAD_PO_0.d1,
        c2: CUSTODY_CASELOAD_PO_0.c2,
        c1: CUSTODY_CASELOAD_PO_0.c1,
        b2: CUSTODY_CASELOAD_PO_0.b2,
        b1: CUSTODY_CASELOAD_PO_0.b1,
        a: CUSTODY_CASELOAD_PO_0.a},
      {grade: CUSTODY_CASELOAD_PSO_0.grade,
        totalCases: CUSTODY_CASELOAD_PSO_0.totalCases,
        untiered: CUSTODY_CASELOAD_PSO_0.untiered,
        d2: CUSTODY_CASELOAD_PSO_0.d2,
        d1: CUSTODY_CASELOAD_PSO_0.d1,
        c2: CUSTODY_CASELOAD_PSO_0.c2,
        c1: CUSTODY_CASELOAD_PSO_0.c1,
        b2: CUSTODY_CASELOAD_PSO_0.b2,
        b1: CUSTODY_CASELOAD_PSO_0.b1,
        a: CUSTODY_CASELOAD_PSO_0.a}
    ]},
  {linkId: 3,
    name: 'Jerry Twig',
    grades: [
      {grade: CUSTODY_CASELOAD_PO_1.grade,
        totalCases: CUSTODY_CASELOAD_PO_1.totalCases,
        untiered: CUSTODY_CASELOAD_PO_1.untiered,
        d2: CUSTODY_CASELOAD_PO_1.d2,
        d1: CUSTODY_CASELOAD_PO_1.d1,
        c2: CUSTODY_CASELOAD_PO_1.c2,
        c1: CUSTODY_CASELOAD_PO_1.c1,
        b2: CUSTODY_CASELOAD_PO_1.b2,
        b1: CUSTODY_CASELOAD_PO_1.b1,
        a: CUSTODY_CASELOAD_PO_1.a},
      {grade: CUSTODY_CASELOAD_PSO_1.grade,
        totalCases: CUSTODY_CASELOAD_PSO_0.totalCases,
        untiered: CUSTODY_CASELOAD_PSO_0.untiered,
        d2: CUSTODY_CASELOAD_PSO_1.d2,
        d1: CUSTODY_CASELOAD_PSO_1.d1,
        c2: CUSTODY_CASELOAD_PSO_1.c2,
        c1: CUSTODY_CASELOAD_PSO_1.c1,
        b2: CUSTODY_CASELOAD_PSO_1.b2,
        b1: CUSTODY_CASELOAD_PSO_1.b1,
        a: CUSTODY_CASELOAD_PSO_1.a}
    ]},
  {linkId: 4,
    name: 'Jemima Racktool',
    grades: [
      {grade: CUSTODY_CASELOAD_PO_1.grade,
        totalCases: CUSTODY_CASELOAD_PO_1.totalCases,
        untiered: CUSTODY_CASELOAD_PO_1.untiered,
        d2: CUSTODY_CASELOAD_PO_1.d2,
        d1: CUSTODY_CASELOAD_PO_1.d1,
        c2: CUSTODY_CASELOAD_PO_1.c2,
        c1: CUSTODY_CASELOAD_PO_1.c1,
        b2: CUSTODY_CASELOAD_PO_1.b2,
        b1: CUSTODY_CASELOAD_PO_1.b1,
        a: CUSTODY_CASELOAD_PO_1.a},
      {grade: CUSTODY_CASELOAD_PSO_1.grade,
        totalCases: CUSTODY_CASELOAD_PSO_1.totalCases,
        untiered: CUSTODY_CASELOAD_PSO_0.untiered,
        d2: CUSTODY_CASELOAD_PSO_1.d2,
        d1: CUSTODY_CASELOAD_PSO_1.d1,
        c2: CUSTODY_CASELOAD_PSO_1.c2,
        c1: CUSTODY_CASELOAD_PSO_1.c1,
        b2: CUSTODY_CASELOAD_PSO_1.b2,
        b1: CUSTODY_CASELOAD_PSO_1.b1,
        a: CUSTODY_CASELOAD_PSO_1.a}
    ]}
]

const LDU_CUSTODY_PERCENTAGE_RESULTS = [
  {linkId: 2,
    name: 'Todd Umptious',
    grades: [
      {grade: CUSTODY_CASELOAD_PO_0.grade, totalCases: 50, untiered: 50, d2: 50, d1: 0, c2: 0, c1: 50, b2: 0, b1: 50, a: 0},
      {grade: CUSTODY_CASELOAD_PSO_0.grade, totalCases: 50, untiered: 50, d2: 50, d1: 0, c2: 0, c1: 50, b2: 0, b1: 50, a: 0}
    ]
  },
  {linkId: 3,
    name: 'Jerry Twig',
    grades: [
      {grade: CUSTODY_CASELOAD_PO_0.grade, totalCases: 50, untiered: 50, d2: 50, d1: 0, c2: 0, c1: 50, b2: 0, b1: 50, a: 0},
      {grade: CUSTODY_CASELOAD_PSO_0.grade, totalCases: 50, untiered: 50, d2: 50, d1: 0, c2: 0, c1: 50, b2: 0, b1: 50, a: 0}
    ]
  },
  {linkId: 4,
    name: 'Jemima Racktool',
    grades: [
      {grade: CUSTODY_CASELOAD_PO_0.grade, totalCases: 50, untiered: 50, d2: 50, d1: 0, c2: 0, c1: 50, b2: 0, b1: 50, a: 0},
      {grade: CUSTODY_CASELOAD_PSO_0.grade, totalCases: 50, untiered: 50, d2: 50, d1: 0, c2: 0, c1: 50, b2: 0, b1: 50, a: 0}
    ]
  }
]
describe('services/helpers/caseload-helper', function () {
  describe('getCaseloadTierTotalsByTeamByGrade', function () {
    it('should calculate the tier totals across locations for each individual(linkId) in team', function () {
      var result = caseloadHelper.getCaseloadTierTotalsByTeamByGrade(TEAM_CASELOAD)
      expect(result[0]).to.eql(OVERALL_CASELOAD_PO_0)
      expect(result[1]).to.eql(OVERALL_CASELOAD_PO_1)
      expect(result[2]).to.eql(OVERALL_CASELOAD_PO_2)
    })

    it('should calculate the tier totals across locations for each team(linkId)-grade combination', function () {
      var result = caseloadHelper.getCaseloadTierTotalsByTeamByGrade(LDU_CASELOAD)
      expect(result[0]).to.eql(OVERALL_CASELOAD_PO_0)
      expect(result[1]).to.eql(OVERALL_CASELOAD_PO_1)
      expect(result[2]).to.eql(OVERALL_CASELOAD_PO_2)
      expect(result[3]).to.eql(OVERALL_CASELOAD_PSO_0)
      expect(result[4]).to.eql(OVERALL_CASELOAD_PSO_1)
      expect(result[5]).to.eql(OVERALL_CASELOAD_PSO_2)
    })
  })

  describe('getCaseloadSummaryTotalsByTeam', function () {
    it('should calculate the total number of custody, community, license and total per grade per team', function () {
      // pass in grouped people in team => ?
      var result = caseloadHelper.getCaseloadSummaryTotalsByTeam(LDU_CASELOAD)
      expect(result.length).to.eql(3)
      expect(result[0]).to.eql(LDU_OVERALL_SUMMARY_LINKID_2)
      expect(result[1]).to.eql(LDU_OVERALL_SUMMARY_LINKID_3)
      expect(result[2]).to.eql(LDU_OVERALL_SUMMARY_LINKID_4)
    })
  })

  describe('aggregateTeamTierTotals', function () {
    it('should sum the tiers totals for each team and for each location within a team', function () {
      var result = caseloadHelper.aggregateTeamTierTotals(LDU_CUSTODY_RESULTS)
      expect(result).to.eql(LDU_CUSTODY_AGGREGATED_RESULTS)
    })
  })

  describe('calculateTeamTierPercentages', function () {
    it('should calculate each grades tier totals as percentage of the team totals', function () {
      var result = caseloadHelper.calculateTeamTierPercentages(LDU_CUSTODY_RESULTS)
      expect(result).to.eql(LDU_CUSTODY_PERCENTAGE_RESULTS)
    })
  })

  describe('getCaseloadByType', function () {
    it('should return any caseload rows of the given type', function () {
      expect(caseloadHelper.getCaseloadByType(TEAM_CASELOAD, caseType.COMMUNITY)).to.eql(TEAM_COMMUNITY_RESULTS)
      expect(caseloadHelper.getCaseloadByType(TEAM_CASELOAD, caseType.CUSTODY)).to.eql(TEAM_CUSTODY_RESULTS)
      expect(caseloadHelper.getCaseloadByType(TEAM_CASELOAD, caseType.LICENSE)).to.eql(TEAM_LICENSE_RESULTS)
    })
  })

  describe('getCaseloadTotalSummary', function () {
    it('should calculate the total totalCases for the entire results set', function () {
      expect(caseloadHelper.getCaseloadTotalSummary(TEAM_COMMUNITY_RESULTS)).to.eql(18)
      expect(caseloadHelper.getCaseloadTotalSummary(TEAM_CASELOAD)).to.eql(57)
    })
  })
})
