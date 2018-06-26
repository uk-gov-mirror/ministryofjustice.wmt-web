module.exports = function (page, title, res, errors, results, authorisedUserRole, dateRange, extraSearchCriteria) {
  return res.render(page, {
    title: title,
    results: results,
    errors: errors,
    userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
    noAuth: authorisedUserRole.noAuth,  // used by proposition-link for the admin role
    dateRange: dateRange,
    extraSearchCriteria: extraSearchCriteria
  })
}
