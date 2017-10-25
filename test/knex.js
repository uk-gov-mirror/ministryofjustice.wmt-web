const knex = require('knex')(require('../knexfile').integrationTests)

module.exports = {
  integrationTests: knex
}
