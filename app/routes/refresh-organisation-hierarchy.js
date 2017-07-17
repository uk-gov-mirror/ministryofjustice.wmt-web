const getOrganisationalHierarchyTree = require('./services/organisational-hierarchy-tree')

module.exports = function (router) {
  router.get('/refresh', function (req, res) {
    getOrganisationalHierarchyTree.build()
    return res.status(200)
  })
}
