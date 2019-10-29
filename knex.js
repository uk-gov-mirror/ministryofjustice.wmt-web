var config = require('./knexfile').web
var archive = require('./knexfile').archive

config.pool.afterCreate = function (conn, done) {
  conn.batch(['SET ARITHABORT ON'])
  .then((err, res) => done(err, conn))
  .catch((err, res) => done(err, conn))
}

const knexWebSchema = require('knex')(config)
const knexArchive = require('knex')(archive)

module.exports = {
  web: knexWebSchema,
  archive: knexArchive
}
