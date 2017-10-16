const expect = require('chai').expect
const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const orgUnit = require('../../../app/constants/organisation-unit')
const workloadType = require('../../../app/constants/workload-type')

const OM_OVERVIEW_URL = '/' + workloadType.COURT_REPORTS + '/offender-manager/1/overview'
const LDU_OVERVIEW_URL = '/' + workloadType.COURT_REPORTS + '/ldu/1/overview'
const REGION_OVERVIEW_URL = '/' + workloadType.COURT_REPORTS + '/region/1/overview'
const HMPPS_OVERVIEW_URL = '/' + workloadType.COURT_REPORTS + '/hmpps/0/overview'

const OM_MISSING_ID_URL = '/court-report/offender-manager/overview'

const OVERVIEW = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: [{ title: 'Offender Manager' }],
  subNav: {},
  overviewDetails: [{}]
}

var app
var route
var getCourtReportOverview
var getSubNavStub

before(function () {
  getSubNavStub = sinon.stub()
  getCourtReportOverview = sinon.stub()
  route = proxyquire('../../../app/routes/court-reports-overview', {
    '../services/get-court-report-overview': getCourtReportOverview,
    '../services/get-sub-nav': getSubNavStub
  })
  app = routeHelper.buildApp(route)
})

describe('court reports overview route', function () {
  before(function () {
    getCourtReportOverview.resolves(OVERVIEW)
  })

  it('should respond with 200 when offender-manager and id included in URL', function () {
    return supertest(app).get(OM_OVERVIEW_URL).expect(200)
  })

  it('should respond with 200 when ldu and id included in URL', function () {
    return supertest(app).get(LDU_OVERVIEW_URL).expect(200)
  })

  it('should respond with 200 when region and id included in URL', function () {
    return supertest(app).get(REGION_OVERVIEW_URL).expect(200)
  })

  it('should respond with 200 when national and id included in URL', function () {
    return supertest(app).get(HMPPS_OVERVIEW_URL).expect(200)
  })

  it('should respond with 500 when offender-manager, but no id, included in URL', function () {
    return supertest(app).get(OM_MISSING_ID_URL).expect(500)
  })

  it('should call the getSubNav and getCourtReportOverview with the correct parameters', function () {
    return supertest(app)
        .get(OM_OVERVIEW_URL)
        .expect(200)
        .then(function () {
          expect(getSubNavStub.calledWith('1', orgUnit.OFFENDER_MANAGER.name, OM_OVERVIEW_URL, workloadType.COURT_REPORTS)).to.be.true //eslint-disable-line
          expect(getCourtReportOverview.calledWith('1', orgUnit.OFFENDER_MANAGER.name)).to.be.true //eslint-disable-line
        })
  })
})
