const expect = require('chai').expect
const tierHelper = require('../../../../app/services/helpers/tier-helper')

const EXPECTED_TIER_TYPES = { ONE: 'D2', TWO: 'D1', THREE: 'C2', FOUR: 'C1', FIVE: 'B2', SIX: 'B1', SEVEN: 'A' }

describe('services/helpers/tier-helper', function () {
  describe('getTierType', function () {
    it('should return tier type \'D2\' for a given tier number 1', function () {
      expect(tierHelper.getTierType(1)).to.equal(EXPECTED_TIER_TYPES.ONE)
    })
    it('should return tier type \'D1\' for a given tier number 2', function () {
      expect(tierHelper.getTierType(2)).to.equal(EXPECTED_TIER_TYPES.TWO)
    })
    it('should return tier type \'C2\' for a given tier number 3', function () {
      expect(tierHelper.getTierType(3)).to.equal(EXPECTED_TIER_TYPES.THREE)
    })
    it('should return tier type \'C1\' for a given tier number 4', function () {
      expect(tierHelper.getTierType(4)).to.equal(EXPECTED_TIER_TYPES.FOUR)
    })
    it('should return tier type \'B2\' for a given tier number 5', function () {
      expect(tierHelper.getTierType(5)).to.equal(EXPECTED_TIER_TYPES.FIVE)
    })
    it('should return tier type \'B1\' for a given tier number 6', function () {
      expect(tierHelper.getTierType(6)).to.equal(EXPECTED_TIER_TYPES.SIX)
    })
    it('should return tier type \'A\' for a given tier number 7', function () {
      expect(tierHelper.getTierType(7)).to.equal(EXPECTED_TIER_TYPES.SEVEN)
    })
  })
})
