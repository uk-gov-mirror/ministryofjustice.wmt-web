const expect = require('chai').expect
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const DisplayTable = require('../../../app/services/domain/display-table')

const HEADINGS_MONTH = 'June'
const VALUES_UTILISATION = 118
const UTILISATION_RESULTS = [
  { utilisation_percentage: 30, month: 'January' },
  { utilisation_percentage: 80, month: 'February' },
  { utilisation_percentage: 120, month: 'March' },
  { utilisation_percentage: 100, month: 'April' },
  { utilisation_percentage: 90, month: 'May' },
  { utilisation_percentage: 118, month: 'June' },
  { utilisation_percentage: 130, month: 'July' },
  { utilisation_percentage: 93, month: 'August' },
  { utilisation_percentage: 97, month: 'September' },
  { utilisation_percentage: 101, month: 'October' },
  { utilisation_percentage: 110, month: 'November' },
  { utilisation_percentage: 99, month: 'December' }
]

describe('services/get-utilisation-table', function () {

  it('should return a DisplayTable with valid headers and values', function () {

    var getUtilisation = sinon.stub().returns(UTILISATION_RESULTS)
    getUtilisationTable
      = proxyquire('../../../app/services/get-utilisation-table', {'./data/get-utilisation': getUtilisation})

    results  = getUtilisationTable('offendermanager', 5, '2017-03-01T00:00:00Z')
    expect(results.headings[5]).to.equal(HEADINGS_MONTH)
    expect(results.rows[0].values[5]).to.equal(VALUES_UTILISATION)
    expect(results instanceof DisplayTable)

  })
})
