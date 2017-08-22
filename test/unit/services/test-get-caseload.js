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
const CUSTODY_CASELOAD = Object.assign({}, CASELOAD, { caseType: caseType.CUSTODY })
const COMMUNITY_CASELOAD = Object.assign({}, CASELOAD, { caseType: caseType.COMMUNITY })
const LICENSE_CASELOAD = Object.assign({}, CASELOAD, { caseType: caseType.LICENSE })

const TEAM_CASELOAD = [CUSTODY_CASELOAD, COMMUNITY_CASELOAD, LICENSE_CASELOAD]

const LDU_CASELOAD = [
  Object.assign({}, CASELOAD, { name: 'Team 1' }),
  Object.assign({}, CASELOAD, { name: 'Team 2' })
]

const PERCENTAGE_RESULTS = [
  { linkId: 1,
    name: 'Team 3',
    grades: [
      {},
      {}
    ]
  }
]

var id = 1
var breadcrumbs = breadcrumbHelper.TEAM_BREADCRUMBS
var expectedTitle = breadcrumbs[0].title

var getCaseload
var getCaseloadDetail
var getBreadcrumbs
var percentageCalculator
var caseloadHelper
var teamName
var lduName

before(function () {
  getCaseloadDetail = sinon.stub()
  getBreadcrumbs = sinon.stub().returns(breadcrumbs)
  percentageCalculator = sinon.stub().returns(PERCENTAGE_RESULTS)
  caseloadHelper = {
    getOverallCaseload: sinon.stub().returns(OVERALL_CASELOAD),
    getCaseloadByType: sinon.stub().returns(CASELOAD),
    getCaseloadTotalSummary: sinon.stub().returns(999)
  }
  getCaseload =
    proxyquire('../../../app/services/get-caseload',
      {
        './data/get-caseload': getCaseloadDetail,
        './get-breadcrumbs': getBreadcrumbs,
        './helpers/percentage-calculator': percentageCalculator,
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

  it('should call get-caseload with the correct parameters', function () {
    getCaseloadDetail.withArgs(id, lduName).resolves(LDU_CASELOAD)
    return getCaseload(id, lduName).then(function (result) {
      expect(getCaseloadDetail.calledWith(id, lduName)).to.be.true //eslint-disable-line
    })
  })

  it('should call percentage-calculator when org unit is LDU', function () {
    getCaseloadDetail.withArgs(id, lduName).resolves(LDU_CASELOAD)
    return getCaseload(id, lduName).then(function (result) {
      assert(percentageCalculator.called)
    })
  })

  it('should return a results object with lduCaseloadDetails when org unit is LDU', function () {
    getCaseloadDetail.withArgs(id, lduName).resolves(LDU_CASELOAD)
    return getCaseload(id, lduName).then(function (result) {
      expect(result.lduCaseloadDetails).to.eql(PERCENTAGE_RESULTS)
    })
  })

  it('should call getOverallCaseload when org unit is Team', function () {
    getCaseloadDetail.withArgs(id, teamName).resolves(TEAM_CASELOAD)
    return getCaseload(id, teamName).then(function (result) {
      assert(caseloadHelper.getOverallCaseload.called)
    })
  })

  it('should call getCaseloadByType and getCaseloadTotalSummary once for each case type when org unit is Team', function () {
    getCaseloadDetail.withArgs(id, teamName).resolves(TEAM_CASELOAD)
    return getCaseload(id, teamName).then(function (result) {
      expect(caseloadHelper.getCaseloadByType.calledWith(TEAM_CASELOAD, caseType.COMMUNITY)).to.be.true //eslint-disable-line
      expect(caseloadHelper.getCaseloadByType.calledWith(TEAM_CASELOAD, caseType.CUSTODY)).to.be.true //eslint-disable-line
      expect(caseloadHelper.getCaseloadByType.calledWith(TEAM_CASELOAD, caseType.LICENSE)).to.be.true //eslint-disable-line
      assert(caseloadHelper.getCaseloadTotalSummary.called)
    })
  })

  it('should return a results object with all necessary results when org unit is Team', function () {
    getCaseloadDetail.withArgs(id, teamName).resolves(TEAM_CASELOAD)
    return getCaseload(id, teamName).then(function (result) {
      expect(result.overallCaseloadDetails).to.eql(OVERALL_CASELOAD)
      expect(result.communityCaseloadDetails).to.eql(CASELOAD)
      expect(result.custodyCaseloadDetails).to.eql(CASELOAD)
      expect(result.licenseCaseloadDetails).to.eql(CASELOAD)
      expect(result.custodyTotalSummary).to.eql(999)
      expect(result.communityTotalSummary).to.eql(999)
      expect(result.licenseTotalSummary).to.eql(999)
    })
  })
})
