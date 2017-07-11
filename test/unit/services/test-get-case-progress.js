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

describe('services/get-case-progress', function () {
  var id = 1
  var organisationalUnit = 'offender-manager'
  var breadcrumbs = breadcrumbHelper.OFFENDER_MANAGER_BREADCRUMBS
  var expectedTitle = breadcrumbs[0].title

  it('should return a result object with a case progress row, title and breadcrumbs object for offender manager', function () {
    var getCaseProgressRow = sinon.stub()
    var getBreadcrumbs = sinon.stub().returns(breadcrumbs)
    var getCaseProgress =
      proxyquire('../../../app/services/get-case-progress',
        {'./data/get-case-progress': getCaseProgressRow,
          '../services/get-breadcrumbs': getBreadcrumbs})
    getCaseProgressRow.resolves(CASE_PROGRESS)

    getCaseProgress(id, organisationalUnit).then(function (result) {
      expect(result.caseProgress).to.be.an('object')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      // Sub nav?
    })
  })
})
