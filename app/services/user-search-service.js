const searchForUser = require('./data/search-for-user')

module.exports = function () {
  return searchForUser().then(function (users) {
    return users
  })
}
