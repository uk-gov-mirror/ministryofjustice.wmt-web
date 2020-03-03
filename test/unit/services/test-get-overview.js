const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const orgUnitConstant = require('../../../app/constants/organisation-unit.js')
const orgUnitFinder = require('../../../app/services/helpers/org-unit-finder')

const breadcrumbHelper = require('../../helpers/breadcrumb-helper')

const OVERVIEW = {
  grade: 'PO',
  teamId: 1,
  teamName: 'Medway',
  availablePoints: 50,
  totalPoints: 40,
  totalCases: 2,
  hours: 3,
  reductionHours: 3,
  contractedHours: 37,
  cmsAdjustmentPoints: 0,
  cmsPercentage: 0
}
const ORGANISATION_OVERVIEWS = [
  Object.assign({}, OVERVIEW, { capacityPercentage: 80 }), Object.assign({}, OVERVIEW, { capacityPercentage: 80 })
]

const ZERO_AVAILABLE_POINTS_OVERVIEWS = [
  Object.assign({}, OVERVIEW, { capacity: 0, availablePoints: 0 })
]

var expectedOverview = Object.assign({}, OVERVIEW, { capacity: 80 })

var id = 1
var breadcrumbs = breadcrumbHelper.OFFENDER_MANAGER_BREADCRUMBS
var expectedTitle = breadcrumbs[0].title

var getOverview
var getIndividualOverview
var getBreadcrumbs
var getOrganisationOverview

beforeEach(function () {
  getIndividualOverview = sinon.stub()
  getOrganisationOverview = sinon.stub()
  getBreadcrumbs = sinon.stub().returns(breadcrumbs)
  getOverview =
      proxyquire('../../../app/services/get-overview',
        {
          './data/get-individual-overview': getIndividualOverview,
          './data/get-organisation-overview': getOrganisationOverview,
          './get-breadcrumbs': getBreadcrumbs
        })
})

describe('services/get-overview', function () {
  it('should return a results object with breadcrumbs, title and subtitle for an offender manager', function () {
    var omName = orgUnitConstant.OFFENDER_MANAGER.name
    getIndividualOverview.withArgs(id, omName).resolves(OVERVIEW)

    return getOverview(id, omName).then(function (result) {
      var omSubtitle = orgUnitFinder('name', omName).displayText
      expect(getBreadcrumbs).to.have.been.called //eslint-disable-line
      expect(result.breadcrumbs).to.eql(breadcrumbs)
      expect(result.subTitle).to.eql(omSubtitle)
      expect(result.title).to.eql(expectedTitle)
    })
  })

  it('should call get-individual-overview and return a results object with the correct overview details for an offender manager', function () {
    var omName = orgUnitConstant.OFFENDER_MANAGER.name
    getIndividualOverview.withArgs(id, omName).resolves(OVERVIEW)

    return getOverview(id, omName).then(function (result) {
      assert(getIndividualOverview.called)
      assert(!getOrganisationOverview.called)
      expect(result.overviewDetails).to.eql(expectedOverview)
    })
  })

  it('should call get-organisation-overview and return a results object with the correct overview details for a team', function () {
    var orgName = orgUnitConstant.TEAM.name
    getOrganisationOverview.withArgs(id, orgName).resolves(ORGANISATION_OVERVIEWS)

    return getOverview(id, orgName).then(function (result) {
      assert(!getIndividualOverview.called)
      assert(getOrganisationOverview.called)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEWS)
    })
  })

  it('should call get-organisation-overview and return a results object with the correct overview details for an LDU', function () {
    var orgName = orgUnitConstant.LDU.name
    getOrganisationOverview.withArgs(id, orgName).resolves(ORGANISATION_OVERVIEWS)

    return getOverview(id, orgName).then(function (result) {
      assert(!getIndividualOverview.called)
      assert(getOrganisationOverview.called)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEWS)
    })
  })

  it('should call get-organisation-overview and return a results object with the correct overview details for a Region', function () {
    var orgName = orgUnitConstant.REGION.name
    getOrganisationOverview.withArgs(id, orgName).resolves(ORGANISATION_OVERVIEWS)

    return getOverview(id, orgName).then(function (result) {
      assert(!getIndividualOverview.called)
      assert(getOrganisationOverview.called)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEWS)
    })
  })

  it('should call get-organisation-overview and return a results object with the correct overview details for national', function () {
    var orgName = orgUnitConstant.NATIONAL.name
    getOrganisationOverview.withArgs(id, orgName).resolves(ORGANISATION_OVERVIEWS)

    return getOverview(id, orgName).then(function (result) {
      assert(!getIndividualOverview.called)
      assert(getOrganisationOverview.called)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEWS)
    })
  })

  it('should call get-organisation-overview and return a results object with zero capacity if available points is zero', function () {
    var orgName = orgUnitConstant.REGION.name
    getOrganisationOverview.withArgs(id, orgName).resolves(ZERO_AVAILABLE_POINTS_OVERVIEWS)

    return getOverview(id, orgName).then(function (result) {
      assert(!getIndividualOverview.called)
      assert(getOrganisationOverview.called)
      expect(result.overviewDetails).to.eql(ZERO_AVAILABLE_POINTS_OVERVIEWS)
    })
  })

  it('should return 0 contracted hours if there are indeed 0 contracted hours, and the correct overview totals', function () {
    var orgName = orgUnitConstant.REGION.name
    var totals = { name: 'Total / Average', totalContractedHours: 0, totalCapacityPercentage: 80, totalPoints: 40, totalAvailablePoints: 50, totalReduction: 3, totalRemainingPoints: 10, totalTotalCases: 2, totalCMSPoints: 0, totalCMSPercentage: 0 }
    var zeroContractedHours = Object.assign({}, OVERVIEW, { contractedHours: 0 })
    getOrganisationOverview.withArgs(id, orgName).resolves([zeroContractedHours])

    return getOverview(id, orgName).then(function (result) {
      expect(result.overviewDetails).to.eql([zeroContractedHours, totals])
    })
  })
})
