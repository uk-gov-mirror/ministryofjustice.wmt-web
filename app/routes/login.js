module.exports = function (router) {
  router.get('/login', function (req, res, next) {
      var redirectPath = '/'

      console.log(req.cookies)
      if (req.cookies['lastPath']) {
        redirectPath = req.cookies['lastPath']
      }

      res.redirect(redirectPath)
  })
}
