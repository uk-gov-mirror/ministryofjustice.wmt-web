const getLatestProcessImportTask = require('../services/data/get-latest-process-import-task')
const moment = require('moment')
const minutesToRoundTo = 15 // Rounding up to next 1/4 hour
const log = require('../logger')

module.exports = function (res, userRole, authorisation, subNav) {
  return getLatestProcessImportTask().then(function (result) {
    const ETAMinutes = moment(result.date_created).format('mm')
    const minutesToAdd = minutesToRoundTo - (parseInt(ETAMinutes) % minutesToRoundTo)
    const ETA = moment(result.date_created).add(1, 'hours').add(minutesToAdd, 'minutes').format('h:mm a')
    const ETAPassed = moment().isAfter(moment(result.date_created).add(1, 'hours').add(minutesToAdd, 'minutes'))
    if (ETAPassed) {
      log.error('ERROR: The ETL Process has Exceeded the Estimated Completion Time. Expected completion time was ' + ETA + ' but it is now ' + moment().format('h:mm a'))
    }
    return res.render('etl_in_progress', {
      userRole: userRole, // used by proposition-link for the admin role
      authorisation: authorisation, // used by proposition-link for the admin role
      subNav: subNav,
      title: 'WMT Updating',
      subTitle: 'WMT Updating',
      ETA: ETA
    })
  })
}
