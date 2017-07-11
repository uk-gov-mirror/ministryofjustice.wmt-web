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
  caseProgress: [{
    community_last_16_weeks: 1,
    license_last_16_weeks: 2,
    total_cases: 3,
    warrants_total: 4,
    unpaid_work_total: 5,
    overdue_terminations_total: 6
  }]
}

describe('case-progress route', function () {
  var app

  it('should respond with 200 when offender-manager and id included in URL', function () {
    var getCaseProgress = sinon.stub()
    var route = proxyquire('../../../app/routes/case-progress', {'../services/get-case-progress': getCaseProgress})
    app = routeHelper.buildApp(route)
    getCaseProgress.resolves(CASE_PROGRESS)

    return supertest(app).get(OFFENDER_MANAGER_CASE_PROGRESS_URL).expect(200)
  })

  it('should respond with 500 when offender-manager, but no id, included in URL', function () {
    var getCaseProgress = sinon.stub()
    var route = proxyquire('../../../app/routes/case-progress', {'../services/get-case-progress': getCaseProgress})
    app = routeHelper.buildApp(route)
    getCaseProgress.resolves(CASE_PROGRESS)

    return supertest(app).get(OFFENDER_MANAGER_MISSING_ID_URL).expect(500)
  })

  it('should respond with 500 when path has typo', function () {
    var getCaseProgress = sinon.stub()
    var route = proxyquire('../../../app/routes/case-progress', {'../services/get-case-progress': getCaseProgress})
    app = routeHelper.buildApp(route)
    getCaseProgress.resolves(CASE_PROGRESS)

    return supertest(app).get(OFFENDER_MANAGER_TYPO_URL).expect(500)
  })
})
