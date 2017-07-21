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
var breadcrumbs = breadcrumbHelper.OFFENDER_MANAGER_BREADCRUMBS
var expectedTitle = breadcrumbs[0].title

var getCaseProgress
var getCaseProgressList
var getBreadcrumbs

before(function () {
  getCaseProgressList = sinon.stub()
  getBreadcrumbs = sinon.stub().returns(breadcrumbs)
  getCaseProgress =
      proxyquire('../../../app/services/get-case-progress',
        {'./data/get-caseload-progress': getCaseProgressList,
          './get-breadcrumbs': getBreadcrumbs})
  getCaseProgressList.resolves(CASE_PROGRESS)
})

describe('services/get-case-progress', function () {
  
  it('should return a result array with a case progress row, title and breadcrumbs for offender manager', function (done) {
    getCaseProgress(id, 'offender-manager').then(function (result) {
      expect(result.caseProgressList).to.be.an('Array')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      done()
    })
  })

  it('should return a result array with a case progress row, title and breadcrumbs for team', function (done) {
    getCaseProgress(id, 'team').then(function (result) {
      expect(result.caseProgressList).to.be.an('Array')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      done()
    })
  })

  it('should return a result array with a case progress row, title and breadcrumbs for ldu', function (done) {
    getCaseProgress(id, 'ldu').then(function (result) {
      expect(result.caseProgressList).to.be.an('Array')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      done()
    })
  })

  it('should return a result array with a case progress row, title and breadcrumbs for region', function (done) {
    getCaseProgress(id, 'region').then(function (result) {
      expect(result.caseProgressList).to.be.an('Array')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      done()
    })
  })

  it('should return a result array with a case progress row, title and breadcrumbs for hmpps', function (done) {
    getCaseProgress(id, 'hmpps').then(function (result) {
      expect(result.caseProgressList).to.be.an('Array')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      done()
    })
  })
})
