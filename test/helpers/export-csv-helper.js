module.exports.TEAM_CASELOAD_RESULT = {
  title: 'Test Team',
  caseloadDetails: {
    overallCaseloadDetails: [
      { linkId: 2767, name: 'John Smith', gradeCode: 'PO', a: 9, b1: 18, b2: 12, c1: 6, c2: 9, d1: 6, d2: 3, untiered: 0, totalCases: 189, caseType: 'COMMUNITY' },
      { linkId: 2771, name: 'Tony Test', gradeCode: 'PO', a: 9, b1: 18, b2: 12, c1: 6, c2: 9, d1: 6, d2: 3, untiered: 0, totalCases: 189, caseType: 'COMMUNITY' }
    ],
    custodyCaseloadDetails: [],
    communityCaseloadDetails: [],
    licenseCaseloadDetails: []
  }
}

module.exports.TEAM_CASELOAD_CSV = {
  filename: 'Test_Team_Caseload.csv',
  csv: 'OVERALL\n' +
    '"OffenderManagerName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n' +
    '"John Smith","PO",9,18,12,6,9,6,3,0,189\n' +
    '"Tony Test","PO",9,18,12,6,9,6,3,0,189\n\n\n' +
    'CUSTODY\n' +
    '"OffenderManagerName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
    'COMMUNITY\n' +
    '"OffenderManagerName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
    'LICENSE\n' +
    '"OffenderManagerName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"'
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
      '"TeamName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
      'COMMUNITY\n' +
      '"TeamName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
      'LICENSE\n' +
      '"TeamName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
      'OVERALL: PERCENTAGE SPLIT OF CASES BY GRADE\n' +
      '"TeamName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n' +
      '"Test Team 1","PO",50,50,50,0,10,25,50,0,50\n' +
      '"Test Team 1","PSO",50,50,50,100,90,75,50,0,50\n' +
      '"Test Team 2","PO",50,80,75,70,10,62.5,50,0,66.66666666666666'
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
  '"LDUClusterName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
  'COMMUNITY\n' +
  '"LDUClusterName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
  'LICENSE\n' +
  '"LDUClusterName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
  'OVERALL: PERCENTAGE SPLIT OF CASES BY GRADE\n' +
  '"LDUClusterName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n' +
  '"Test LDU 1","PO",50,50,50,0,10,25,50,0,50\n' +
  '"Test LDU 1","PSO",50,50,50,100,90,75,50,0,50\n' +
  '"Test LDU 2","PO",50,80,75,70,10,62.5,50,0,66.66666666666666'
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
  '"DivisionName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
  'COMMUNITY\n' +
  '"DivisionName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
  'LICENSE\n' +
  '"DivisionName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
  'OVERALL: PERCENTAGE SPLIT OF CASES BY GRADE\n' +
  '"DivisionName","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n' +
  '"Test Region 1","PO",50,50,50,0,10,25,50,0,50\n' +
  '"Test Region 1","PSO",50,50,50,100,90,75,50,0,50\n' +
  '"Test Region 2","PO",50,80,75,70,10,62.5,50,0,66.66666666666666'
}

module.exports.OM_OVERVIEW_RESULT = {
  breadcrumbs:
  [{title: 'John Smith'},
  {title: 'Team 1'},
  {title: 'Test Cluster'}],
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
    capacity: 105,
    lduCluster: 'Test Cluster'
  }
}

module.exports.OM_OVERVIEW_CSV = {
  filename: 'John_Smith_Overview.csv',
  csv: '"LDU Cluster","Team Name","Grade Code","Capacity Percentage","Total Cases","Contracted Hours","Reduction Hours"\n' +
  '"Test Cluster","Team 1","PO",105,60,37,4'
}

module.exports.TEAM_OVERVIEW_RESULT = {
  breadcrumbs:
  [{title: 'Test Team'},
   {title: 'Test Cluster'}],
  overviewDetails:
  [ { name: 'John Smith',
    totalCases: 63,
    availablePoints: 190,
    totalPoints: 204,
    contractedHours: 37.5,
    reductionHours: 6,
    linkId: 2767,
    gradeCode: 'PO',
    capacityPercentage: 107.36842105263158,
    lduCluster: 'Test Cluster'},
  { name: 'Tony Test',
    totalCases: 63,
    availablePoints: 190,
    totalPoints: 203,
    contractedHours: 36.5,
    reductionHours: 6,
    linkId: 2771,
    gradeCode: 'PO',
    capacityPercentage: 106.84210526315789,
    teamName: 'Test Team',
    lduCluster: 'Test Cluster' }],
  title: 'Test Team'
}

module.exports.TEAM_OVERVIEW_CSV = {
  filename: 'Test_Team_Overview.csv',
  csv: '"LDU Cluster", "Team Name", "Offender Manager Name","Capacity Percentage","Capacity Points","Contracted Hours","Reduction Hours","Total Cases","Grade Code"\n' +
  '"Test Cluster","Test Team","John Smith",107.36842105263158,190,37.5,6,63,"PO"\n' +
  '"Test Cluster","Test Team","Tony Test",106.84210526315789,190,36.5,6,63,"PO"'
}

module.exports.LDU_OVERVIEW_RESULT = {
  breadcrumbs:
  [{title: 'Test Cluster'}],
  overviewDetails:
  [ { name: 'Team 1',
    totalCases: 315,
    availablePoints: 950,
    totalPoints: 1014,
    contractedHours: 175.5,
    reductionHours: 30,
    linkId: 1611,
    capacityPercentage: 106.73684210526315,
    lduCluster: 'Test Cluster' },
  { name: 'Team 4',
    totalCases: 315,
    availablePoints: 950,
    totalPoints: 1014,
    contractedHours: 175.5,
    reductionHours: 28,
    linkId: 1614,
    capacityPercentage: 106.73684210526315,
    lduCluster: 'Test Cluster' } ],
  title: 'Test LDU'
}

module.exports.LDU_OVERVIEW_CSV = {
  filename: 'Test_LDU_Overview.csv',
  csv: '"LDU Cluster","Team Name","Capacity Percentage","Capacity Points","Contracted Hours","Reduction Hours","Total Cases"\n' +
  '"Test Cluster","Team 1",106.73684210526315,950,175.5,30,315\n' +
  '"Test Cluster","Team 4",106.73684210526315,950,175.5,28,315'
}

module.exports.REGION_OVERVIEW_HEADINGS = '"LDU Cluster","Capacity Percentage","Capacity Points","Contracted Hours","Reduction Hours","Total Cases"'

module.exports.NATIONAL_OVERVIEW_HEADINGS = '"Division Name","Capacity Percentage","Capacity Points","Contracted Hours","Reduction Hours","Total Cases"'
