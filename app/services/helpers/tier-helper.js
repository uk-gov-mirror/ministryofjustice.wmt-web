const TierType = require('../../constants/tier-type')

module.exports.getTierType = function (tierNumber) {
  var tier
  switch (tierNumber) {
    case 1:
      tier = TierType.ONE
      break
    case 2:
      tier = TierType.TWO
      break
    case 3:
      tier = TierType.THREE
      break
    case 4:
      tier = TierType.FOUR
      break
    case 5:
      tier = TierType.FIVE
      break
    case 6:
      tier = TierType.SIX
      break
    case 7:
      tier = TierType.SEVEN
      break
    case 8:
      tier = TierType.EIGHT
      break
    case 9:
      tier = TierType.NINE
      break
    case 10:
      tier = TierType.TEN
      break
  }
  return tier
}
