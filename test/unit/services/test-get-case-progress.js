const expect = require('chai').expect
const sinon = require('sinon')

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

const id = 1
const breadcrumbs = breadcrumbHelper.OFFENDER_MANAGER_BREADCRUMBS
const expectedTitle = breadcrumbs[0].title

let getCaseProgress
let getCaseProgressList
let getBreadcrumbs

before(function () {
  getCaseProgressList = sinon.stub()
  getBreadcrumbs = sinon.stub().returns(breadcrumbs)
  getCaseProgress =
      proxyquire('../../../app/services/get-case-progress',
        {
          './data/get-caseload-progress': getCaseProgressList,
          './get-breadcrumbs': getBreadcrumbs
        })
  getCaseProgressList.resolves(CASE_PROGRESS)
})

describe('services/get-case-progress', function () {
  it('should return a result array with a case progress row, title and breadcrumbs for offender manager', function () {
    return getCaseProgress(id, 'offender-manager').then(function (result) {
      expect(result.caseProgressList).to.be.an('Array')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(result.breadcrumbs).to.eql(breadcrumbs)
    })
  })

  it('should return a result array with a case progress row, title and breadcrumbs for team', function () {
    return getCaseProgress(id, 'team').then(function (result) {
      expect(result.caseProgressList).to.be.an('Array')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(result.breadcrumbs).to.eql(breadcrumbs)
    })
  })

  it('should return a result array with a case progress row, title and breadcrumbs for ldu', function () {
    return getCaseProgress(id, 'ldu').then(function (result) {
      expect(result.caseProgressList).to.be.an('Array')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(result.breadcrumbs).to.eql(breadcrumbs)
    })
  })

  it('should return a result array with a case progress row, title and breadcrumbs for region', function () {
    return getCaseProgress(id, 'region').then(function (result) {
      expect(result.caseProgressList).to.be.an('Array')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(result.breadcrumbs).to.eql(breadcrumbs)
    })
  })

  it('should return a result array with a case progress row, title and breadcrumbs for hmpps', function () {
    return getCaseProgress(id, 'hmpps').then(function (result) {
      expect(result.caseProgressList).to.be.an('Array')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(result.breadcrumbs).to.eql(breadcrumbs)
    })
  })
})
