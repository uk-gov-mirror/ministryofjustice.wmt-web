const expect = require('chai').expect
const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const WORKLOAD_POINTS_T2A_URL = '/admin/workload-points/t2a'
const INVALID_WORKLOAD_POINTS_T2A_URL = '/admin/workload-points/t2s'
const WORKLOAD_POINTS_URL = '/admin/workload-points'
const INVALID_WORKLOAD_POINTS_URL = '/admin/workload-pnts'

const WORKLOAD_POINTS = {
  title: 'Workload Points',
  subTitle: 'Admin',
  breadcrumbs: [{}],
  workloadPoints: []
}

const WORKLOAD_POINTS_TO_POST = {
  previousWpId: '2',
  commA: '111',
  commB1: '101',
  commB2: '99',
  commC1: '55',
  commC2: '44',
  commD1: '22',
  commD2: '11',
  commE: '14',
  commF: '10',
  commG: '4',
  cusA: '44',
  cusB1: '34',
  cusB2: '33',
  cusC1: '22',
  cusC2: '21',
  cusD1: '11',
  cusD2: '10',
  cusE: '0',
  cusF: '0',
  cusG: '0',
  licA: '150',
  licB1: '110',
  licB2: '99',
  licC1: '55',
  licC2: '54',
  licD1: '44',
  licD2: '43',
  licE: '0',
  licF: '0',
  licG: '0',
  sdr: '101',
  userId: '35',
  sdrConversion: '51',
  nominalTargetPso: '2001',
  nominalTargetPo: '2001',
  weightingOverdue: '0.0',
  weightingWarrants: '0.0',
  weightingUpw: '100.0',
  defaultContractedHoursPo: '37',
  defaultContractedHoursPso: '37',
  parom: '121',
  weightingArmsCommunity: '15',
  weightingArmsLicense: '10',
  isT2A: 'false',
  defaultContractedHoursSpo: '0',
  adjustment1: '1',
  adjustment2: '2',
  adjustment3: '3',
  adjustment4: '4',
  adjustment5: '5',
  adjustment6: '6',
  adjustment7: '7',
  adjustment8: '8',
  adjustment9: '9',
  adjustment10: '10',
  adjustment11: '11',
  adjustment12: '12',
  adjustment13: '13',
  adjustment14: '14',
  adjustment15: '15',
  adjustment16: '16',
  adjustment17: '17',
  adjustment18: '18',
  adjustment19: '19',
  adjustment20: '20',
  adjustment21: '21',
  adjustment22: '22',
  adjustment23: '23',
  adjustment24: '24',
  adjustment25: '25',
  adjustment26: '26',
  adjustment27: '27',
  adjustment28: '28',
  adjustment29: '29',
  adjustment30: '30',
  adjustment31: '31',
  adjustment32: '32',
  adjustment33: '33',
  adjustment34: '34',
  adjustment35: '35',
  adjustment36: '36',
  adjustment46: '37',
  adjustment38: '38',
  adjustment43: '39',
  adjustment37: '40',
  adjustment40: '41',
  adjustment41: '42',
  adjustment44: '43',
  adjustment42: '44',
  adjustment39: '45',
  adjustment45: '46'
}

const WORKLOAD_POINTS_T2A_TO_POST = {
  previousWpId: '3',
  commA: '111',
  commB1: '101',
  commB2: '99',
  commC1: '55',
  commC2: '44',
  commD1: '22',
  commD2: '11',
  commE: '0',
  commF: '0',
  commG: '0',
  cusA: '44',
  cusB1: '34',
  cusB2: '33',
  cusC1: '22',
  cusC2: '21',
  cusD1: '11',
  cusD2: '10',
  cusE: '0',
  cusF: '0',
  cusG: '0',
  licA: '150',
  licB1: '110',
  licB2: '99',
  licC1: '55',
  licC2: '54',
  licD1: '44',
  licD2: '43',
  licE: '0',
  licF: '0',
  licG: '0',
  userId: '35',
  weightingOverdue: '0.0',
  weightingWarrants: '0.0',
  weightingUpw: '100.0',
  isT2A: 'true'
}

const MOCK_USERNAME = {
  username: 'username'
}

const MOCK_USER = {
  user: MOCK_USERNAME
}

let app
let route
let workloadPointsService
let authorisationService
const hasRoleResult = true
let getAdjustmentPointsConfig
let updateAdjustmentPointsConfig

before(function () {
  authorisationService = {
    assertUserAuthenticated: sinon.stub(),
    hasRole: sinon.stub().returns(hasRoleResult)
  }
  workloadPointsService = {
    getWorkloadPoints: sinon.stub().resolves(WORKLOAD_POINTS),
    updateWorkloadPoints: sinon.stub().resolves({})
  }
  getAdjustmentPointsConfig = sinon.stub().resolves([
    {
      adjustmentId: 46,
      contactCode: 'NGS001',
      contactDescription: 'GS Rights and Responsibilities session NS',
      categoryId: 2,
      points: 1
    }
  ])
  updateAdjustmentPointsConfig = sinon.stub().resolves()
  route = proxyquire('../../../app/routes/workload-points', {
    '../services/workload-points-service': workloadPointsService,
    '../authorisation': authorisationService,
    '../services/data/get-adjustment-points-config': getAdjustmentPointsConfig,
    '../services/data/update-adjustment-points-config': updateAdjustmentPointsConfig
  })
  app = routeHelper.buildApp(route)
})

describe('Admin Workload Points route', function () {
  it('should respond with 200 when the correct admin/workload-points url is called', function () {
    return supertest(app).get(WORKLOAD_POINTS_URL).expect(200)
      .then(function () {
      expect(workloadPointsService.getWorkloadPoints.calledWith(false)).to.be.true //eslint-disable-line
      })
  })

  it('should respond with 500 when an incorrect url is called', function () {
    return supertest(app).get(INVALID_WORKLOAD_POINTS_URL).expect(500)
  })

  it('should post the correct data and respond with 302', function () {
    return supertest(app)
      .post(WORKLOAD_POINTS_URL)
      .send(MOCK_USER)
      .send(WORKLOAD_POINTS_TO_POST)
      .expect(302, 'Found. Redirecting to /admin/workload-points?success=true')
  })
})

describe('Admin Workload Points T2A route', function () {
  it('should respond with 200 when the correct admin/workload-points/t2a url is called', function () {
    return supertest(app).get(WORKLOAD_POINTS_T2A_URL).expect(200)
      .then(function () {
      expect(workloadPointsService.getWorkloadPoints.calledWith(true)).to.be.true //eslint-disable-line
      })
  })

  it('should respond with 500 when an incorrect url is called for t2a', function () {
    return supertest(app).get(INVALID_WORKLOAD_POINTS_T2A_URL).expect(500)
  })

  it('should respond with 200 when the correct post admin/workload-points/t2a url is called', function () {
    return supertest(app)
      .post(WORKLOAD_POINTS_T2A_URL)
      .send(MOCK_USER)
      .send(WORKLOAD_POINTS_T2A_TO_POST)
      .expect(302, 'Found. Redirecting to /admin/workload-points/t2a?success=true')
  })
})
