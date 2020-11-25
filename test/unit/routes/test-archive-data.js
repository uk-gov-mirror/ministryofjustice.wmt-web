const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const ARCHIVE_DATA_URL = '/archive-data/daily-caseload-data'
const INVALID_URL = '/fake-url'

let app
let route
let userRoleService
let authorisationService
const hasRoleStub = sinon.stub()
let getArchive

const getArchiveResult = [{
  workloadID: 2844,
  workloadDate: '2014-06-18T14:18:46.000Z',
  lduName: '*Greater Manchester All LDU',
  teamName: 'Bolton Youth to Adult',
  omName: 'A.N. Offender Manager 121',
  totalCases: 27,
  totalPoints: 1380,
  sdrPoints: 0,
  sdrConversionPoints: 0,
  paromsPoints: 0,
  nominalTarget: 2171,
  contractedHours: 37,
  hoursReduction: 0,
  capacity: '64.4%'
}]

before(function () {
  userRoleService = sinon.stub()
  authorisationService = {
    assertUserAuthenticated: sinon.stub(),
    hasRole: hasRoleStub
  }
  getArchive = sinon.stub()
  route = proxyquire('../../../app/routes/archive-daily', {
    '../services/user-role-service': userRoleService,
    '../authorisation': authorisationService,
    '../services/archive-service': getArchive
  })
  app = routeHelper.buildApp(route)
})

describe('archive route', function () {
  it('should respond with 200 when archive data is called', function () {
    getArchive.resolves(getArchiveResult)
    return supertest(app).get(ARCHIVE_DATA_URL).expect(200)
  })

  it('should respond with 500 when an incorrect url is called', function () {
    return supertest(app).get(INVALID_URL).expect(500)
  })
})
