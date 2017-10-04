const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const WORKLOAD_POINTS_URL = '/admin/workload-points'
const WORKLOAD_POINTS_URL_TYPO = '/admin/workload-pnts'

const WORKLOAD_POINTS = {
  title: 'Workload Points',
  subTitle: 'Admin',
  breadcrumbs: [{}],
  workloadPoints: []
}

const POSTED_WORKLOAD_POINTS = {}

var app
var route
var workloadPointsService
var authorisationService
var hasRoleResult = true

before(function () {
  authorisationService = {
    hasRole: sinon.stub().returns(hasRoleResult),
    isUserAuthenticated: sinon.stub().returns(true)
  }
  workloadPointsService = {
    getWorkloadPoints: sinon.stub().resolves(WORKLOAD_POINTS),
    updateWorkloadPoints: sinon.stub().resolves({})
  }
  route = proxyquire('../../../app/routes/workload-points', {
    '../services/workload-points-service': workloadPointsService,
    '../authorisation': authorisationService
  })
  app = routeHelper.buildApp(route)
})

describe('Admin Workload Points route', function () {
  it('should respond with 200 when the correct admin/workload-points url is called', function () {
    return supertest(app).get(WORKLOAD_POINTS_URL).expect(200)
  })

  it('should respond with 500 when an incorrect url is called', function () {
    return supertest(app).get(WORKLOAD_POINTS_URL_TYPO).expect(500)
  })

  it('should post the correct data and respond with 200', function () {
    return supertest(app)
      .post(WORKLOAD_POINTS_URL)
      .send(POSTED_WORKLOAD_POINTS)
      .expect(302, 'Found. Redirecting to /admin/workload-points?success=true')
  })
})
