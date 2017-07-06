const linkGenerator = require('./helpers/link-generator')
const organisationalHierarchyTree = require('./organisational-hierarchy-tree')
const Breadcrumb = require('./domain/breadcrumb')
const orgUnit = require('../constants/organisation-unit')

module.exports = function (id, organisationLevel) {
  if (organisationLevel === undefined) {
    throw new TypeError('Organisation level is undefined')
  }

  var breadcrumbs = []
  var tree = organisationalHierarchyTree.get()
  var reference = getReference(id, organisationLevel)

  do {
    breadcrumbs.push(new Breadcrumb(tree[reference].name, linkGenerator(reference)))
    reference = tree[reference].parent
  } while (reference !== undefined)
  return breadcrumbs
}

var getReference = function (id, organisationLevel) {
  var reference
  var organisationKey = Object.keys(orgUnit).find(key => orgUnit[key].name === organisationLevel)
  if (organisationKey === undefined) {
    throw new Error('Organisation level ' + organisationLevel + ' does not exist')
  }

  switch (organisationKey) {
    case 'NATIONAL':
      reference = orgUnit[organisationKey].ref
      break
    default:
      var idRegex = /^[0-9]+$/
      if (!idRegex.test(id) || id === undefined) {
        throw new Error('ID ' + reference + ' is not valid')
      }
      reference = orgUnit[organisationKey].ref + id
  }
  return reference
}
