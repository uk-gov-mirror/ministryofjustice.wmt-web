const expect = require('chai').expect
const exportTablesHelper = require('../../../../app/services/helpers/export-tables-helper')

var lduResults = [
  { linkId: 1265,
    name: 'Test Team 1',
    grades: [
      { gradeCode: 'PO', untiered: 0, d2: 50, d1: 25, c2: 10, c1: 0, b2: 50, b1: 50, a: 50, totalCases: 50 },
      { gradeCode: 'PSO', untiered: 0, d2: 50, d1: 75, c2: 90, c1: 100, b2: 50, b1: 50, a: 50, totalCases: 50 }
    ]
  },
  { linkId: 1266,
    name: 'Test Team 2',
    grades: [
      { gradeCode: 'PO', untiered: 0, d2: 50, d1: 62.5, c2: 10, c1: 70, b2: 75, b1: 80, a: 50, totalCases: 66.66666666666666 },
      { gradeCode: 'PSO', untiered: 0, d2: 50, d1: 37.5, c2: 90, c1: 30, b2: 25, b1: 20, a: 50, totalCases: 33.33333333333333 }
    ]
  }
]

var lduTable = [
  { name: 'Test Team 1', gradeCode: 'PO', untiered: 0, d2: 50, d1: 25, c2: 10, c1: 0, b2: 50, b1: 50, a: 50, totalCases: 50 },
  { name: 'Test Team 1', gradeCode: 'PSO', untiered: 0, d2: 50, d1: 75, c2: 90, c1: 100, b2: 50, b1: 50, a: 50, totalCases: 50 },
  { name: 'Test Team 2', gradeCode: 'PO', untiered: 0, d2: 50, d1: 62.5, c2: 10, c1: 70, b2: 75, b1: 80, a: 50, totalCases: 66.66666666666666 },
  { name: 'Test Team 2', gradeCode: 'PSO', untiered: 0, d2: 50, d1: 37.5, c2: 90, c1: 30, b2: 25, b1: 20, a: 50, totalCases: 33.33333333333333 }
]

describe('services/helpers/export-tables-helper', function () {
  describe('generateLduCaseloadTable', function () {
    it('should return a table with one row per grade per team for an LDU', function () {
      expect(exportTablesHelper.generateLduCaseloadTable(lduResults)).to.eql(lduTable)
    })
  })
})
