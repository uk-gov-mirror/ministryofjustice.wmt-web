const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const expect = require('chai').expect
const sinon = require('sinon')

const workloadTypes = require('../../../app/constants/workload-type')

// test data
const OFFENDER_MANAGER_CAPACITY_URI = '/' + workloadTypes.PROBATION + '/offender-manager/1/caseload-capacity'
const REGION_CAPACITY_URI = '/' + workloadTypes.PROBATION + '/region/1/caseload-capacity'
const REGION_CAPACITY_URI_MISSING_ID = '/' + workloadTypes.PROBATION + '/region/caseload-capacity'
const TEAM_CAPACITY_URI = '/' + workloadTypes.PROBATION + '/team/1/caseload-capacity'
const LDU_CAPACITY_URI = '/' + workloadTypes.PROBATION + '/ldu/1/caseload-capacity'

const dateToPost = {
  'capacity-from-day': '01',
  'capacity-from-month': '01',
  'capacity-from-year': '2017',
  'capacity-to-day': '03',
  'capacity-to-month': '03',
  'capacity-to-year': '2017'
}

describe('/caseload-capacity', function () {
  let app
  let getCapacityStub
  let getOutstandingReportsStub
  let getSubNavStub
  let getLastUpdated
  const capacityStubResult = { title: 'Test', capacityTable: {}, subNav: [{}] }
  let getCaseDetailsStub
  const authorisationService = {
    assertUserAuthenticated: sinon.stub()
  }
  beforeEach(function () {
    getCapacityStub = sinon.stub()
    getCaseDetailsStub = sinon.stub().resolves()
    getOutstandingReportsStub = sinon.stub().resolves()
    getSubNavStub = sinon.stub()
    getLastUpdated = sinon.stub().resolves(new Date(2017, 11, 1))
    const route = proxyquire(
      '../../../app/routes/capacity-route', {
        '../services/get-capacity-view': getCapacityStub,
        '../services/get-outstanding-reports': getOutstandingReportsStub,
        '../services/get-case-details-view': getCaseDetailsStub,
        '../authorisation': authorisationService,
        '../services/get-sub-nav': getSubNavStub,
        '../services/data/get-last-updated': getLastUpdated
      })
    app = routeHelper.buildApp(route)
  })

  describe('/probation/ldu/{id}/caseload-capacity', function () {
    it('should post the correct data and respond with 200 when ldu and id is used with date parameters', function () {
      getCapacityStub.resolves(capacityStubResult)
      return supertest(app)
        .post(LDU_CAPACITY_URI)
        .send(dateToPost)
        .expect(200)
    })

    it('should respond with 200 when ldu and id is used', function () {
      getCapacityStub.resolves(capacityStubResult)
      return supertest(app)
        .get(LDU_CAPACITY_URI)
        .expect(200)
    })

    it('should call the getSubNav with the correct parameters', function () {
      getCapacityStub.resolves(capacityStubResult)
      return supertest(app)
        .get(LDU_CAPACITY_URI)
        .expect(200)
        .then(() => {
          expect(getSubNavStub.calledWith('1', 'ldu', LDU_CAPACITY_URI)).to.be.true //eslint-disable-line
        })
    })
  })

  describe('/probation/region/{id}/caseload-capacity', function () {
    it('should respond with 200 when region and id is used', function () {
      getCapacityStub.resolves(capacityStubResult)
      return supertest(app)
        .get(REGION_CAPACITY_URI)
        .expect(200)
    })
    it('should respond with 500 when region is used but id is missing', function () {
      getCapacityStub.resolves(capacityStubResult)
      return supertest(app)
        .get(REGION_CAPACITY_URI_MISSING_ID)
        .expect(500)
    })
  })

  describe('/probation/team/{id}/caseload-capacity', function () {
    it('should respond with 200 when team and id is used', function () {
      getCapacityStub.resolves(capacityStubResult)
      return supertest(app)
        .get(TEAM_CAPACITY_URI)
        .expect(200)
    })
  })

  describe('/probation/offender-manager/{id}/caseload-capacity', function () {
    it('should respond with 200 when team and id is used', function () {
      getCapacityStub.resolves(capacityStubResult)
      return supertest(app)
        .get(OFFENDER_MANAGER_CAPACITY_URI)
        .expect(200)
    })
  })
})
