const Link = require('./domain/link')

module.exports = function (currentPath) {
  const navigation = []

  navigation.push(new Link('My Expiring Reductions', '/expiring-reductions'))
  navigation.push(new Link('Other Managers\' Expiring Reductions', '/expiring-reductions-other'))

  navigation[0].active = true

  navigation.forEach(function (item) {
    if (item.link === currentPath) {
      navigation[0].active = false
      item.active = true
    }
  })

  return navigation
}
