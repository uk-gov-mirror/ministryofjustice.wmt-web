const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')

const proxyquire = require('proxyquire')

const TEAM_RESULTS = [
  {
    linkId: 1,
    name: 'Test name',
    grade: 'Test grade',
    ow: 39,
    ot: 29,
    opw: 19,
    sl: 90
  }
]

const EXPECTED_TEAM_RESULT = [
  {
    linkId: 1,
    name: 'Test name',
    grade: 'Test grade',
    ow: 39,
    ot: 29,
    opw: 19,
    sl: 90
  }
]

const LDU_RESULTS = [
  {
    linkId: 1,
    name: 'Test ldu 1',
    grade: 'Test grade 1',
    ow: 39,
    ot: 29,
    upw: 19,
    sl: 90
  },
  {
    linkId: 1,
    name: 'Test ldu 1',
    grade: 'Test grade 2',
    ow: 40,
    ot: 30,
    upw: 20,
    sl: 91
  }
]

const EXPECTED_LDU_RESULT = [
  {
    name: 'Test ldu 1',
    linkId: 1,
    grades: [
      {
        linkId: 1,
        name: 'Test ldu 1',
        grade: 'Test grade 1',
        ow: 39,
        ot: 29,
        upw: 19,
        sl: 90
      },
      {
        linkId: 1,
        name: 'Test ldu 1',
        grade: 'Test grade 2',
        ow: 40,
        ot: 30,
        upw: 20,
        sl: 91
      }
    ]
  }
]

const callingId = 5

var getOutstandingReports
var getOutstandingReportsView

beforeEach(function () {
  getOutstandingReportsView = sinon.stub()
  getOutstandingReports = proxyquire('../../../app/services/get-outstanding-reports',
    {
      './data/get-outstanding-reports-view': getOutstandingReportsView
    })
})

describe('services/get-outstanding-reports-view', function () {
  it('should return a result object with a table, title and breadcrumbs object for team', function () {
    getOutstandingReportsView.resolves(TEAM_RESULTS)
    return getOutstandingReports(callingId, 'team').then((result) => {
      expect(getOutstandingReportsView.calledWith(callingId, 'team')).to.be.equal(true)
      expect(result).to.be.eql(EXPECTED_TEAM_RESULT)
    })
  })

  it('should return a result object with a table, title and breadcrumbs object for ldu', function () {
    getOutstandingReportsView.resolves(LDU_RESULTS)
    return getOutstandingReports(callingId, 'ldu').then((result) => {
      expect(getOutstandingReportsView.calledWith(callingId, 'ldu')).to.be.equal(true)
      expect(result).to.be.eql(EXPECTED_LDU_RESULT)
    })
  })

  it('should return a result object with a table, title and breadcrumbs object for region', function () {
    getOutstandingReportsView.resolves(LDU_RESULTS)
    return getOutstandingReports(callingId, 'region').then((result) => {
      expect(getOutstandingReportsView.calledWith(callingId, 'region')).to.be.equal(true)
      expect(result).to.be.eql(EXPECTED_LDU_RESULT)
    })
  })

  it('should return a result object with a table, title and breadcrumbs object for offender manager', function () {
    getOutstandingReportsView.resolves(LDU_RESULTS)
    return getOutstandingReports(callingId, 'offender-manager').then((result) => {
      expect(getOutstandingReportsView.calledWith(callingId, 'offender-manager')).to.be.equal(true)
      expect(result).to.be.eql([])
    })
  })
})
