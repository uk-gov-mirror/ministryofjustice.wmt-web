const dateFormatter = require('../date-formatter')

class CapacityDateRange {
  constructor (fromDay, fromMonth, fromYear, toDay, toMonth, toYear) {
    this.fromFields = [
      fromDay,
      fromMonth,
      fromYear
    ]

    this.toFields = [
      toDay,
      toMonth,
      toYear
    ]

    this.capacityFromDate = dateFormatter.build(fromDay, fromMonth, fromYear)
    this.capacityToDate = dateFormatter.build(toDay, toMonth, toYear)
  }
}

module.exports = CapacityDateRange
