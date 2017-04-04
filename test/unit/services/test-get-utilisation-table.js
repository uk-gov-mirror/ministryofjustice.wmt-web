const expect = require('chai').expect
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const DisplayTable = require('../../../app/services/domain/display-table')

const HEADINGS_MONTH = 'June'
const VALUES_UTILISATION = 118
const UTILISATION_RESULTS = { headings:
   [ 'January',
     'February',
     'March',
     'April',
     'May',
     'June',
     'July',
     'August',
     'September',
     'October',
     'November',
     'December' ],
  values: [ 90, 100, 115, 100, 110, 118, 100, 93, 97, 101, 110, 99 ] }

describe('services/get-utilisation-table', function () {

  it('should return a DisplayTable with valid headers and values', function () {

    var getUtilisation = sinon.stub().resolves(UTILISATION_RESULTS)
    getUtilisationTable
      = proxyquire('../../../app/services/get-utilisation-table', {'./get-utilisation': getUtilisation})

    results  = getUtilisationTable('offendermanager', 2016, 5)

    expect(results.headings[5]).to.equal(HEADINGS_MONTH)
    expect(results.rows[0].values[5]).to.equal(VALUES_UTILISATION)
    expect(results instanceof DisplayTable)

  })
})
