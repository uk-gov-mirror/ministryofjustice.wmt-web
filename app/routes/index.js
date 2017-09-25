const passport = require('passport')

module.exports = function (router) {
  router.get('/', passport.authenticate('saml'), function (req, res) {
    return res.render('index', {
      title: 'WMT Index'
    })
   })
}
