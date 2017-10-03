const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')
require('sinon-bluebird')
const proxyquire = require('proxyquire')
const orgUnitConstant = require('../../../app/constants/organisation-unit.js')
const orgUnitFinder = require('../../../app/services/helpers/org-unit-finder')
const caseType = require('../../../app/constants/case-type.js')
const breadcrumbHelper = require('../../helpers/breadcrumb-helper')

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

const OVERALL_CASELOAD = Object.assign({}, CASELOAD, { totalCases: 18, untiered: 3, d2: 3, c1: 3, b1: 3 })

const LDU_CASELOAD = [
  Object.assign({}, CASELOAD, { name: 'Team 1' }),
  Object.assign({}, CASELOAD, { name: 'Team 2' })
]

var id = 1
var breadcrumbs = breadcrumbHelper.TEAM_BREADCRUMBS
var expectedTitle = breadcrumbs[0].title

var getCaseload
var getCaseloadDetail
var getBreadcrumbs
var caseloadHelper
var teamName
var lduName

beforeEach(function () {
  getCaseloadDetail = sinon.stub()
  getBreadcrumbs = sinon.stub().returns(breadcrumbs)
  caseloadHelper = {
    getCaseloadTierTotalsByTeamByGrade: sinon.stub(),
    getCaseloadSummaryTotalsByTeam: sinon.stub(),
    aggregateTeamTierTotals: sinon.stub(),
    calculateTeamTierPercentages: sinon.stub(),
    getCaseloadByType: sinon.stub().returns(CASELOAD),
    getCaseloadTotalSummary: sinon.stub()
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
    return getCaseload(id, teamName).then(function (result) {
      var teamSubtitle = orgUnitFinder('name', teamName).displayText
      assert(getBreadcrumbs.called)
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.eql(teamSubtitle)
      expect(result.title).to.eql(expectedTitle)
    })
  })

  it('should call get-caseload data service with the correct parameters', function () {
    getCaseloadDetail.withArgs(id, lduName).resolves(LDU_CASELOAD)
    return getCaseload(id, lduName).then(function (result) {
      expect(getCaseloadDetail.calledWith(id, lduName)).to.be.true //eslint-disable-line
    })
  })

  it('should call expected functions for team and return populated caseloadDetails', function () {
    getCaseloadDetail.withArgs(id, teamName).resolves(OVERALL_CASELOAD)
    caseloadHelper.getCaseloadTierTotalsByTeamByGrade.returns('overallCaseloadDetails')
    caseloadHelper.getCaseloadSummaryTotalsByTeam.returns('overallSummary')
    caseloadHelper.getCaseloadByType.withArgs(OVERALL_CASELOAD, 'CUSTODY').returns('custodyCaseloads')
    caseloadHelper.getCaseloadByType.withArgs(OVERALL_CASELOAD, 'COMMUNITY').returns('communityCaseloads')
    caseloadHelper.getCaseloadByType.withArgs(OVERALL_CASELOAD, 'LICENSE').returns('licenseCaseloads')
    caseloadHelper.getCaseloadTotalSummary.withArgs('custodyCaseloads').returns('custodySummary')
    caseloadHelper.getCaseloadTotalSummary.withArgs('communityCaseloads').returns('communitySummary')
    caseloadHelper.getCaseloadTotalSummary.withArgs('licenseCaseloads').returns('licenseSummary')

    var expectedCaseloadDetails = {
      overallCaseloadDetails: 'overallCaseloadDetails',
      communityCaseloadDetails: 'communityCaseloads',
      custodyCaseloadDetails: 'custodyCaseloads',
      licenseCaseloadDetails: 'licenseCaseloads',
      overallTotalSummary: 'overallSummary',
      custodyTotalSummary: 'custodySummary',
      communityTotalSummary: 'communitySummary',
      licenseTotalSummary: 'licenseSummary'
    }
    return getCaseload(id, teamName)
    .then(function (result) {
      expect(caseloadHelper.getCaseloadTierTotalsByTeamByGrade.calledWith(OVERALL_CASELOAD)).to.be.eql(true)
      expect(caseloadHelper.getCaseloadSummaryTotalsByTeam.calledWith(OVERALL_CASELOAD)).to.be.eql(true)
      expect(caseloadHelper.getCaseloadByType.calledWith(OVERALL_CASELOAD, 'CUSTODY')).to.be.eql(true)
      expect(caseloadHelper.getCaseloadByType.calledWith(OVERALL_CASELOAD, 'COMMUNITY')).to.be.eql(true)
      expect(caseloadHelper.getCaseloadByType.calledWith(OVERALL_CASELOAD, 'LICENSE')).to.be.eql(true)
      expect(caseloadHelper.getCaseloadTotalSummary.calledWith('custodyCaseloads')).to.be.eql(true)
      expect(caseloadHelper.getCaseloadTotalSummary.calledWith('communityCaseloads')).to.be.eql(true)
      expect(caseloadHelper.getCaseloadTotalSummary.calledWith('licenseCaseloads')).to.be.eql(true)

      expect(result.caseloadDetails).to.be.eql(expectedCaseloadDetails)
    })
  })

  it('should call expected functions for LDU and return populated caseloadDetails', function () {
    getCaseloadDetail.withArgs(id, lduName).resolves(LDU_CASELOAD)
    caseloadHelper.getCaseloadTierTotalsByTeamByGrade.returns('overallCaseloadDetails')
    caseloadHelper.getCaseloadSummaryTotalsByTeam.returns('overallSummary')
    caseloadHelper.getCaseloadByType.withArgs(LDU_CASELOAD, 'CUSTODY').returns('custodyCaseloads')
    caseloadHelper.getCaseloadByType.withArgs(LDU_CASELOAD, 'COMMUNITY').returns('communityCaseloads')
    caseloadHelper.getCaseloadByType.withArgs(LDU_CASELOAD, 'LICENSE').returns('licenseCaseloads')
    caseloadHelper.getCaseloadTotalSummary.withArgs('custodyCaseloads').returns('custodySummary')
    caseloadHelper.getCaseloadTotalSummary.withArgs('communityCaseloads').returns('communitySummary')
    caseloadHelper.getCaseloadTotalSummary.withArgs('licenseCaseloads').returns('licenseSummary')
    caseloadHelper.calculateTeamTierPercentages.withArgs('overallCaseloadDetails').returns('lduOverallCaseloadDetails')
    caseloadHelper.aggregateTeamTierTotals.withArgs('custodyCaseloads').returns('lduCustodyCaseloads')
    caseloadHelper.aggregateTeamTierTotals.withArgs('communityCaseloads').returns('lduCommunityCaseloads')
    caseloadHelper.aggregateTeamTierTotals.withArgs('licenseCaseloads').returns('lduLicenseCaseloads')

    var expectedCaseloadDetails = {
      overallCaseloadDetails: 'lduOverallCaseloadDetails',
      communityCaseloadDetails: 'lduCommunityCaseloads',
      custodyCaseloadDetails: 'lduCustodyCaseloads',
      licenseCaseloadDetails: 'lduLicenseCaseloads',
      overallTotalSummary: 'overallSummary',
      custodyTotalSummary: 'custodySummary',
      communityTotalSummary: 'communitySummary',
      licenseTotalSummary: 'licenseSummary'
    }
    return getCaseload(id, lduName)
    .then(function (result) {
      expect(caseloadHelper.getCaseloadTierTotalsByTeamByGrade.calledWith(LDU_CASELOAD)).to.be.eql(true)
      expect(caseloadHelper.getCaseloadSummaryTotalsByTeam.calledWith(LDU_CASELOAD)).to.be.eql(true)
      expect(caseloadHelper.getCaseloadByType.calledWith(LDU_CASELOAD, 'CUSTODY')).to.be.eql(true)
      expect(caseloadHelper.getCaseloadByType.calledWith(LDU_CASELOAD, 'COMMUNITY')).to.be.eql(true)
      expect(caseloadHelper.getCaseloadByType.calledWith(LDU_CASELOAD, 'LICENSE')).to.be.eql(true)
      expect(caseloadHelper.getCaseloadTotalSummary.calledWith('custodyCaseloads')).to.be.eql(true)
      expect(caseloadHelper.getCaseloadTotalSummary.calledWith('communityCaseloads')).to.be.eql(true)
      expect(caseloadHelper.getCaseloadTotalSummary.calledWith('licenseCaseloads')).to.be.eql(true)
      expect(caseloadHelper.calculateTeamTierPercentages.calledWith('overallCaseloadDetails')).to.be.eql(true)
      expect(caseloadHelper.aggregateTeamTierTotals.calledWith('custodyCaseloads')).to.be.eql(true)
      expect(caseloadHelper.aggregateTeamTierTotals.calledWith('communityCaseloads')).to.be.eql(true)
      expect(caseloadHelper.aggregateTeamTierTotals.calledWith('licenseCaseloads')).to.be.eql(true)

      expect(result.caseloadDetails).to.be.eql(expectedCaseloadDetails)
    })
  })
})
