const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')
const proxyquire = require('proxyquire')
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

var expectedOverview = Object.assign({}, OVERVIEW, {capacity: 80})

var id = 1
var breadcrumbs = breadcrumbHelper.OFFENDER_MANAGER_BREADCRUMBS
var expectedTitle = breadcrumbs[0].title

var getOverview
var getOverviewDetails
var getBreadcrumbs

before(function () {
  getOverviewDetails = sinon.stub()
  getBreadcrumbs = sinon.stub().returns(breadcrumbs)
  getOverview =
      proxyquire('../../../app/services/get-overview',
        {'./data/get-individual-overview': getOverviewDetails,
          './get-breadcrumbs': getBreadcrumbs})
  getOverviewDetails.resolves(OVERVIEW)
})

describe('services/get-overview', function () {
  it('should return a results object with breadcrumbs, title and subtitle for an offender manager', function (done) {
    var omName = 'offender-manager'
    getOverview(id, omName).then(function (result) {
      var omSubtitle = orgUnitFinder('name', omName).displayText
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.eql(omSubtitle)
      expect(result.title).to.eql(expectedTitle)
      done()
    })
  })

  it('should return a results object with the correct overview details for an offender manager', function (done) {
    var omName = 'offender-manager'
    getOverview(id, omName).then(function (result) {
      expect(result.overviewDetails).to.eql(expectedOverview)
      done()
    })
  })
})
