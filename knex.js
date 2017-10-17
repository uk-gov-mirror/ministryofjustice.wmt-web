const knexWebSchema = require('knex')(require('./knexfile').web)

module.exports = {
  web: knexWebSchema
}
