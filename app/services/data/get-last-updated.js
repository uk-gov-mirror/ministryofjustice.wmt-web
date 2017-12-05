const knex = require('../../../knex').web

module.exports = function () {
    
    return knex('wmt_extract')
    .select(
        'datestamp AS lastUpdated'
    )
  }
  