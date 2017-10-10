const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')
require('sinon-bluebird')
const proxyquire = require('proxyquire')
const workloadTypes = require('../../../app/constants/workload-type')
const orgUnitConstant = require('../../../app/constants/organisation-unit.js')
const orgUnitFinder = require('../../../app/services/helpers/org-unit-finder')

const breadcrumbHelper = require('../../helpers/breadcrumb-helper')

const OVERVIEW = {
  grade: 'PO',
  teamId: '1',
  teamName: 'Medway',
  reduction: '4',
  contractedHours: 37,
  totalCasesSdrs: 11,
  totalCasesFdrs: 12,
  totalCasesOralReports: 13
}

const ORGANISATION_OVERVIEW = [
  OVERVIEW,
  OVERVIEW
]

var id = 1

var getCourtReportOverview
var getCourtReportOverviewData
var getBreadcrumbs


beforeEach(function () {
  getCourtReportOverviewData = sinon.stub()
  getBreadcrumbs = sinon.stub()
  getCourtReportOverview =
      proxyquire('../../../app/services/get-court-report-overview',
        {'./data/get-court-report-overview': getCourtReportOverviewData,
          './get-breadcrumbs': getBreadcrumbs})
})

describe('services/get-court-report-overview', function () {
  it('should return a results object with breadcrumbs, title and subtitle for an court-reporter offender manager', function () {
    var omName = orgUnitConstant.OFFENDER_MANAGER.name
    var breadcrumbs = breadcrumbHelper.COURT_REPORTER_OFFENDER_MANAGER_BREADCRUMBS
    var expectedTitle = breadcrumbs[0].title    
    
    getCourtReportOverviewData.withArgs(id, omName).resolves(OVERVIEW)
    getBreadcrumbs.returns(breadcrumbs)
    
    return getCourtReportOverview(id, omName)
    .then(function (result) {
      var omSubtitle = orgUnitFinder('name', omName).displayText
      expect(getBreadcrumbs.calledWith(id, omName, workloadTypes.COURT_REPORTS)).to.be.true //eslint-disable-line
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.eql(omSubtitle)
      expect(result.title).to.eql(expectedTitle)
      expect(result.overviewDetails).to.eql(OVERVIEW)
    })
  })


  it('should return a results object with the correct overview details for a court-reporter team', function () {
    var orgName = orgUnitConstant.TEAM.name
    var breadcrumbs = breadcrumbHelper.COURT_REPORTER_TEAM_BREADCRUMBS
    var expectedTitle = breadcrumbs[0].title
    
    getCourtReportOverviewData.withArgs(id,orgName).resolves(ORGANISATION_OVERVIEW)
    getBreadcrumbs.returns(breadcrumbs)
    
    return getCourtReportOverview(id, orgName).then(function (result) {
      var teamSubtitle = orgUnitFinder('name', orgName).displayText
      expect(getBreadcrumbs.calledWith(id, orgName, workloadTypes.COURT_REPORTS)).to.be.true //eslint-disable-line
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.eql(teamSubtitle)
      expect(result.title).to.eql(expectedTitle)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEW)
    })
  })

  it('should return a results object with the correct overview details for a court-reporter ldu', function () {
    var orgName = orgUnitConstant.LDU.name
    var breadcrumbs = breadcrumbHelper.COURT_REPORTER_LDU_BREADCRUMBS
    var expectedTitle = breadcrumbs[0].title
    
    getCourtReportOverviewData.withArgs(id,orgName).resolves(ORGANISATION_OVERVIEW)
    getBreadcrumbs.returns(breadcrumbs)
    
    return getCourtReportOverview(id, orgName).then(function (result) {
      var orgSubtitle = orgUnitFinder('name', orgName).displayText
      expect(getBreadcrumbs.calledWith(id, orgName, workloadTypes.COURT_REPORTS)).to.be.true //eslint-disable-line
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.eql(orgSubtitle)
      expect(result.title).to.eql(expectedTitle)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEW)
    })
  })

  it('should return a results object with the correct overview details for a court-reporter region', function () {
    var orgName = orgUnitConstant.LDU.name
    var breadcrumbs = breadcrumbHelper.COURT_REPORTER_REGION_BREADCRUMBS
    var expectedTitle = breadcrumbs[0].title
    
    getCourtReportOverviewData.withArgs(id,orgName).resolves(ORGANISATION_OVERVIEW)
    getBreadcrumbs.returns(breadcrumbs)
    
    return getCourtReportOverview(id, orgName).then(function (result) {
      var orgSubtitle = orgUnitFinder('name', orgName).displayText
      expect(getBreadcrumbs.calledWith(id, orgName, workloadTypes.COURT_REPORTS)).to.be.true //eslint-disable-line
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.eql(orgSubtitle)
      expect(result.title).to.eql(expectedTitle)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEW)
    })
  })

  it('should return a results object with the correct overview details for a court-reporter national', function () {
    var orgName = orgUnitConstant.NATIONAL.name
    var breadcrumbs = breadcrumbHelper.COURT_REPORTER_NATIONAL_BREADCRUMBS
    var expectedTitle = breadcrumbs[0].title
    
    getCourtReportOverviewData.withArgs(id,orgName).resolves(ORGANISATION_OVERVIEW)
    getBreadcrumbs.returns(breadcrumbs)
    
    return getCourtReportOverview(id, orgName).then(function (result) {
      var orgSubtitle = orgUnitFinder('name', orgName).displayText
      expect(getBreadcrumbs.calledWith(id, orgName, workloadTypes.COURT_REPORTS)).to.be.true //eslint-disable-line
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.eql(orgSubtitle)
      expect(result.title).to.eql(expectedTitle)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEW)
    })
  })
})
