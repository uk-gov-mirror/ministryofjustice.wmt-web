const linkGenerator = require('./helpers/link-generator')
const organisationalHierarchyTree = require('./organisational-hierarchy-tree')
const Link = require('./domain/link')
const orgUnitFinder = require('../services/helpers/org-unit-finder')
const workloadTypeConstant = require('../constants/workload-type')

module.exports = function (id, organisationLevel, workloadType = workloadTypeConstant.PROBATION) {
  if (organisationLevel === undefined) {
    throw new TypeError('Organisation level is undefined')
  }

  const breadcrumbs = []
  const tree = organisationalHierarchyTree.get()
  let reference = getReference(id, organisationLevel)

  if (tree[reference] === undefined) {
    throw new Error(organisationLevel + ' with ID ' + id + ' does not exist in the organisational tree')
  }

  do {
    breadcrumbs.push(new Link(tree[reference].name, linkGenerator.fromReferenceAndWorkloadType(reference, workloadType)))
    reference = tree[reference].parent
  } while (reference !== undefined)

  return breadcrumbs
}

const getReference = function (id, organisationLevel) {
  let reference
  const organisationUnit = orgUnitFinder('name', organisationLevel)
  const idRegex = /^[0-9]+$/
  if (organisationUnit === undefined) {
    throw new Error('Organisation level ' + organisationLevel + ' does not exist')
  }

  switch (organisationUnit.ref) {
    case 'N':
      reference = organisationUnit.ref
      break
    default:
      if (!idRegex.test(id) || id === undefined) {
        throw new Error('ID ' + reference + ' is not valid')
      }
      reference = organisationUnit.ref + id
  }
  return reference
}
