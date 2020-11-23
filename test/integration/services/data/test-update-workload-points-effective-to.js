const expect = require('chai').expect

const updateWorkloadPointsEffectiveTo = require('../../../../app/services/data/update-workload-points-effective-to')
const workloadCapacityHelper = require('../../../helpers/data/aggregated-data-helper')

let workloadPointsInserts

describe('/services/data/update-workload-points-effective-to', function () {
  before(function () {
    return workloadCapacityHelper.addWorkloadPoints()
      .then(function (result) {
        workloadPointsInserts = result
      })
  })
  it('should update the workload points when a valid id is passed in', function () {
    return updateWorkloadPointsEffectiveTo(workloadPointsInserts.filter((item) => item.table === 'workload_points')[0].id)
      .then(function (id) {
        expect(id[0]).to.be.a('number')
      })
  })

  after(function () {
    return workloadCapacityHelper.removeInsertedData(workloadPointsInserts)
  })
})
