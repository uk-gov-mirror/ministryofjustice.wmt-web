const supertest = require('supertest')
const expect = require('chai').expect
const REFRESH_ORG_HIERARCHY_URI = '/refresh'
const app = require('../../../app/app')

const workloadCapactiyHelper = require('../../helpers/data/aggregated-data-helper')
const organisationalHierarchyTree = require('../../../app/services/organisational-hierarchy-tree')

var inserts = []

describe(REFRESH_ORG_HIERARCHY_URI, function () {
  before(function (done) {
    workloadCapactiyHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should refresh the hierarchy and the new inserts should appear', function (done) {
    var oldTree = organisationalHierarchyTree.get()
    supertest(app)
        .get(REFRESH_ORG_HIERARCHY_URI)
        .expect(200)
        .then(function () {
          var tree = organisationalHierarchyTree.get()
          expect(oldTree).to.not.eql(tree)
          done()
        })
  })

  after(function (done) {
    workloadCapactiyHelper.removeInsertedData(inserts)
      .then(() => done())
  })
})
