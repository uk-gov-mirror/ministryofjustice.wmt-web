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
    '"Offender Manager Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n' +
    '"John Smith","PO",9,18,12,6,9,6,3,0,189\n' +
    '"Tony Test","PO",9,18,12,6,9,6,3,0,189\n\n\n' +
    'CUSTODY\n' +
    '"Offender Manager Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
    'COMMUNITY\n' +
    '"Offender Manager Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
    'LICENSE\n' +
    '"Offender Manager Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"'
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
      '"Team Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
      'COMMUNITY\n' +
      '"Team Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
      'LICENSE\n' +
      '"Team Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
      'OVERALL: PERCENTAGE SPLIT OF CASES BY GRADE\n' +
      '"Team Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n' +
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
  '"LDU Cluster Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
  'COMMUNITY\n' +
  '"LDU Cluster Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
  'LICENSE\n' +
  '"LDU Cluster Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
  'OVERALL: PERCENTAGE SPLIT OF CASES BY GRADE\n' +
  '"LDU Cluster Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n' +
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
  '"Division Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
  'COMMUNITY\n' +
  '"Division Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
  'LICENSE\n' +
  '"Division Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n\n\n' +
  'OVERALL: PERCENTAGE SPLIT OF CASES BY GRADE\n' +
  '"Division Name","Grade","A","B1","B2","C1","C2","D1","D2","Untiered","Overall"\n' +
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
  csv: '"LDU Cluster","Team Name","Grade Code","Capacity Percentage","Total Cases","Contracted Hours","Reduction Hours"\n' +'"Test Cluster","Team 1","PO","105%",60,37,4'
}

module.exports.TEAM_OVERVIEW_RESULT = {
  breadcrumbs: 
  [{
      title: 'Team 1',
      link: '/probation/team/95',
      active: undefined },
  {
      title: 'LDU Cluster 1',
      link: '/probation/ldu/85',
      active: undefined },
  {
      title: 'Division 1',
      link: '/probation/region/43',
      active: undefined },
    { title: 'HMPPS', link: '/probation/hmpps/0', active: undefined } ],
 overviewDetails: 
  [ { lduCluster: 'LDU Cluster 1',
      teamName: 'Team 1',
      offenderManager: 'John Smith',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 219,
      contractedHours: 37.5,
      reductionHours: 6,
      gradeCode: 'PO',
      capacityPercentage: 115.26315789473685,
      remainingPoints: -29 },
    { lduCluster: 'LDU Cluster 1',
      teamName: 'Team 1',
      offenderManager: 'Tony Test',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 216,
      contractedHours: 37.5,
      reductionHours: 3,
      gradeCode: 'PSO',
      capacityPercentage: 113.68421052631578,
      remainingPoints: -26 },
    { lduCluster: 'LDU Cluster 1',
      teamName: 'Team 1',
      offenderManager: 'Jane Doe',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 222,
      contractedHours: 37.5,
      reductionHours: 1,
      gradeCode: 'PO',
      capacityPercentage: 116.8421052631579,
      remainingPoints: -32 },
    { lduCluster: 'LDU Cluster 1',
      teamName: 'Team 1',
      offenderManager: 'Marcin Martin',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 204,
      contractedHours: 37.5,
      reductionHours: 6,
      gradeCode: 'PSO',
      capacityPercentage: 107.36842105263158,
      remainingPoints: -14 },
    { lduCluster: 'LDU Cluster 1',
      teamName: 'Team 1',
      offenderManager: 'Courtney Larry',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 223,
      contractedHours: 37.5,
      reductionHours: 3,
      gradeCode: 'PO',
      capacityPercentage: 117.36842105263159,
      remainingPoints: -33 } ],
 title: 'Team 1',
 subTitle: 'Team' 
}

module.exports.TEAM_OVERVIEW_CSV = {
  filename: 'Team_1_Overview.csv',
  csv: '"LDU Cluster","Team Name","Offender Manager","Grade Code","Capacity Percentage","Capacity Points","Contracted Hours","Reduction Hours","Total Cases"\n"LDU Cluster 1","Team 1","John Smith","PO","115%",190,37.5,6,69\n"LDU Cluster 1","Team 1","Tony Test","PSO","113%",190,37.5,3,69\n"LDU Cluster 1","Team 1","Jane Doe","PO","116%",190,37.5,1,69\n"LDU Cluster 1","Team 1","Marcin Martin","PSO","107%",190,37.5,6,69\n"LDU Cluster 1","Team 1","Courtney Larry","PO","117%",190,37.5,3,69' 
}

module.exports.LDU_OVERVIEW_RESULT = {
  breadcrumbs: 
  [{
      title: 'LDU Cluster 1',
      link: '/probation/ldu/85',
      active: undefined },
  {
      title: 'Division 1',
      link: '/probation/region/43',
      active: undefined },
  { title: 'HMPPS', link: '/probation/hmpps/0', active: undefined } ],
 overviewDetails: 
  [ { lduCluster: 'LDU Cluster 1',
      teamName: 'Team 1',
      offenderManager: 'John Smith',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 219,
      contractedHours: 37.5,
      reductionHours: 6,
      gradeCode: 'PO',
      capacityPercentage: 115.26315789473685,
      remainingPoints: -29 },
    { lduCluster: 'LDU Cluster 1',
      teamName: 'Team 1',
      offenderManager: 'Tony Test',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 216,
      contractedHours: 37.5,
      reductionHours: 3,
      gradeCode: 'PSO',
      capacityPercentage: 113.68421052631578,
      remainingPoints: -26 },
    { lduCluster: 'LDU Cluster 1',
      teamName: 'Team 1',
      offenderManager: 'Jane Doe',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 222,
      contractedHours: 37.5,
      reductionHours: 1,
      gradeCode: 'PO',
      capacityPercentage: 116.8421052631579,
      remainingPoints: -32 },
    { lduCluster: 'LDU Cluster 1',
      teamName: 'Team 1',
      offenderManager: 'Marcin Martin',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 204,
      contractedHours: 37.5,
      reductionHours: 6,
      gradeCode: 'PSO',
      capacityPercentage: 107.36842105263158,
      remainingPoints: -14 },
    { lduCluster: 'LDU Cluster 1',
      teamName: 'Team 1',
      offenderManager: 'Courtney Larry',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 223,
      contractedHours: 37.5,
      reductionHours: 3,
      gradeCode: 'PO',
      capacityPercentage: 117.36842105263159,
      remainingPoints: -33 },
    { lduCluster: 'LDU Cluster 1',
      teamName: 'Team 4',
      offenderManager: 'Courtney Larry',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 224,
      contractedHours: 37.5,
      reductionHours: 6,
      gradeCode: 'PO',
      capacityPercentage: 117.89473684210525,
      remainingPoints: -34 },
    { lduCluster: 'LDU Cluster 1',
      teamName: 'Team 4',
      offenderManager: 'Marcin Martin',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 215,
      contractedHours: 37.5,
      reductionHours: 6,
      gradeCode: 'PSO',
      capacityPercentage: 113.1578947368421,
      remainingPoints: -25 },
    { lduCluster: 'LDU Cluster 1',
      teamName: 'Team 4',
      offenderManager: 'Jane Doe',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 202,
      contractedHours: 37.5,
      reductionHours: 4,
      gradeCode: 'PO',
      capacityPercentage: 106.3157894736842,
      remainingPoints: -12 },
    { lduCluster: 'LDU Cluster 1',
      teamName: 'Team 4',
      offenderManager: 'Tony Test',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 201,
      contractedHours: 37.5,
      reductionHours: 3,
      gradeCode: 'PSO',
      capacityPercentage: 105.78947368421052,
      remainingPoints: -11 },
    { lduCluster: 'LDU Cluster 1',
      teamName: 'Team 4',
      offenderManager: 'John Smith',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 223,
      contractedHours: 37.5,
      reductionHours: 3,
      gradeCode: 'PO',
      capacityPercentage: 117.36842105263159,
      remainingPoints: -33 } ],
 title: 'LDU Cluster 1',
 subTitle: 'LDU Cluster' 
}

module.exports.LDU_OVERVIEW_CSV = {
  filename: 'LDU_Cluster_1_Overview.csv',
  csv: '"LDU Cluster","Team Name","Offender Manager","Grade Code","Capacity Percentage","Capacity Points","Contracted Hours","Reduction Hours","Total Cases"\n"LDU Cluster 1","Team 1","John Smith","PO","115%",190,37.5,6,69\n"LDU Cluster 1","Team 1","Tony Test","PSO","113%",190,37.5,3,69\n"LDU Cluster 1","Team 1","Jane Doe","PO","116%",190,37.5,1,69\n"LDU Cluster 1","Team 1","Marcin Martin","PSO","107%",190,37.5,6,69\n"LDU Cluster 1","Team 1","Courtney Larry","PO","117%",190,37.5,3,69\n"LDU Cluster 1","Team 4","Courtney Larry","PO","117%",190,37.5,6,69\n"LDU Cluster 1","Team 4","Marcin Martin","PSO","113%",190,37.5,6,69\n"LDU Cluster 1","Team 4","Jane Doe","PO","106%",190,37.5,4,69\n"LDU Cluster 1","Team 4","Tony Test","PSO","105%",190,37.5,3,69\n"LDU Cluster 1","Team 4","John Smith","PO","117%",190,37.5,3,69'
}

module.exports.REGION_OVERVIEW_RESULT = {
  breadcrumbs: 
  [{
      title: 'Division 1',
      link: '/probation/region/43',
      active: undefined },
  { title: 'HMPPS', link: '/probation/hmpps/0', active: undefined } ],
 overviewDetails: 
  [ { regionName: 'Division 1',
      lduCluster: 'LDU Cluster 1',
      teamName: 'Team 1',
      offenderManager: 'John Smith',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 219,
      contractedHours: 37.5,
      reductionHours: 6,
      gradeCode: 'PO',
      capacityPercentage: 115.26315789473685,
      remainingPoints: -29 },
    { regionName: 'Division 1',
      lduCluster: 'LDU Cluster 1',
      teamName: 'Team 1',
      offenderManager: 'Tony Test',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 216,
      contractedHours: 37.5,
      reductionHours: 3,
      gradeCode: 'PSO',
      capacityPercentage: 113.68421052631578,
      remainingPoints: -26 },
    { regionName: 'Division 1',
      lduCluster: 'LDU Cluster 1',
      teamName: 'Team 1',
      offenderManager: 'Jane Doe',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 222,
      contractedHours: 37.5,
      reductionHours: 1,
      gradeCode: 'PO',
      capacityPercentage: 116.8421052631579,
      remainingPoints: -32 },
    { regionName: 'Division 1',
      lduCluster: 'LDU Cluster 1',
      teamName: 'Team 1',
      offenderManager: 'Marcin Martin',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 204,
      contractedHours: 37.5,
      reductionHours: 6,
      gradeCode: 'PSO',
      capacityPercentage: 107.36842105263158,
      remainingPoints: -14 },
    { regionName: 'Division 1',
      lduCluster: 'LDU Cluster 1',
      teamName: 'Team 1',
      offenderManager: 'Courtney Larry',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 223,
      contractedHours: 37.5,
      reductionHours: 3,
      gradeCode: 'PO',
      capacityPercentage: 117.36842105263159,
      remainingPoints: -33 },
    { regionName: 'Division 1',
      lduCluster: 'LDU Cluster 1',
      teamName: 'Team 4',
      offenderManager: 'Courtney Larry',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 224,
      contractedHours: 37.5,
      reductionHours: 6,
      gradeCode: 'PO',
      capacityPercentage: 117.89473684210525,
      remainingPoints: -34 },
    { regionName: 'Division 1',
      lduCluster: 'LDU Cluster 1',
      teamName: 'Team 4',
      offenderManager: 'Marcin Martin',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 215,
      contractedHours: 37.5,
      reductionHours: 6,
      gradeCode: 'PSO',
      capacityPercentage: 113.1578947368421,
      remainingPoints: -25 },
    { regionName: 'Division 1',
      lduCluster: 'LDU Cluster 1',
      teamName: 'Team 4',
      offenderManager: 'Jane Doe',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 202,
      contractedHours: 37.5,
      reductionHours: 4,
      gradeCode: 'PO',
      capacityPercentage: 106.3157894736842,
      remainingPoints: -12 },
    { regionName: 'Division 1',
      lduCluster: 'LDU Cluster 1',
      teamName: 'Team 4',
      offenderManager: 'Tony Test',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 201,
      contractedHours: 37.5,
      reductionHours: 3,
      gradeCode: 'PSO',
      capacityPercentage: 105.78947368421052,
      remainingPoints: -11 },
    { regionName: 'Division 1',
      lduCluster: 'LDU Cluster 1',
      teamName: 'Team 4',
      offenderManager: 'John Smith',
      totalCases: 69,
      availablePoints: 190,
      totalPoints: 223,
      contractedHours: 37.5,
      reductionHours: 3,
      gradeCode: 'PO',
      capacityPercentage: 117.36842105263159,
      remainingPoints: -33 } ],
 title: 'Division 1',
 subTitle: 'Division' 
}

module.exports.REGION_OVERVIEW_CSV = {
  filename: 'Division_1_Overview.csv',
  csv: '"Region Name","LDU Cluster","Team Name","Offender Manager","Grade Code","Capacity Percentage","Capacity Points","Contracted Hours","Reduction Hours","Total Cases"\n"Division 1","LDU Cluster 1","Team 1","John Smith","PO","115%",190,37.5,6,69\n"Division 1","LDU Cluster 1","Team 1","Tony Test","PSO","113%",190,37.5,3,69\n"Division 1","LDU Cluster 1","Team 1","Jane Doe","PO","116%",190,37.5,1,69\n"Division 1","LDU Cluster 1","Team 1","Marcin Martin","PSO","107%",190,37.5,6,69\n"Division 1","LDU Cluster 1","Team 1","Courtney Larry","PO","117%",190,37.5,3,69\n"Division 1","LDU Cluster 1","Team 4","Courtney Larry","PO","117%",190,37.5,6,69\n"Division 1","LDU Cluster 1","Team 4","Marcin Martin","PSO","113%",190,37.5,6,69\n"Division 1","LDU Cluster 1","Team 4","Jane Doe","PO","106%",190,37.5,4,69\n"Division 1","LDU Cluster 1","Team 4","Tony Test","PSO","105%",190,37.5,3,69\n"Division 1","LDU Cluster 1","Team 4","John Smith","PO","117%",190,37.5,3,69'
}

module.exports.NATIONAL_OVERVIEW_RESULT = {
  breadcrumbs: [{title: 'HMPPS', link: '/probation/hmpps/0', active: undefined } ],
  overviewDetails: 
   [ { regionName: 'Division 1',
       lduCluster: 'LDU Cluster 1',
       teamName: 'Team 1',
       offenderManager: 'John Smith',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 219,
       contractedHours: 37.5,
       reductionHours: 6,
       gradeCode: 'PO',
       capacityPercentage: 115.26315789473685,
       remainingPoints: -29 },
     { regionName: 'Division 1',
       lduCluster: 'LDU Cluster 1',
       teamName: 'Team 1',
       offenderManager: 'Tony Test',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 216,
       contractedHours: 37.5,
       reductionHours: 3,
       gradeCode: 'PSO',
       capacityPercentage: 113.68421052631578,
       remainingPoints: -26 },
     { regionName: 'Division 1',
       lduCluster: 'LDU Cluster 1',
       teamName: 'Team 1',
       offenderManager: 'Jane Doe',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 222,
       contractedHours: 37.5,
       reductionHours: 1,
       gradeCode: 'PO',
       capacityPercentage: 116.8421052631579,
       remainingPoints: -32 },
     { regionName: 'Division 1',
       lduCluster: 'LDU Cluster 1',
       teamName: 'Team 1',
       offenderManager: 'Marcin Martin',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 204,
       contractedHours: 37.5,
       reductionHours: 6,
       gradeCode: 'PSO',
       capacityPercentage: 107.36842105263158,
       remainingPoints: -14 },
     { regionName: 'Division 1',
       lduCluster: 'LDU Cluster 1',
       teamName: 'Team 1',
       offenderManager: 'Courtney Larry',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 223,
       contractedHours: 37.5,
       reductionHours: 3,
       gradeCode: 'PO',
       capacityPercentage: 117.36842105263159,
       remainingPoints: -33 },
     { regionName: 'Division 1',
       lduCluster: 'LDU Cluster 1',
       teamName: 'Team 4',
       offenderManager: 'Courtney Larry',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 224,
       contractedHours: 37.5,
       reductionHours: 6,
       gradeCode: 'PO',
       capacityPercentage: 117.89473684210525,
       remainingPoints: -34 },
     { regionName: 'Division 1',
       lduCluster: 'LDU Cluster 1',
       teamName: 'Team 4',
       offenderManager: 'Jane Doe',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 202,
       contractedHours: 37.5,
       reductionHours: 4,
       gradeCode: 'PO',
       capacityPercentage: 106.3157894736842,
       remainingPoints: -12 },
     { regionName: 'Division 1',
       lduCluster: 'LDU Cluster 1',
       teamName: 'Team 4',
       offenderManager: 'Marcin Martin',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 215,
       contractedHours: 37.5,
       reductionHours: 6,
       gradeCode: 'PSO',
       capacityPercentage: 113.1578947368421,
       remainingPoints: -25 },
     { regionName: 'Division 1',
       lduCluster: 'LDU Cluster 1',
       teamName: 'Team 4',
       offenderManager: 'John Smith',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 223,
       contractedHours: 37.5,
       reductionHours: 3,
       gradeCode: 'PO',
       capacityPercentage: 117.36842105263159,
       remainingPoints: -33 },
     { regionName: 'Division 1',
       lduCluster: 'LDU Cluster 1',
       teamName: 'Team 4',
       offenderManager: 'Tony Test',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 201,
       contractedHours: 37.5,
       reductionHours: 3,
       gradeCode: 'PSO',
       capacityPercentage: 105.78947368421052,
       remainingPoints: -11 },
     { regionName: 'Division 2',
       lduCluster: 'LDU Cluster 2',
       teamName: 'Team 2',
       offenderManager: 'Jane Doe',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 223,
       contractedHours: 37.5,
       reductionHours: 3,
       gradeCode: 'PO',
       capacityPercentage: 117.36842105263159,
       remainingPoints: -33 },
     { regionName: 'Division 2',
       lduCluster: 'LDU Cluster 2',
       teamName: 'Team 2',
       offenderManager: 'Tony Test',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 223,
       contractedHours: 37.5,
       reductionHours: 4,
       gradeCode: 'PSO',
       capacityPercentage: 117.36842105263159,
       remainingPoints: -33 },
     { regionName: 'Division 2',
       lduCluster: 'LDU Cluster 2',
       teamName: 'Team 2',
       offenderManager: 'John Smith',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 209,
       contractedHours: 37.5,
       reductionHours: 4,
       gradeCode: 'PO',
       capacityPercentage: 110.00000000000001,
       remainingPoints: -19 },
     { regionName: 'Division 2',
       lduCluster: 'LDU Cluster 2',
       teamName: 'Team 2',
       offenderManager: 'Marcin Martin',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 200,
       contractedHours: 37.5,
       reductionHours: 2,
       gradeCode: 'PSO',
       capacityPercentage: 105.26315789473684,
       remainingPoints: -10 },
     { regionName: 'Division 2',
       lduCluster: 'LDU Cluster 2',
       teamName: 'Team 2',
       offenderManager: 'Courtney Larry',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 217,
       contractedHours: 37.5,
       reductionHours: 3,
       gradeCode: 'PO',
       capacityPercentage: 114.21052631578948,
       remainingPoints: -27 },
     { regionName: 'Division 3',
       lduCluster: 'LDU Cluster 3',
       teamName: 'Team 3',
       offenderManager: 'Courtney Larry',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 214,
       contractedHours: 37.5,
       reductionHours: 2,
       gradeCode: 'PO',
       capacityPercentage: 112.63157894736841,
       remainingPoints: -24 },
     { regionName: 'Division 3',
       lduCluster: 'LDU Cluster 3',
       teamName: 'Team 3',
       offenderManager: 'Marcin Martin',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 223,
       contractedHours: 37.5,
       reductionHours: 1,
       gradeCode: 'PSO',
       capacityPercentage: 117.36842105263159,
       remainingPoints: -33 },
     { regionName: 'Division 3',
       lduCluster: 'LDU Cluster 3',
       teamName: 'Team 3',
       offenderManager: 'John Smith',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 204,
       contractedHours: 37.5,
       reductionHours: 6,
       gradeCode: 'PO',
       capacityPercentage: 107.36842105263158,
       remainingPoints: -14 },
     { regionName: 'Division 3',
       lduCluster: 'LDU Cluster 3',
       teamName: 'Team 3',
       offenderManager: 'Tony Test',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 208,
       contractedHours: 37.5,
       reductionHours: 1,
       gradeCode: 'PSO',
       capacityPercentage: 109.47368421052633,
       remainingPoints: -18 },
     { regionName: 'Division 3',
       lduCluster: 'LDU Cluster 3',
       teamName: 'Team 3',
       offenderManager: 'Jane Doe',
       totalCases: 69,
       availablePoints: 190,
       totalPoints: 201,
       contractedHours: 37.5,
       reductionHours: 2,
       gradeCode: 'PO',
       capacityPercentage: 105.78947368421052,
       remainingPoints: -11 } ],
  title: 'HMPPS',
  subTitle: 'National' 
}

module.exports.NATIONAL_OVERVIEW_CSV = {
  filename: 'HMPPS_Overview.csv',
  csv: '"Region Name","LDU Cluster","Team Name","Offender Manager","Grade Code","Capacity Percentage","Capacity Points","Contracted Hours","Reduction Hours","Total Cases"\n"Division 1","LDU Cluster 1","Team 1","John Smith","PO","115%",190,37.5,6,69\n"Division 1","LDU Cluster 1","Team 1","Tony Test","PSO","113%",190,37.5,3,69\n"Division 1","LDU Cluster 1","Team 1","Jane Doe","PO","116%",190,37.5,1,69\n"Division 1","LDU Cluster 1","Team 1","Marcin Martin","PSO","107%",190,37.5,6,69\n"Division 1","LDU Cluster 1","Team 1","Courtney Larry","PO","117%",190,37.5,3,69\n"Division 1","LDU Cluster 1","Team 4","Courtney Larry","PO","117%",190,37.5,6,69\n"Division 1","LDU Cluster 1","Team 4","Jane Doe","PO","106%",190,37.5,4,69\n"Division 1","LDU Cluster 1","Team 4","Marcin Martin","PSO","113%",190,37.5,6,69\n"Division 1","LDU Cluster 1","Team 4","John Smith","PO","117%",190,37.5,3,69\n"Division 1","LDU Cluster 1","Team 4","Tony Test","PSO","105%",190,37.5,3,69\n"Division 2","LDU Cluster 2","Team 2","Jane Doe","PO","117%",190,37.5,3,69\n"Division 2","LDU Cluster 2","Team 2","Tony Test","PSO","117%",190,37.5,4,69\n"Division 2","LDU Cluster 2","Team 2","John Smith","PO","110%",190,37.5,4,69\n"Division 2","LDU Cluster 2","Team 2","Marcin Martin","PSO","105%",190,37.5,2,69\n"Division 2","LDU Cluster 2","Team 2","Courtney Larry","PO","114%",190,37.5,3,69\n"Division 3","LDU Cluster 3","Team 3","Courtney Larry","PO","112%",190,37.5,2,69\n"Division 3","LDU Cluster 3","Team 3","Marcin Martin","PSO","117%",190,37.5,1,69\n"Division 3","LDU Cluster 3","Team 3","John Smith","PO","107%",190,37.5,6,69\n"Division 3","LDU Cluster 3","Team 3","Tony Test","PSO","109%",190,37.5,1,69\n"Division 3","LDU Cluster 3","Team 3","Jane Doe","PO","105%",190,37.5,2,69'
}
