const knex = require('../../../knex').web

module.exports = function (name) {
  const columns = [
    'id',
    'username',
    'name'
  ]
  if (name) {
    return knex('users').columns(columns).where('name', 'like', '%' + name + '%')
  } else {
    return knex('users').columns(columns)
  }
}
