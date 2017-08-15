const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')
require('sinon-bluebird')
const proxyquire = require('proxyquire')
const orgUnitConstant = require('../../../app/constants/organisation-unit.js')
const orgUnitFinder = require('../../../app/services/helpers/org-unit-finder')

const breadcrumbHelper = require('../../helpers/breadcrumb-helper')

const CASELOAD = {
  name: 'Todd Umptious',
  caseType: 'COMMUNITY',
  grade: 'PO',
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

const OVERALL_CASELOAD = Object.assign({}, CASELOAD, {totalCases: 9, untiered: 3, d2: 3, c1: 3, b1: 3})
const COMMUNITY_CASELOAD = Object.assign({}, CASELOAD, {caseType: 'COMMUNITY'})
const CUSTODY_CASELOAD = Object.assign({}, CASELOAD, {caseType: 'CUSTODY'})
const LICENSE_CASELOAD = Object.assign({}, CASELOAD, {caseType: 'LICENSE'})

const TEAM_CASELOAD = [COMMUNITY_CASELOAD, CUSTODY_CASELOAD, LICENSE_CASELOAD]

var id = 1
var breadcrumbs = breadcrumbHelper.TEAM_BREADCRUMBS
var expectedTitle = breadcrumbs[0].title

var getCaseload
var getTeamCaseload
var getBreadcrumbs

beforeEach(function () {
  getTeamCaseload = sinon.stub()
  getBreadcrumbs = sinon.stub().returns(breadcrumbs)
  getCaseload =
      proxyquire('../../../app/services/get-caseload',
        {'./data/get-team-caseload': getTeamCaseload,
          './get-breadcrumbs': getBreadcrumbs})
})

describe('services/get-caseload', function () {
  it('should return a results object with breadcrumbs, title and subtitle for a team', function () {
    var teamName = orgUnitConstant.TEAM.name
    getTeamCaseload.withArgs(id).resolves(OVERALL_CASELOAD)
    return getCaseload(id, teamName).then(function (result) {
      var teamSubtitle = orgUnitFinder('name', teamName).displayText
      expect(getBreadcrumbs).to.have.been.called //eslint-disable-line
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.eql(teamSubtitle)
      expect(result.title).to.eql(expectedTitle)
    })
  })

  it('should call get-team-caseload and return a results object with the overall caseload details for a team', function () {
    var teamName = orgUnitConstant.TEAM.name
    getTeamCaseload.withArgs(id).resolves(TEAM_CASELOAD)
    return getCaseload(id, teamName).then(function (result) {
      assert(getTeamCaseload.called)
      expect(result.overallCaseloadDetails[0]).to.eql(OVERALL_CASELOAD)
    })
  })

  it('should call get-team-caseload and return a caseload object with the COMMUNITY casetype for a team', function () {
    var teamName = orgUnitConstant.TEAM.name
    getTeamCaseload.withArgs(id).resolves(TEAM_CASELOAD)
    return getCaseload(id, teamName).then(function (result) {
      assert(getTeamCaseload.called)
      expect(result.communityCaseloadDetails[0]).to.eql(COMMUNITY_CASELOAD)
    })
  })

  it('should call get-team-caseload and return a caseload object with the CUSTODY casetype for a team', function () {
    var teamName = orgUnitConstant.TEAM.name
    getTeamCaseload.withArgs(id).resolves(TEAM_CASELOAD)
    return getCaseload(id, teamName).then(function (result) {
      assert(getTeamCaseload.called)
      expect(result.custodyCaseloadDetails[0]).to.eql(CUSTODY_CASELOAD)
    })
  })

  it('should call get-team-caseload and return a caseload object with the LICENSE casetype for a team', function () {
    var teamName = orgUnitConstant.TEAM.name
    getTeamCaseload.withArgs(id).resolves(TEAM_CASELOAD)
    return getCaseload(id, teamName).then(function (result) {
      assert(getTeamCaseload.called)
      expect(result.licenseCaseloadDetails[0]).to.eql(LICENSE_CASELOAD)
    })
  })
})
