const dateFormatter = require('../date-formatter')
const CapacityDateRange = require('../domain/capacity-date-range')
const ArchiveDateRange = require('../domain/archive-date-range')
const log = require('../../logger')

module.exports.createCapacityDateRange = function (dateParameters) {
  var capacityDateRange

  if (Object.keys(dateParameters).length === 0) {
    var fromDate = dateFormatter.now().subtract(1, 'years')
    var toDate = dateFormatter.now()

    capacityDateRange = new CapacityDateRange(
      fromDate.date(),
      fromDate.month() + 1,
      fromDate.year(),
      toDate.date(),
      toDate.month() + 1,
      toDate.year()
    )
  } else {
    capacityDateRange = new CapacityDateRange(
      dateParameters['capacity-from-day'],
      dateParameters['capacity-from-month'],
      dateParameters['capacity-from-year'],
      dateParameters['capacity-to-day'],
      dateParameters['capacity-to-month'],
      dateParameters['capacity-to-year']
    )
  }
  return capacityDateRange
}

module.exports.createDailyArchiveDateRange = function (dateParameters) {
  var archiveDateRange
  log.info(Object.keys(dateParameters).length)
  if (Object.keys(dateParameters).length === 0) {
    archiveDateRange = null
  } else {
    console.log('In here')
    archiveDateRange = new ArchiveDateRange(
      dateParameters['daily-archive-from-day'],
      dateParameters['daily-archive-from-month'],
      dateParameters['daily-archive-from-year'],
      dateParameters['daily-archive-to-day'],
      dateParameters['daily-archive-to-month'],
      dateParameters['daily-archive-to-year']
    )
  }
  return archiveDateRange
}

module.exports.createFortnightlyArchiveDateRange = function (dateParameters) {
  var archiveDateRange
  log.info(Object.keys(dateParameters).length)
  if (Object.keys(dateParameters).length === 0) {
    archiveDateRange = null
  } else {
    archiveDateRange = new ArchiveDateRange(
      dateParameters['fortnightly-archive-from-day'],
      dateParameters['fortnightly-archive-from-month'],
      dateParameters['fortnightly-archive-from-year'],
      dateParameters['fortnightly-archive-to-day'],
      dateParameters['fortnightly-archive-to-month'],
      dateParameters['fortnightly-archive-to-year']
    )
  }
  return archiveDateRange
}

module.exports.createReductionArchiveDateRange = function (dateParameters) {
  var archiveDateRange
  log.info(Object.keys(dateParameters).length)
  if (Object.keys(dateParameters).length === 0) {
    archiveDateRange = null
  } else {
    archiveDateRange = new ArchiveDateRange(
      dateParameters['reduction-archive-from-day'],
      dateParameters['reduction-archive-from-month'],
      dateParameters['reduction-archive-from-year'],
      dateParameters['reduction-archive-to-day'],
      dateParameters['reduction-archive-to-month'],
      dateParameters['reduction-archive-to-year']
    )
  }
  return archiveDateRange
}
