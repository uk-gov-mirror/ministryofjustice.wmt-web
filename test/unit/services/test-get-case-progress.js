const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')
const proxyquire = require('proxyquire')

const breadcrumbHelper = require('../../helpers/breadcrumb-helper')

const CASE_PROGRESS = [
  {
    communityLast16Weeks: 1,
    licenseLast16Weeks: 2,
    totalCases: 3,
    warrantsTotal: 4,
    unpaidWorkTotal: 5,
    overdueTerminationsTotal: 6
  }
]

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
        {'./data/get-caseload-progress': getCaseProgressRow,
          './get-breadcrumbs': getBreadcrumbs,
          './get-sub-nav': getSubNav})
  getCaseProgressRow.resolves(CASE_PROGRESS)
})

describe('services/get-case-progress', function () {
  it('should return a result array with a case progress row and title for offender manager', function (done) {
    getCaseProgress(id, organisationalUnit).then(function (result) {
      expect(result.caseProgressList).to.be.an('Array')
      expect(result.title).to.equal(expectedTitle)
      done()
    })
  })

  it('should return a result object with expected breadcrumbs for offender manager', function (done) {
    getCaseProgress(id, organisationalUnit).then(function (result) {
      expect(result.breadcrumbs).to.be.an('Array')
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      done()
    })
  })
})
