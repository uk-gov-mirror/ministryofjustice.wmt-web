const getOrganisationalHierarchyData = require('./data/get-organisational-hierarchy-data')
const ROOT_REF = 'N'

var tree

module.exports.build = function () {
  tree = {}
  tree[ROOT_REF] = { name: 'HMPPS', parent: undefined, children: [] }

  return getOrganisationalHierarchyData().then(function (result) {
    result.forEach(function (row) {
      var branch = [{name: row.region_description, ref: 'R' + row.region_id},
        {name: row.ldu_description, ref: 'L' + row.ldu_id},
        {name: row.team_description, ref: 'T' + row.team_id},
        {name: getFullName(row.offender_manager_forename, row.offender_manager_surname), ref: 'I' + row.workload_owner_id}
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

var getFullName = function (forename, surname) {
  var fullName

  switch (true) {
    case surname === undefined && forename === undefined:
      fullName = undefined
      break
    case surname === undefined:
      fullName = forename
      break
    case forename === undefined:
      fullName = surname
      break
    default:
      fullName = forename + ' ' + surname
  }

  return fullName
}

module.exports.get = function () {
  return tree
}
