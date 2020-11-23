const expect = require('chai').expect
const getOutstandingReportsView = require('../../../../app/services/data/get-outstanding-reports-view')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')

let inserts = []

describe('services/data/get-outstanding-reports-view', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve all the outstanding reports', function () {
    return getOutstandingReportsView(undefined, 'team')
      .then(function (results) {
        expect(results.length).to.be.greaterThan(0)
      })
  })

  it('should retrieve all outstanding reports for a given team', function () {
    return getOutstandingReportsView(inserts.filter((item) => item.table === 'team')[0].id, 'team')
      .then(function (results) {
        expect(results[0].ow).to.be.greaterThan(0)
        expect(results[0].ot).to.be.greaterThan(0)
        expect(results[0].upw).to.be.greaterThan(0)
        expect(results[0].sl).to.be.greaterThan(0)
        expect(results[0].sso).to.be.greaterThan(0)
      })
  })

  it('should retrieve all outstanding reports for a given ldu id', function () {
    return getOutstandingReportsView(inserts.filter((item) => item.table === 'ldu')[0].id, 'ldu')
      .then(function (results) {
        expect(results[0].ow).to.be.greaterThan(0)
        expect(results[0].ot).to.be.greaterThan(0)
        expect(results[0].upw).to.be.greaterThan(0)
        expect(results[0].sl).to.be.greaterThan(0)
        expect(results[0].sso).to.be.greaterThan(0)
      })
  })

  it('should retrieve all outstanding reports for a given region id', function () {
    return getOutstandingReportsView(inserts.filter((item) => item.table === 'region')[0].id, 'region')
      .then(function (results) {
        expect(results[0].ow).to.be.greaterThan(0)
        expect(results[0].ot).to.be.greaterThan(0)
        expect(results[0].upw).to.be.greaterThan(0)
        expect(results[0].sl).to.be.greaterThan(0)
        expect(results[0].sso).to.be.greaterThan(0)
      })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
