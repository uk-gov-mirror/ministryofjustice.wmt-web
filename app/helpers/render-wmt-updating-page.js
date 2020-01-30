const getLatestProcessImportTask = require('../services/data/get-latest-process-import-task')
const moment = require('moment')
var minutesToRoundTo = 15 // Rounding up to next 1/4 hour

module.exports = function (res, userRole, authorisation, subNav) {
  return getLatestProcessImportTask().then(function (result) {
    var ETAMinutes = moment(result.date_processed).format('mm')
    var minutesToAdd = minutesToRoundTo - (parseInt(ETAMinutes) % minutesToRoundTo)
    var ETA = moment(result.date_processed).add(1, 'hours').add(minutesToAdd, 'minutes').format('h:mm a')
    return res.render('etl_in_progress', {
      userRole: userRole, // used by proposition-link for the admin role
      authorisation: authorisation,  // used by proposition-link for the admin role
      subNav: subNav,
      title: 'WMT Updating',
      subTitle: 'WMT Updating',
      ETA: ETA
    })
  })
}
