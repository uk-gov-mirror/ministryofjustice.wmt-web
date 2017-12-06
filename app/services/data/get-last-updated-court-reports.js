const knex = require('../../../knex').web

module.exports = function () {
    return knex('tasks')
    .first('date_created')
    .where('type', 'CALCULATE-WORKLOAD-POINTS')
    .andWhere('status', 'PENDING')
    .then(function(result) {
        return result
    })
}
/** 
knex('tasks')
.first('date_processed')
.where('type', 'PROCESS-IMPORT')
.andWhere('status', 'COMPLETE')
.then(function(result) {
    return result
}) */