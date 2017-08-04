const expect = require('chai').expect
const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const OM_OVERVIEW_URL = '/offender-manager/1/overview'
const OM_MISSING_ID_URL = '/offender-manager/overview'

const OVERVIEW = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: {},
  subNav: {},
  overviewDetails: [{}]
}

var app
var route
var getOverview
var getSubNavStub

before(function () {
  getSubNavStub = sinon.stub()
  getOverview = sinon.stub()
  route = proxyquire('../../../app/routes/overview', {
    '../services/get-overview': getOverview,
    '../services/get-sub-nav': getSubNavStub })
  app = routeHelper.buildApp(route)
})

describe('case-progress route', function () {
  it('should respond with 200 when offender-manager and id included in URL', function () {
    getOverview.resolves(OVERVIEW)
    return supertest(app).get(OM_OVERVIEW_URL).expect(200)
  })

  it('should respond with 500 when offender-manager, but no id, included in URL', function () {
    getOverview.resolves(OVERVIEW)
    return supertest(app).get(OM_MISSING_ID_URL).expect(500)
  })

  it('should call the getSubNav with the correct parameters', function () {
    getOverview.resolves(OVERVIEW)
    return supertest(app)
        .get(OM_OVERVIEW_URL)
        .expect(200)
        .then(function () {
          expect(getSubNavStub.calledWith('1', 'offender-manager', OM_OVERVIEW_URL)).to.be.true //eslint-disable-line
        })
  })
})
