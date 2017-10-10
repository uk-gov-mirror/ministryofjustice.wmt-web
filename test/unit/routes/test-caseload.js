const expect = require('chai').expect
const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const orgUnit = require('../../../app/constants/organisation-unit')
const tabs = require('../../../app/constants/wmt-tabs')

const REGION_CASELOAD_URL = '/region/1/caseload'
const NATIONAL_CASELOAD_URL = '/hmpps/0/caseload'
const LDU_CASELOAD_URL = '/ldu/1/caseload'
const LDU_MISSING_ID_URL = '/ldu/caseload'
const TEAM_CASELOAD_URL = '/team/1/caseload'
const TEAM_MISSING_ID_URL = '/team/caseload'

const TEAM_CASELOAD_CSV_URL = '/team/1/caseload/csv'
const LDU_CASELOAD_CSV_URL = '/ldu/1/caseload/csv'

const TEAM_CASELOAD = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: [{}],
  subNav: {},
  caseloadDetails: {
    overallCaseloadDetails: [],
    communityCaseloadDetails: [],
    custodyCaseloadDetails: [],
    licenseCaseloadDetails: [],
    custodyTotalSummary: 0,
    communityTotalSummary: 0,
    licenseTotalSummary: 0
  }
}

const ORG_CASELOAD = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: [{}],
  subNav: {},
  caseloadDetails: [{}]
}

const EXPORT_CSV_FILENAME = 'Test CSV File.csv'

const EXPORT_CSV = '"TeamName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n' +
      '"Test Team 1","PO",50,0,50,25,10,0,50,50,50\n' +
      '"Test Team 1","PSO",50,0,50,75,90,100,50,50,50'

var app
var route
var getCaseload
var getSubNavStub
var getExportCsv
var authorisationService

before(function () {
  authorisationService = {
    isUserAuthenticated: sinon.stub().returns(true)
  }
  getSubNavStub = sinon.stub()
  getCaseload = sinon.stub()
  getExportCsv = sinon.stub().returns({ filename: EXPORT_CSV_FILENAME, csv: EXPORT_CSV })
  route = proxyquire('../../../app/routes/caseload', {
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
    getCaseload.resolves(ORG_CASELOAD)
    return supertest(app).get(LDU_CASELOAD_URL).expect(200)
  })

  it('should repsond with 200 for Region URL', function () {
    getCaseload.resolves(ORG_CASELOAD)
    return supertest(app).get(REGION_CASELOAD_URL).expect(200)
  })

  it('should repsond with 200 for National URL', function () {
    getCaseload.resolves(ORG_CASELOAD)
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
    getCaseload.resolves(ORG_CASELOAD)
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
    getCaseload.resolves(ORG_CASELOAD)
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
    getCaseload.resolves(ORG_CASELOAD)
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
