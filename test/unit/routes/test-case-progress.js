const expect = require('chai').expect
const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const OFFENDER_MANAGER_CASE_PROGRESS_URL = '/offender-manager/1/case-progress'
const OFFENDER_MANAGER_MISSING_ID_URL = '/offender-manager/case-progress'
const OFFENDER_MANAGER_TYPO_URL = '/offender-manager/1/case-prog'

const CASE_PROGRESS = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: {},
  subNav: {},
  caseProgress: [
    {
      communityLast16Weeks: 1,
      licenseLast16Weeks: 2,
      totalCases: 3,
      warrantsTotal: 4,
      unpaidWorkTotal: 5,
      overdueTerminationsTotal: 6
    }
  ]
}

var app
var route
var getCaseProgress
var getSubNavStub

before(function () {
  getSubNavStub = sinon.stub()
  getCaseProgress = sinon.stub()
  route = proxyquire('../../../app/routes/case-progress', {
    '../services/get-case-progress': getCaseProgress,
    '../services/get-sub-nav': getSubNavStub})
  app = routeHelper.buildApp(route)
})

describe('case-progress route', function () {
  it('should respond with 200 when offender-manager and id included in URL', function () {
    getCaseProgress.resolves(CASE_PROGRESS)
    return supertest(app).get(OFFENDER_MANAGER_CASE_PROGRESS_URL).expect(200)
  })

  it('should respond with 500 when offender-manager, but no id, included in URL', function () {
    getCaseProgress.resolves(CASE_PROGRESS)
    return supertest(app).get(OFFENDER_MANAGER_MISSING_ID_URL).expect(500)
  })

  it('should respond with 500 when path has typo', function () {
    getCaseProgress.resolves(CASE_PROGRESS)
    return supertest(app).get(OFFENDER_MANAGER_TYPO_URL).expect(500)
  })

  it('should call the getSubNav with the correct parameters', function () {
    getCaseProgress.resolves(CASE_PROGRESS)
    return supertest(app)
        .get(OFFENDER_MANAGER_CASE_PROGRESS_URL)
        .expect(200)
        .then(function () {
          expect(getSubNavStub.calledWith('1', 'offender-manager', OFFENDER_MANAGER_CASE_PROGRESS_URL)).to.be.true //eslint-disable-line
        })
  })
})
