const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')
const proxyquire = require('proxyquire')

const breadcrumbHelper = require('../../helpers/breadcrumb-helper')

const CASE_PROGRESS = {
  community_last_16_weeks: 1,
  license_last_16_weeks: 2,
  total_cases: 3,
  warrants_total: 4,
  unpaid_work_total: 5,
  overdue_terminations_total: 6
}

var id = 1
var organisationalUnit = 'offender-manager'
var breadcrumbs = breadcrumbHelper.OFFENDER_MANAGER_BREADCRUMBS
var expectedTitle = breadcrumbs[0].title
var expectedSubNav = [{id: '1', link: 'link'}]

var getCaseProgress
var getCaseProgressRow
var getBreadcrumbs
var getSubNav

before(function () {
  getCaseProgressRow = sinon.stub()
  getBreadcrumbs = sinon.stub().returns(breadcrumbs)
  getSubNav = sinon.stub().returns(expectedSubNav)
  getCaseProgress =
      proxyquire('../../../app/services/get-case-progress',
        {'./data/get-individual-caseload-progress': getCaseProgressRow,
          './get-breadcrumbs': getBreadcrumbs,
          './get-sub-nav': getSubNav})
  getCaseProgressRow.resolves(CASE_PROGRESS)
})

describe('services/get-case-progress', function () {
  it('should return a result object with a case progress row and title for offender manager', function () {
    getCaseProgress(id, organisationalUnit).then(function (result) {
      expect(result.caseProgress).to.be.an('object')
      expect(result.title).to.equal(expectedTitle)
    })
  })

  it('should return a result object with expected breadcrumbs for offender manager', function () {
    getCaseProgress(id, organisationalUnit).then(function (result) {
      expect(result.breadcrumbs).to.be.an('Array')
      expect(result.breadcrumbs).to.eql(breadcrumbs)
    })
  })
})
