const expect = require('chai').expect
const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const orgUnit = require('../../../app/constants/organisation-unit')
const tabs = require('../../../app/constants/wmt-tabs')
const workloadTypes = require('../../../app/constants/workload-type')

const REGION_CASELOAD_URL = '/' + workloadTypes.PROBATION + '/region/1/caseload'
const NATIONAL_CASELOAD_URL = '/' + workloadTypes.PROBATION + '/hmpps/0/caseload'
const LDU_CASELOAD_URL = '/' + workloadTypes.PROBATION + '/ldu/1/caseload'
const LDU_MISSING_ID_URL = '/' + workloadTypes.PROBATION + '/ldu/caseload'
const TEAM_CASELOAD_URL = '/' + workloadTypes.PROBATION + '/team/1/caseload'
const TEAM_MISSING_ID_URL = '/' + workloadTypes.PROBATION + '/team/caseload'

const TEAM_CASELOAD_CSV_URL = '/' + workloadTypes.PROBATION + '/team/1/caseload/caseload-csv'
const LDU_CASELOAD_CSV_URL = '/' + workloadTypes.PROBATION + '/ldu/1/caseload/caseload-csv'

const TEAM_CASELOAD = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: [{}],
  subNav: {},
  caseloadDetails: {
    overallCaseloadDetails: [
      { name: 'Zoe Johnson' },
      { name: 'Aaron George' },
      { name: 'Bernard Bloggs' }
    ],
    communityCaseloadDetails: [
      { name: 'Zoe Johnson' },
      { name: 'Aaron George' },
      { name: 'Bernard Bloggs' }
    ],
    custodyCaseloadDetails: [
      { name: 'Zoe Johnson' },
      { name: 'Aaron George' },
      { name: 'Bernard Bloggs' }
    ],
    licenseCaseloadDetails: [
      { name: 'Zoe Johnson' },
      { name: 'Aaron George' },
      { name: 'Bernard Bloggs' }
    ],
    overallTotalSummary: [
      { name: 'Zoe Johnson' },
      { name: 'Aaron George' },
      { name: 'Bernard Bloggs' }
    ],
    custodyTotalSummary: 0,
    communityTotalSummary: 0,
    licenseTotalSummary: 0
  }
}

const BASE_CASELOAD_DETAILS = {
  details: [
    {
      linkId: 1278,
      name: 'BEX NPS1',
      grades: [
        { grade: 'PO', a: 5, b1: 27, b2: 43, c1: 6, c2: 7, d1: 0, d2: 0, e: 0, f: 0, g: 0, untiered: 0, totalCases: 88 },
        { grade: 'PSO', a: 0, b1: 0, b2: 0, c1: 37, c2: 29, d1: 2, d2: 8, e: 0, f: 0, g: 0, untiered: 0, totalCases: 76 },
        { grade: 'TPO', a: 0, b1: 0, b2: 0, c1: 7, c2: 27, d1: 3, d2: 8, e: 0, f: 0, g: 1, untiered: 0, totalCases: 46 }
      ]
    }
  ],
  totals: {
    PO: { grade: 'PO', a: 5, b1: 27, b2: 43, c1: 6, c2: 7, d1: 0, d2: 0, e: 0, f: 0, g: 0, untiered: 0, totalCases: 88 },
    PSO: { grade: 'PSO', a: 0, b1: 0, b2: 0, c1: 37, c2: 29, d1: 2, d2: 8, e: 0, f: 0, g: 0, untiered: 0, totalCases: 76 },
    TPO: { grade: 'TPO', a: 0, b1: 0, b2: 0, c1: 7, c2: 27, d1: 3, d2: 8, e: 0, f: 0, g: 1, untiered: 0, totalCases: 46 }
  },
  detailsPercentages: [
    {
      linkId: 1278,
      name: 'BEX NPS1',
      grades: [
        { grade: 'PO', a: 100, b1: 100, b2: 100, c1: 12, c2: 11.11111111111111, d1: 0, d2: 0, e: 0, f: 0, g: 0, untiered: 0, totalCases: 41.904761904761905 },
        { grade: 'PSO', a: 0, b1: 0, b2: 0, c1: 74, c2: 46.03174603174603, d1: 40, d2: 50, e: 0, f: 0, g: 0, untiered: 0, totalCases: 36.19047619047619 },
        { grade: 'TPO', a: 0, b1: 0, b2: 0, c1: 14.000000000000002, c2: 42.857142857142854, d1: 60, d2: 50, e: 0, f: 0, g: 100, untiered: 0, totalCases: 21.904761904761905 }
      ]
    }
  ],
  percentageTotals: {
    PO: { grade: 'PO', a: 95.65217391304348, b1: 98.7012987012987, b2: 98.30508474576271, c1: 65.55555555555556, c2: 27.68166089965398, d1: 12.5, d2: 3.571428571428571, e: 0, f: 0, g: 0, untiered: 0, totalCases: 66.0377358490566 },
    PSO: { grade: 'PSO', a: 4.3478260869565215, b1: 0.6493506493506493, b2: 1.3559322033898304, c1: 24.444444444444443, c2: 48.78892733564014, d1: 50, d2: 66.07142857142857, e: 0, f: 0, g: 0, untiered: 0, totalCases: 23.038728897715988 },
    TPO: { grade: 'TPO', a: 0, b1: 0, b2: 0, c1: 7, c2: 27, d1: 3, d2: 8, e: 0, f: 0, g: 1, untiered: 0, totalCases: 46 }
  }
}

const LDU_CASELOAD = {
  title: 'Bexley, Bromley, Greenwich',
  subTitle: 'Probation Delivery Unit',
  breadcrumbs: [{ title: 'Bexley, Bromley, Greenwich', link: '/probation/ldu/645' }, { title: 'NPS London', link: '/probation/region/1' }, { title: 'HMPPS', link: '/probation/hmpps/0' }],
  caseloadDetails: {
    overallCaseloadDetails: Object.assign({}, BASE_CASELOAD_DETAILS),
    communityCaseloadDetails: Object.assign({}, BASE_CASELOAD_DETAILS),
    custodyCaseloadDetails: Object.assign({}, BASE_CASELOAD_DETAILS),
    licenseCaseloadDetails: Object.assign({}, BASE_CASELOAD_DETAILS),
    overallTotalSummary: [{ name: 'BEX NPS1', linkId: 1278, totalCases: 210, custodyTotalCases: 58, communityTotalCases: 37, licenseTotalCases: 115, totals: { totalCommunity: 141, totalLicense: 401, totalCustody: 465, totalTotalCases: 1007 } }],
    custodyTotalSummary: 465,
    communityTotalSummary: 141,
    licenseTotalSummary: 401
  }
}

const EXPORT_CSV_FILENAME = 'Test CSV File.csv'

const EXPORT_CSV = '"TeamName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n' +
      '"Test Team 1","PO",50,0,50,25,10,0,50,50,50\n' +
      '"Test Team 1","PSO",50,0,50,75,90,100,50,50,50'

let app
let route
let getCaseload
let getLastUpdated
let getSubNavStub
let getExportCsv
let authorisationService

before(function () {
  authorisationService = {
    assertUserAuthenticated: sinon.stub()
  }
  getSubNavStub = sinon.stub()
  getCaseload = sinon.stub()
  getLastUpdated = sinon.stub().resolves(new Date(2017, 11, 1))
  getExportCsv = sinon.stub().returns({ filename: EXPORT_CSV_FILENAME, csv: EXPORT_CSV })
  route = proxyquire('../../../app/routes/caseload', {
    '../services/data/get-last-updated': getLastUpdated,
    '../services/get-caseload': getCaseload,
    '../services/get-sub-nav': getSubNavStub,
    '../authorisation': authorisationService,
    '../services/get-export-csv': getExportCsv
  })
  app = routeHelper.buildApp(route)
})

describe('caseload route', function () {
  it('should respond with 200 when team and id included in URL', function () {
    getCaseload.resolves(TEAM_CASELOAD)
    return supertest(app).get(TEAM_CASELOAD_URL).expect(200)
  })

  it('should respond with 500 when team, but no id, included in URL', function () {
    getCaseload.resolves(TEAM_CASELOAD)
    return supertest(app).get(TEAM_MISSING_ID_URL).expect(500)
  })

  it('should repsond with 200 for LDU URL', function () {
    getCaseload.resolves(LDU_CASELOAD)
    return supertest(app).get(LDU_CASELOAD_URL).expect(200)
  })

  it('should repsond with 200 for Region URL', function () {
    getCaseload.resolves(LDU_CASELOAD)
    return supertest(app).get(REGION_CASELOAD_URL).expect(200)
  })

  it('should repsond with 200 for National URL', function () {
    getCaseload.resolves(LDU_CASELOAD)
    return supertest(app).get(NATIONAL_CASELOAD_URL).expect(200)
  })

  it('should call the getSubNav with the correct parameters team', function () {
    getCaseload.resolves(TEAM_CASELOAD)
    return supertest(app)
      .get(TEAM_CASELOAD_URL)
      .expect(200)
      .then(function () {
        expect(getSubNavStub.calledWith('1', orgUnit.TEAM.name, TEAM_CASELOAD_URL)).to.be.true //eslint-disable-line
      })
  })

  // LDU Level
  it('should respond with 500 when ldu, but no id, is included in URL', function () {
    getCaseload.resolves(TEAM_CASELOAD)
    return supertest(app).get(LDU_MISSING_ID_URL).expect(500)
  })

  it('should call the getSubNav with the correct parameters for LDU', function () {
    getCaseload.resolves(LDU_CASELOAD)
    return supertest(app)
      .get(LDU_CASELOAD_URL)
      .expect(200)
      .then(function () {
        expect(getSubNavStub.calledWith('1', orgUnit.LDU.name, LDU_CASELOAD_URL)).to.be.true //eslint-disable-line
        expect(getCaseload.calledWith('1', orgUnit.LDU.name)).to.be.eql(true)
      })
  })

  // REGION Level
  it('should call the getSubNav with the correct parameters for REGION', function () {
    getCaseload.resolves(LDU_CASELOAD)
    return supertest(app)
      .get(REGION_CASELOAD_URL)
      .expect(200)
      .then(function () {
        expect(getSubNavStub.calledWith('1', orgUnit.REGION.name, REGION_CASELOAD_URL)).to.be.true //eslint-disable-line
        expect(getCaseload.calledWith('1', orgUnit.REGION.name)).to.be.eql(true)
      })
  })

  // NATIONAL Level
  it('should call the getSubNav with the correct parameters for NATIONAL', function () {
    getCaseload.resolves(LDU_CASELOAD)
    return supertest(app)
      .get(NATIONAL_CASELOAD_URL)
      .expect(200)
      .then(function () {
        expect(getSubNavStub.calledWith('0', orgUnit.NATIONAL.name, NATIONAL_CASELOAD_URL)).to.be.true //eslint-disable-line
        expect(getCaseload.calledWith('0', orgUnit.NATIONAL.name)).to.be.eql(true)
      })
  })
})

describe('Caseload csv export route', function () {
  describe('for a Team', function () {
    it('should respond with 200 when team and id included in URL', function () {
      getCaseload.resolves(TEAM_CASELOAD)
      return supertest(app).get(TEAM_CASELOAD_CSV_URL).expect(200)
    })

    it('should call getExportCsv with the correct parameters', function () {
      getCaseload.resolves(TEAM_CASELOAD)
      return supertest(app)
        .get(TEAM_CASELOAD_CSV_URL)
        .expect(200)
        .then(function () {
          expect(getExportCsv.calledWith(orgUnit.TEAM.name, TEAM_CASELOAD, tabs.CASELOAD)).to.be.true //eslint-disable-line
        })
    })

    it('should add the correct csv to the response header', function () {
      getCaseload.resolves(TEAM_CASELOAD)
      return supertest(app)
        .get(TEAM_CASELOAD_CSV_URL)
        .then(function (response) {
          expect(response.header['content-type']).to.contain('text/csv')
          expect(response.header['content-disposition']).to.contain('attachment; filename="' + EXPORT_CSV_FILENAME + '"')
          expect(response.text).to.contain(EXPORT_CSV)
        })
    })
  })

  describe('for an LDU', function () {
    it('should respond with 200 when ldu and id included in URL', function () {
      getCaseload.resolves(TEAM_CASELOAD)
      return supertest(app).get(LDU_CASELOAD_CSV_URL).expect(200)
    })

    it('should call getExportCsv with the correct parameters', function () {
      getCaseload.resolves(TEAM_CASELOAD)
      return supertest(app)
        .get(LDU_CASELOAD_CSV_URL)
        .expect(200)
        .then(function () {
          expect(getExportCsv.calledWith(orgUnit.LDU.name, TEAM_CASELOAD, tabs.CASELOAD)).to.be.true //eslint-disable-line
        })
    })

    it('should add the correct csv to the response header', function () {
      getCaseload.resolves(TEAM_CASELOAD)
      return supertest(app)
        .get(LDU_CASELOAD_CSV_URL)
        .then(function (response) {
          expect(response.header['content-type']).to.contain('text/csv')
          expect(response.header['content-disposition']).to.contain('attachment; filename="' + EXPORT_CSV_FILENAME + '"')
          expect(response.text).to.contain(EXPORT_CSV)
        })
    })
  })
})
