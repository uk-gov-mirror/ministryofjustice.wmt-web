var config = require('./knexfile').web

config.pool.afterCreate = function (conn, done) {
  conn.batch(["SET ARITHABORT ON"])
  .then((err, res) => done(err, conn))
  .catch((err, res) => done(err, conn))
}

const knexWebSchema = require('knex')(config)

module.exports = {
  web: knexWebSchema
}
