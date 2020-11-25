const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')

const proxyquire = require('proxyquire')
const dataHelper = require('../../helpers/organisational-hierarchy-helper')

describe('services/organisational-hierarchy-tree', function () {
  describe('build', function () {
    it('should call getOrganisationalHierarchyData', function (done) {
      const getOrganisationalHierarchyData = sinon.stub()
      const organisationalHierarchyTree =
      proxyquire('../../../app/services/organisational-hierarchy-tree', { './data/get-organisational-hierarchy-data': getOrganisationalHierarchyData })

      getOrganisationalHierarchyData.resolves([])
      organisationalHierarchyTree.build().then(function () {
        sinon.assert.calledOnce(getOrganisationalHierarchyData)
        done()
      })
    })

    it('should initialise the tree with the root node', function () {
      const getOrganisationalHierarchyData = sinon.stub()
      const organisationalHierarchyTree =
      proxyquire('../../../app/services/organisational-hierarchy-tree', { './data/get-organisational-hierarchy-data': getOrganisationalHierarchyData })

      const expectedTree = {}
      expectedTree[dataHelper.ROOT_REF] = dataHelper.ROOT_NODE

      getOrganisationalHierarchyData.resolves([])
      return organisationalHierarchyTree.build().then(function () {
        expect(organisationalHierarchyTree.get()).to.eql(expectedTree)
      })
    })

    it('should build a tree with a single branch structure', function () {
      const getOrganisationalHierarchyData = sinon.stub()
      const organisationalHierarchyTree =
      proxyquire('../../../app/services/organisational-hierarchy-tree', { './data/get-organisational-hierarchy-data': getOrganisationalHierarchyData })

      getOrganisationalHierarchyData.resolves(dataHelper.ORGANISATIONAL_HIERARCHY_DATA_SINGLE_BRANCH)
      return organisationalHierarchyTree.build().then(function () {
        expect(organisationalHierarchyTree.get()).to.eql(dataHelper.ORGANISATIONAL_HIERARCHY_TREE_SINGLE_BRANCH)
      })
    })

    it('should build a tree with mulitple individuals on a single team', function () {
      const getOrganisationalHierarchyData = sinon.stub()
      const organisationalHierarchyTree =
      proxyquire('../../../app/services/organisational-hierarchy-tree', { './data/get-organisational-hierarchy-data': getOrganisationalHierarchyData })

      getOrganisationalHierarchyData.resolves(dataHelper.ORGANISATIONAL_HIERARCHY_DATA_MULTIPLE_INDIVIDUALS)
      return organisationalHierarchyTree.build().then(function () {
        expect(organisationalHierarchyTree.get()).to.eql(dataHelper.ORGANISATIONAL_HIERARCHY_TREE_MULTIPLE_INDIVIDUALS)
      })
    })

    it('should build a tree with mulitple branches', function () {
      const getOrganisationalHierarchyData = sinon.stub()
      const organisationalHierarchyTree =
      proxyquire('../../../app/services/organisational-hierarchy-tree', { './data/get-organisational-hierarchy-data': getOrganisationalHierarchyData })

      getOrganisationalHierarchyData.resolves(dataHelper.ORGANISATIONAL_HIERARCHY_DATA_MULTIPLE_BRANCHES)
      return organisationalHierarchyTree.build().then(function () {
        expect(organisationalHierarchyTree.get()).to.eql(dataHelper.ORGANISATIONAL_HIERARCHY_TREE_MULTIPLE_BRANCHES)
      })
    })

    it('should build a tree with null values for nullable fields', function () {
      const getOrganisationalHierarchyData = sinon.stub()
      const organisationalHierarchyTree =
      proxyquire('../../../app/services/organisational-hierarchy-tree', { './data/get-organisational-hierarchy-data': getOrganisationalHierarchyData })

      getOrganisationalHierarchyData.resolves(dataHelper.ORGANISATIONAL_HIERARCHY_DATA_NULL_VALUES)
      return organisationalHierarchyTree.build().then(function () {
        expect(organisationalHierarchyTree.get()).to.eql(dataHelper.ORGANISATIONAL_HIERARCHY_TREE_NULL_VALUES)
      })
    })

    it('should throw an error when the DB call throws an error', function () {
      const getOrganisationalHierarchyData = sinon.stub()
      const organisationalHierarchyTree =
      proxyquire('../../../app/services/organisational-hierarchy-tree', { './data/get-organisational-hierarchy-data': getOrganisationalHierarchyData })

      getOrganisationalHierarchyData.rejects('DB Error')
      return organisationalHierarchyTree.build().then(function () {
        assert.fail()
      })
        .catch(function () {
        })
    })

    it('should throw an error when the DB call returns undefined', function () {
      const getOrganisationalHierarchyData = sinon.stub()
      const organisationalHierarchyTree =
      proxyquire('../../../app/services/organisational-hierarchy-tree', { './data/get-organisational-hierarchy-data': getOrganisationalHierarchyData })

      getOrganisationalHierarchyData.resolves(undefined)
      return organisationalHierarchyTree.build()
        .then(function () {
          assert.fail()
        })
        .catch(function () {
        })
    })
  })
})
