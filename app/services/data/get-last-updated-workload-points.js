const knex = require('../../../knex').web

module.exports = function () {
    knex('tasks').where({
        type: 'PROCESS-IMPORT',
        status:  'COMPLETE'
      }).select('date_processed')
      .then(function (result){
          return result[0]
      })
}