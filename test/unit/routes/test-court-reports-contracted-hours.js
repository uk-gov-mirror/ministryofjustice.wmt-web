const expect = require('chai').expect
const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const workloadType = require('../../../app/constants/workload-type')

const COOKIES = ['session=eyJub3dJbk1pbnV0ZXMiOjI0OTA3MzgxLjEzODEzMzMzMiwiZG9iRW5jb2RlZCI6IjExNDAxNzYwNyIsInJlbGF0aW9uc2hpcCI6InI0IiwiYmVuZWZpdCI6ImIxIiwicmVmZXJlbmNlSWQiOiIzYjI0NzE3YWI5YTI0N2E3MGIiLCJkZWNyeXB0ZWRSZWYiOiIxUjY0RVROIiwiY2xhaW1UeXBlIjoiZmlyc3QtdGltZSIsImFkdmFuY2VPclBhc3QiOiJwYXN0IiwiY2xhaW1JZCI6OH0=']
const OM_CONTRACTED_HOURS_URL = '/' + workloadType.COURT_REPORTS + '/offender-manager/1/contracted-hours'
const LDU_CONTRACTED_HOURS_URL = '/' + workloadType.COURT_REPORTS + '/ldu/1/contracted-hours'
const REGION_CONTRACTED_HOURS_URL = '/' + workloadType.COURT_REPORTS + '/region/1/contracted-hours'
const HMPPS_CONTRACTED_HOURS_URL = '/' + workloadType.COURT_REPORTS + '/hmpps/0/contracted-hours'

const OM_MISSING_ID_URL = '/' + workloadType.COURT_REPORTS + '/offender-manager/contracted-hours'
const OM_INVALID_URL = '/cart-reports/offender-manager/1/contracted-hours'

const CONTRACTED_HOURS = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: {},
  contractedHours: 37.5
}

const UPDATED_CONTRACTED_HOURS = '11.23'

let app
let route
let contractedHoursService
let authorisationService
const hasRoleResult = true
let getSubNavStub

before(function () {
  authorisationService = {
    assertUserAuthenticated: sinon.stub(),
    hasRole: sinon.stub().returns(hasRoleResult)
  }

  getSubNavStub = sinon.stub()
  contractedHoursService = sinon.stub()
  contractedHoursService.getContractedHours = sinon.stub()
  contractedHoursService.updateContractedHours = sinon.stub()
  route = proxyquire('../../../app/routes/contracted-hours', {
    '../services/contracted-hours-service': contractedHoursService,
    '../authorisation': authorisationService,
    '../services/get-sub-nav': getSubNavStub
  })
  app = routeHelper.buildApp(route)
  contractedHoursService.getContractedHours.resolves(CONTRACTED_HOURS)
})

describe('court-reports contracted-hours route', function () {
  describe('When GET called', function () {
    it('should respond with 200 when offender-manager and id included in URL', function () {
      return supertest(app).get(OM_CONTRACTED_HOURS_URL).set('Cookie', COOKIES).expect(200)
    })

    it('should respond with 404 when ldu and id included in URL', function () {
      return supertest(app).get(LDU_CONTRACTED_HOURS_URL).expect(404)
    })

    it('should respond with 404 when region and id included in URL', function () {
      return supertest(app).get(REGION_CONTRACTED_HOURS_URL).expect(404)
    })

    it('should respond with 404 when national and id included in URL', function () {
      return supertest(app).get(HMPPS_CONTRACTED_HOURS_URL).expect(404)
    })

    it('should respond with 500 when offender-manager, but no id, included in URL', function () {
      return supertest(app).get(OM_MISSING_ID_URL).expect(500)
    })

    it('should respond with 500 when url doesnt start with court-report', function () {
      return supertest(app).get(OM_INVALID_URL).expect(500)
    })

    it('should call the getSubNav and getContractedHours with the correct parameters', function () {
      return supertest(app)
        .get(OM_CONTRACTED_HOURS_URL)
        .expect(200)
        .set('Cookie', COOKIES)
        .then(function () {
        expect(getSubNavStub.calledWith('1', 'offender-manager', OM_CONTRACTED_HOURS_URL)).to.be.true //eslint-disable-line
          expect(contractedHoursService.getContractedHours.calledWith('1', 'offender-manager', workloadType.COURT_REPORTS))
        })
    })
  })

  describe('When POST called', function () {
    it('should call update method of contracted-hours service for POST, redirect to GET', function () {
      contractedHoursService.updateContractedHours.resolves()
      return supertest(app)
        .post(OM_CONTRACTED_HOURS_URL)
        .send({ hours: UPDATED_CONTRACTED_HOURS })
        .expect(302)
        .then(function (response) {
        expect(contractedHoursService.updateContractedHours.calledWith('1','offender-manager', UPDATED_CONTRACTED_HOURS, workloadType.COURT_REPORTS)).to.be.true //eslint-disable-line
        })
    })

    it('should respond with 404 when LDU and id included in URL for POST', function () {
      return supertest(app).post(LDU_CONTRACTED_HOURS_URL).send({ hours: UPDATED_CONTRACTED_HOURS })
        .expect(404)
    })
  })
})
