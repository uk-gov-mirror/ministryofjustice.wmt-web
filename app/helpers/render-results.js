const Link = require('../services/domain/link')

module.exports = function (page, title, res, errors, results, authorisedUserRole, dateRange, extraSearchCriteria, startSearching = false, stringifiedBody = '') {
  const breadcrumbs = [
    getTopLink(title),
    new Link('Archive Data Options', '/archive-options'),
    new Link('Admin', '/admin')
  ]
  return res.render(page, {
    title: title,
    results: results,
    errors: errors,
    subTitle: 'Archive Data',
    breadcrumbs: breadcrumbs,
    userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
    noAuth: authorisedUserRole.noAuth, // used by proposition-link for the admin role
    dateRange: dateRange,
    extraSearchCriteria: extraSearchCriteria,
    stringifiedBody: stringifiedBody,
    startSearching: startSearching
  })
}

const getTopLink = function (title) {
  let link
  switch (title) {
    case 'Archived Reductions':
      link = new Link(title, '/archive-data/reductions')
      break
    case 'Archived Fortnightly Caseload Data':
      link = new Link(title, '/archive-data/fortnightly-caseload-data')
      break
    case 'Archived Daily Caseload Data':
      link = new Link(title, '/archive-data/daily-caseload-data')
      break
  }
  return link
}
