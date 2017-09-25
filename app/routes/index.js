const passport = require('passport')

module.exports = function (router) {
  router.get('/', passport.authenticate('saml'), function (req, res) {
    req.session.user_role = req.user.role
    return res.render('index', {
      title: 'WMT Index'
    })
  })
}
