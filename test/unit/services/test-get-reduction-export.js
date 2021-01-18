const moment = require('moment')
const expect = require('chai').expect
const sinon = require('sinon')

const proxyquire = require('proxyquire')
const breadcrumbHelper = require('../../helpers/breadcrumb-helper')
const orgUnitConstant = require('../../../app/constants/organisation-unit.js')

const activeStartDate = moment('25-12-2017', 'DD-MM-YYYY').toDate() // 2017-12-25T00:00:00.000Z
const activeEndDate = moment('25-12-2018', 'DD-MM-YYYY').toDate() // 2018-12-25T00:00:00.000Z

const breadcrumbs = breadcrumbHelper.TEAM_BREADCRUMBS

const expectedReductionExport = [
  {
    offenderManager: 'Test_Forename Test_Surname',
    reason: 'Disability',
    amount: 5,
    startDate: activeStartDate,
    endDate: activeEndDate,
    status: 'ACTIVE',
    additionalNotes: 'New Test Note'
  }]

let getReductionsData
let exportReductionService
let getBreadcrumbsStub

beforeEach(function () {
  getReductionsData = sinon.stub()
  getBreadcrumbsStub = sinon.stub().returns(breadcrumbs)
  exportReductionService =
    proxyquire('../../../app/services/get-reductions-export',
      {
        './data/get-reduction-notes-export': getReductionsData,
        './get-breadcrumbs': getBreadcrumbsStub
      })
})

describe('services/get-reductions-export', function () {
  it('should return the expected reductions exports for team level', function () {
    getReductionsData.resolves(expectedReductionExport)
    return exportReductionService(1, orgUnitConstant.TEAM.name)
      .then(function (result) {
        expect(getReductionsData.calledWith(1, orgUnitConstant.TEAM.name)).to.be.eql(true)
        expect(getBreadcrumbsStub.calledWith(1, orgUnitConstant.TEAM.name)).to.be.eql(true)
        expect(result.reductionNotes[0].offenderManager).to.be.eql(expectedReductionExport[0].offenderManager)
        expect(result.reductionNotes[0].reason).to.be.eql(expectedReductionExport[0].reason)
        expect(result.reductionNotes[0].amount).to.be.eql(expectedReductionExport[0].amount)
        expect(result.reductionNotes[0].startDate).to.be.eql('25 12 2017, 00:00')
        expect(result.reductionNotes[0].endDate).to.be.eql('25 12 2018, 00:00')
        expect(result.reductionNotes[0].status).to.be.eql(expectedReductionExport[0].status)
        expect(result.reductionNotes[0].additionalNotes).to.be.eql(expectedReductionExport[0].additionalNotes)
      })
  })
})
