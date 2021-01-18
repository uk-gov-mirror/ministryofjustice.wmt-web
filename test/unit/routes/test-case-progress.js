const expect = require('chai').expect
const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const workloadTypes = require('../../../app/constants/workload-type')

const OFFENDER_MANAGER_CASE_PROGRESS_URL = '/' + workloadTypes.PROBATION + '/offender-manager/1/case-progress'
const OFFENDER_MANAGER_MISSING_ID_URL = '/' + workloadTypes.PROBATION + '/offender-manager/case-progress'
const OFFENDER_MANAGER_TYPO_URL = '/' + workloadTypes.PROBATION + '/offender-manager/1/case-prog'

const CASE_PROGRESS = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: {},
  subNav: {},
  caseProgress: [{}]
}

let app
let route
let getCaseProgress
let getLastUpdated
let getSubNavStub
let authorisationService

before(function () {
  authorisationService = {
    assertUserAuthenticated: sinon.stub()
  }
  getSubNavStub = sinon.stub()
  getCaseProgress = sinon.stub()
  getLastUpdated = sinon.stub().resolves(new Date(2017, 11, 1))
  route = proxyquire('../../../app/routes/case-progress', {
    '../services/get-case-progress': getCaseProgress,
    '../services/data/get-last-updated': getLastUpdated,
    '../authorisation': authorisationService,
    '../services/get-sub-nav': getSubNavStub
  })
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
