const offenderSearch = require('../services/data/search-for-offender')

module.exports = function (router) {
    router.get('/officer-search', function (req, res, next) {
        return res.render('search-for-officer', {})
    })

    router.post('/officer-search/search', function(req, res, next){
        return offenderSearch(req.body.surnameBox).then(function(result){
            res.render('search-for-officer', {
                 results: result
            })
        })
    })
}