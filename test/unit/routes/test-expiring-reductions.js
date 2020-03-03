const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const log = require('../../../app/logger')

const PAGE_URL = '/expiring-reductions'

const result = {
  title: 'Expiring Reductions',
  subTitle: 'Expiring Reductions',
  breadcrumbs: [
    {
      title: 'Expiring Reductions',
      link: '/expiring-reductions'
    }
  ],
  reductions: [
    {
      workloadOwnerId: 1316,
      omName: 'John Smith',
      reductionReason: 'Other',
      hours: 12,
      startDate: '10 Feb 19',
      endDate: '18 Feb 19',
      reductionId: 46973
    }
  ]
}

var app
var route
var userRoleService
var authorisationService
var hasRoleStub = sinon.stub()
var expiringReductionsStub

var initaliseApp = function () {
  userRoleService = sinon.stub()
  authorisationService = {
    assertUserAuthenticated: sinon.stub(),
    hasRole: hasRoleStub
  }
  expiringReductionsStub = {
    getExpiringReductions: sinon.stub()
  }
  expiringReductionsStub = sinon.stub().resolves(result)
  route = proxyquire('../../../app/routes/expiring-reductions', {
    '../services/user-role-service': userRoleService,
    '../authorisation': authorisationService,
    '../services/expiring-reductions-service': expiringReductionsStub
  })
  app = routeHelper.buildApp(route)
}

before(function () {
  initaliseApp()
})

describe('expiring reductions route', function () {
  it('should respond with 200 when the route is called as an admin', function () {
    log.info(result)
    return supertest(app).get(PAGE_URL).expect(200)
  })
})
