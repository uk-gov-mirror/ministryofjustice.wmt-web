const expect = require('chai').expect
const totalsRounder = require('../../../../app/services/helpers/totalsRounder')

describe('services/helpers/totals-rounder', function () {
  it('should round total contrcated hours to 1 decimal place', function () {
    var totals = { name: 'Total / Average', totalCapacityPercentage: 0, totalPoints: 0, totalAvailablePoints: 0, totalContractedHours: 118416.70000000001	, totalReduction: 77371.40000000001 }
    totals = totalsRounder(totals)
    expect(totals.totalContractedHours.to.eql(118416.7))
  })

  it('should round total reduction hours to 1 decimal place', function () {
    var totals = { name: 'Total / Average', totalCapacityPercentage: 0, totalPoints: 0, totalAvailablePoints: 0, totalContractedHours: 118416.70000000001	, totalReduction: 77371.40000000001 }
    totals = totalsRounder(totals)
    expect(totals.totalReduction.to.eql(77371.4))
  })
})
