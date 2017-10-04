const expect = require('chai').expect
const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const orgUnit = require('../../../app/constants/organisation-unit')
const tabs = require('../../../app/constants/wmt-tabs')

const OM_OVERVIEW_URL = '/offender-manager/1/overview'
const LDU_OVERVIEW_URL = '/ldu/1/overview'
const REGION_OVERVIEW_URL = '/region/1/overview'
const HMPPS_OVERVIEW_URL = '/hmpps/0/overview'

const OM_MISSING_ID_URL = '/offender-manager/overview'

const OM_OVERVIEW_CSV_URL = '/offender-manager/1/overview/csv'
const TEAM_OVERVIEW_CSV_URL = '/team/1/overview/csv'
const LDU_OVERVIEW_CSV_URL = '/ldu/1/overview/csv'
const REGION_OVERVIEW_CSV_URL = '/region/1/overview/csv'
const HMPPS_OVERVIEW_CSV_URL = '/hmpps/0/overview/csv'

const OVERVIEW = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: [{ title: 'Offender Manager' }],
  subNav: {},
  overviewDetails: [{}]
}

const EXPORT_CSV_FILENAME = 'Test CSV File.csv'

const EXPORT_CSV = '"TeamName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n' +
      '"Test Team 1","PO",50,0,50,25,10,0,50,50,50\n' +
      '"Test Team 1","PSO",50,0,50,75,90,100,50,50,50'

var app
var route
var getOverview
var getSubNavStub
var getExportCsv
var authorisationService

before(function () {
  authorisationService = {
    isUserAuthenticated: sinon.stub().returns(true)
  }
  getSubNavStub = sinon.stub()
  getOverview = sinon.stub()
  getExportCsv = sinon.stub().returns({ filename: EXPORT_CSV_FILENAME, csv: EXPORT_CSV })
  route = proxyquire('../../../app/routes/overview', {
    '../services/get-overview': getOverview,
    '../services/get-sub-nav': getSubNavStub,
    '../authorisation': authorisationService,
    '../services/get-export-csv': getExportCsv
  })
  app = routeHelper.buildApp(route)
})

describe('overview route', function () {
  it('should respond with 200 when offender-manager and id included in URL', function () {
    getOverview.resolves(OVERVIEW)
    return supertest(app).get(OM_OVERVIEW_URL).expect(200)
  })

  it('should respond with 200 when ldu and id included in URL', function () {
    getOverview.resolves(OVERVIEW)
    return supertest(app).get(LDU_OVERVIEW_URL).expect(200)
  })

  it('should respond with 200 when region and id included in URL', function () {
    getOverview.resolves(OVERVIEW)
    return supertest(app).get(REGION_OVERVIEW_URL).expect(200)
  })

  it('should respond with 200 when national and id included in URL', function () {
    getOverview.resolves(OVERVIEW)
    return supertest(app).get(HMPPS_OVERVIEW_URL).expect(200)
  })

  it('should respond with 500 when offender-manager, but no id, included in URL', function () {
    getOverview.resolves(OVERVIEW)
    return supertest(app).get(OM_MISSING_ID_URL).expect(500)
  })

  it('should call the getSubNav with the correct parameters', function () {
    getOverview.resolves(OVERVIEW)
    return supertest(app)
        .get(OM_OVERVIEW_URL)
        .expect(200)
        .then(function () {
          expect(getSubNavStub.calledWith('1', orgUnit.OFFENDER_MANAGER.name, OM_OVERVIEW_URL)).to.be.true //eslint-disable-line
        })
  })
})

describe('Overview csv export route', function () {
  describe('for an Offender Manager', function () {
    it('should respond with 200 when offender-manager and id included in URL', function () {
      getOverview.resolves(OVERVIEW)
      return supertest(app).get(OM_OVERVIEW_CSV_URL).expect(200)
    })

    it('should call getExportCsv with the correct parameters', function () {
      getOverview.resolves(OVERVIEW)
      return supertest(app)
        .get(OM_OVERVIEW_CSV_URL)
        .expect(200)
        .then(function () {
          expect(getExportCsv.calledWith(orgUnit.OFFENDER_MANAGER.name, OVERVIEW, tabs.OVERVIEW)).to.be.true //eslint-disable-line
        })
    })
  })

  describe('for a Team', function () {
    it('should respond with 200 when team and id included in URL', function () {
      getOverview.resolves(OVERVIEW)
      return supertest(app).get(TEAM_OVERVIEW_CSV_URL).expect(200)
    })

    it('should call getExportCsv with the correct parameters', function () {
      getOverview.resolves(OVERVIEW)
      return supertest(app)
        .get(OM_OVERVIEW_CSV_URL)
        .expect(200)
        .then(function () {
          expect(getExportCsv.calledWith(orgUnit.OFFENDER_MANAGER.name, OVERVIEW, tabs.OVERVIEW)).to.be.true //eslint-disable-line
        })
    })
  })

  describe('for an LDU', function () {
    it('should respond with 200 when ldu and id included in URL', function () {
      getOverview.resolves(OVERVIEW)
      return supertest(app).get(LDU_OVERVIEW_CSV_URL).expect(200)
    })

    it('should call getExportCsv with the correct parameters', function () {
      getOverview.resolves(OVERVIEW)
      return supertest(app)
        .get(LDU_OVERVIEW_CSV_URL)
        .expect(200)
        .then(function () {
          expect(getExportCsv.calledWith(orgUnit.LDU.name, OVERVIEW, tabs.OVERVIEW)).to.be.true //eslint-disable-line
        })
    })
  })

  describe('for a Region', function () {
    it('should respond with 200 when ldu and id included in URL', function () {
      getOverview.resolves(OVERVIEW)
      return supertest(app).get(REGION_OVERVIEW_CSV_URL).expect(200)
    })

    it('should call getExportCsv with the correct parameters', function () {
      getOverview.resolves(OVERVIEW)
      return supertest(app)
        .get(REGION_OVERVIEW_CSV_URL)
        .expect(200)
        .then(function () {
          expect(getExportCsv.calledWith(orgUnit.REGION.name, OVERVIEW, tabs.OVERVIEW)).to.be.true //eslint-disable-line
        })
    })
  })

  describe('for National', function () {
    it('should respond with 200 when ldu and id included in URL', function () {
      getOverview.resolves(OVERVIEW)
      return supertest(app).get(HMPPS_OVERVIEW_CSV_URL).expect(200)
    })

    it('should call getExportCsv with the correct parameters', function () {
      getOverview.resolves(OVERVIEW)
      return supertest(app)
        .get(HMPPS_OVERVIEW_CSV_URL)
        .expect(200)
        .then(function () {
          expect(getExportCsv.calledWith(orgUnit.NATIONAL.name, OVERVIEW, tabs.OVERVIEW)).to.be.true //eslint-disable-line
        })
    })
  })

  it('should add the correct csv to the response header', function () {
    getOverview.resolves(OVERVIEW)
    return supertest(app)
      .get(TEAM_OVERVIEW_CSV_URL)
      .then(function (response) {
        expect(response.header['content-type']).to.contain('text/csv')
        expect(response.header['content-disposition']).to.contain('attachment; filename="' + EXPORT_CSV_FILENAME + '"')
        expect(response.text).to.contain(EXPORT_CSV)
      })
  })
})
