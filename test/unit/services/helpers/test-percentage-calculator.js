const expect = require('chai').expect
const caseloadPercentageCalculator = require('../../../../app/services/helpers/percentage-calculator')

var lduCaseloadQueryResults = [
  { linkId: 1265, name: 'Test Team 1', gradeCode: 'PO', untiered: 0, d2: 6, d1: 5, c2: 1, c1: 0, b2: 30, b1: 36, a: 42, totalCases: 30 },
  { linkId: 1265, name: 'Test Team 1', gradeCode: 'PSO', untiered: 0, d2: 6, d1: 15, c2: 9, c1: 24, b2: 30, b1: 36, a: 42, totalCases: 30 },
  { linkId: 1266, name: 'Test Team 2', gradeCode: 'PO', untiered: 0, d2: 6, d1: 10, c2: 1, c1: 7, b2: 30, b1: 80, a: 42, totalCases: 30 },
  { linkId: 1266, name: 'Test Team 2', gradeCode: 'PSO', untiered: 0, d2: 6, d1: 6, c2: 9, c1: 3, b2: 10, b1: 20, a: 42, totalCases: 15 }
]

var lduPercentageResults = [
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

describe('services/helpers/percentage-calculator', function () {
  it('should popluate percentage fields in each row of the object', function () {
    expect(caseloadPercentageCalculator(lduCaseloadQueryResults)).to.eql(lduPercentageResults)
  })
})
