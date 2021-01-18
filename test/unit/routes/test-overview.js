const expect = require('chai').expect
const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const orgUnit = require('../../../app/constants/organisation-unit')
const tabs = require('../../../app/constants/wmt-tabs')
const workloadTypes = require('../../../app/constants/workload-type')

const INDEX_URI = '/'
const OM_OVERVIEW_URL = '/' + workloadTypes.PROBATION + '/offender-manager/1/overview'
const LDU_OVERVIEW_URL = '/' + workloadTypes.PROBATION + '/ldu/1/overview'
const REGION_OVERVIEW_URL = '/' + workloadTypes.PROBATION + '/region/1/overview'
const HMPPS_OVERVIEW_URL = '/' + workloadTypes.PROBATION + '/hmpps/0/overview'

const VALID_URL_WITHOUT_OVERVIEW = '/' + workloadTypes.PROBATION + '/offender-manager/1'

const OM_MISSING_ID_URL = '/' + workloadTypes.PROBATION + '/offender-manager/overview'

const OM_OVERVIEW_CSV_URL = '/' + workloadTypes.PROBATION + '/offender-manager/1/overview/caseload-csv'
const TEAM_OVERVIEW_CSV_URL = '/' + workloadTypes.PROBATION + '/team/1/overview/caseload-csv'
const LDU_OVERVIEW_CSV_URL = '/' + workloadTypes.PROBATION + '/ldu/1/overview/caseload-csv'
const REGION_OVERVIEW_CSV_URL = '/' + workloadTypes.PROBATION + '/region/1/overview/caseload-csv'
const HMPPS_OVERVIEW_CSV_URL = '/' + workloadTypes.PROBATION + '/hmpps/0/overview/caseload-csv'

const TEAM_REDUCTIONS_CSV_URL = '/' + workloadTypes.PROBATION + '/team/1/overview/reductions-csv'
const LDU_REDUCTIONS_CSV_URL = '/' + workloadTypes.PROBATION + '/ldu/1/overview/reductions-csv'
const REGION_REDUCTIONS_CSV_URL = '/' + workloadTypes.PROBATION + '/region/1/overview/reductions-csv'
const NATIONAL_REDUCTIONS_CSV_URL = '/' + workloadTypes.PROBATION + '/hmpps/1/overview/reductions-csv'
const OM_REDUCTIONS_CSV_URL = '/' + workloadTypes.PROBATION + '/offender-manager/1/overview/reductions-csv'

const OVERVIEW = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: [{ title: 'Offender Manager' }],
  subNav: {},
  overviewDetails: [{}]
}

const REDUCTIONS = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: [{ title: 'Team' }],
  reductionNotes: [{}]
}

const EXPORT_CSV_FILENAME = 'Test CSV File.csv'

const EXPORT_CSV = '"TeamName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n' +
      '"Test Team 1","PO",50,0,50,25,10,0,50,50,50\n' +
      '"Test Team 1","PSO",50,0,50,75,90,100,50,50,50'

let app
let route
let getOverview
let getLastUpdated

let getReductionsExport
let reductionApp
let reductionsRoute

let getSubNavStub
let getExportCsv
let authorisationService

before(function () {
  authorisationService = {
    assertUserAuthenticated: sinon.stub()
  }
  getSubNavStub = sinon.stub()
  getOverview = sinon.stub()
  getReductionsExport = sinon.stub()
  getLastUpdated = sinon.stub().resolves(new Date(2017, 11, 1))
  getExportCsv = sinon.stub().returns({ filename: EXPORT_CSV_FILENAME, csv: EXPORT_CSV })
  route = proxyquire('../../../app/routes/overview', {
    '../services/get-overview': getOverview,
    '../services/data/get-last-updated': getLastUpdated,
    '../services/get-sub-nav': getSubNavStub,
    '../authorisation': authorisationService,
    '../services/get-export-csv': getExportCsv
  })
  app = routeHelper.buildApp(route)

  reductionsRoute = proxyquire('../../../app/routes/overview', {
    '../services/get-reductions-export': getReductionsExport,
    '../services/get-sub-nav': getSubNavStub,
    '../authorisation': authorisationService,
    '../services/get-export-csv': getExportCsv
  })
  reductionApp = routeHelper.buildApp(reductionsRoute)
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
    it('should respond with 200 when region and id included in URL', function () {
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
    it('should respond with 200 when hmpps and id included in URL', function () {
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

describe('reductions notes csv export route', function () {
  describe('for team level', function () {
    it('should respond with 200 when team and id included in URL', function () {
      getReductionsExport.resolves(REDUCTIONS)
      return supertest(reductionApp).get(TEAM_REDUCTIONS_CSV_URL).expect(200)
    })
    it('should call getExportCsv with the correct parameters', function () {
      getReductionsExport.resolves(REDUCTIONS)
      return supertest(reductionApp)
        .get(TEAM_REDUCTIONS_CSV_URL)
        .expect(200)
        .then(function () {
          expect(getExportCsv.calledWith(orgUnit.TEAM.name, REDUCTIONS, tabs.REDUCTIONS_EXPORT)).to.be.true //eslint-disable-line
        })
    })
  })
  describe('for ldu level', function () {
    it('should respond with 200 when ldu and id included in URL', function () {
      getReductionsExport.resolves(REDUCTIONS)
      return supertest(reductionApp).get(LDU_REDUCTIONS_CSV_URL).expect(200)
    })
    it('should call getExportCsv with the correct parameters', function () {
      getReductionsExport.resolves(REDUCTIONS)
      return supertest(reductionApp)
        .get(LDU_REDUCTIONS_CSV_URL)
        .expect(200)
        .then(function () {
          expect(getExportCsv.calledWith(orgUnit.LDU.name, REDUCTIONS, tabs.REDUCTIONS_EXPORT)).to.be.true //eslint-disable-line
        })
    })
  })
  describe('for region level', function () {
    it('should respond with 200 when region and id included in URL', function () {
      getReductionsExport.resolves(REDUCTIONS)
      return supertest(reductionApp).get(REGION_REDUCTIONS_CSV_URL).expect(200)
    })
    it('should call getExportCsv with the correct parameters', function () {
      getReductionsExport.resolves(REDUCTIONS)
      return supertest(reductionApp)
        .get(REGION_REDUCTIONS_CSV_URL)
        .expect(200)
        .then(function () {
          expect(getExportCsv.calledWith(orgUnit.REGION.name, REDUCTIONS, tabs.REDUCTIONS_EXPORT)).to.be.true //eslint-disable-line
        })
    })
  })
  describe('for national level', function () {
    it('should respond with 500 when national is included in URL', function () {
      getReductionsExport.resolves(REDUCTIONS)
      return supertest(reductionApp).get(NATIONAL_REDUCTIONS_CSV_URL).expect(500)
    })
  })
  describe('for offender manager level', function () {
    it('should respond with 500 when offender manager is included in URL', function () {
      getReductionsExport.resolves(REDUCTIONS)
      return supertest(reductionApp).get(OM_REDUCTIONS_CSV_URL).expect(500)
    })
  })
})

describe(`GET ${INDEX_URI}`, function () {
  it('should respond with a 200', function () {
    return supertest(app)
      .get(INDEX_URI)
      .expect(200)
  })
})

describe(`GET ${INDEX_URI + '?HPP&TRUE=1/0'}`, function () {
  it('should respond with an error', function () {
    return supertest(app)
      .get(INDEX_URI + '?HPP=TRUE/0')
      .expect(500)
  })
})

describe('/overview can be omitted', function () {
  it('should respond with 200 when overview is omitted from the URL', function () {
    return supertest(app)
      .get(VALID_URL_WITHOUT_OVERVIEW)
      .expect(200)
  })
})
