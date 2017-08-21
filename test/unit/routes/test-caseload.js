const expect = require('chai').expect
const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const REGION_CASELOAD_URL = '/region/1/caseload'
const LDU_CASELOAD_URL = '/ldu/1/caseload'
const LDU_MISSING_ID_URL = '/ldu/caseload'
const TEAM_CASELOAD_URL = '/team/1/caseload'
const TEAM_MISSING_ID_URL = '/team/caseload'

const CASELOAD = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: {},
  subNav: {},
  custodyTotalSummary: 0,
  communityTotalSummary: 0,
  licenseTotalSummary: 0,
  caseTypes: [{}]
}

var app
var route
var getCaseload
var getSubNavStub

before(function () {
  getSubNavStub = sinon.stub()
  getCaseload = sinon.stub()
  route = proxyquire('../../../app/routes/caseload', {
    '../services/get-caseload': getCaseload,
    '../services/get-sub-nav': getSubNavStub })
  app = routeHelper.buildApp(route)
})

describe('caseload route', function () {
  it('should respond with 200 when team and id included in URL', function () {
    getCaseload.resolves(CASELOAD)
    return supertest(app).get(TEAM_CASELOAD_URL).expect(200)
  })

  it('should respond with 500 when team, but no id, included in URL', function () {
    getCaseload.resolves(CASELOAD)
    return supertest(app).get(TEAM_MISSING_ID_URL).expect(500)
  })

  it('should repsond with 500 for non-team URL', function () {
    getCaseload.resolves(CASELOAD)
    return supertest(app).get(REGION_CASELOAD_URL).expect(500)
  })

  it('should call the getSubNav with the correct parameters team', function () {
    getCaseload.resolves(CASELOAD)
    return supertest(app)
      .get(TEAM_CASELOAD_URL)
      .expect(200)
      .then(function () {
        expect(getSubNavStub.calledWith('1', 'team', TEAM_CASELOAD_URL)).to.be.true //eslint-disable-line
      })
  })

  // LDU Level
  it('should respond with 200 when ldu and id are included in URL', function () {
    getCaseload.resolves(CASELOAD)
    return supertest(app).get(LDU_CASELOAD_URL).expect(200)
  })

  it('should respond with 500 when ldu, but no id, is included in URL', function () {
    getCaseload.resolves(CASELOAD)
    return supertest(app).get(LDU_MISSING_ID_URL).expect(500)
  })

  it('should call the getSubNav with the correct parameters for LDU', function () {
    getCaseload.resolves(CASELOAD)
    return supertest(app)
      .get(LDU_CASELOAD_URL)
      .expect(200)
      .then(function () {
        expect(getSubNavStub.calledWith('1', 'ldu', LDU_CASELOAD_URL)).to.be.true //eslint-disable-line
      })
  })
})
