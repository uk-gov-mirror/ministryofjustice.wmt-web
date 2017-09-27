module.exports.TEAM_CASELOAD_RESULT = {
  title: 'Test Team',
  caseloadDetails: {
    overallCaseloadDetails: [
      { linkId: 2767, name: 'John Smith', gradeCode: 'PO', untiered: 0, d2: 3, d1: 6, c2: 9, c1: 6, b2: 12, b1: 18, a: 9, totalCases: 189, caseType: 'COMMUNITY' },
      { linkId: 2771, name: 'Tony Test', gradeCode: 'PO', untiered: 0, d2: 3, d1: 6, c2: 9, c1: 6, b2: 12, b1: 18, a: 9, totalCases: 189, caseType: 'COMMUNITY' }
    ],
    custodyCaseloadDetails: [],
    communityCaseloadDetails: [],
    licenseCaseloadDetails: []
  }
}

module.exports.TEAM_CASELOAD_CSV = {
  filename: 'Test_Team_Caseload.csv',
  csv: 'OVERALL\n' +
    '"OffenderManagerName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n' +
    '"John Smith","PO",189,0,3,6,9,6,12,18,9\n' +
    '"Tony Test","PO",189,0,3,6,9,6,12,18,9\n\n\n' +
    'CUSTODY\n' +
    '"OffenderManagerName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n\n\n' +
    'COMMUNITY\n' +
    '"OffenderManagerName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n\n\n' +
    'LICENSE\n' +
    '"OffenderManagerName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"'
}

module.exports.LDU_CASELOAD_RESULT = {
  title: 'Test LDU',
  caseloadDetails: {
    overallCaseloadDetails: [
      { linkId: 1265,
        name: 'Test Team 1',
        grades: [
          { grade: 'PO', untiered: 0, d2: 50, d1: 25, c2: 10, c1: 0, b2: 50, b1: 50, a: 50, totalCases: 50 },
          { grade: 'PSO', untiered: 0, d2: 50, d1: 75, c2: 90, c1: 100, b2: 50, b1: 50, a: 50, totalCases: 50 }
        ]
      },
      { linkId: 1266,
        name: 'Test Team 2',
        grades: [
          { grade: 'PO', untiered: 0, d2: 50, d1: 62.5, c2: 10, c1: 70, b2: 75, b1: 80, a: 50, totalCases: 66.66666666666666 }
        ]
      }
    ],
    custodyCaseloadDetails: [],
    communityCaseloadDetails: [],
    licenseCaseloadDetails: [],
    overallTotalSummary: [
      {
        name: 'Test Team 1',
        linkId: 1265,
        totalCases: 12,
        custodyTotalCases: 5,
        commuintyTotalCases: 5,
        licenseTotalCases: 2
      },
      {
        name: 'Test Team 2',
        linkId: 1266,
        totalCases: 12,
        custodyTotalCases: 5,
        commuintyTotalCases: 5,
        licenseTotalCases: 2
      }
    ]
  }
}

module.exports.LDU_CASELOAD_CSV = {
  filename: 'Test_LDU_Caseload.csv',
  csv: 'OVERALL\n' +
      '"name","custodyCases","communityCases","licenseCases","totalCases"\n' +
      '"Test Team 1",5,,2,12\n' +
      '"Test Team 2",5,,2,12\n\n\n' +
      'CUSTODY\n' +
      '"TeamName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n\n\n' +
      'COMMUNITY\n' +
      '"TeamName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n\n\n' +
      'LICENSE\n' +
      '"TeamName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n\n\n' +
      'OVERALL BY GRADE\n' +
      '"TeamName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n' +
      '"Test Team 1","PO",50,0,50,25,10,0,50,50,50\n' +
      '"Test Team 1","PSO",50,0,50,75,90,100,50,50,50\n' +
      '"Test Team 2","PO",66.66666666666666,0,50,62.5,10,70,75,80,50'
}

module.exports.REGION_CASELOAD_RESULT = {
  title: 'Test Region',
  caseloadDetails: {
    overallCaseloadDetails: [
      { linkId: 1265,
        name: 'Test LDU 1',
        grades: [
          { grade: 'PO', untiered: 0, d2: 50, d1: 25, c2: 10, c1: 0, b2: 50, b1: 50, a: 50, totalCases: 50 },
          { grade: 'PSO', untiered: 0, d2: 50, d1: 75, c2: 90, c1: 100, b2: 50, b1: 50, a: 50, totalCases: 50 }
        ]
      },
      { linkId: 1266,
        name: 'Test LDU 2',
        grades: [
          { grade: 'PO', untiered: 0, d2: 50, d1: 62.5, c2: 10, c1: 70, b2: 75, b1: 80, a: 50, totalCases: 66.66666666666666 }
        ]
      }
    ],
    custodyCaseloadDetails: [],
    communityCaseloadDetails: [],
    licenseCaseloadDetails: [],
    overallTotalSummary: [
      {
        name: 'Test LDU 1',
        linkId: 1265,
        totalCases: 12,
        custodyTotalCases: 5,
        commuintyTotalCases: 5,
        licenseTotalCases: 2
      },
      {
        name: 'Test LDU 2',
        linkId: 1266,
        totalCases: 12,
        custodyTotalCases: 5,
        commuintyTotalCases: 5,
        licenseTotalCases: 2
      }
    ]
  }
}

module.exports.REGION_CASELOAD_CSV = {
  filename: 'Test_Region_Caseload.csv',
  csv: 'OVERALL\n' +
  '"name","custodyCases","communityCases","licenseCases","totalCases"\n' +
  '"Test LDU 1",5,,2,12\n' +
  '"Test LDU 2",5,,2,12\n\n\n' +
  'CUSTODY\n' +
  '"LDUClusterName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n\n\n' +
  'COMMUNITY\n' +
  '"LDUClusterName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n\n\n' +
  'LICENSE\n' +
  '"LDUClusterName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n\n\n' +
  'OVERALL BY GRADE\n' +
  '"LDUClusterName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n' +
  '"Test LDU 1","PO",50,0,50,25,10,0,50,50,50\n' +
  '"Test LDU 1","PSO",50,0,50,75,90,100,50,50,50\n' +
  '"Test LDU 2","PO",66.66666666666666,0,50,62.5,10,70,75,80,50'
}

module.exports.NATIONAL_CASELOAD_RESULT = {
  title: 'Test National',
  caseloadDetails: {
    overallCaseloadDetails: [
      { linkId: 1265,
        name: 'Test Region 1',
        grades: [
          { grade: 'PO', untiered: 0, d2: 50, d1: 25, c2: 10, c1: 0, b2: 50, b1: 50, a: 50, totalCases: 50 },
          { grade: 'PSO', untiered: 0, d2: 50, d1: 75, c2: 90, c1: 100, b2: 50, b1: 50, a: 50, totalCases: 50 }
        ]
      },
      { linkId: 1266,
        name: 'Test Region 2',
        grades: [
          { grade: 'PO', untiered: 0, d2: 50, d1: 62.5, c2: 10, c1: 70, b2: 75, b1: 80, a: 50, totalCases: 66.66666666666666 }
        ]
      }
    ],
    custodyCaseloadDetails: [],
    communityCaseloadDetails: [],
    licenseCaseloadDetails: [],
    overallTotalSummary: [
      {
        name: 'Test Region 1',
        linkId: 1265,
        totalCases: 12,
        custodyTotalCases: 5,
        commuintyTotalCases: 5,
        licenseTotalCases: 2
      },
      {
        name: 'Test Region 2',
        linkId: 1266,
        totalCases: 12,
        custodyTotalCases: 5,
        commuintyTotalCases: 5,
        licenseTotalCases: 2
      }
    ]
  }
}

module.exports.NATIONAL_CASELOAD_CSV = {
  filename: 'Test_National_Caseload.csv',
  csv: 'OVERALL\n' +
  '"name","custodyCases","communityCases","licenseCases","totalCases"\n' +
  '"Test Region 1",5,,2,12\n' +
  '"Test Region 2",5,,2,12\n\n\n' +
  'CUSTODY\n' +
  '"DivisionName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n\n\n' +
  'COMMUNITY\n' +
  '"DivisionName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n\n\n' +
  'LICENSE\n' +
  '"DivisionName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n\n\n' +
  'OVERALL BY GRADE\n' +
  '"DivisionName","Grade","Overall","Untiered","D2","D1","C2","C1","B2","B1","A"\n' +
  '"Test Region 1","PO",50,0,50,25,10,0,50,50,50\n' +
  '"Test Region 1","PSO",50,0,50,75,90,100,50,50,50\n' +
  '"Test Region 2","PO",66.66666666666666,0,50,62.5,10,70,75,80,50'
}

module.exports.OM_OVERVIEW_RESULT = {
  title: 'John Smith',
  overviewDetails: {
    grade: 'PO',
    teamId: 1611,
    teamName: 'Team 1',
    availablePoints: 190,
    totalPoints: 200,
    cases: 60,
    contractedHours: 37,
    reduction: 4,
    defaultContractedHoursPo: 37,
    defaultContractedHoursPso: 37,
    capacity: 105 }
}

module.exports.OM_OVERVIEW_CSV = {
  filename: 'John_Smith_Overview.csv',
  csv: '"GradeCode","TeamName","CapacityPercentage","TotalCases","ContractedHours","ReductionHours"\n' +
  '"PO","Team 1",105,60,37,4'
}

module.exports.TEAM_OVERVIEW_RESULT = {
  overviewDetails:
  [ { name: 'John Smith',
    totalCases: 63,
    availablePoints: 190,
    totalPoints: 204,
    contractedHours: 37.5,
    reductionHours: 6,
    linkId: 2767,
    gradeCode: 'PO',
    capacityPercentage: 107.36842105263158 },
  { name: 'Tony Test',
    totalCases: 63,
    availablePoints: 190,
    totalPoints: 203,
    contractedHours: 36.5,
    reductionHours: 6,
    linkId: 2771,
    gradeCode: 'PO',
    capacityPercentage: 106.84210526315789 } ],
  title: 'Test Team'
}

module.exports.TEAM_OVERVIEW_CSV = {
  filename: 'Test_Team_Overview.csv',
  csv: '"OffenderManagerName","CapacityPercentage","CapacityPoints","ContractedHours","ReductionHours","TotalCases","GradeCode"\n' +
  '"John Smith",107.36842105263158,190,37.5,6,63,"PO"\n' +
  '"Tony Test",106.84210526315789,190,36.5,6,63,"PO"'
}

module.exports.LDU_OVERVIEW_RESULT = {
  overviewDetails:
  [ { name: 'Team 1',
    totalCases: 315,
    availablePoints: 950,
    totalPoints: 1014,
    contractedHours: 175.5,
    reductionHours: 30,
    linkId: 1611,
    capacityPercentage: 106.73684210526315 },
  { name: 'Team 4',
    totalCases: 315,
    availablePoints: 950,
    totalPoints: 1014,
    contractedHours: 175.5,
    reductionHours: 28,
    linkId: 1614,
    capacityPercentage: 106.73684210526315 } ],
  title: 'Test LDU'
}

module.exports.LDU_OVERVIEW_CSV = {
  filename: 'Test_LDU_Overview.csv',
  csv: '"TeamName","CapacityPercentage","CapacityPoints","ContractedHours","ReductionHours","TotalCases"\n' +
  '"Team 1",106.73684210526315,950,175.5,30,315\n' +
  '"Team 4",106.73684210526315,950,175.5,28,315'
}

module.exports.REGION_OVERVIEW_HEADINGS = '"LDUClusterName","CapacityPercentage","CapacityPoints","ContractedHours","ReductionHours","TotalCases"'

module.exports.NATIONAL_OVERVIEW_HEADINGS = '"DivisionName","CapacityPercentage","CapacityPoints","ContractedHours","ReductionHours","TotalCases"'
