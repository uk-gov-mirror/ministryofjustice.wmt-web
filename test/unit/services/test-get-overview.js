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
  capacity: '1',
  cases: '2',
  hours: '3',
  reduction: '4'
}

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
        {'./data/get-overview': getOverviewDetails,
          './get-breadcrumbs': getBreadcrumbs})
  getOverviewDetails.resolves(OVERVIEW)
})

describe('services/get-overview', function () {
  it('should return a results object with breadcrumbs, title, subtitle and overview details for an offender manager', function (done) {
    var omName = 'offender-manager'
    getOverview(id, omName).then(function (result) {
      var omSubtitle = orgUnitFinder('name', omName).displayText
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.equal(omSubtitle)
      expect(result.title).to.equal(expectedTitle)
      expect(result.overviewDetails).to.equal(OVERVIEW)
      done()
    })
  })
})
