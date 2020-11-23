const supertest = require('supertest')
const expect = require('chai').expect
const REFRESH_ORG_HIERARCHY_URI = '/refresh'
const app = require('../../../app/app')

const workloadCapactiyHelper = require('../../helpers/data/aggregated-data-helper')
const organisationalHierarchyTree = require('../../../app/services/organisational-hierarchy-tree')

let inserts = []

describe(REFRESH_ORG_HIERARCHY_URI, function () {
  before(function () {
    return workloadCapactiyHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should refresh the hierarchy and the new inserts should appear', function () {
    const oldTree = organisationalHierarchyTree.get()
    return supertest(app)
      .get(REFRESH_ORG_HIERARCHY_URI)
      .expect(200)
      .then(function () {
        const tree = organisationalHierarchyTree.get()
        expect(oldTree).to.not.eql(tree)
      })
  })

  after(function () {
    return workloadCapactiyHelper.removeInsertedData(inserts)
  })
})
