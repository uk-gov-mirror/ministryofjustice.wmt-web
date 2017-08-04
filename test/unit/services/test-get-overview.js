const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')
const proxyquire = require('proxyquire')
const orgUnitConstant = require('../../../app/constants/organisation-unit.js')
const orgUnitFinder = require('../../../app/services/helpers/org-unit-finder')

const breadcrumbHelper = require('../../helpers/breadcrumb-helper')

const OVERVIEW = {
  grade: 'PO',
  teamId: '1',
  teamName: 'Medway',
  availablePoints: 50,
  totalPoints: 40,
  cases: '2',
  hours: '3',
  reduction: '4'
}
const TEAM_OVERVIEWS = [
  Object.assign({}, OVERVIEW, {capacityPercentage: 80}), Object.assign({}, OVERVIEW, {capacityPercentage: 80})
]

var expectedOverview = Object.assign({}, OVERVIEW, {capacity: 80})

var id = 1
var breadcrumbs = breadcrumbHelper.OFFENDER_MANAGER_BREADCRUMBS
var expectedTitle = breadcrumbs[0].title

var getOverview
var getOverviewDetails
var getBreadcrumbs
var getTeamOverviewDetails

before(function () {
  getOverviewDetails = sinon.stub()
  getTeamOverviewDetails = sinon.stub()
  getBreadcrumbs = sinon.stub().returns(breadcrumbs)
  getOverview =
      proxyquire('../../../app/services/get-overview',
        {'./data/get-individual-overview': getOverviewDetails,
          './data/get-team-caseload-overview': getTeamOverviewDetails,
          './get-breadcrumbs': getBreadcrumbs})
  getOverviewDetails.resolves(OVERVIEW)
  getTeamOverviewDetails.resolves(TEAM_OVERVIEWS)
})

describe('services/get-overview', function () {
  it('should return a results object with breadcrumbs, title and subtitle for an offender manager', function (done) {
    var omName = orgUnitConstant.OFFENDER_MANAGER.name
    getOverview(id, omName).then(function (result) {
      var omSubtitle = orgUnitFinder('name', omName).displayText
      expect(getBreadcrumbs).to.have.been.called //eslint-disable-line
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.eql(omSubtitle)
      expect(result.title).to.eql(expectedTitle)
      done()
    })
  })

  it('should return a results object with the correct overview details for an offender manager', function (done) {
    var omName = orgUnitConstant.OFFENDER_MANAGER.name
    getOverview(id, omName).then(function (result) {
      expect(result.overviewDetails).to.eql(expectedOverview)
      done()
    })
  })

  it('should return a results object with the correct overview details for a team', function (done) {
    var teamName = orgUnitConstant.TEAM.name
    getOverview(id, teamName).then(function (result) {
      expect(result.overviewDetails).to.eql(TEAM_OVERVIEWS)
      done()
    })
  })

  it('should throw an error when something other than team or offender manager is sent', function (done) {
    var nonOmOrTeamName = orgUnitConstant.LDU.name
    expect(() => getOverview(id, nonOmOrTeamName)).to.throw(/Organisation level must be offender manager or team/)
    done()
  })
})
