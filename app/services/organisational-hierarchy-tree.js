const getOrganisationalHierarchyData = require('./data/get-organisational-hierarchy-data')
const ROOT_REF = 'N1'

var tree

module.exports.build = function () {
  tree = {}
  tree[ROOT_REF] = { name: 'NPS', parent: null, children: [] }

  return getOrganisationalHierarchyData().then(function (result) {
    result.forEach(function (row) {
      var branch = [{name: row.region_desc, ref: 'R' + row.region_id},
        {name: row.ldu_desc, ref: 'L' + row.ldu_id},
        {name: row.team_desc, ref: 'T' + row.team_id},
        {name: row.offender_manager_forename + ' ' + row.offender_manager_surname, ref: 'I' + row.offender_manager_id}
      ]
      createBranch(ROOT_REF, branch)
    })
  })
}

var createBranch = function (parentRef, branch) {
  var currentNode = branch.shift()
  if (tree[currentNode.ref] === undefined) {
    tree[currentNode.ref] = {name: currentNode.name, parent: parentRef, children: []}
    tree[parentRef].children.push(currentNode.ref)
  }
  if (branch.length > 0) {
    createBranch(currentNode.ref, branch)
  }
}

module.exports.get = function () {
  return tree
}
