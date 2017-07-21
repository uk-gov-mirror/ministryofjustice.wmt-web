const getOrganisationalHierarchyTree = require('../services/organisational-hierarchy-tree')

module.exports = function (router) {
  router.get('/refresh', function (req, res) {
    getOrganisationalHierarchyTree.build()
      .then(function () {
        return res.sendStatus(200)
      })
      .catch(function (err) {
        throw new Error('Error refreshing organisation heirarchy ' + err)
      })
  })
}
