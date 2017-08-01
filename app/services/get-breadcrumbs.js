const linkGenerator = require('./helpers/link-generator')
const organisationalHierarchyTree = require('./organisational-hierarchy-tree')
const Link = require('./domain/link')
const orgUnitFinder = require('../services/helpers/org-unit-finder')

module.exports = function (id, organisationLevel) {
  if (organisationLevel === undefined) {
    throw new TypeError('Organisation level is undefined')
  }

  var breadcrumbs = []
  var tree = organisationalHierarchyTree.get()
  var reference = getReference(id, organisationLevel)

  if (tree[reference] === undefined) {
    throw new Error(organisationLevel + ' with ID ' + id + ' does not exist in the organisational tree')
  }

  do {
    breadcrumbs.push(new Link(tree[reference].name, linkGenerator.fromReference(reference)))
    reference = tree[reference].parent
  } while (reference !== undefined)

  return breadcrumbs
}

var getReference = function (id, organisationLevel) {
  var reference
  var organisationUnit = orgUnitFinder('name', organisationLevel)
  if (organisationUnit === undefined) {
    throw new Error('Organisation level ' + organisationLevel + ' does not exist')
  }

  switch (organisationUnit.ref) {
    case 'N':
      reference = organisationUnit.ref
      break
    default:
      var idRegex = /^[0-9]+$/
      if (!idRegex.test(id) || id === undefined) {
        throw new Error('ID ' + reference + ' is not valid')
      }
      reference = organisationUnit.ref + id
  }
  return reference
}
