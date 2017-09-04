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

var app
var route
var getWorkloadPoints

before(function () {
  getWorkloadPoints = sinon.stub()
  route = proxyquire('../../../app/routes/workload-points', {
    '../services/get-workload-points': getWorkloadPoints
  })
  getWorkloadPoints.resolves(WORKLOAD_POINTS)
  app = routeHelper.buildApp(route)
})

describe('Admin Workload Points route', function () {
  it('should respond with 200 when the correct admin/workload-points url is called', function () {
    return supertest(app).get(WORKLOAD_POINTS_URL).expect(200)
  })

  it('should respond with 500 when an incorrect url is called', function () {
    return supertest(app).get(WORKLOAD_POINTS_URL_TYPO).expect(500)
  })
})
