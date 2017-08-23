const Link = require('./domain/link')
const linkGenerator = require('./helpers/link-generator')

module.exports = function (id, organisationalUnitName, currentPath) {
  var baseLink = linkGenerator.fromIdAndName(id, organisationalUnitName)
  var navigation = []

  navigation.push(new Link('Overview', baseLink + '/overview'))
  navigation.push(new Link('Capacity', baseLink + '/caseload-capacity'))
  navigation.push(new Link('Caseload', baseLink + '/caseload'))
  navigation.push(new Link('Case Progress', baseLink + '/case-progress'))
  navigation.push(new Link('Reductions', baseLink + '/reductions'))

  navigation.forEach(function (item) {
    if (item.link === currentPath) {
      item.active = true
    }
  })

  return navigation
}
