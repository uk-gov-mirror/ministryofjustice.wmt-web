const offenderSearch = require('../services/data/search-for-offender')
const ValidationError = require('../services/errors/validation-error')
const FieldSetValidator = require('../services/validators/fieldset-validator')
const ErrorHandler = require('../services/validators/error-handler')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const renderResults = require('../helpers/render-results')
const title = 'Search for an Offender Manager'
const viewTemplate = 'search-for-officer'

module.exports = function (router) {
    router.get('/officer-search', function (req, res, next) {
        try {
            authorisation.assertUserAuthenticated(req)
          } catch (error) {
            if (error instanceof Unauthorized) {
              return res.status(error.statusCode).redirect(error.redirect)
            }
        }
        return res.render('search-for-officer', {})
    })

    router.post('/officer-search/search', function(req, res, next){
        try {
            authorisation.assertUserAuthenticated(req)
          } catch (error) {
            if (error instanceof Unauthorized) {
              return res.status(error.statusCode).redirect(error.redirect)
            }
        }
        return offenderSearch(req.body.surnameBox).then(function(result){
            res.render('search-for-officer', {
                 results: result
            })
        })
    })
}