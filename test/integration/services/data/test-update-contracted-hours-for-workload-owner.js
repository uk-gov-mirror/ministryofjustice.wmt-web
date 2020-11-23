const expect = require('chai').expect

const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const updateContractedHoursForWorkloadOwner = require('../../../../app/services/data/update-contracted-hours-for-workload-owner')
const getContractedHoursForWorkloadOwner = require('../../../../app/services/data/get-contracted-hours-for-workload-owner')

const UPDATED_HOURS = 22
let inserts = []

describe('services/data/update-contracted-hours-for-workload-owner', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should update the contracted hours for a workload owner and return count of updated rows', function () {
    const woId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    return updateContractedHoursForWorkloadOwner(woId, UPDATED_HOURS)
      .then(function (results) {
        expect(results).to.be.a('number')
        expect(results).to.eql(1)
        return getContractedHoursForWorkloadOwner(woId)
          .then(function (contractedHours) {
            expect(contractedHours).to.eql(UPDATED_HOURS)
          })
      })
  })

  it('should return count of zero when workload owner does not exist', function () {
    return dataHelper.generateNonExistantWorkloadOwnerId()
      .then(function (woId) {
        return updateContractedHoursForWorkloadOwner(woId, UPDATED_HOURS)
          .then(function (results) {
            expect(results).to.eql(0)
          })
      })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
