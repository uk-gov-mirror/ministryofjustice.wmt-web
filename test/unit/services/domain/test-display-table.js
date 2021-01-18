const expect = require('chai').expect
const DisplayTable = require('../../../../app/services/domain/display-table')

const TEST_MONTH_HEADING = 'April'
const TEST_ROW_VALUE = 118
const CAPACITY_RESULTS = {
  headings:
  ['January',
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
    'December'],
  rows:
  [{
    label: 'Offender Manager 1',
    values:
        [90, 100, 115, 100, 110, 118, 100, 93, 97, 101, 110, 99]
  }]
}

describe('services/domain/display-table', function () {
  it('should construct a table given valid headers and values', function () {
    const capacityTable = new DisplayTable(
      CAPACITY_RESULTS.headings, CAPACITY_RESULTS.rows)

    expect(capacityTable.headings[3]).to.equal(TEST_MONTH_HEADING)
    expect(capacityTable.rows[0].values[5]).to.equal(TEST_ROW_VALUE)
  })

  // test if headers are greater than values

  // test if headers is zero

  // test if values are zero
})
