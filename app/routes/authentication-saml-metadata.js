const passport = require('passport')

module.exports = function (router) {
  router.get('/authentication-saml-metadata', (req, res) => {
    res.set('Content-Type', 'text/xml')
    res.status(200).send(passport._strategy('saml').generateServiceProviderMetadata())
  })
}
