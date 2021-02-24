const expect = require('chai').expect

const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const getContractedHours = require('../../../../app/services/data/get-contracted-hours-for-workload-owner')

let workloadOwnerId
let inserts = []

describe('services/data/get-contracted-hours-for-workload-owner', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (result) {
        inserts = result
        return dataHelper.getAnyExistingWorkloadOwnerId()
          .then(function (id) {
            workloadOwnerId = id
          })
      })
  })

  it('should retrieve contracted hours for a valid workload owner id', function () {
    return getContractedHours(workloadOwnerId)
      .then(function (results) {
        expect(results).to.be.a('number')
      })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
