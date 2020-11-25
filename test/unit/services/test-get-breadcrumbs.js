const expect = require('chai').expect
const sinon = require('sinon')

const proxyquire = require('proxyquire')
const ohDataHelper = require('../../helpers/organisational-hierarchy-helper')
const breadcrumbDataHelper = require('../../helpers/breadcrumb-helper')
const workloadTypes = require('../../../app/constants/workload-type')

let getTree
let getBreadcrumbs

before(function () {
  getTree = {
    get: sinon.stub().returns(ohDataHelper.ORGANISATIONAL_HIERARCHY_TREE_MULTIPLE_BRANCHES)
  }
  getBreadcrumbs = proxyquire('../../../app/services/get-breadcrumbs',
    { './organisational-hierarchy-tree': getTree }
  )
})

describe('services/get-breadcrumbs', function () {
  it('should return the correct breadcrumbs for offender managers', function () {
    expect(getBreadcrumbs(1, 'offender-manager').length).to.eql(5)
    expect(getBreadcrumbs(1, 'offender-manager')).to.eql(breadcrumbDataHelper.OFFENDER_MANAGER_BREADCRUMBS)
  })

  it('should return the correct breadcrumbs for teams', function () {
    expect(getBreadcrumbs(1, 'team').length).to.eql(4)
    expect(getBreadcrumbs(1, 'team')).to.eql(breadcrumbDataHelper.TEAM_BREADCRUMBS)
  })

  it('should return the correct breadcrumbs for LDUs', function () {
    expect(getBreadcrumbs(1, 'ldu').length).to.eql(3)
    expect(getBreadcrumbs(1, 'ldu')).to.eql(breadcrumbDataHelper.LDU_BREADCRUMBS)
  })

  it('should return the correct breadcrumbs for regions', function () {
    expect(getBreadcrumbs(1, 'region').length).to.eql(2)
    expect(getBreadcrumbs(1, 'region')).to.eql(breadcrumbDataHelper.REGION_BREADCRUMBS)
  })

  it('should return the correct breadcrumbs for national level', function () {
    expect(getBreadcrumbs(1, 'hmpps').length).to.eql(1)
    expect(getBreadcrumbs(1, 'hmpps')).to.eql(breadcrumbDataHelper.NATIONAL_BREADCRUMBS)
  })

  it('should throw an error when passed an undefined organisation unit', function () {
    expect(() => getBreadcrumbs('1', undefined)).to.throw(/undefined/)
  })

  it('should throw an error when passed invalid id for organisation units which need an id', function () {
    expect(() => getBreadcrumbs('abc', 'team')).to.throw(/ID/)
    expect(() => getBreadcrumbs('undefined', 'team')).to.throw(/ID/)
  })

  it('should throw an error when passed an organistation level which does not exist in the constant', function () {
    expect(() => getBreadcrumbs('3', 'person')).to.throw(/does not exist/)
  })

  it('should throw an error when passed an id which does not exist in the organisational tree', function () {
    expect(() => getBreadcrumbs('7', 'team')).to.throw(/does not exist in the organisational tree/)
  })

  it('should return the correct breadcrumbs for court-reporter-offender managers', function () {
    expect(getBreadcrumbs(1, 'offender-manager', workloadTypes.COURT_REPORTS).length).to.eql(5)
    expect(getBreadcrumbs(1, 'offender-manager', workloadTypes.COURT_REPORTS)).to.eql(breadcrumbDataHelper.COURT_REPORTER_OFFENDER_MANAGER_BREADCRUMBS)
  })

  it('should return the correct breadcrumbs for court-reporter teams', function () {
    expect(getBreadcrumbs(1, 'team', workloadTypes.COURT_REPORTS).length).to.eql(4)
    expect(getBreadcrumbs(1, 'team', workloadTypes.COURT_REPORTS)).to.eql(breadcrumbDataHelper.COURT_REPORTER_TEAM_BREADCRUMBS)
  })

  it('should return the correct breadcrumbs for court-reporter LDUs', function () {
    expect(getBreadcrumbs(1, 'ldu', workloadTypes.COURT_REPORTS).length).to.eql(3)
    expect(getBreadcrumbs(1, 'ldu', workloadTypes.COURT_REPORTS)).to.eql(breadcrumbDataHelper.COURT_REPORTER_LDU_BREADCRUMBS)
  })

  it('should return the correct breadcrumbs for court-reporter regions', function () {
    expect(getBreadcrumbs(1, 'region', workloadTypes.COURT_REPORTS).length).to.eql(2)
    expect(getBreadcrumbs(1, 'region', workloadTypes.COURT_REPORTS)).to.eql(breadcrumbDataHelper.COURT_REPORTER_REGION_BREADCRUMBS)
  })

  it('should return the correct breadcrumbs for court-reporter national level', function () {
    expect(getBreadcrumbs(1, 'hmpps', workloadTypes.COURT_REPORTS).length).to.eql(1)
    expect(getBreadcrumbs(1, 'hmpps', workloadTypes.COURT_REPORTS)).to.eql(breadcrumbDataHelper.COURT_REPORTER_NATIONAL_BREADCRUMBS)
  })
})
