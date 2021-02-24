const config = require('./knexfile').web
const archive = require('./knexfile').archive

const knexWebSchema = require('knex')(config)
const knexArchive = require('knex')(archive)

module.exports = {
  web: knexWebSchema,
  archive: knexArchive
}
