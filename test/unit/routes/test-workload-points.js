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

var WORKLOAD_POINTS_TO_POST = {
  previousWpId: '2',
  commA: '111',
  commB1: '101',
  commB2: '99',
  commC1: '55',
  commC2: '44',
  commD1: '22',
  commD2: '11',
  cusA: '44',
  cusB1: '34',
  cusB2: '33',
  cusC1: '22',
  cusC2: '21',
  cusD1: '11',
  cusD2: '10',
  licA: '150',
  licB1: '110',
  licB2: '99',
  licC1: '55',
  licC2: '54',
  licD1: '44',
  licD2: '43',
  sdr: '101',
  userId: '35',
  sdrConversion: '51',
  nominalTargetPso: '2001',
  nominalTargetPo: '2001',
  weightingOverdue: '0.0',
  weightingWarrants: '0.0',
  weightingUpw: '100.0',
  defaultContractedHoursPo: '37',
  defaultContractedHoursPso: '37',
  parom: '121',
  weightingArmsCommunity: '15',
  weightingArmsLicense: '10'
}

const MOCK_USER = {
  username: 'username'
}

const POSTED_WORKLOAD_POINTS = {
  user: MOCK_USER
}

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

  it('should post the correct data and respond with 302', function () {
    return supertest(app)
      .post(WORKLOAD_POINTS_URL)
      .send(POSTED_WORKLOAD_POINTS)
      .send(WORKLOAD_POINTS_TO_POST)
      .expect(302, 'Found. Redirecting to /admin/workload-points?success=true')
  })
})
