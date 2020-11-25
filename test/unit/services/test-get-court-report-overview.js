const expect = require('chai').expect
const sinon = require('sinon')

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
  totalSdrs: 11,
  totalFdrs: 12,
  totalOralReports: 13
}

const ORGANISATION_OVERVIEW = [
  OVERVIEW,
  OVERVIEW
]

const id = 1

let getCourtReportOverview
let getCourtReportOverviewData
let getBreadcrumbs

beforeEach(function () {
  getCourtReportOverviewData = sinon.stub()
  getBreadcrumbs = sinon.stub()
  getCourtReportOverview =
      proxyquire('../../../app/services/get-court-report-overview',
        {
          './data/get-court-report-overview': getCourtReportOverviewData,
          './get-breadcrumbs': getBreadcrumbs
        })
})

describe('services/get-court-report-overview', function () {
  it('should return a results object with breadcrumbs, title and subtitle for an court-reporter offender manager', function () {
    const omName = orgUnitConstant.OFFENDER_MANAGER.name
    const breadcrumbs = breadcrumbHelper.COURT_REPORTER_OFFENDER_MANAGER_BREADCRUMBS
    const expectedTitle = breadcrumbs[0].title

    getCourtReportOverviewData.withArgs(id, omName).resolves(OVERVIEW)
    getBreadcrumbs.returns(breadcrumbs)

    return getCourtReportOverview(id, omName)
      .then(function (result) {
        const omSubtitle = orgUnitFinder('name', omName).displayText
      expect(getBreadcrumbs.calledWith(id, omName, workloadTypes.COURT_REPORTS)).to.be.true //eslint-disable-line
        expect(result.breadcrumbs).to.eql(breadcrumbs)
        expect(result.subTitle).to.eql(omSubtitle)
        expect(result.title).to.eql(expectedTitle)
        expect(result.overviewDetails).to.eql(OVERVIEW)
      })
  })

  it('should return a results object with the correct overview details for a court-reporter team', function () {
    const orgName = orgUnitConstant.TEAM.name
    const breadcrumbs = breadcrumbHelper.COURT_REPORTER_TEAM_BREADCRUMBS
    const expectedTitle = breadcrumbs[0].title

    getCourtReportOverviewData.withArgs(id, orgName).resolves(ORGANISATION_OVERVIEW)
    getBreadcrumbs.returns(breadcrumbs)

    return getCourtReportOverview(id, orgName).then(function (result) {
      const teamSubtitle = orgUnitFinder('name', orgName).displayText
      expect(getBreadcrumbs.calledWith(id, orgName, workloadTypes.COURT_REPORTS)).to.be.true //eslint-disable-line
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.eql(teamSubtitle)
      expect(result.title).to.eql(expectedTitle)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEW)
    })
  })

  it('should return a results object with the correct overview details for a court-reporter ldu', function () {
    const orgName = orgUnitConstant.LDU.name
    const breadcrumbs = breadcrumbHelper.COURT_REPORTER_LDU_BREADCRUMBS
    const expectedTitle = breadcrumbs[0].title

    getCourtReportOverviewData.withArgs(id, orgName).resolves(ORGANISATION_OVERVIEW)
    getBreadcrumbs.returns(breadcrumbs)

    return getCourtReportOverview(id, orgName).then(function (result) {
      const orgSubtitle = orgUnitFinder('name', orgName).displayText
      expect(getBreadcrumbs.calledWith(id, orgName, workloadTypes.COURT_REPORTS)).to.be.true //eslint-disable-line
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.eql(orgSubtitle)
      expect(result.title).to.eql(expectedTitle)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEW)
    })
  })

  it('should return a results object with the correct overview details for a court-reporter region', function () {
    const orgName = orgUnitConstant.LDU.name
    const breadcrumbs = breadcrumbHelper.COURT_REPORTER_REGION_BREADCRUMBS
    const expectedTitle = breadcrumbs[0].title

    getCourtReportOverviewData.withArgs(id, orgName).resolves(ORGANISATION_OVERVIEW)
    getBreadcrumbs.returns(breadcrumbs)

    return getCourtReportOverview(id, orgName).then(function (result) {
      const orgSubtitle = orgUnitFinder('name', orgName).displayText
      expect(getBreadcrumbs.calledWith(id, orgName, workloadTypes.COURT_REPORTS)).to.be.true //eslint-disable-line
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.eql(orgSubtitle)
      expect(result.title).to.eql(expectedTitle)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEW)
    })
  })

  it('should return a results object with the correct overview details for a court-reporter national', function () {
    const orgName = orgUnitConstant.NATIONAL.name
    const breadcrumbs = breadcrumbHelper.COURT_REPORTER_NATIONAL_BREADCRUMBS
    const expectedTitle = breadcrumbs[0].title

    getCourtReportOverviewData.withArgs(id, orgName).resolves(ORGANISATION_OVERVIEW)
    getBreadcrumbs.returns(breadcrumbs)

    return getCourtReportOverview(id, orgName).then(function (result) {
      const orgSubtitle = orgUnitFinder('name', orgName).displayText
      expect(getBreadcrumbs.calledWith(id, orgName, workloadTypes.COURT_REPORTS)).to.be.true //eslint-disable-line
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.eql(orgSubtitle)
      expect(result.title).to.eql(expectedTitle)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEW)
    })
  })
})
