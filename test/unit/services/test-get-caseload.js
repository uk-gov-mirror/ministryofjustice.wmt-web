const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')

const proxyquire = require('proxyquire')
const orgUnitConstant = require('../../../app/constants/organisation-unit.js')
const orgUnitFinder = require('../../../app/services/helpers/org-unit-finder')
const caseType = require('../../../app/constants/case-type.js')
const breadcrumbHelper = require('../../helpers/breadcrumb-helper')

const CASELOAD = [
  { linkId: 1317, grade: 'DMY', totalCases: 0, caseType: caseType.COMMUNITY, untiered: 0, d2: 0, d1: 0, c2: 0, c1: 0, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'PO', totalCases: 0, caseType: caseType.COMMUNITY, untiered: 0, d2: 0, d1: 0, c2: 0, c1: 0, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'PSO', totalCases: 0, caseType: caseType.COMMUNITY, untiered: 0, d2: 0, d1: 0, c2: 0, c1: 0, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'DMY', totalCases: 2, caseType: caseType.CUSTODY, untiered: 0, d2: 2, d1: 0, c2: 0, c1: 0, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'PO', totalCases: 500, caseType: caseType.CUSTODY, untiered: 0, d2: 306, d1: 1, c2: 181, c1: 4, b2: 7, b1: 1, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'PSO', totalCases: 206, caseType: caseType.CUSTODY, untiered: 0, d2: 147, d1: 1, c2: 57, c1: 1, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'DMY', totalCases: 0, caseType: caseType.LICENSE, untiered: 0, d2: 0, d1: 0, c2: 0, c1: 0, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'PO', totalCases: 10, caseType: caseType.LICENSE, untiered: 0, d2: 4, d1: 0, c2: 5, c1: 0, b2: 1, b1: 0, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'PSO', totalCases: 2, caseType: caseType.LICENSE, untiered: 0, d2: 1, d1: 0, c2: 1, c1: 0, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' }
]

const CUSTODY_CASELOAD = [
  { linkId: 1317, grade: 'DMY', totalCases: 2, caseType: caseType.CUSTODY, untiered: 0, d2: 2, d1: 0, c2: 0, c1: 0, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'PO', totalCases: 500, caseType: caseType.CUSTODY, untiered: 0, d2: 306, d1: 1, c2: 181, c1: 4, b2: 7, b1: 1, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'PSO', totalCases: 206, caseType: caseType.CUSTODY, untiered: 0, d2: 147, d1: 1, c2: 57, c1: 1, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' }
]

const LICENSE_CASELOAD = [
  { linkId: 1317, grade: 'DMY', totalCases: 0, caseType: caseType.LICENSE, untiered: 0, d2: 0, d1: 0, c2: 0, c1: 0, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'PO', totalCases: 10, caseType: caseType.LICENSE, untiered: 0, d2: 4, d1: 0, c2: 5, c1: 0, b2: 1, b1: 0, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'PSO', totalCases: 2, caseType: caseType.LICENSE, untiered: 0, d2: 1, d1: 0, c2: 1, c1: 0, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' }
]

const COMMUNITY_CASELOAD = [
  { linkId: 1317, grade: 'DMY', totalCases: 0, caseType: caseType.COMMUNITY, untiered: 0, d2: 0, d1: 0, c2: 0, c1: 0, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'PO', totalCases: 0, caseType: caseType.COMMUNITY, untiered: 0, d2: 0, d1: 0, c2: 0, c1: 0, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'PSO', totalCases: 0, caseType: caseType.COMMUNITY, untiered: 0, d2: 0, d1: 0, c2: 0, c1: 0, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' }
]

const OVERALL_RESULTS = [
  { linkId: 1317, grade: 'DMY', totalCases: 2, caseType: caseType.COMMUNITY, untiered: 0, d2: 2, d1: 0, c2: 0, c1: 0, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'PO', totalCases: 510, caseType: caseType.COMMUNITY, untiered: 0, d2: 310, d1: 1, c2: 186, c1: 4, b2: 8, b1: 1, a: 0, name: 'NPS UNIT' },
  { linkId: 1317, grade: 'PSO', totalCases: 208, caseType: caseType.COMMUNITY, untiered: 0, d2: 148, d1: 1, c2: 58, c1: 1, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' }
]

const OVERALL_PERCENTAGE_RESULTS = {
  details: [
    {
      linkId: 1317,
      name: 'NPS FOREIGN NATIONALS UNIT ',
      grades: [
        { grade: 'DMY', a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 2, untiered: 0, totalCases: 2 },
        { grade: 'PO', a: 0, b1: 1, b2: 8, c1: 4, c2: 186, d1: 1, d2: 310, untiered: 0, totalCases: 510 },
        { grade: 'PSO', a: 0, b1: 0, b2: 0, c1: 1, c2: 58, d1: 1, d2: 148, untiered: 0, totalCases: 208 }
      ]
    }
  ],
  totals: {
    DMY: { grade: 'DMY', a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 2, untiered: 0, totalCases: 2, numberOfType: 1 },
    PO: { grade: 'PO', a: 0, b1: 1, b2: 8, c1: 4, c2: 186, d1: 1, d2: 310, untiered: 0, totalCases: 510, numberOfType: 1 },
    PSO: { grade: 'PSO', a: 0, b1: 0, b2: 0, c1: 1, c2: 58, d1: 1, d2: 148, untiered: 0, totalCases: 208, numberOfType: 1 }
  },
  detailsPercentages: [
    {
      linkId: 1317,
      name: 'NPS FOREIGN NATIONALS UNIT ',
      grades: [
        { grade: 'DMY', a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0.43478260869565216, untiered: 0, totalCases: 0.2777777777777778 },
        { grade: 'PO', a: 0, b1: 100, b2: 100, c1: 80, c2: 76.22950819672131, d1: 50, d2: 67.3913043478261, untiered: 0, totalCases: 70.83333333333334 },
        { grade: 'PSO', a: 0, b1: 0, b2: 0, c1: 20, c2: 23.770491803278688, d1: 50, d2: 32.17391304347826, untiered: 0, totalCases: 28.888888888888886 }
      ]
    }
  ],
  percentageTotals: {
    DMY: { grade: 'DMY', a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0.43478260869565216, untiered: 0, totalCases: 0.2777777777777778, numberOfType: 1 },
    PO: { grade: 'PO', a: 0, b1: 100, b2: 100, c1: 80, c2: 76.22950819672131, d1: 50, d2: 67.3913043478261, untiered: 0, totalCases: 70.83333333333334, numberOfType: 1 },
    PSO: { grade: 'PSO', a: 0, b1: 0, b2: 0, c1: 20, c2: 23.770491803278688, d1: 50, d2: 32.17391304347826, untiered: 0, totalCases: 28.888888888888886, numberOfType: 1 }
  }
}

const CORRECTED_PERCENTAGE_RESULTS = {
  DMY: { linkId: 1317, grade: 'DMY', totalCases: 0.2777777777777778, caseType: 'COMMUNITY', untiered: 0, d2: 0.43478260869565216, d1: 0, c2: 0, c1: 0, b2: 0, b1: 0, a: 0, name: 'NPS UNIT ' },
  PO: { LinkId: 1317, grade: 'PO', totalCases: 70.83333333333334, caseType: 'COMMUNITY', untiered: 0, d2: 67.3913043478261, d1: 50, c2: 76.22950819672131, c1: 80, b2: 100, b1: 100, a: 0, name: 'NPS UNIT' },
  PSO: { LinkId: 1317, grade: 'PSO', totalCases: 28.888888888888886, caseType: 'COMMUNITY', untiered: 0, d2: 32.17391304347826, d1: 50, c2: 23.770491803278688, c1: 20, b2: 0, b1: 0, a: 0, name: 'NPS UNIT' }
}

let OVERALL_CASELOAD = Object.assign({}, COMMUNITY_CASELOAD, LICENSE_CASELOAD, CUSTODY_CASELOAD)
OVERALL_CASELOAD = [OVERALL_CASELOAD]

const LDU_CASELOAD = [
  Object.assign({}, CASELOAD),
  Object.assign({}, CASELOAD)
]

const id = 1317
const breadcrumbs = breadcrumbHelper.TEAM_BREADCRUMBS
const expectedTitle = breadcrumbs[0].title

let getCaseload
let getCaseloadDetail
let getBreadcrumbs
let caseloadHelper
let teamName
let lduName

beforeEach(function () {
  getCaseloadDetail = sinon.stub()
  getBreadcrumbs = sinon.stub().returns(breadcrumbs)
  caseloadHelper = {
    getCaseloadTierTotalsByTeamByGrade: sinon.stub(),
    getCaseloadSummaryTotalsByTeam: sinon.stub(),
    aggregateTeamTierTotals: sinon.stub(),
    calculateTeamTierPercentages: sinon.stub().returns(OVERALL_PERCENTAGE_RESULTS),
    getCaseloadByType: sinon.stub().returns(CASELOAD),
    getCaseloadTotalSummary: sinon.stub(),
    calculateTotalTiersRow: sinon.stub(),
    calculateTotalsRow: sinon.stub(),
    totalAllCases: sinon.stub().returns({ a: 0, b1: 1, b2: 8, c1: 5, c2: 244, d1: 2, d2: 460, untiered: 0, totalCases: 720 }),
    groupCaseloadByGrade: sinon.stub().returns(OVERALL_RESULTS),
    calculateOverallPercentages: sinon.stub().returns(CORRECTED_PERCENTAGE_RESULTS)
  }
  getCaseload =
    proxyquire('../../../app/services/get-caseload',
      {
        './data/get-caseload': getCaseloadDetail,
        './get-breadcrumbs': getBreadcrumbs,
        './helpers/caseload-helper': caseloadHelper
      })
  teamName = orgUnitConstant.TEAM.name
  lduName = orgUnitConstant.LDU.name
})

describe('services/get-caseload', function () {
  it('should call get-breadcrumbs and return a results object with breadcrumbs, title and subtitle', function () {
    getCaseloadDetail.withArgs(id, teamName).resolves(OVERALL_CASELOAD)
    caseloadHelper.getCaseloadTierTotalsByTeamByGrade.returns(OVERALL_RESULTS)
    caseloadHelper.getCaseloadSummaryTotalsByTeam.returns([{}])
    caseloadHelper.getCaseloadByType.withArgs(OVERALL_CASELOAD, caseType.CUSTODY).returns({})
    caseloadHelper.getCaseloadByType.withArgs(OVERALL_CASELOAD, caseType.COMMUNITY).returns({})
    caseloadHelper.getCaseloadByType.withArgs(OVERALL_CASELOAD, caseType.LICENSE).returns({})
    caseloadHelper.calculateTotalTiersRow.withArgs([{}]).returns({})
    return getCaseload(id, teamName).then(function (result) {
      const teamSubtitle = orgUnitFinder('name', teamName).displayText
      assert(getBreadcrumbs.called)
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.eql(teamSubtitle)
      expect(result.title).to.eql(expectedTitle)
    })
  })

  it('should call get-caseload data service with the correct parameters', function () {
    getCaseloadDetail.withArgs(id, lduName).resolves(OVERALL_CASELOAD)
    caseloadHelper.getCaseloadTierTotalsByTeamByGrade.returns(OVERALL_RESULTS)
    caseloadHelper.calculateOverallPercentages.returns(CORRECTED_PERCENTAGE_RESULTS)
    caseloadHelper.calculateTeamTierPercentages.withArgs(OVERALL_RESULTS).returns(OVERALL_PERCENTAGE_RESULTS)
    caseloadHelper.aggregateTeamTierTotals.returns(OVERALL_PERCENTAGE_RESULTS)
    caseloadHelper.calculateTotalTiersRow.withArgs([{}]).returns({})
    caseloadHelper.getCaseloadSummaryTotalsByTeam.returns([{}])
    return getCaseload(id, lduName).then(function (result) {
      expect(getCaseloadDetail.calledWith(id, lduName)).to.be.true //eslint-disable-line
    })
  })

  it('should call expected functions for team and return populated caseloadDetails', function () {
    getCaseloadDetail.withArgs(id, teamName).resolves(OVERALL_CASELOAD)
    caseloadHelper.calculateOverallPercentages.returns(CORRECTED_PERCENTAGE_RESULTS)
    caseloadHelper.getCaseloadTierTotalsByTeamByGrade.returns(OVERALL_RESULTS)
    caseloadHelper.getCaseloadSummaryTotalsByTeam.returns([{}])
    caseloadHelper.getCaseloadByType.withArgs(OVERALL_CASELOAD, caseType.CUSTODY).returns('custodyCaseloads')
    caseloadHelper.getCaseloadByType.withArgs(OVERALL_CASELOAD, caseType.COMMUNITY).returns('communityCaseloads')
    caseloadHelper.getCaseloadByType.withArgs(OVERALL_CASELOAD, caseType.LICENSE).returns('licenseCaseloads')
    caseloadHelper.getCaseloadTotalSummary.withArgs('custodyCaseloads').returns('custodySummary')
    caseloadHelper.getCaseloadTotalSummary.withArgs('communityCaseloads').returns('communitySummary')
    caseloadHelper.getCaseloadTotalSummary.withArgs('licenseCaseloads').returns('licenseSummary')
    caseloadHelper.calculateTotalTiersRow.withArgs([{}]).returns({})

    const expectedCaseloadDetails = {
      overallCaseloadDetails: OVERALL_RESULTS,
      communityCaseloadDetails: 'communityCaseloads',
      custodyCaseloadDetails: 'custodyCaseloads',
      licenseCaseloadDetails: 'licenseCaseloads',
      overallTotalSummary: [
        {
          totals: {}
        }
      ],
      custodyTotalSummary: 'custodySummary',
      communityTotalSummary: 'communitySummary',
      licenseTotalSummary: 'licenseSummary'
    }
    return getCaseload(id, teamName)
      .then(function (result) {
        expect(caseloadHelper.getCaseloadTierTotalsByTeamByGrade.calledWith(OVERALL_CASELOAD)).to.be.eql(true)
        expect(caseloadHelper.getCaseloadSummaryTotalsByTeam.calledWith(OVERALL_CASELOAD)).to.be.eql(true)
        expect(caseloadHelper.getCaseloadByType.calledWith(OVERALL_CASELOAD, caseType.CUSTODY)).to.be.eql(true)
        expect(caseloadHelper.getCaseloadByType.calledWith(OVERALL_CASELOAD, caseType.COMMUNITY)).to.be.eql(true)
        expect(caseloadHelper.getCaseloadByType.calledWith(OVERALL_CASELOAD, caseType.LICENSE)).to.be.eql(true)
        expect(caseloadHelper.getCaseloadTotalSummary.calledWith('custodyCaseloads')).to.be.eql(true)
        expect(caseloadHelper.getCaseloadTotalSummary.calledWith('communityCaseloads')).to.be.eql(true)
        expect(caseloadHelper.getCaseloadTotalSummary.calledWith('licenseCaseloads')).to.be.eql(true)

        expect(result.caseloadDetails).to.be.eql(expectedCaseloadDetails)
      })
  })

  it('should call expected functions for LDU and return populated caseloadDetails', function () {
    getCaseloadDetail.withArgs(id, lduName).resolves(LDU_CASELOAD)
    caseloadHelper.getCaseloadTierTotalsByTeamByGrade.returns(OVERALL_RESULTS)
    caseloadHelper.calculateTeamTierPercentages.withArgs(OVERALL_RESULTS).returns(OVERALL_PERCENTAGE_RESULTS)
    caseloadHelper.getCaseloadSummaryTotalsByTeam.returns([{}])
    caseloadHelper.getCaseloadByType.withArgs(LDU_CASELOAD, caseType.CUSTODY).returns('custodyCaseloads')
    caseloadHelper.getCaseloadByType.withArgs(LDU_CASELOAD, caseType.COMMUNITY).returns('communityCaseloads')
    caseloadHelper.getCaseloadByType.withArgs(LDU_CASELOAD, caseType.LICENSE).returns('licenseCaseloads')
    caseloadHelper.getCaseloadTotalSummary.withArgs('custodyCaseloads').returns('custodySummary')
    caseloadHelper.getCaseloadTotalSummary.withArgs('communityCaseloads').returns('communitySummary')
    caseloadHelper.getCaseloadTotalSummary.withArgs('licenseCaseloads').returns('licenseSummary')

    caseloadHelper.aggregateTeamTierTotals.returns(OVERALL_PERCENTAGE_RESULTS)
    caseloadHelper.aggregateTeamTierTotals.returns(OVERALL_PERCENTAGE_RESULTS)
    caseloadHelper.aggregateTeamTierTotals.returns(OVERALL_PERCENTAGE_RESULTS)
    caseloadHelper.calculateTotalTiersRow.withArgs([{}]).returns({})

    const expectedCaseloadDetails = {
      overallCaseloadDetails: OVERALL_PERCENTAGE_RESULTS,
      communityCaseloadDetails: OVERALL_PERCENTAGE_RESULTS,
      custodyCaseloadDetails: OVERALL_PERCENTAGE_RESULTS,
      licenseCaseloadDetails: OVERALL_PERCENTAGE_RESULTS,
      overallTotalSummary: [
        {
          totals: {}
        }
      ],
      custodyTotalSummary: 'custodySummary',
      communityTotalSummary: 'communitySummary',
      licenseTotalSummary: 'licenseSummary'
    }
    return getCaseload(id, lduName)
      .then(function (result) {
        expect(caseloadHelper.getCaseloadTierTotalsByTeamByGrade.calledWith(LDU_CASELOAD)).to.be.eql(true)
        expect(caseloadHelper.getCaseloadSummaryTotalsByTeam.calledWith(LDU_CASELOAD)).to.be.eql(true)
        expect(caseloadHelper.getCaseloadByType.calledWith(LDU_CASELOAD, caseType.CUSTODY)).to.be.eql(true)
        expect(caseloadHelper.getCaseloadByType.calledWith(LDU_CASELOAD, caseType.COMMUNITY)).to.be.eql(true)
        expect(caseloadHelper.getCaseloadByType.calledWith(LDU_CASELOAD, caseType.LICENSE)).to.be.eql(true)
        expect(caseloadHelper.getCaseloadTotalSummary.calledWith('custodyCaseloads')).to.be.eql(true)
        expect(caseloadHelper.getCaseloadTotalSummary.calledWith('communityCaseloads')).to.be.eql(true)
        expect(caseloadHelper.getCaseloadTotalSummary.calledWith('licenseCaseloads')).to.be.eql(true)
        expect(caseloadHelper.calculateTeamTierPercentages.calledWith(OVERALL_RESULTS)).to.be.eql(true)
        expect(caseloadHelper.aggregateTeamTierTotals.called).to.be.eql(true)
        expect(caseloadHelper.aggregateTeamTierTotals.called).to.be.eql(true)
        expect(caseloadHelper.aggregateTeamTierTotals.called).to.be.eql(true)

        expect(result.caseloadDetails).to.be.eql(expectedCaseloadDetails)
      })
  })
})
