
module.exports = function (router) {
    router.get('/search', function (req, res, next) {
        return res.render('search-for-officer', {})
    })
}