const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')
const proxyquire = require('proxyquire')
const ohDataHelper = require('../../helpers/organisational-hierarchy-helper')
const breadcrumbDataHelper = require('../../helpers/breadcrumb-helper')

describe('services/get-breadcrumbs', function () {
  it('should return the correct breadcrumbs for offender managers', function () {
    var getTree = {
      get: sinon.stub().returns(ohDataHelper.ORGANISATIONAL_HIERARCHY_TREE_MULTIPLE_BRANCHES)
    }
    var getBreadcrumbs = proxyquire('../../../app/services/get-breadcrumbs', {'./organisational-hierarchy-tree': getTree})

    expect(getBreadcrumbs(1, 'offender-manager').length).to.eql(5)
    expect(getBreadcrumbs(1, 'offender-manager')).to.eql(breadcrumbDataHelper.OFFENDER_MANAGER_BREADCRUMBS)
  })

  it('should return the correct breadcrumbs for teams', function () {
    var getTree = {
      get: sinon.stub().returns(ohDataHelper.ORGANISATIONAL_HIERARCHY_TREE_MULTIPLE_BRANCHES)
    }
    var getBreadcrumbs = proxyquire('../../../app/services/get-breadcrumbs', {'./organisational-hierarchy-tree': getTree})

    expect(getBreadcrumbs(1, 'team').length).to.eql(4)
    expect(getBreadcrumbs(1, 'team')).to.eql(breadcrumbDataHelper.TEAM_BREADCRUMBS)
  })

  it('should return the correct breadcrumbs for LDUs', function () {
    var getTree = {
      get: sinon.stub().returns(ohDataHelper.ORGANISATIONAL_HIERARCHY_TREE_MULTIPLE_BRANCHES)
    }
    var getBreadcrumbs = proxyquire('../../../app/services/get-breadcrumbs', {'./organisational-hierarchy-tree': getTree})

    expect(getBreadcrumbs(1, 'ldu').length).to.eql(3)
    expect(getBreadcrumbs(1, 'ldu')).to.eql(breadcrumbDataHelper.LDU_BREADCRUMBS)
  })

  it('should return the correct breadcrumbs for regions', function () {
    var getTree = {
      get: sinon.stub().returns(ohDataHelper.ORGANISATIONAL_HIERARCHY_TREE_MULTIPLE_BRANCHES)
    }
    var getBreadcrumbs = proxyquire('../../../app/services/get-breadcrumbs', {'./organisational-hierarchy-tree': getTree})

    expect(getBreadcrumbs(1, 'region').length).to.eql(2)
    expect(getBreadcrumbs(1, 'region')).to.eql(breadcrumbDataHelper.REGION_BREADCRUMBS)
  })

  it('should return the correct breadcrumbs for national level', function () {
    var getTree = {
      get: sinon.stub().returns(ohDataHelper.ORGANISATIONAL_HIERARCHY_TREE_MULTIPLE_BRANCHES)
    }
    var getBreadcrumbs = proxyquire('../../../app/services/get-breadcrumbs', {'./organisational-hierarchy-tree': getTree})

    expect(getBreadcrumbs(1, 'nps').length).to.eql(1)
    expect(getBreadcrumbs(1, 'nps')).to.eql(breadcrumbDataHelper.NATIONAL_BREADCRUMBS)
  })

  it('should throw an error when passed an undefined organisation unit', function () {
    var getTree = {
      get: sinon.stub().returns(ohDataHelper.ORGANISATIONAL_HIERARCHY_TREE_MULTIPLE_BRANCHES)
    }
    var getBreadcrumbs = proxyquire('../../../app/services/get-breadcrumbs', {'./organisational-hierarchy-tree': getTree})

    expect(() => getBreadcrumbs('1', undefined)).to.throw(/undefined/)
  })

  it('should throw an error when passed invalid id for organisation units which need an id', function () {
    var getTree = {
      get: sinon.stub().returns(ohDataHelper.ORGANISATIONAL_HIERARCHY_TREE_MULTIPLE_BRANCHES)
    }
    var getBreadcrumbs = proxyquire('../../../app/services/get-breadcrumbs', {'./organisational-hierarchy-tree': getTree})

    expect(() => getBreadcrumbs('abc', 'team')).to.throw(/ID/)
    expect(() => getBreadcrumbs('undefined', 'team')).to.throw(/ID/)
  })

  it('should throw an error when passed an organistation level which does not exist in the constant', function () {
    var getTree = {
      get: sinon.stub().returns(ohDataHelper.ORGANISATIONAL_HIERARCHY_TREE_MULTIPLE_BRANCHES)
    }
    var getBreadcrumbs = proxyquire('../../../app/services/get-breadcrumbs', {'./organisational-hierarchy-tree': getTree})

    expect(() => getBreadcrumbs('3', 'person')).to.throw(/does not exist/)
  })
})
