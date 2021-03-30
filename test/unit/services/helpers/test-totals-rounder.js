const expect = require('chai').expect
const totalsRounder = require('../../../../app/services/helpers/totals-rounder')

describe('services/helpers/totals-rounder', function () {
  it('should round total contracted hours to 1 decimal place', function () {
    let totals = { name: 'Total / Average', totalCapacityPercentage: 0, totalPoints: 0, totalAvailablePoints: 0, totalContractedHours: 118416.70000000001, totalReduction: 77371.40000000001 }
    totals = totalsRounder(totals)
    expect(totals.totalContractedHours).to.eql(118416.7)
  })

  it('should round total reduction hours to 1 decimal place', function () {
    let totals = { name: 'Total / Average', totalCapacityPercentage: 0, totalPoints: 0, totalAvailablePoints: 0, totalContractedHours: 118416.70000000001, totalReduction: 77371.40000000001 }
    totals = totalsRounder(totals)
    expect(totals.totalReduction).to.eql(77371.4)
  })
})
