const expect = require('chai').expect
const sinon = require('sinon')

const proxyquire = require('proxyquire')

const TEAM_RESULTS = [
  {
    linkId: 1,
    name: 'Test name',
    grade: 'Test grade',
    ow: 39,
    ot: 29,
    upw: 19,
    t2aOw: 39,
    t2aOt: 29,
    t2aUpw: 19,
    sl: 90,
    sso: 100
  }
]

const EXPECTED_TEAM_RESULT = [
  {
    linkId: 1,
    name: 'Test name',
    grade: 'Test grade',
    ow: 78,
    ot: 58,
    upw: 38,
    sl: 90,
    sso: 100
  },
  {
    name: 'Total',
    totalOW: 78,
    totalOT: 58,
    totalUPW: 38,
    totalSL: 90,
    totalSSO: 100
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
    t2aOw: 3,
    t2aOt: 3,
    t2aUpw: 3,
    sl: 90,
    sso: 99
  },
  {
    linkId: 2,
    name: 'Test ldu 2',
    grade: 'Test grade 2',
    ow: 40,
    ot: 30,
    upw: 20,
    t2aOw: 3,
    t2aOt: 3,
    t2aUpw: 3,
    sl: 91,
    sso: 100
  }
]

const EXPECTED_LDU_RESULT = [
  {
    grades: [
      {
        grade: 'Test grade 1',
        linkId: 1,
        name: 'Test ldu 1',
        ot: 32,
        ow: 42,
        sl: 90,
        upw: 22,
        sso: 99
      }
    ],
    linkId: 1,
    name: 'Test ldu 1'
  },
  {
    grades: [
      {
        grade: 'Test grade 2',
        linkId: 2,
        name: 'Test ldu 2',
        ot: 33,
        ow: 43,
        sl: 91,
        upw: 23,
        sso: 100
      }
    ],
    linkId: 2,
    name: 'Test ldu 2'
  },
  {
    name: 'Total',
    totalOT: 65,
    totalOW: 85,
    totalSL: 181,
    totalUPW: 45,
    totalSSO: 199
  }
]

const REGION_RESULTS = [
  {
    linkId: 1,
    name: 'Test region 1',
    grade: 'Test grade 1',
    ow: 19,
    ot: 30,
    upw: 2,
    t2aOw: 3,
    t2aOt: 23,
    t2aUpw: 1,
    sl: 9,
    sso: 16
  },
  {
    linkId: 2,
    name: 'Test region 2',
    grade: 'Test grade 2',
    ow: 8,
    ot: 2,
    upw: 34,
    t2aOw: 12,
    t2aOt: 23,
    t2aUpw: 23,
    sl: 11,
    sso: 21
  }
]

const EXPECTED_REGION_RESULT = [
  {
    grades: [
      {
        grade: 'Test grade 1',
        linkId: 1,
        name: 'Test region 1',
        ot: 53,
        ow: 22,
        sl: 9,
        upw: 3,
        sso: 16
      }
    ],
    linkId: 1,
    name: 'Test region 1'
  },
  {
    grades: [
      {
        grade: 'Test grade 2',
        linkId: 2,
        name: 'Test region 2',
        ot: 25,
        ow: 20,
        sl: 11,
        upw: 57,
        sso: 21
      }
    ],
    linkId: 2,
    name: 'Test region 2'
  },
  {
    name: 'Total',
    totalOT: 78,
    totalOW: 42,
    totalSL: 20,
    totalUPW: 60,
    totalSSO: 37
  }
]

const callingId = 5

let getOutstandingReports
let getOutstandingReportsView

beforeEach(function () {
  getOutstandingReportsView = sinon.stub()
  getOutstandingReports = proxyquire('../../../app/services/get-outstanding-reports',
    {
      './data/get-outstanding-reports-view': getOutstandingReportsView
    })
})

describe('services/get-outstanding-reports-view', function () {
  it('should return a result object with outstanding reports for team', function () {
    getOutstandingReportsView.resolves(TEAM_RESULTS)
    return getOutstandingReports(callingId, 'team').then((result) => {
      expect(getOutstandingReportsView.calledWith(callingId, 'team')).to.be.equal(true)
      expect(result).to.be.eql(EXPECTED_TEAM_RESULT)
    })
  })

  it('should return a result object with outstanding reports for ldu', function () {
    getOutstandingReportsView.resolves(LDU_RESULTS)
    return getOutstandingReports(callingId, 'ldu').then((result) => {
      expect(getOutstandingReportsView.calledWith(callingId, 'ldu')).to.be.equal(true)
      expect(result).to.be.eql(EXPECTED_LDU_RESULT)
    })
  })

  it('should return a result object with outstanding reports for region', function () {
    getOutstandingReportsView.resolves(REGION_RESULTS)
    return getOutstandingReports(callingId, 'region').then((result) => {
      expect(getOutstandingReportsView.calledWith(callingId, 'region')).to.be.equal(true)
      expect(result).to.be.eql(EXPECTED_REGION_RESULT)
    })
  })

  it('should return an empty object for offender manager', function () {
    getOutstandingReportsView.resolves(LDU_RESULTS)
    return getOutstandingReports(callingId, 'offender-manager').then((result) => {
      expect(getOutstandingReportsView.calledWith(callingId, 'offender-manager')).to.be.equal(false)
      expect(result).to.be.eql([])
    })
  })
})
