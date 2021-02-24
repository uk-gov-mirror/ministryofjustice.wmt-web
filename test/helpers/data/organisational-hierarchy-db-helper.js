const knex = require('../../knex').integrationTests
const Promise = require('bluebird').Promise

module.exports.addOrganisationalHierachy = function () {
  const inserts = []

  const promise = knex('offender_manager_type').returning('id').insert({ description: 'test' })
    .then(function (ids) {
      inserts.push({ table: 'offender_manager_type', id: ids[0] })
      return knex('offender_manager').returning('id').insert({ type_id: ids[0], forename: 'OH Forename', surname: 'OH Surname' })
    })
    .then(function (ids) {
      inserts.push({ table: 'offender_manager', id: ids[0] })
      return knex('region').returning('id').insert({ description: 'OH Region' })
    })
    .then(function (ids) {
      inserts.push({ table: 'region', id: ids[0] })
      return knex('ldu').returning('id').insert({ region_id: ids[0], description: 'OH LDU' })
    })
    .then(function (ids) {
      inserts.push({ table: 'ldu', id: ids[0] })
      return knex('team').returning('id').insert({ ldu_id: ids[0], description: 'OH Team' })
    })
    .then(function (ids) {
      inserts.push({ table: 'team', id: ids[0] })
      return knex('workload_owner').returning('id')
        .insert({
          team_id: inserts.filter((item) => item.table === 'team')[0].id,
          offender_manager_id: inserts.filter((item) => item.table === 'offender_manager')[0].id
        })
    })
    .then(function (ids) {
      inserts.push({ table: 'workload_owner', id: ids[0] })
      return inserts
    })

  return promise
}

module.exports.removeOrganisationalHierarchy = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}
