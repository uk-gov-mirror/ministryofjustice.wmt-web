const offenderSearch = require('../services/data/search-for-offender')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized

module.exports = function (router) {
  router.get('/officer-search', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return res.render('search-for-officer', {
      userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
      authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
    })
  })

  router.post('/officer-search', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return offenderSearch(req.body.surnameBox).then(function (result) {
      res.render('search-for-officer', {
        userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
        authorisation: authorisedUserRole.authorisation, // used by proposition-link for the admin role
        results: result,
        surname: req.body.surnameBox
      })
    })
  })
}
