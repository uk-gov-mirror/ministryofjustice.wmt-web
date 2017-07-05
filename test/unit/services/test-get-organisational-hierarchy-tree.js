const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')
const proxyquire = require('proxyquire')
const dataHelper = require('../../helpers/organisational-hierarchy-helper')

describe('services/organisational-hierarchy-tree', function () {
  describe('build', function () {
    it('should call getOrganisationalHierarchyData', function (done) {
      var getOrganisationalHierarchyData = sinon.stub()
      var organisationalHierarchyTree =
      proxyquire('../../../app/services/organisational-hierarchy-tree', {'./data/get-organisational-hierarchy-data': getOrganisationalHierarchyData})

      getOrganisationalHierarchyData.resolves([])
      organisationalHierarchyTree.build().then(function () {
        expect(getOrganisationalHierarchyData).to.have.been.called //eslint-disable-line
        done()
      })
    })

    it('should initialise the tree with the root node', function (done) {
      var getOrganisationalHierarchyData = sinon.stub()
      var organisationalHierarchyTree =
      proxyquire('../../../app/services/organisational-hierarchy-tree', {'./data/get-organisational-hierarchy-data': getOrganisationalHierarchyData})

      var expectedTree = {}
      expectedTree[dataHelper.ROOT_REF] = dataHelper.ROOT_NODE

      getOrganisationalHierarchyData.resolves([])
      organisationalHierarchyTree.build().then(function () {
        expect(organisationalHierarchyTree.get()).to.eql(expectedTree)
        done()
      })
    })

    it('should build a tree with a single branch structure', function (done) {
      var getOrganisationalHierarchyData = sinon.stub()
      var organisationalHierarchyTree =
      proxyquire('../../../app/services/organisational-hierarchy-tree', {'./data/get-organisational-hierarchy-data': getOrganisationalHierarchyData})

      getOrganisationalHierarchyData.resolves(dataHelper.ORGANISATIONAL_HIERARCHY_DATA_SINGLE_BRANCH)
      organisationalHierarchyTree.build().then(function () {
        expect(organisationalHierarchyTree.get()).to.eql(dataHelper.ORGANISATIONAL_HIERARCHY_TREE_SINGLE_BRANCH)
        done()
      })
    })

    it('should build a tree with mulitple individuals on a single team', function (done) {
      var getOrganisationalHierarchyData = sinon.stub()
      var organisationalHierarchyTree =
      proxyquire('../../../app/services/organisational-hierarchy-tree', {'./data/get-organisational-hierarchy-data': getOrganisationalHierarchyData})

      getOrganisationalHierarchyData.resolves(dataHelper.ORGANISATIONAL_HIERARCHY_DATA_MULTIPLE_INDIVIDUALS)
      organisationalHierarchyTree.build().then(function () {
        expect(organisationalHierarchyTree.get()).to.eql(dataHelper.ORGANISATIONAL_HIERARCHY_TREE_MULTIPLE_INDIVIDUALS)
        done()
      })
    })

    it('should build a tree with mulitple branches', function (done) {
      var getOrganisationalHierarchyData = sinon.stub()
      var organisationalHierarchyTree =
      proxyquire('../../../app/services/organisational-hierarchy-tree', {'./data/get-organisational-hierarchy-data': getOrganisationalHierarchyData})

      getOrganisationalHierarchyData.resolves(dataHelper.ORGANISATIONAL_HIERARCHY_DATA_MULTIPLE_BRANCHES)
      organisationalHierarchyTree.build().then(function () {
        expect(organisationalHierarchyTree.get()).to.eql(dataHelper.ORGANISATIONAL_HIERARCHY_TREE_MULTIPLE_BRANCHES)
        done()
      })
    })
  })
})
