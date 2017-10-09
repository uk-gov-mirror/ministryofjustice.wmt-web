const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')

// test data
const OFFENDER_MANAGER_CAPACITY_URI = '/offender-manager/1/caseload-capacity'
const REGION_CAPACITY_URI = '/region/1/caseload-capacity'
const REGION_CAPACITY_URI_MISSING_ID = '/region/caseload-capacity'
const TEAM_CAPACITY_URI = '/team/1/caseload-capacity'
const LDU_CAPACITY_URI = '/ldu/1/caseload-capacity'

const CAPACITY_FROM_DAY = 'capacity-from-day='
const CAPACITY_FROM_MONTH = 'capacity-from-month='
const CAPACITY_FROM_YEAR = 'capacity-from-year='

const CAPACITY_TO_DAY = 'capacity-to-day='
const CAPACITY_TO_MONTH = 'capacity-to-month='
const CAPACITY_TO_YEAR = 'capacity-to-year='

describe('/caseload-capacity', function () {
  var app
  var getCapacityStub
  var getSubNavStub
  var capacityStubResult = {title: 'Test', capacityTable: {}, subNav: [{}]}
  var authorisationService
  authorisationService = {
    isUserAuthenticated: sinon.stub().returns(true)
  }
  beforeEach(function () {
    getCapacityStub = sinon.stub()
    getSubNavStub = sinon.stub()
    var route = proxyquire(
      '../../../app/routes/capacity-route', {
        '../services/get-capacity-view': getCapacityStub,
        '../authorisation': authorisationService,
        '../services/get-sub-nav': getSubNavStub
      })
    app = routeHelper.buildApp(route)
  })

  describe('/ldu/{id}/caseload-capacity', function () {
    it('should respond with 200 when ldu and id is used with date parameters', function () {
      getCapacityStub.resolves(capacityStubResult)
      return supertest(app)
        .get(LDU_CAPACITY_URI + '?' +
        CAPACITY_FROM_DAY + '01&' +
        CAPACITY_FROM_MONTH + '01&' +
        CAPACITY_FROM_YEAR + '2017&' +
        CAPACITY_TO_DAY + '31&' +
        CAPACITY_TO_MONTH + '03&' +
        CAPACITY_TO_YEAR + '2017')
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

  describe('/region/{id}/caseload-capacity', function () {
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

  describe('/team/{id}/caseload-capacity', function () {
    it('should respond with 200 when team and id is used', function () {
      getCapacityStub.resolves(capacityStubResult)
      return supertest(app)
        .get(TEAM_CAPACITY_URI)
        .expect(200)
    })
  })

  describe('/offender-manager/{id}/caseload-capacity', function () {
    it('should respond with 200 when team and id is used', function () {
      getCapacityStub.resolves(capacityStubResult)
      return supertest(app)
        .get(OFFENDER_MANAGER_CAPACITY_URI)
        .expect(200)
    })
  })
})
