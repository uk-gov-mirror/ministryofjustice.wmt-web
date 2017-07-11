const Link = require('./domain/link')
const linkGenerator = require('./helpers/link-generator')

module.exports = function (id, organisationalUnitName) {
  var baseLink = linkGenerator.fromIdAndName(id, organisationalUnitName)
  var navigation = []

  navigation.push(new Link('Capacity', baseLink + '/caseload-capacity'))

  return navigation
}
