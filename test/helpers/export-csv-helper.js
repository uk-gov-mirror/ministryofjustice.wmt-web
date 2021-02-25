const dateFormatter = require('../../app/services/date-formatter')

const replaceSpaces = / /g
const timestamp = dateFormatter.formatDate(new Date(), 'DD MM YYYY THH mm').toString()

module.exports.TEAM_CASELOAD_RESULT = {
  title: 'Test Team',
  caseloadDetails: {
    overallCaseloadDetails: [
      { linkId: 2767, name: 'John Smith', grade: 'PO', a: 9, b1: 18, b2: 12, c1: 6, c2: 9, d1: 6, d2: 3, e: 2, f: 1, g: 0, untiered: 0, totalCases: 189, caseType: 'COMMUNITY' },
      { linkId: 2771, name: 'Tony Test', grade: 'PO', a: 9, b1: 18, b2: 12, c1: 6, c2: 9, d1: 6, d2: 3, e: 2, f: 1, g: 0, untiered: 0, totalCases: 189, caseType: 'COMMUNITY' }
    ],
    custodyCaseloadDetails: [],
    communityCaseloadDetails: [],
    licenseCaseloadDetails: []
  }
}

module.exports.TEAM_CASELOAD_CSV = {
  filename: ('Test_Team_Caseload ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: 'OVERALL\n' +
    '"Offender Manager Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"\n' +
    '"John Smith","PO",9,18,12,6,9,6,3,2,1,0,0,189\n' +
    '"Tony Test","PO",9,18,12,6,9,6,3,2,1,0,0,189\n\n\n' +
    'CUSTODY\n' +
    '"Offender Manager Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"\n\n\n' +
    'COMMUNITY\n' +
    '"Offender Manager Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"\n\n\n' +
    'LICENSE\n' +
    '"Offender Manager Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"'
}

module.exports.ARMS_EXPORT_CSV = {
  filename: ('Test_Arms_Export ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region Name","Probation Delivery Unit","Team Name","Assessment Date","CRN","Offender Manager Name","Offender Manager Grade","Sentence Type","Sentence or Release Date","Completion Date"\n' +
    '"NPS North West","Cumbria","NPS - Carlisle 1","4-10-2018","CASEREF30134","A.N. Offender Manager CMBY478NPSM","PO","Licence","14-9-2018","21-9-2018"\n' +
    '"NPS North West","Cumbria","NPS - Carlisle 1","9-10-2018","CASEREF30154","A.N. Offender Manager CMBY478NPSM","PO","Community","22-2-2017","22-8-2017"\n' +
    '"NPS North West","Cumbria","NPS - Carlisle 1","28-9-2018","CASEREF30098","A.N. Offender Manager CMBE297NPSM","PO","Community","1-1-1800","1-10-1800"\n' +
    '"NPS North West","Cumbria","Rehabilitation","10-9-2018","CASEREF30027","A.N. Offender Manager N01B324NPSM","PO","Community","25-7-2018","01-01-2019"\n' +
    '"NPS North West","Cumbria","Rehabilitation","19-9-2018","CASEREF30065","A.N. Offender Manager N01B324NPSM","PO","Community","16-12-2016","16-12-2020"'
}

module.exports.ARMS_EXPORT_RESULT = {
  title: 'ARMS Export',
  armsExportDetails:
  [{
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'NPS - Carlisle 1',
    assessmentDate: '4-10-2018',
    CRN: 'CASEREF30134',
    omName: 'A.N. Offender Manager CMBY478NPSM',
    omGrade: 'PO',
    sentencetype: 'Licence',
    releaseDate: '14-9-2018',
    completedDate: '21-9-2018'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'NPS - Carlisle 1',
    assessmentDate: '9-10-2018',
    CRN: 'CASEREF30154',
    omName: 'A.N. Offender Manager CMBY478NPSM',
    omGrade: 'PO',
    sentencetype: 'Community',
    releaseDate: '22-2-2017',
    completedDate: '22-8-2017'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'NPS - Carlisle 1',
    assessmentDate: '28-9-2018',
    CRN: 'CASEREF30098',
    omName: 'A.N. Offender Manager CMBE297NPSM',
    omGrade: 'PO',
    sentencetype: 'Community',
    releaseDate: '1-1-1800',
    completedDate: '1-10-1800'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'Rehabilitation',
    assessmentDate: '10-9-2018',
    CRN: 'CASEREF30027',
    omName: 'A.N. Offender Manager N01B324NPSM',
    omGrade: 'PO',
    sentencetype: 'Community',
    releaseDate: '25-7-2018',
    completedDate: '01-01-2019'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'Rehabilitation',
    assessmentDate: '19-9-2018',
    CRN: 'CASEREF30065',
    omName: 'A.N. Offender Manager N01B324NPSM',
    omGrade: 'PO',
    sentencetype: 'Community',
    releaseDate: '16-12-2016',
    completedDate: '16-12-2020'
  }]
}

module.exports.PERCENTAGE_WORKLOAD_EXPORT_RESULT = {
  title: 'Percentage Workload Breakdown Export',
  percentageWorkloadExportDetails:
  [{
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'NPS - Carlisle 1',
    omName: 'A.N. Offender Manager CMBY478NPSM',
    omGrade: 'PO',
    capacity: '100%',
    caseContribution: '99%',
    cmsContribution: '98%',
    gsContribution: '97%',
    armsContribution: '96%',
    paromsContribution: '95%',
    sdrContribution: '94%',
    fdrContribution: '93%',
    contractedHours: 37,
    reductionHours: 10
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'NPS - Carlisle 1',
    omName: 'A.N. Offender Manager CMBY478NPSM',
    omGrade: 'PO',
    capacity: '99%',
    caseContribution: '98%',
    cmsContribution: '97%',
    gsContribution: '96%',
    armsContribution: '95%',
    paromsContribution: '94%',
    sdrContribution: '93%',
    fdrContribution: '92%',
    contractedHours: 36,
    reductionHours: 9
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'NPS - Carlisle 1',
    omName: 'A.N. Offender Manager CMBE297NPSM',
    omGrade: 'PO',
    capacity: '98%',
    caseContribution: '97%',
    cmsContribution: '96%',
    gsContribution: '95%',
    armsContribution: '94%',
    paromsContribution: '93%',
    sdrContribution: '92%',
    fdrContribution: '91%',
    contractedHours: 35,
    reductionHours: 8
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'Rehabilitation',
    omName: 'A.N. Offender Manager N01B324NPSM',
    omGrade: 'PO',
    capacity: '97%',
    caseContribution: '96%',
    cmsContribution: '95%',
    gsContribution: '94%',
    armsContribution: '93%',
    paromsContribution: '92%',
    sdrContribution: '91%',
    fdrContribution: '90%',
    contractedHours: 34,
    reductionHours: 7
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'Rehabilitation',
    omName: 'A.N. Offender Manager N01B324NPSM',
    omGrade: 'PO',
    capacity: '96%',
    caseContribution: '95%',
    cmsContribution: '94%',
    gsContribution: '93%',
    armsContribution: '92%',
    paromsContribution: '91%',
    sdrContribution: '90%',
    fdrContribution: '89%',
    contractedHours: 33,
    reductionHours: 6
  }]
}

module.exports.PERCENTAGE_WORKLOAD_EXPORT_CSV = {
  filename: ('Test_Percentage_Workload_Export ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region Name","Probation Delivery Unit","Team Name","Offender Manager Name","Offender Manager Grade","Contracted Hours","Reduction Hours","Capacity","Case Contribution","CMS Contribution","GS Contribution","ARMS Contribution","PAROMS Contribution","SDR Contribution","FDR Contribution"\n' +
    '"NPS North West","Cumbria","NPS - Carlisle 1","A.N. Offender Manager CMBY478NPSM","PO",37,10,"100%","99%","98%","97%","96%","95%","94%","93%"\n' +
    '"NPS North West","Cumbria","NPS - Carlisle 1","A.N. Offender Manager CMBY478NPSM","PO",36,9,"99%","98%","97%","96%","95%","94%","93%","92%"\n' +
    '"NPS North West","Cumbria","NPS - Carlisle 1","A.N. Offender Manager CMBE297NPSM","PO",35,8,"98%","97%","96%","95%","94%","93%","92%","91%"\n' +
    '"NPS North West","Cumbria","Rehabilitation","A.N. Offender Manager N01B324NPSM","PO",34,7,"97%","96%","95%","94%","93%","92%","91%","90%"\n' +
    '"NPS North West","Cumbria","Rehabilitation","A.N. Offender Manager N01B324NPSM","PO",33,6,"96%","95%","94%","93%","92%","91%","90%","89%"'
}

module.exports.CASE_DETAILS_EXPORT_CSV = {
  filename: ('Test_Case_Details_Export ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region Name","Probation Delivery Unit","Team Name","Tier Code","Row Type","CRN","Case Type","Offender Manager Name","Grade Code"\n' +
  '"NPS North West","Cheshire","Crewe NPS OMU","D2","N","CASEREF5448","COMMUNITY","A.N. Offender Manager N01CA1U","DMY"\n' +
  '"NPS North West","Cheshire","Warrington NPS OMU","B1","N","CASEREF67","COMMUNITY","A.N. Offender Manager CHSZ943NPSM","PO"\n' +
    '"NPS North West","Cheshire","Warrington NPS OMU","C1","N","CASEREF2413","COMMUNITY","A.N. Offender Manager CHSZ943NPSM","PO"\n' +
    '"NPS North West","Cheshire","Warrington NPS OMU","C1","N","CASEREF2479","COMMUNITY","A.N. Offender Manager CHSZ943NPSM","PO"\n' +
    '"NPS North West","Cheshire","Warrington NPS OMU","C1","N","CASEREF6008","COMMUNITY","A.N. Offender Manager CHSZ943NPSM","PO"'
}

module.exports.CASE_DETAILS_EXPORT_RESULT = {
  title: 'Case Details Export',
  caseDetailsExportDetails:
  [{
    regionName: 'NPS North West',
    lduName: 'Cheshire',
    teamName: 'Crewe NPS OMU',
    tierCode: 'D2',
    rowType: 'N',
    caseReferenceNo: 'CASEREF5448',
    caseType: 'COMMUNITY',
    offenderManagerName: 'A.N. Offender Manager N01CA1U',
    gradeCode: 'DMY'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cheshire',
    teamName: 'Warrington NPS OMU',
    tierCode: 'B1',
    rowType: 'N',
    caseReferenceNo: 'CASEREF67',
    caseType: 'COMMUNITY',
    offenderManagerName: 'A.N. Offender Manager CHSZ943NPSM',
    gradeCode: 'PO'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cheshire',
    teamName: 'Warrington NPS OMU',
    tierCode: 'C1',
    rowType: 'N',
    caseReferenceNo: 'CASEREF2413',
    caseType: 'COMMUNITY',
    offenderManagerName: 'A.N. Offender Manager CHSZ943NPSM',
    gradeCode: 'PO'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cheshire',
    teamName: 'Warrington NPS OMU',
    tierCode: 'C1',
    rowType: 'N',
    caseReferenceNo: 'CASEREF2479',
    caseType: 'COMMUNITY',
    offenderManagerName: 'A.N. Offender Manager CHSZ943NPSM',
    gradeCode: 'PO'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cheshire',
    teamName: 'Warrington NPS OMU',
    tierCode: 'C1',
    rowType: 'N',
    caseReferenceNo: 'CASEREF6008',
    caseType: 'COMMUNITY',
    offenderManagerName: 'A.N. Offender Manager CHSZ943NPSM',
    gradeCode: 'PO'
  }]
}

module.exports.CMS_EXPORT_CSV = {
  filename: ('Test_CMS_Export ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Contact Region Name","Contact Probation Delivery Unit","Contact Team Name","Contact Date","Contact Name","Contact Grade","OM Region Name","OM Probation Delivery Unit","OM Team Name","CRN","OM Name","OM Grade","Contact Type Description","Contact Code","Contact Points","OM Points"\n' +
  '"NPS North West","Lancashire NW","Blackpool OMU C - NPS","24-9-2018","A.N. Offender Manager N01D068NPSQ","PSO","NPS North West","Lancashire NW","Blackpool OMU C - NPS","CASEREF1000","A.N. Offender Manager LCSE771NPSM","PO","CMS - Case Related Communication - High","CMS30",18,-18\n' +
    '"NPS North West","Lancashire NW","Blackpool OMU C - NPS","24-9-2018","A.N. Offender Manager N01D068NPSQ","PSO","NPS North West","Lancashire NW","Blackpool OMU C - NPS","CASEREF1001","A.N. Offender Manager LCSE771NPSM","PO","CMS - Case Related Communication - High","CMS30",18,-18\n' +
    '"NPS North West","Lancashire NW","Blackpool OMU C - NPS","24-9-2018","A.N. Offender Manager N01D068NPSQ","PSO","NPS North West","Lancashire NW","Blackpool OMU C - NPS","CASEREF1002","A.N. Offender Manager LCSE771NPSM","PO","CMS - Case Related Communication - High","CMS30",18,-18\n' +
    '"NPS North West","Lancashire NW","Blackpool OMU C - NPS","4-10-2018","A.N. Offender Manager N01D068NPSQ","PSO","NPS North West","Lancashire NW","Blackpool OMU C - NPS","CASEREF1003","A.N. Offender Manager LCSE771NPSM","PO","CMS - Case Related Communication - Low","CMS30",5,-5\n' +
    '"NPS North West","Lancashire NW","Blackpool OMU C - NPS","4-10-2018","A.N. Offender Manager N01D068NPSQ","PSO","NPS North West","Lancashire NW","Blackpool OMU C - NPS","CASEREF1004","A.N. Offender Manager LCSE771NPSM","PO","CMS - Case Related Communication - Low","CMS30",5,-5'
}

module.exports.CMS_EXPORT_RESULT = {
  title: 'Case Details Export',
  cmsExportDetails:
  [{
    contactRegionName: 'NPS North West',
    contactLduName: 'Lancashire NW',
    contactTeamName: 'Blackpool OMU C - NPS',
    contactDate: '24-9-2018',
    contactName: 'A.N. Offender Manager N01D068NPSQ',
    contactGradeCode: 'PSO',
    omRegionName: 'NPS North West',
    omLduName: 'Lancashire NW',
    omTeamName: 'Blackpool OMU C - NPS',
    contactId: 1659864416,
    caseRefNo: 'CASEREF1000',
    omName: 'A.N. Offender Manager LCSE771NPSM',
    omGradeCode: 'PO',
    contactDescription: 'CMS - Case Related Communication - High',
    contactCode: 'CMS30',
    contactPoints: 18,
    omPoints: -18
  },
  {
    contactRegionName: 'NPS North West',
    contactLduName: 'Lancashire NW',
    contactTeamName: 'Blackpool OMU C - NPS',
    contactDate: '24-9-2018',
    contactName: 'A.N. Offender Manager N01D068NPSQ',
    contactGradeCode: 'PSO',
    omRegionName: 'NPS North West',
    omLduName: 'Lancashire NW',
    omTeamName: 'Blackpool OMU C - NPS',
    contactId: 1659864416,
    caseRefNo: 'CASEREF1001',
    omName: 'A.N. Offender Manager LCSE771NPSM',
    omGradeCode: 'PO',
    contactDescription: 'CMS - Case Related Communication - High',
    contactCode: 'CMS30',
    contactPoints: 18,
    omPoints: -18
  },
  {
    contactRegionName: 'NPS North West',
    contactLduName: 'Lancashire NW',
    contactTeamName: 'Blackpool OMU C - NPS',
    contactDate: '24-9-2018',
    contactName: 'A.N. Offender Manager N01D068NPSQ',
    contactGradeCode: 'PSO',
    omRegionName: 'NPS North West',
    omLduName: 'Lancashire NW',
    omTeamName: 'Blackpool OMU C - NPS',
    contactId: 1659864416,
    caseRefNo: 'CASEREF1002',
    omName: 'A.N. Offender Manager LCSE771NPSM',
    omGradeCode: 'PO',
    contactDescription: 'CMS - Case Related Communication - High',
    contactCode: 'CMS30',
    contactPoints: 18,
    omPoints: -18
  },
  {
    contactRegionName: 'NPS North West',
    contactLduName: 'Lancashire NW',
    contactTeamName: 'Blackpool OMU C - NPS',
    contactDate: '4-10-2018',
    contactName: 'A.N. Offender Manager N01D068NPSQ',
    contactGradeCode: 'PSO',
    omRegionName: 'NPS North West',
    omLduName: 'Lancashire NW',
    omTeamName: 'Blackpool OMU C - NPS',
    contactId: 1660958873,
    caseRefNo: 'CASEREF1003',
    omName: 'A.N. Offender Manager LCSE771NPSM',
    omGradeCode: 'PO',
    contactDescription: 'CMS - Case Related Communication - Low',
    contactCode: 'CMS30',
    contactPoints: 5,
    omPoints: -5
  },
  {
    contactRegionName: 'NPS North West',
    contactLduName: 'Lancashire NW',
    contactTeamName: 'Blackpool OMU C - NPS',
    contactDate: '4-10-2018',
    contactName: 'A.N. Offender Manager N01D068NPSQ',
    contactGradeCode: 'PSO',
    omRegionName: 'NPS North West',
    omLduName: 'Lancashire NW',
    omTeamName: 'Blackpool OMU C - NPS',
    contactId: 1660958873,
    caseRefNo: 'CASEREF1004',
    omName: 'A.N. Offender Manager LCSE771NPSM',
    omGradeCode: 'PO',
    contactDescription: 'CMS - Case Related Communication - Low',
    contactCode: 'CMS30',
    contactPoints: 5,
    omPoints: -5
  }]
}

module.exports.GS_EXPORT_CSV = {
  filename: ('Test_Group_Supervision_Export ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region Name","Probation Delivery Unit","Team Name","Contact Date","CRN","Offender Manager Name","Offender Manager Grade","Contact Type Description","Contact Code","Points"\n' +
  '"NPS North West","Lancashire SE","NPS - Burnley 1","10-10-2018","GS2000","A.N. Offender Manager N01B320NPSM","PO","GS Employment session NS","NGS006",-15\n' +
    '"NPS North West","Lancashire SE","NPS - Burnley 1","10-10-2018","GS2001","A.N. Offender Manager N01B320NPSM","PO","GS Employment session NS","NGS006",-15\n' +
    '"NPS North West","Lancashire SE","NPS - Burnley 2","10-10-2018","GS2002","A.N. Offender Manager N01C411NPSN","PO","GS Employment session NS","NGS006",-15\n' +
    '"NPS North West","Lancashire SE","NPS - Burnley 2","10-10-2018","GS2003","A.N. Offender Manager N01B911NPSM","PO","GS Employment session NS","NGS006",-15\n' +
    '"NPS North West","Lancashire SE","NPS - Burnley 2","10-10-2018","GS2004","A.N. Offender Manager N01C411NPSN","PO","GS Employment session NS","NGS006",-15'
}

module.exports.GS_EXPORT_RESULT = {
  title: 'Group Supervision Export',
  gsExportDetails:
  [{
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Burnley 1',
    contactDate: '10-10-2018',
    caseRefNo: 'GS2000',
    contactId: 1660883167,
    omName: 'A.N. Offender Manager N01B320NPSM',
    omGradeCode: 'PO',
    contactDescription: 'GS Employment session NS',
    contactCode: 'NGS006',
    points: -15
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Burnley 1',
    contactDate: '10-10-2018',
    caseRefNo: 'GS2001',
    contactId: 1660858807,
    omName: 'A.N. Offender Manager N01B320NPSM',
    omGradeCode: 'PO',
    contactDescription: 'GS Employment session NS',
    contactCode: 'NGS006',
    points: -15
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Burnley 2',
    contactDate: '10-10-2018',
    caseRefNo: 'GS2002',
    contactId: 1661654096,
    omName: 'A.N. Offender Manager N01C411NPSN',
    omGradeCode: 'PO',
    contactDescription: 'GS Employment session NS',
    contactCode: 'NGS006',
    points: -15
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Burnley 2',
    contactDate: '10-10-2018',
    caseRefNo: 'GS2003',
    contactId: 1660908486,
    omName: 'A.N. Offender Manager N01B911NPSM',
    omGradeCode: 'PO',
    contactDescription: 'GS Employment session NS',
    contactCode: 'NGS006',
    points: -15
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Burnley 2',
    contactDate: '10-10-2018',
    caseRefNo: 'GS2004',
    contactId: 1660902791,
    omName: 'A.N. Offender Manager N01C411NPSN',
    omGradeCode: 'PO',
    contactDescription: 'GS Employment session NS',
    contactCode: 'NGS006',
    points: -15
  }]
}

module.exports.SUSPENDED_LIFER_CSV = {
  filename: ('Test_Suspended_Lifer_Export ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region Name","Probation Delivery Unit","Team Name","Tier Code","Row Type","CRN","Case Type","Offender Manager Name","Grade Code","In Custody?","Register Level","Register Category","Register Category Description","Registration Date"\n' +
  '"NPS North West","Lancashire SE","NPS - Blackburn 2","D2","Suspended Lifer","N144966","LICENSE","Test Forename 511 Test Surname 511","PSO","No","L2","LF01","Lifer - IPP","28/02/2019"\n' +
  '"NPS North West","Lancashire SE","NPS - Blackburn 2","D2","Suspended Lifer","N145304","LICENSE","Test Forename 511 Test Surname 511","PSO","No","L2","LF03","Lifer - Life Imprisonment","19/12/1990"\n' +
  '"NPS North West","Lancashire SE","NPS - Blackburn 2","D2","Suspended Lifer","N146588","LICENSE","Test Forename 511 Test Surname 511","PSO","No","L2","LF03","Lifer - Life Imprisonment","28/05/1999"\n' +
  '"NPS North West","Lancashire SE","NPS - Blackburn 2","D2","Suspended Lifer","N148080","LICENSE","Test Forename 511 Test Surname 511","PSO","No","L2","LF03","Lifer - Life Imprisonment","14/02/2019"\n' +
  '"NPS North West","Lancashire SE","NPS - Blackburn 2","D2","Suspended Lifer","N148392","LICENSE","Test Forename 511 Test Surname 511","PSO","No","L2","LF03","Lifer - Life Imprisonment","14/02/2019"'
}

module.exports.SUSPENDED_LIFER_EXPORT_RESULT = {
  title: 'Suspended Lifers Export',
  suspendedLiferExportDetails:
  [{
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Blackburn 2',
    tierCode: 'D2',
    rowType: 'Suspended Lifer',
    caseReferenceNo: 'N144966',
    caseType: 'LICENSE',
    offenderManagerName: 'Test Forename 511 Test Surname 511',
    gradeCode: 'PSO',
    inCustody: 'No',
    registerLevel: 'L2',
    registerCategory: 'LF01',
    registerCategoryDescription: 'Lifer - IPP',
    registrationDate: '28/02/2019'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Blackburn 2',
    tierCode: 'D2',
    rowType: 'Suspended Lifer',
    caseReferenceNo: 'N145304',
    caseType: 'LICENSE',
    offenderManagerName: 'Test Forename 511 Test Surname 511',
    gradeCode: 'PSO',
    inCustody: 'No',
    registerLevel: 'L2',
    registerCategory: 'LF03',
    registerCategoryDescription: 'Lifer - Life Imprisonment',
    registrationDate: '19/12/1990'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Blackburn 2',
    tierCode: 'D2',
    rowType: 'Suspended Lifer',
    caseReferenceNo: 'N146588',
    caseType: 'LICENSE',
    offenderManagerName: 'Test Forename 511 Test Surname 511',
    gradeCode: 'PSO',
    inCustody: 'No',
    registerLevel: 'L2',
    registerCategory: 'LF03',
    registerCategoryDescription: 'Lifer - Life Imprisonment',
    registrationDate: '28/05/1999'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Blackburn 2',
    tierCode: 'D2',
    rowType: 'Suspended Lifer',
    caseReferenceNo: 'N148080',
    caseType: 'LICENSE',
    offenderManagerName: 'Test Forename 511 Test Surname 511',
    gradeCode: 'PSO',
    inCustody: 'No',
    registerLevel: 'L2',
    registerCategory: 'LF03',
    registerCategoryDescription: 'Lifer - Life Imprisonment',
    registrationDate: '14/02/2019'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Blackburn 2',
    tierCode: 'D2',
    rowType: 'Suspended Lifer',
    caseReferenceNo: 'N148392',
    caseType: 'LICENSE',
    offenderManagerName: 'Test Forename 511 Test Surname 511',
    gradeCode: 'PSO',
    inCustody: 'No',
    registerLevel: 'L2',
    registerCategory: 'LF03',
    registerCategoryDescription: 'Lifer - Life Imprisonment',
    registrationDate: '14/02/2019'
  }]
}

module.exports.LDU_CASELOAD_RESULT = {
  title: 'Probation Delivery Unit 2',
  subTitle: 'Probation Delivery Unit',
  caseloadDetails:
  {
    overallCaseloadDetails:
  {
    details:
  [{
    linkId: 71,
    name: 'Team 2',
    grades:
    [{
      grade: 'PO',
      a: 33,
      b1: 33,
      b2: 24,
      c1: 27,
      c2: 21,
      d1: 27,
      d2: 24,
      e: 2,
      f: 1,
      g: 0,
      untiered: 18,
      totalCases: 207
    },
    {
      grade: 'PSO',
      a: 22,
      b1: 22,
      b2: 16,
      c1: 18,
      c2: 14,
      d1: 18,
      d2: 16,
      e: 2,
      f: 1,
      g: 0,
      untiered: 12,
      totalCases: 138
    }]
  }],
    totals:
    {
      PO:
    {
      grade: 'PO',
      a: 33,
      b1: 33,
      b2: 24,
      c1: 27,
      c2: 21,
      d1: 27,
      d2: 24,
      e: 2,
      f: 1,
      g: 0,
      untiered: 18,
      totalCases: 207,
      numberOfType: 1
    },
      PSO:
      {
        grade: 'PSO',
        a: 22,
        b1: 22,
        b2: 16,
        c1: 18,
        c2: 14,
        d1: 18,
        d2: 16,
        e: 2,
        f: 1,
        g: 0,
        untiered: 12,
        totalCases: 138,
        numberOfType: 1
      }
    },
    detailsPercentages:
    [{
      linkId: 71,
      name: 'Team 2',
      grades:
      [{
        grade: 'PO',
        a: 60,
        b1: 60,
        b2: 60,
        c1: 60,
        c2: 60,
        d1: 60,
        d2: 60,
        e: 0,
        f: 0,
        g: 0,
        untiered: 60,
        totalCases: 60
      },
      {
        grade: 'PSO',
        a: 40,
        b1: 40,
        b2: 40,
        c1: 40,
        c2: 40,
        d1: 40,
        d2: 40,
        e: 0,
        f: 0,
        g: 0,
        untiered: 40,
        totalCases: 40
      }]
    }],
    percentageTotals:
    {
      PO:
    {
      grade: 'PO',
      a: 60,
      b1: 60,
      b2: 60,
      c1: 60,
      c2: 60,
      d1: 60,
      d2: 60,
      e: 0,
      f: 0,
      g: 0,
      untiered: 60,
      totalCases: 60,
      numberOfType: 1
    },
      PSO:
      {
        grade: 'PSO',
        a: 40,
        b1: 40,
        b2: 40,
        c1: 40,
        c2: 40,
        d1: 40,
        d2: 40,
        e: 0,
        f: 0,
        g: 0,
        untiered: 40,
        totalCases: 40,
        numberOfType: 1
      }
    }
  },
    communityCaseloadDetails:
    {
      details:
    [{
      linkId: 71,
      name: 'Team 2',
      grades:
      [{
        grade: 'PO',
        a: 9,
        b1: 18,
        b2: 12,
        c1: 6,
        c2: 9,
        d1: 6,
        d2: 3,
        e: 2,
        f: 1,
        g: 0,
        untiered: 0,
        totalCases: 63
      },
      {
        grade: 'PSO',
        a: 6,
        b1: 12,
        b2: 8,
        c1: 4,
        c2: 6,
        d1: 4,
        d2: 2,
        e: 2,
        f: 1,
        g: 0,
        untiered: 0,
        totalCases: 42
      }]
    }],
      totals:
      {
        PO:
      {
        grade: 'PO',
        a: 9,
        b1: 18,
        b2: 12,
        c1: 6,
        c2: 9,
        d1: 6,
        d2: 3,
        e: 2,
        f: 1,
        g: 0,
        untiered: 0,
        totalCases: 63,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a: 6,
          b1: 12,
          b2: 8,
          c1: 4,
          c2: 6,
          d1: 4,
          d2: 2,
          e: 2,
          f: 1,
          g: 0,
          untiered: 0,
          totalCases: 42,
          numberOfType: 1
        }
      },
      detailsPercentages:
      [{
        linkId: 71,
        name: 'Team 2',
        grades:
        [{
          grade: 'PO',
          a: 60,
          b1: 60,
          b2: 60,
          c1: 60,
          c2: 60,
          d1: 60,
          d2: 60,
          e: 0,
          f: 0,
          g: 0,
          untiered: 0,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 0,
          totalCases: 40
        }]
      }],
      percentageTotals:
      {
        PO:
      {
        grade: 'PO',
        a: 60,
        b1: 60,
        b2: 60,
        c1: 60,
        c2: 60,
        d1: 60,
        d2: 60,
        e: 0,
        f: 0,
        g: 0,
        untiered: 0,
        totalCases: 60,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 0,
          totalCases: 40,
          numberOfType: 1
        }
      }
    },
    custodyCaseloadDetails:
    {
      details:
    [{
      linkId: 71,
      name: 'Team 2',
      grades:
      [{
        grade: 'PO',
        a: 18,
        b1: 12,
        b2: 6,
        c1: 12,
        c2: 6,
        d1: 9,
        d2: 3,
        e: 2,
        f: 1,
        g: 0,
        untiered: 3,
        totalCases: 69
      },
      {
        grade: 'PSO',
        a: 12,
        b1: 8,
        b2: 4,
        c1: 8,
        c2: 4,
        d1: 6,
        d2: 2,
        e: 2,
        f: 1,
        g: 0,
        untiered: 2,
        totalCases: 46
      }]
    }],
      totals:
      {
        PO:
      {
        grade: 'PO',
        a: 18,
        b1: 12,
        b2: 6,
        c1: 12,
        c2: 6,
        d1: 9,
        d2: 3,
        e: 2,
        f: 1,
        g: 0,
        untiered: 3,
        totalCases: 69,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a: 12,
          b1: 8,
          b2: 4,
          c1: 8,
          c2: 4,
          d1: 6,
          d2: 2,
          e: 2,
          f: 1,
          g: 0,
          untiered: 2,
          totalCases: 46,
          numberOfType: 1
        }
      },
      detailsPercentages:
      [{
        linkId: 71,
        name: 'Team 2',
        grades:
        [{
          grade: 'PO',
          a: 60,
          b1: 60,
          b2: 60,
          c1: 60,
          c2: 60,
          d1: 60,
          d2: 60,
          e: 0,
          f: 0,
          g: 0,
          untiered: 60,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40
        }]
      }],
      percentageTotals:
      {
        PO:
      {
        grade: 'PO',
        a: 60,
        b1: 60,
        b2: 60,
        c1: 60,
        c2: 60,
        d1: 60,
        d2: 60,
        e: 0,
        f: 0,
        g: 0,
        untiered: 60,
        totalCases: 60,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40,
          numberOfType: 1
        }
      }
    },
    licenseCaseloadDetails:
    {
      details:
    [{
      linkId: 71,
      name: 'Team 2',
      grades:
      [{
        grade: 'PO',
        a: 6,
        b1: 3,
        b2: 6,
        c1: 9,
        c2: 6,
        d1: 12,
        d2: 18,
        e: 2,
        f: 1,
        g: 0,
        untiered: 15,
        totalCases: 75
      },
      {
        grade: 'PSO',
        a: 4,
        b1: 2,
        b2: 4,
        c1: 6,
        c2: 4,
        d1: 8,
        d2: 12,
        e: 2,
        f: 1,
        g: 0,
        untiered: 10,
        totalCases: 50
      }]
    }],
      totals:
      {
        PO:
      {
        grade: 'PO',
        a: 6,
        b1: 3,
        b2: 6,
        c1: 9,
        c2: 6,
        d1: 12,
        d2: 18,
        e: 2,
        f: 1,
        g: 0,
        untiered: 15,
        totalCases: 75,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a: 4,
          b1: 2,
          b2: 4,
          c1: 6,
          c2: 4,
          d1: 8,
          d2: 12,
          e: 2,
          f: 1,
          g: 0,
          untiered: 10,
          totalCases: 50,
          numberOfType: 1
        }
      },
      detailsPercentages:
      [{
        linkId: 71,
        name: 'Team 2',
        grades:
        [{
          grade: 'PO',
          a: 60,
          b1: 60,
          b2: 60,
          c1: 60,
          c2: 60,
          d1: 60,
          d2: 60,
          e: 0,
          f: 0,
          g: 0,
          untiered: 60,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40
        }]
      }],
      percentageTotals:
      {
        PO:
      {
        grade: 'PO',
        a: 60,
        b1: 60,
        b2: 60,
        c1: 60,
        c2: 60,
        d1: 60,
        d2: 60,
        e: 0,
        f: 0,
        g: 0,
        untiered: 60,
        totalCases: 60,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40,
          numberOfType: 1
        }
      }
    },
    overallTotalSummary:
    [{
      name: 'Team 2',
      linkId: 71,
      totalCases: 345,
      custodyTotalCases: 115,
      communityTotalCases: 105,
      licenseTotalCases: 125
    }],
    custodyTotalSummary: 115,
    communityTotalSummary: 105,
    licenseTotalSummary: 125
  }
}

module.exports.LDU_CASELOAD_CSV = {
  filename: ('Test_LDU_Caseload ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: 'OVERALL\n' +
  '"name","custodyCases","communityCases","licenseCases","totalCases"\n' +
  '"Team 2",115,105,125,345\n\n\n' +
  'CUSTODY\n' +
  '"Team Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"\n' +
  '"Team 2","PO",18,12,6,12,6,9,3,2,1,0,3,69\n' +
  '"Team 2","PSO",12,8,4,8,4,6,2,2,1,0,2,46\n\n\n' +
  'COMMUNITY\n' +
  '"Team Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"\n' +
  '"Team 2","PO",9,18,12,6,9,6,3,2,1,0,0,63\n' +
  '"Team 2","PSO",6,12,8,4,6,4,2,2,1,0,0,42\n\n\n' +
  'LICENSE\n' +
  '"Team Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"\n' +
  '"Team 2","PO",6,3,6,9,6,12,18,2,1,0,15,75\n' +
  '"Team 2","PSO",4,2,4,6,4,8,12,2,1,0,10,50\n\n\n' +
  'OVERALL: PERCENTAGE SPLIT OF CASES BY GRADE\n' +
  '"Team Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"\n' +
  '"Team 2","PO","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","0.00%","0.00%","0.00%","60.00%","60.00%"\n' +
  '"Team 2","PSO","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","0.00%","0.00%","0.00%","40.00%","40.00%"'
}

module.exports.REGION_CASELOAD_RESULT = {
  title: 'Region 2',
  subTitle: 'Region',
  caseloadDetails:
  {
    overallCaseloadDetails:
  {
    details:
  [{
    linkId: 70,
    name: 'Probation Delivery Unit 2',
    grades:
    [{
      grade: 'PO',
      a: 33,
      b1: 33,
      b2: 24,
      c1: 27,
      c2: 21,
      d1: 27,
      d2: 24,
      e: 2,
      f: 1,
      g: 0,
      untiered: 18,
      totalCases: 207
    },
    {
      grade: 'PSO',
      a: 22,
      b1: 22,
      b2: 16,
      c1: 18,
      c2: 14,
      d1: 18,
      d2: 16,
      e: 2,
      f: 1,
      g: 0,
      untiered: 12,
      totalCases: 138
    }]
  }],
    totals:
    {
      PO:
    {
      grade: 'PO',
      a: 33,
      b1: 33,
      b2: 24,
      c1: 27,
      c2: 21,
      d1: 27,
      d2: 24,
      e: 2,
      f: 1,
      g: 0,
      untiered: 18,
      totalCases: 207,
      numberOfType: 1
    },
      PSO:
      {
        grade: 'PSO',
        a: 22,
        b1: 22,
        b2: 16,
        c1: 18,
        c2: 14,
        d1: 18,
        d2: 16,
        e: 2,
        f: 1,
        g: 0,
        untiered: 12,
        totalCases: 138,
        numberOfType: 1
      }
    },
    detailsPercentages:
    [{
      linkId: 70,
      name: 'Probation Delivery Unit 2',
      grades:
      [{
        grade: 'PO',
        a: 60,
        b1: 60,
        b2: 60,
        c1: 60,
        c2: 60,
        d1: 60,
        d2: 60,
        e: 0,
        f: 0,
        g: 0,
        untiered: 60,
        totalCases: 60
      },
      {
        grade: 'PSO',
        a: 40,
        b1: 40,
        b2: 40,
        c1: 40,
        c2: 40,
        d1: 40,
        d2: 40,
        e: 0,
        f: 0,
        g: 0,
        untiered: 40,
        totalCases: 40
      }]
    }],
    percentageTotals:
    {
      PO:
    {
      grade: 'PO',
      a: 60,
      b1: 60,
      b2: 60,
      c1: 60,
      c2: 60,
      d1: 60,
      d2: 60,
      e: 0,
      f: 0,
      g: 0,
      untiered: 60,
      totalCases: 60,
      numberOfType: 1
    },
      PSO:
      {
        grade: 'PSO',
        a: 40,
        b1: 40,
        b2: 40,
        c1: 40,
        c2: 40,
        d1: 40,
        d2: 40,
        e: 0,
        f: 0,
        g: 0,
        untiered: 40,
        totalCases: 40,
        numberOfType: 1
      }
    }
  },
    communityCaseloadDetails:
    {
      details:
    [{
      linkId: 70,
      name: 'Probation Delivery Unit 2',
      grades:
      [{
        grade: 'PO',
        a: 9,
        b1: 18,
        b2: 12,
        c1: 6,
        c2: 9,
        d1: 6,
        d2: 3,
        e: 2,
        f: 1,
        g: 0,
        untiered: 0,
        totalCases: 63
      },
      {
        grade: 'PSO',
        a: 6,
        b1: 12,
        b2: 8,
        c1: 4,
        c2: 6,
        d1: 4,
        d2: 2,
        e: 2,
        f: 1,
        g: 0,
        untiered: 0,
        totalCases: 42
      }]
    }],
      totals:
      {
        PO:
      {
        grade: 'PO',
        a: 9,
        b1: 18,
        b2: 12,
        c1: 6,
        c2: 9,
        d1: 6,
        d2: 3,
        e: 2,
        f: 1,
        g: 0,
        untiered: 0,
        totalCases: 63,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a: 6,
          b1: 12,
          b2: 8,
          c1: 4,
          c2: 6,
          d1: 4,
          d2: 2,
          e: 2,
          f: 1,
          g: 0,
          untiered: 0,
          totalCases: 42,
          numberOfType: 1
        }
      },
      detailsPercentages:
      [{
        linkId: 70,
        name: 'Probation Delivery Unit 2',
        grades:
        [{
          grade: 'PO',
          a: 60,
          b1: 60,
          b2: 60,
          c1: 60,
          c2: 60,
          d1: 60,
          d2: 60,
          e: 0,
          f: 0,
          g: 0,
          untiered: 0,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 0,
          totalCases: 40
        }]
      }],
      percentageTotals:
      {
        PO:
      {
        grade: 'PO',
        a: 60,
        b1: 60,
        b2: 60,
        c1: 60,
        c2: 60,
        d1: 60,
        d2: 60,
        e: 0,
        f: 0,
        g: 0,
        untiered: 0,
        totalCases: 60,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 0,
          totalCases: 40,
          numberOfType: 1
        }
      }
    },
    custodyCaseloadDetails:
    {
      details:
    [{
      linkId: 70,
      name: 'Probation Delivery Unit 2',
      grades:
      [{
        grade: 'PO',
        a: 18,
        b1: 12,
        b2: 6,
        c1: 12,
        c2: 6,
        d1: 9,
        d2: 3,
        e: 2,
        f: 1,
        g: 0,
        untiered: 3,
        totalCases: 69
      },
      {
        grade: 'PSO',
        a: 12,
        b1: 8,
        b2: 4,
        c1: 8,
        c2: 4,
        d1: 6,
        d2: 2,
        e: 2,
        f: 1,
        g: 0,
        untiered: 2,
        totalCases: 46
      }]
    }],
      totals:
      {
        PO:
      {
        grade: 'PO',
        a: 18,
        b1: 12,
        b2: 6,
        c1: 12,
        c2: 6,
        d1: 9,
        d2: 3,
        e: 2,
        f: 1,
        g: 0,
        untiered: 3,
        totalCases: 69,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a: 12,
          b1: 8,
          b2: 4,
          c1: 8,
          c2: 4,
          d1: 6,
          d2: 2,
          e: 2,
          f: 1,
          g: 0,
          untiered: 2,
          totalCases: 46,
          numberOfType: 1
        }
      },
      detailsPercentages:
      [{
        linkId: 70,
        name: 'Probation Delivery Unit 2',
        grades:
        [{
          grade: 'PO',
          a: 60,
          b1: 60,
          b2: 60,
          c1: 60,
          c2: 60,
          d1: 60,
          d2: 60,
          e: 0,
          f: 0,
          g: 0,
          untiered: 60,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40
        }]
      }],
      percentageTotals:
      {
        PO:
      {
        grade: 'PO',
        a: 60,
        b1: 60,
        b2: 60,
        c1: 60,
        c2: 60,
        d1: 60,
        d2: 60,
        e: 0,
        f: 0,
        g: 0,
        untiered: 60,
        totalCases: 60,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40,
          numberOfType: 1
        }
      }
    },
    licenseCaseloadDetails:
    {
      details:
    [{
      linkId: 70,
      name: 'Probation Delivery Unit 2',
      grades:
      [{
        grade: 'PO',
        a: 6,
        b1: 3,
        b2: 6,
        c1: 9,
        c2: 6,
        d1: 12,
        d2: 18,
        e: 2,
        f: 1,
        g: 0,
        untiered: 15,
        totalCases: 75
      },
      {
        grade: 'PSO',
        a: 4,
        b1: 2,
        b2: 4,
        c1: 6,
        c2: 4,
        d1: 8,
        d2: 12,
        e: 2,
        f: 1,
        g: 0,
        untiered: 10,
        totalCases: 50
      }]
    }],
      totals:
      {
        PO:
      {
        grade: 'PO',
        a: 6,
        b1: 3,
        b2: 6,
        c1: 9,
        c2: 6,
        d1: 12,
        d2: 18,
        e: 2,
        f: 1,
        g: 0,
        untiered: 15,
        totalCases: 75,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a: 4,
          b1: 2,
          b2: 4,
          c1: 6,
          c2: 4,
          d1: 8,
          d2: 12,
          e: 2,
          f: 1,
          g: 0,
          untiered: 10,
          totalCases: 50,
          numberOfType: 1
        }
      },
      detailsPercentages:
      [{
        linkId: 70,
        name: 'Probation Delivery Unit 2',
        grades:
        [{
          grade: 'PO',
          a: 60,
          b1: 60,
          b2: 60,
          c1: 60,
          c2: 60,
          d1: 60,
          d2: 60,
          e: 0,
          f: 0,
          g: 0,
          untiered: 60,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40
        }]
      }],
      percentageTotals:
      {
        PO:
      {
        grade: 'PO',
        a: 60,
        b1: 60,
        b2: 60,
        c1: 60,
        c2: 60,
        d1: 60,
        d2: 60,
        e: 0,
        f: 0,
        g: 0,
        untiered: 60,
        totalCases: 60,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40,
          numberOfType: 1
        }
      }
    },
    overallTotalSummary:
    [{
      name: 'Probation Delivery Unit 2',
      linkId: 70,
      totalCases: 345,
      custodyTotalCases: 115,
      communityTotalCases: 105,
      licenseTotalCases: 125
    }],
    custodyTotalSummary: 115,
    communityTotalSummary: 105,
    licenseTotalSummary: 125
  }
}

module.exports.REGION_CASELOAD_CSV = {
  filename: ('Test_Region_Caseload ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: 'OVERALL\n' +
  '"name","custodyCases","communityCases","licenseCases","totalCases"\n' +
  '"Probation Delivery Unit 2",115,105,125,345\n\n\n' +
  'CUSTODY\n' +
  '"Probation Delivery Unit Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"\n' +
  '"Probation Delivery Unit 2","PO",18,12,6,12,6,9,3,2,1,0,3,69\n' +
  '"Probation Delivery Unit 2","PSO",12,8,4,8,4,6,2,2,1,0,2,46\n\n\n' +
  'COMMUNITY\n' +
  '"Probation Delivery Unit Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"\n' +
  '"Probation Delivery Unit 2","PO",9,18,12,6,9,6,3,2,1,0,0,63\n' +
  '"Probation Delivery Unit 2","PSO",6,12,8,4,6,4,2,2,1,0,0,42\n\n\n' +
  'LICENSE\n' +
  '"Probation Delivery Unit Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"\n' +
  '"Probation Delivery Unit 2","PO",6,3,6,9,6,12,18,2,1,0,15,75\n' +
  '"Probation Delivery Unit 2","PSO",4,2,4,6,4,8,12,2,1,0,10,50\n\n\n' +
  'OVERALL: PERCENTAGE SPLIT OF CASES BY GRADE\n' +
  '"Probation Delivery Unit Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"\n' +
  '"Probation Delivery Unit 2","PO","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","0.00%","0.00%","0.00%","60.00%","60.00%"\n' +
  '"Probation Delivery Unit 2","PSO","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","0.00%","0.00%","0.00%","40.00%","40.00%"'
}

module.exports.NATIONAL_CASELOAD_RESULT = {
  title: 'HMPPS',
  subTitle: 'National',
  caseloadDetails:
  {
    overallCaseloadDetails:
  {
    details:
  [{
    linkId: 63,
    name: 'Region 1',
    grades:
    [{
      grade: 'PO',
      a: 66,
      b1: 66,
      b2: 48,
      c1: 54,
      c2: 42,
      d1: 54,
      d2: 48,
      e: 2,
      f: 1,
      g: 0,
      untiered: 36,
      totalCases: 414
    },
    {
      grade: 'PSO',
      a: 44,
      b1: 44,
      b2: 32,
      c1: 36,
      c2: 28,
      d1: 36,
      d2: 32,
      e: 2,
      f: 1,
      g: 0,
      untiered: 24,
      totalCases: 276
    }]
  },
  {
    linkId: 64,
    name: 'Region 2',
    grades:
    [{
      grade: 'PO',
      a: 33,
      b1: 33,
      b2: 24,
      c1: 27,
      c2: 21,
      d1: 27,
      d2: 24,
      e: 2,
      f: 1,
      g: 0,
      untiered: 18,
      totalCases: 207
    },
    {
      grade: 'PSO',
      a: 22,
      b1: 22,
      b2: 16,
      c1: 18,
      c2: 14,
      d1: 18,
      d2: 16,
      e: 2,
      f: 1,
      g: 0,
      untiered: 12,
      totalCases: 138
    }]
  },
  {
    linkId: 65,
    name: 'Region 3',
    grades:
    [{
      grade: 'PO',
      a: 33,
      b1: 33,
      b2: 24,
      c1: 27,
      c2: 21,
      d1: 27,
      d2: 24,
      e: 2,
      f: 1,
      g: 0,
      untiered: 18,
      totalCases: 207
    },
    {
      grade: 'PSO',
      a: 22,
      b1: 22,
      b2: 16,
      c1: 18,
      c2: 14,
      d1: 18,
      d2: 16,
      e: 2,
      f: 1,
      g: 0,
      untiered: 12,
      totalCases: 138
    }]
  }],
    totals:
    {
      PO:
    {
      grade: 'PO',
      a: 132,
      b1: 132,
      b2: 96,
      c1: 108,
      c2: 84,
      d1: 108,
      d2: 96,
      e: 2,
      f: 1,
      g: 0,
      untiered: 72,
      totalCases: 828,
      numberOfType: 3
    },
      PSO:
      {
        grade: 'PSO',
        a: 88,
        b1: 88,
        b2: 64,
        c1: 72,
        c2: 56,
        d1: 72,
        d2: 64,
        e: 2,
        f: 1,
        g: 0,
        untiered: 48,
        totalCases: 552,
        numberOfType: 3
      }
    },
    detailsPercentages:
    [{
      linkId: 63,
      name: 'Region 1',
      grades:
      [{
        grade: 'PO',
        a: 60,
        b1: 60,
        b2: 60,
        c1: 60,
        c2: 60,
        d1: 60,
        d2: 60,
        e: 0,
        f: 0,
        g: 0,
        untiered: 60,
        totalCases: 60
      },
      {
        grade: 'PSO',
        a: 40,
        b1: 40,
        b2: 40,
        c1: 40,
        c2: 40,
        d1: 40,
        d2: 40,
        e: 0,
        f: 0,
        g: 0,
        untiered: 40,
        totalCases: 40
      }]
    },
    {
      linkId: 64,
      name: 'Region 2',
      grades:
      [{
        grade: 'PO',
        a: 60,
        b1: 60,
        b2: 60,
        c1: 60,
        c2: 60,
        d1: 60,
        d2: 60,
        e: 0,
        f: 0,
        g: 0,
        untiered: 60,
        totalCases: 60
      },
      {
        grade: 'PSO',
        a: 40,
        b1: 40,
        b2: 40,
        c1: 40,
        c2: 40,
        d1: 40,
        d2: 40,
        e: 0,
        f: 0,
        g: 0,
        untiered: 40,
        totalCases: 40
      }]
    },
    {
      linkId: 65,
      name: 'Region 3',
      grades:
      [{
        grade: 'PO',
        a: 60,
        b1: 60,
        b2: 60,
        c1: 60,
        c2: 60,
        d1: 60,
        d2: 60,
        e: 0,
        f: 0,
        g: 0,
        untiered: 60,
        totalCases: 60
      },
      {
        grade: 'PSO',
        a: 40,
        b1: 40,
        b2: 40,
        c1: 40,
        c2: 40,
        d1: 40,
        d2: 40,
        e: 0,
        f: 0,
        g: 0,
        untiered: 40,
        totalCases: 40
      }]
    }],
    percentageTotals:
    {
      PO:
    {
      grade: 'PO',
      a: 60,
      b1: 60,
      b2: 60,
      c1: 60,
      c2: 60,
      d1: 60,
      d2: 60,
      e: 0,
      f: 0,
      g: 0,
      untiered: 60,
      totalCases: 60,
      numberOfType: 3
    },
      PSO:
      {
        grade: 'PSO',
        a: 40,
        b1: 40,
        b2: 40,
        c1: 40,
        c2: 40,
        d1: 40,
        d2: 40,
        e: 0,
        f: 0,
        g: 0,
        untiered: 40,
        totalCases: 40,
        numberOfType: 3
      }
    }
  },
    communityCaseloadDetails:
    {
      details:
    [{
      linkId: 63,
      name: 'Region 1',
      grades:
      [{
        grade: 'PO',
        a: 18,
        b1: 36,
        b2: 24,
        c1: 12,
        c2: 18,
        d1: 12,
        d2: 6,
        e: 2,
        f: 1,
        g: 0,
        untiered: 0,
        totalCases: 126
      },
      {
        grade: 'PSO',
        a: 12,
        b1: 24,
        b2: 16,
        c1: 8,
        c2: 12,
        d1: 8,
        d2: 4,
        e: 2,
        f: 1,
        g: 0,
        untiered: 0,
        totalCases: 84
      }]
    },
    {
      linkId: 64,
      name: 'Region 2',
      grades:
      [{
        grade: 'PO',
        a: 9,
        b1: 18,
        b2: 12,
        c1: 6,
        c2: 9,
        d1: 6,
        d2: 3,
        e: 2,
        f: 1,
        g: 0,
        untiered: 0,
        totalCases: 63
      },
      {
        grade: 'PSO',
        a: 6,
        b1: 12,
        b2: 8,
        c1: 4,
        c2: 6,
        d1: 4,
        d2: 2,
        e: 2,
        f: 1,
        g: 0,
        untiered: 0,
        totalCases: 42
      }]
    },
    {
      linkId: 65,
      name: 'Region 3',
      grades:
      [{
        grade: 'PO',
        a: 9,
        b1: 18,
        b2: 12,
        c1: 6,
        c2: 9,
        d1: 6,
        d2: 3,
        e: 2,
        f: 1,
        g: 0,
        untiered: 0,
        totalCases: 63
      },
      {
        grade: 'PSO',
        a: 6,
        b1: 12,
        b2: 8,
        c1: 4,
        c2: 6,
        d1: 4,
        d2: 2,
        e: 2,
        f: 1,
        g: 0,
        untiered: 0,
        totalCases: 42
      }]
    }],
      totals:
      {
        PO:
      {
        grade: 'PO',
        a: 36,
        b1: 72,
        b2: 48,
        c1: 24,
        c2: 36,
        d1: 24,
        d2: 12,
        e: 2,
        f: 1,
        g: 0,
        untiered: 0,
        totalCases: 252,
        numberOfType: 3
      },
        PSO:
        {
          grade: 'PSO',
          a: 24,
          b1: 48,
          b2: 32,
          c1: 16,
          c2: 24,
          d1: 16,
          d2: 8,
          e: 2,
          f: 1,
          g: 0,
          untiered: 0,
          totalCases: 168,
          numberOfType: 3
        }
      },
      detailsPercentages:
      [{
        linkId: 63,
        name: 'Region 1',
        grades:
        [{
          grade: 'PO',
          a: 60,
          b1: 60,
          b2: 60,
          c1: 60,
          c2: 60,
          d1: 60,
          d2: 60,
          e: 0,
          f: 0,
          g: 0,
          untiered: 0,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 0,
          totalCases: 40
        }]
      },
      {
        linkId: 64,
        name: 'Region 2',
        grades:
        [{
          grade: 'PO',
          a: 60,
          b1: 60,
          b2: 60,
          c1: 60,
          c2: 60,
          d1: 60,
          d2: 60,
          e: 0,
          f: 0,
          g: 0,
          untiered: 0,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 0,
          totalCases: 40
        }]
      },
      {
        linkId: 65,
        name: 'Region 3',
        grades:
        [{
          grade: 'PO',
          a: 60,
          b1: 60,
          b2: 60,
          c1: 60,
          c2: 60,
          d1: 60,
          d2: 60,
          e: 0,
          f: 0,
          g: 0,
          untiered: 0,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 0,
          totalCases: 40
        }]
      }],
      percentageTotals:
      {
        PO:
      {
        grade: 'PO',
        a: 60,
        b1: 60,
        b2: 60,
        c1: 60,
        c2: 60,
        d1: 60,
        d2: 60,
        e: 0,
        f: 0,
        g: 0,
        untiered: 0,
        totalCases: 60,
        numberOfType: 3
      },
        PSO:
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 0,
          totalCases: 40,
          numberOfType: 3
        }
      }
    },
    custodyCaseloadDetails:
    {
      details:
    [{
      linkId: 63,
      name: 'Region 1',
      grades:
      [{
        grade: 'PO',
        a: 36,
        b1: 24,
        b2: 12,
        c1: 24,
        c2: 12,
        d1: 18,
        d2: 6,
        e: 2,
        f: 1,
        g: 0,
        untiered: 6,
        totalCases: 138
      },
      {
        grade: 'PSO',
        a: 24,
        b1: 16,
        b2: 8,
        c1: 16,
        c2: 8,
        d1: 12,
        d2: 4,
        e: 2,
        f: 1,
        g: 0,
        untiered: 4,
        totalCases: 92
      }]
    },
    {
      linkId: 64,
      name: 'Region 2',
      grades:
      [{
        grade: 'PO',
        a: 18,
        b1: 12,
        b2: 6,
        c1: 12,
        c2: 6,
        d1: 9,
        d2: 3,
        e: 2,
        f: 1,
        g: 0,
        untiered: 3,
        totalCases: 69
      },
      {
        grade: 'PSO',
        a: 12,
        b1: 8,
        b2: 4,
        c1: 8,
        c2: 4,
        d1: 6,
        d2: 2,
        e: 2,
        f: 1,
        g: 0,
        untiered: 2,
        totalCases: 46
      }]
    },
    {
      linkId: 65,
      name: 'Region 3',
      grades:
      [{
        grade: 'PO',
        a: 18,
        b1: 12,
        b2: 6,
        c1: 12,
        c2: 6,
        d1: 9,
        d2: 3,
        e: 2,
        f: 1,
        g: 0,
        untiered: 3,
        totalCases: 69
      },
      {
        grade: 'PSO',
        a: 12,
        b1: 8,
        b2: 4,
        c1: 8,
        c2: 4,
        d1: 6,
        d2: 2,
        e: 2,
        f: 1,
        g: 0,
        untiered: 2,
        totalCases: 46
      }]
    }],
      totals:
      {
        PO:
      {
        grade: 'PO',
        a: 72,
        b1: 48,
        b2: 24,
        c1: 48,
        c2: 24,
        d1: 36,
        d2: 12,
        e: 2,
        f: 1,
        g: 0,
        untiered: 12,
        totalCases: 276,
        numberOfType: 3
      },
        PSO:
        {
          grade: 'PSO',
          a: 48,
          b1: 32,
          b2: 16,
          c1: 32,
          c2: 16,
          d1: 24,
          d2: 8,
          e: 2,
          f: 1,
          g: 0,
          untiered: 8,
          totalCases: 184,
          numberOfType: 3
        }
      },
      detailsPercentages:
      [{
        linkId: 63,
        name: 'Region 1',
        grades:
        [{
          grade: 'PO',
          a: 60,
          b1: 60,
          b2: 60,
          c1: 60,
          c2: 60,
          d1: 60,
          d2: 60,
          e: 0,
          f: 0,
          g: 0,
          untiered: 60,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40
        }]
      },
      {
        linkId: 64,
        name: 'Region 2',
        grades:
        [{
          grade: 'PO',
          a: 60,
          b1: 60,
          b2: 60,
          c1: 60,
          c2: 60,
          d1: 60,
          d2: 60,
          e: 0,
          f: 0,
          g: 0,
          untiered: 60,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40
        }]
      },
      {
        linkId: 65,
        name: 'Region 3',
        grades:
        [{
          grade: 'PO',
          a: 60,
          b1: 60,
          b2: 60,
          c1: 60,
          c2: 60,
          d1: 60,
          d2: 60,
          e: 0,
          f: 0,
          g: 0,
          untiered: 60,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40
        }]
      }],
      percentageTotals:
      {
        PO:
      {
        grade: 'PO',
        a: 60,
        b1: 60,
        b2: 60,
        c1: 60,
        c2: 60,
        d1: 60,
        d2: 60,
        e: 0,
        f: 0,
        g: 0,
        untiered: 60,
        totalCases: 60,
        numberOfType: 3
      },
        PSO:
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40,
          numberOfType: 3
        }
      }
    },
    licenseCaseloadDetails:
    {
      details:
    [{
      linkId: 63,
      name: 'Region 1',
      grades:
      [{
        grade: 'PO',
        a: 12,
        b1: 6,
        b2: 12,
        c1: 18,
        c2: 12,
        d1: 24,
        d2: 36,
        e: 2,
        f: 1,
        g: 0,
        untiered: 30,
        totalCases: 150
      },
      {
        grade: 'PSO',
        a: 8,
        b1: 4,
        b2: 8,
        c1: 12,
        c2: 8,
        d1: 16,
        d2: 24,
        e: 2,
        f: 1,
        g: 0,
        untiered: 20,
        totalCases: 100
      }]
    },
    {
      linkId: 64,
      name: 'Region 2',
      grades:
      [{
        grade: 'PO',
        a: 6,
        b1: 3,
        b2: 6,
        c1: 9,
        c2: 6,
        d1: 12,
        d2: 18,
        e: 2,
        f: 1,
        g: 0,
        untiered: 15,
        totalCases: 75
      },
      {
        grade: 'PSO',
        a: 4,
        b1: 2,
        b2: 4,
        c1: 6,
        c2: 4,
        d1: 8,
        d2: 12,
        e: 2,
        f: 1,
        g: 0,
        untiered: 10,
        totalCases: 50
      }]
    },
    {
      linkId: 65,
      name: 'Region 3',
      grades:
      [{
        grade: 'PO',
        a: 6,
        b1: 3,
        b2: 6,
        c1: 9,
        c2: 6,
        d1: 12,
        d2: 18,
        e: 2,
        f: 1,
        g: 0,
        untiered: 15,
        totalCases: 75
      },
      {
        grade: 'PSO',
        a: 4,
        b1: 2,
        b2: 4,
        c1: 6,
        c2: 4,
        d1: 8,
        d2: 12,
        e: 2,
        f: 1,
        g: 0,
        untiered: 10,
        totalCases: 50
      }]
    }],
      totals:
      {
        PO:
      {
        grade: 'PO',
        a: 24,
        b1: 12,
        b2: 24,
        c1: 36,
        c2: 24,
        d1: 48,
        d2: 72,
        e: 2,
        f: 1,
        g: 0,
        untiered: 60,
        totalCases: 300,
        numberOfType: 3
      },
        PSO:
        {
          grade: 'PSO',
          a: 16,
          b1: 8,
          b2: 16,
          c1: 24,
          c2: 16,
          d1: 32,
          d2: 48,
          e: 2,
          f: 1,
          g: 0,
          untiered: 40,
          totalCases: 200,
          numberOfType: 3
        }
      },
      detailsPercentages:
      [{
        linkId: 63,
        name: 'Region 1',
        grades:
        [{
          grade: 'PO',
          a: 60,
          b1: 60,
          b2: 60,
          c1: 60,
          c2: 60,
          d1: 60,
          d2: 60,
          e: 0,
          f: 0,
          g: 0,
          untiered: 60,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40
        }]
      },
      {
        linkId: 64,
        name: 'Region 2',
        grades:
        [{
          grade: 'PO',
          a: 60,
          b1: 60,
          b2: 60,
          c1: 60,
          c2: 60,
          d1: 60,
          d2: 60,
          e: 0,
          f: 0,
          g: 0,
          untiered: 60,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40
        }]
      },
      {
        linkId: 65,
        name: 'Region 3',
        grades:
        [{
          grade: 'PO',
          a: 60,
          b1: 60,
          b2: 60,
          c1: 60,
          c2: 60,
          d1: 60,
          d2: 60,
          e: 0,
          f: 0,
          g: 0,
          untiered: 60,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40
        }]
      }],
      percentageTotals:
      {
        PO:
      {
        grade: 'PO',
        a: 60,
        b1: 60,
        b2: 60,
        c1: 60,
        c2: 60,
        d1: 60,
        d2: 60,
        e: 0,
        f: 0,
        g: 0,
        untiered: 60,
        totalCases: 60,
        numberOfType: 3
      },
        PSO:
        {
          grade: 'PSO',
          a: 40,
          b1: 40,
          b2: 40,
          c1: 40,
          c2: 40,
          d1: 40,
          d2: 40,
          e: 0,
          f: 0,
          g: 0,
          untiered: 40,
          totalCases: 40,
          numberOfType: 3
        }
      }
    },
    overallTotalSummary:
    [{
      name: 'Region 1',
      linkId: 63,
      totalCases: 690,
      custodyTotalCases: 230,
      communityTotalCases: 210,
      licenseTotalCases: 250
    },
    {
      name: 'Region 2',
      linkId: 64,
      totalCases: 345,
      custodyTotalCases: 115,
      communityTotalCases: 105,
      licenseTotalCases: 125
    },
    {
      name: 'Region 3',
      linkId: 65,
      totalCases: 345,
      custodyTotalCases: 115,
      communityTotalCases: 105,
      licenseTotalCases: 125
    }],
    custodyTotalSummary: 460,
    communityTotalSummary: 420,
    licenseTotalSummary: 500
  }
}

module.exports.NATIONAL_CASELOAD_CSV = {
  filename: ('Test_National_Caseload ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: 'OVERALL\n' +
  '"name","custodyCases","communityCases","licenseCases","totalCases"\n' +
  '"Region 1",230,210,250,690\n' +
  '"Region 2",115,105,125,345\n' +
  '"Region 3",115,105,125,345\n\n\n' +
  'CUSTODY\n' +
  '"Region Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"\n' +
  '"Region 1","PO",36,24,12,24,12,18,6,2,1,0,6,138\n' +
  '"Region 1","PSO",24,16,8,16,8,12,4,2,1,0,4,92\n' +
  '"Region 2","PO",18,12,6,12,6,9,3,2,1,0,3,69\n' +
  '"Region 2","PSO",12,8,4,8,4,6,2,2,1,0,2,46\n' +
  '"Region 3","PO",18,12,6,12,6,9,3,2,1,0,3,69\n' +
  '"Region 3","PSO",12,8,4,8,4,6,2,2,1,0,2,46\n\n\n' +
  'COMMUNITY\n' +
  '"Region Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"\n' +
  '"Region 1","PO",18,36,24,12,18,12,6,2,1,0,0,126\n' +
  '"Region 1","PSO",12,24,16,8,12,8,4,2,1,0,0,84\n' +
  '"Region 2","PO",9,18,12,6,9,6,3,2,1,0,0,63\n' +
  '"Region 2","PSO",6,12,8,4,6,4,2,2,1,0,0,42\n' +
  '"Region 3","PO",9,18,12,6,9,6,3,2,1,0,0,63\n' +
  '"Region 3","PSO",6,12,8,4,6,4,2,2,1,0,0,42\n\n\n' +
  'LICENSE\n' +
  '"Region Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"\n' +
  '"Region 1","PO",12,6,12,18,12,24,36,2,1,0,30,150\n' +
  '"Region 1","PSO",8,4,8,12,8,16,24,2,1,0,20,100\n' +
  '"Region 2","PO",6,3,6,9,6,12,18,2,1,0,15,75\n' +
  '"Region 2","PSO",4,2,4,6,4,8,12,2,1,0,10,50\n' +
  '"Region 3","PO",6,3,6,9,6,12,18,2,1,0,15,75\n' +
  '"Region 3","PSO",4,2,4,6,4,8,12,2,1,0,10,50\n\n\n' +
  'OVERALL: PERCENTAGE SPLIT OF CASES BY GRADE\n' +
  '"Region Name","Grade","A","B1","B2","C1","C2","D1","D2","E","F","G","Untiered","Overall"\n' +
  '"Region 1","PO","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","0.00%","0.00%","0.00%","60.00%","60.00%"\n' +
  '"Region 1","PSO","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","0.00%","0.00%","0.00%","40.00%","40.00%"\n' +
  '"Region 2","PO","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","0.00%","0.00%","0.00%","60.00%","60.00%"\n' +
  '"Region 2","PSO","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","0.00%","0.00%","0.00%","40.00%","40.00%"\n' +
  '"Region 3","PO","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","0.00%","0.00%","0.00%","60.00%","60.00%"\n' +
  '"Region 3","PSO","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","0.00%","0.00%","0.00%","40.00%","40.00%"'
}

module.exports.OM_OVERVIEW_RESULT = {
  breadcrumbs:
  [{ title: 'John Smith' },
    { title: 'Team 1' },
    { title: 'Test Cluster' }],
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
    defaultContractedHoursSpo: 0,
    capacity: 105.3,
    lduCluster: 'Test Cluster',
    regionName: 'Test Region',
    cmsAdjustmentPoints: -121,
    cmsPercentage: -3.85718839655722
  }
}

module.exports.OM_OVERVIEW_CSV = {
  filename: ('John_Smith_Overview ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region","Probation Delivery Unit","Team Name","Grade Code","Capacity Percentage","Total Cases","Contracted Hours","Reduction Hours","CMS Points","CMS Percentage"' +
  '\n"Test Region","Test Cluster","Team 1","PO","105.3%",60,37,4,-121,"-3.9%"'
}

module.exports.TEAM_OVERVIEW_RESULT = {
  breadcrumbs: [{
    title: 'Team 1',
    link: '/probation/team/95',
    active: undefined
  },
  {
    title: 'Probation Delivery Unit 1',
    link: '/probation/ldu/85',
    active: undefined
  },
  {
    title: 'Region 1',
    link: '/probation/region/43',
    active: undefined
  },
  { title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  overviewDetails:
  [{
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 219,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 115.26315789473685,
    remainingPoints: -29,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 216,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PSO',
    capacityPercentage: 113.68421052631578,
    remainingPoints: -26,
    cmsAdjustmentPoints: -176,
    cmsPercentage: -6.379122870605292
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 222,
    contractedHours: 37.5,
    reductionHours: 1,
    gradeCode: 'PO',
    capacityPercentage: 116.8421052631579,
    remainingPoints: -32,
    cmsAdjustmentPoints: 121,
    cmsPercentage: 19.803600654664486
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 204,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PSO',
    capacityPercentage: 107.36842105263158,
    remainingPoints: -14,
    cmsAdjustmentPoints: 167,
    cmsPercentage: 29.246935201401055
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: -9,
    cmsPercentage: -0.5096262740656852
  }],
  title: 'Team 1',
  subTitle: 'Team'
}

module.exports.TEAM_OVERVIEW_CSV = {
  filename: ('Team_1_Overview ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Probation Delivery Unit","Team Name","Offender Manager","Grade Code","Capacity Percentage","Capacity Points","Total Points Used","Remaining Points","Contracted Hours","Reduction Hours","Total Cases","CMS Points","CMS Percentage"' +
  '\n"Probation Delivery Unit 1","Team 1","John Smith","PO","115.3%",190,219,-29,37.5,6,69,0,"0.0%"' +
  '\n"Probation Delivery Unit 1","Team 1","Tony Test","PSO","113.7%",190,216,-26,37.5,3,69,-176,"-6.4%"' +
  '\n"Probation Delivery Unit 1","Team 1","Jane Doe","PO","116.8%",190,222,-32,37.5,1,69,121,"19.8%"' +
  '\n"Probation Delivery Unit 1","Team 1","Marcin Martin","PSO","107.4%",190,204,-14,37.5,6,69,167,"29.2%"' +
  '\n"Probation Delivery Unit 1","Team 1","Courtney Larry","PO","117.4%",190,223,-33,37.5,3,69,-9,"-0.5%"'
}

module.exports.LDU_OVERVIEW_RESULT = {
  breadcrumbs: [{
    title: 'Probation Delivery Unit 1',
    link: '/probation/ldu/85',
    active: undefined
  },
  {
    title: 'Region 1',
    link: '/probation/region/43',
    active: undefined
  },
  { title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  overviewDetails:
  [{
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 219,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 115.26315789473685,
    remainingPoints: -29,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 216,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PSO',
    capacityPercentage: 113.68421052631578,
    remainingPoints: -26,
    cmsAdjustmentPoints: -176,
    cmsPercentage: -6.379122870605292
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 222,
    contractedHours: 37.5,
    reductionHours: 1,
    gradeCode: 'PO',
    capacityPercentage: 116.8421052631579,
    remainingPoints: -32,
    cmsAdjustmentPoints: 121,
    cmsPercentage: 19.803600654664486
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 204,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PSO',
    capacityPercentage: 107.36842105263158,
    remainingPoints: -14,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 224,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 117.89473684210525,
    remainingPoints: -34,
    cmsAdjustmentPoints: -9,
    cmsPercentage: -0.5096262740656852
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 215,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PSO',
    capacityPercentage: 113.1578947368421,
    remainingPoints: -25,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 202,
    contractedHours: 37.5,
    reductionHours: 4,
    gradeCode: 'PO',
    capacityPercentage: 106.3157894736842,
    remainingPoints: -12,
    cmsAdjustmentPoints: -9,
    cmsPercentage: -0.5096262740656852
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 201,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PSO',
    capacityPercentage: 105.78947368421052,
    remainingPoints: -11,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: -9,
    cmsPercentage: -0.5096262740656852
  }],
  title: 'Probation Delivery Unit 1',
  subTitle: 'Probation Delivery Unit'
}

module.exports.LDU_OVERVIEW_CSV = {
  filename: ('LDU_Cluster_1_Overview ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Probation Delivery Unit","Team Name","Offender Manager","Grade Code","Capacity Percentage","Capacity Points","Total Points Used","Remaining Points","Contracted Hours","Reduction Hours","Total Cases","CMS Points","CMS Percentage"' +
  '\n"Probation Delivery Unit 1","Team 1","John Smith","PO","115.3%",190,219,-29,37.5,6,69,0,"0.0%"' +
  '\n"Probation Delivery Unit 1","Team 1","Tony Test","PSO","113.7%",190,216,-26,37.5,3,69,-176,"-6.4%"' +
  '\n"Probation Delivery Unit 1","Team 1","Jane Doe","PO","116.8%",190,222,-32,37.5,1,69,121,"19.8%"' +
  '\n"Probation Delivery Unit 1","Team 1","Marcin Martin","PSO","107.4%",190,204,-14,37.5,6,69,0,"0.0%"' +
  '\n"Probation Delivery Unit 1","Team 1","Courtney Larry","PO","117.4%",190,223,-33,37.5,3,69,0,"0.0%"' +
  '\n"Probation Delivery Unit 1","Team 4","Courtney Larry","PO","117.9%",190,224,-34,37.5,6,69,-9,"-0.5%"' +
  '\n"Probation Delivery Unit 1","Team 4","Marcin Martin","PSO","113.2%",190,215,-25,37.5,6,69,0,"0.0%"' +
  '\n"Probation Delivery Unit 1","Team 4","Jane Doe","PO","106.3%",190,202,-12,37.5,4,69,-9,"-0.5%"' +
  '\n"Probation Delivery Unit 1","Team 4","Tony Test","PSO","105.8%",190,201,-11,37.5,3,69,0,"0.0%"' +
  '\n"Probation Delivery Unit 1","Team 4","John Smith","PO","117.4%",190,223,-33,37.5,3,69,-9,"-0.5%"'
}

module.exports.REGION_OVERVIEW_RESULT = {
  breadcrumbs:
  [{
    title: 'Region 1',
    link: '/probation/region/43',
    active: undefined
  },
  { title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  overviewDetails: [{
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 219,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 115.26315789473685,
    remainingPoints: -29,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 216,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PSO',
    capacityPercentage: 113.68421052631578,
    remainingPoints: -26,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 222,
    contractedHours: 37.5,
    reductionHours: 1,
    gradeCode: 'PO',
    capacityPercentage: 116.8421052631579,
    remainingPoints: -32,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 204,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PSO',
    capacityPercentage: 107.36842105263158,
    remainingPoints: -14,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 224,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 117.89473684210525,
    remainingPoints: -34,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 215,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PSO',
    capacityPercentage: 113.1578947368421,
    remainingPoints: -25,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 202,
    contractedHours: 37.5,
    reductionHours: 4,
    gradeCode: 'PO',
    capacityPercentage: 106.3157894736842,
    remainingPoints: -12,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 201,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PSO',
    capacityPercentage: 105.78947368421052,
    remainingPoints: -11,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  }],
  title: 'Region 1',
  subTitle: 'Region'
}

module.exports.REGION_OVERVIEW_CSV = {
  filename: ('Region_1_Overview ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region","Probation Delivery Unit","Team Name","Offender Manager","Grade Code","Capacity Percentage","Capacity Points","Total Points Used","Remaining Points","Contracted Hours","Reduction Hours","Total Cases","CMS Points","CMS Percentage"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO","115.3%",190,219,-29,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Tony Test","PSO","113.7%",190,216,-26,37.5,3,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Jane Doe","PO","116.8%",190,222,-32,37.5,1,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Marcin Martin","PSO","107.4%",190,204,-14,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Courtney Larry","PO","117.4%",190,223,-33,37.5,3,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Courtney Larry","PO","117.9%",190,224,-34,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Marcin Martin","PSO","113.2%",190,215,-25,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Jane Doe","PO","106.3%",190,202,-12,37.5,4,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Tony Test","PSO","105.8%",190,201,-11,37.5,3,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","John Smith","PO","117.4%",190,223,-33,37.5,3,69,0,"0.0%"'
}

module.exports.NATIONAL_OVERVIEW_RESULT = {
  breadcrumbs: [{ title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  overviewDetails: [{
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 219,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 115.26315789473685,
    remainingPoints: -29,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 216,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PSO',
    capacityPercentage: 113.68421052631578,
    remainingPoints: -26,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 222,
    contractedHours: 37.5,
    reductionHours: 1,
    gradeCode: 'PO',
    capacityPercentage: 116.8421052631579,
    remainingPoints: -32,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 204,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PSO',
    capacityPercentage: 107.36842105263158,
    remainingPoints: -14,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 224,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 117.89473684210525,
    remainingPoints: -34,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 202,
    contractedHours: 37.5,
    reductionHours: 4,
    gradeCode: 'PO',
    capacityPercentage: 106.3157894736842,
    remainingPoints: -12,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 215,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PSO',
    capacityPercentage: 113.1578947368421,
    remainingPoints: -25,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 201,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PSO',
    capacityPercentage: 105.78947368421052,
    remainingPoints: -11,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 2',
    lduCluster: 'Probation Delivery Unit 2',
    teamName: 'Team 2',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 2',
    lduCluster: 'Probation Delivery Unit 2',
    teamName: 'Team 2',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 4,
    gradeCode: 'PSO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 2',
    lduCluster: 'Probation Delivery Unit 2',
    teamName: 'Team 2',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 209,
    contractedHours: 37.5,
    reductionHours: 4,
    gradeCode: 'PO',
    capacityPercentage: 110.00000000000001,
    remainingPoints: -19,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 2',
    lduCluster: 'Probation Delivery Unit 2',
    teamName: 'Team 2',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 200,
    contractedHours: 37.5,
    reductionHours: 2,
    gradeCode: 'PSO',
    capacityPercentage: 105.26315789473684,
    remainingPoints: -10,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 2',
    lduCluster: 'Probation Delivery Unit 2',
    teamName: 'Team 2',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 217,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 114.21052631578948,
    remainingPoints: -27,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 3',
    lduCluster: 'Probation Delivery Unit 3',
    teamName: 'Team 3',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 214,
    contractedHours: 37.5,
    reductionHours: 2,
    gradeCode: 'PO',
    capacityPercentage: 112.63157894736841,
    remainingPoints: -24,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 3',
    lduCluster: 'Probation Delivery Unit 3',
    teamName: 'Team 3',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 1,
    gradeCode: 'PSO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 3',
    lduCluster: 'Probation Delivery Unit 3',
    teamName: 'Team 3',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 204,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 107.36842105263158,
    remainingPoints: -14,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 3',
    lduCluster: 'Probation Delivery Unit 3',
    teamName: 'Team 3',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 208,
    contractedHours: 37.5,
    reductionHours: 1,
    gradeCode: 'PSO',
    capacityPercentage: 109.47368421052633,
    remainingPoints: -18,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 3',
    lduCluster: 'Probation Delivery Unit 3',
    teamName: 'Team 3',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 201,
    contractedHours: 37.5,
    reductionHours: 2,
    gradeCode: 'PO',
    capacityPercentage: 105.78947368421052,
    remainingPoints: -11,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  }],
  title: 'HMPPS',
  subTitle: 'National'
}

module.exports.NATIONAL_OVERVIEW_CSV = {
  filename: ('HMPPS_Overview ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region","Probation Delivery Unit","Team Name","Offender Manager","Grade Code","Capacity Percentage","Capacity Points","Total Points Used","Remaining Points","Contracted Hours","Reduction Hours","Total Cases","CMS Points","CMS Percentage"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO","115.3%",190,219,-29,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Tony Test","PSO","113.7%",190,216,-26,37.5,3,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Jane Doe","PO","116.8%",190,222,-32,37.5,1,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Marcin Martin","PSO","107.4%",190,204,-14,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Courtney Larry","PO","117.4%",190,223,-33,37.5,3,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Courtney Larry","PO","117.9%",190,224,-34,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Jane Doe","PO","106.3%",190,202,-12,37.5,4,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Marcin Martin","PSO","113.2%",190,215,-25,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","John Smith","PO","117.4%",190,223,-33,37.5,3,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Tony Test","PSO","105.8%",190,201,-11,37.5,3,69,0,"0.0%"' +
  '\n"Region 2","Probation Delivery Unit 2","Team 2","Jane Doe","PO","117.4%",190,223,-33,37.5,3,69,0,"0.0%"' +
  '\n"Region 2","Probation Delivery Unit 2","Team 2","Tony Test","PSO","117.4%",190,223,-33,37.5,4,69,0,"0.0%"' +
  '\n"Region 2","Probation Delivery Unit 2","Team 2","John Smith","PO","110.0%",190,209,-19,37.5,4,69,0,"0.0%"' +
  '\n"Region 2","Probation Delivery Unit 2","Team 2","Marcin Martin","PSO","105.3%",190,200,-10,37.5,2,69,0,"0.0%"' +
  '\n"Region 2","Probation Delivery Unit 2","Team 2","Courtney Larry","PO","114.2%",190,217,-27,37.5,3,69,0,"0.0%"' +
  '\n"Region 3","Probation Delivery Unit 3","Team 3","Courtney Larry","PO","112.6%",190,214,-24,37.5,2,69,0,"0.0%"' +
  '\n"Region 3","Probation Delivery Unit 3","Team 3","Marcin Martin","PSO","117.4%",190,223,-33,37.5,1,69,0,"0.0%"' +
  '\n"Region 3","Probation Delivery Unit 3","Team 3","John Smith","PO","107.4%",190,204,-14,37.5,6,69,0,"0.0%"' +
  '\n"Region 3","Probation Delivery Unit 3","Team 3","Tony Test","PSO","109.5%",190,208,-18,37.5,1,69,0,"0.0%"' +
  '\n"Region 3","Probation Delivery Unit 3","Team 3","Jane Doe","PO","105.8%",190,201,-11,37.5,2,69,0,"0.0%"'
}

module.exports.PERCENTAGE_FORMAT_TEST = {
  breadcrumbs: [{ title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  overviewDetails: [{
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 219,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 115.26315789473685,
    remainingPoints: -29,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  }]

}

module.exports.TEAM_REDUCTIONS_RESULT = {
  breadcrumbs: [{
    title: 'Team 1',
    link: '/probation/team/240',
    active: undefined
  },
  {
    title: 'Probation Delivery Unit 1',
    link: '/probation/ldu/218',
    active: undefined
  },
  {
    title: 'Region 1',
    link: '/probation/region/146',
    active: undefined
  },
  { title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  reductionNotes:
  [{
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Disability',
    amount: 5,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'ACTIVE',
    additionalNotes: null,
    gradeCode: 'PO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Long Term Sickness Absence',
    amount: 2,
    startDate: '26 02 2018, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'SCHEDULED',
    additionalNotes: null,
    gradeCode: 'SPO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 1,
    startDate: '03 12 2016, 16:15',
    endDate: '28 11 2016, 16:15',
    status: 'ARCHIVED',
    additionalNotes: null,
    gradeCode: 'PSO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 2,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'DELETED',
    additionalNotes: null,
    gradeCode: 'PO'
  }],
  title: 'Team 1',
  subTitle: 'Team'
}

module.exports.TEAM_REDUCTIONS_CSV = {
  filename: ('Team_1_Reductions_Notes ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region","Probation Delivery Unit","Team","Offender Manager","Grade Code","Contracted Hours","Reason","Hours","Start Date","End Date","Status","Additional Notes"\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Disability",5,"28 11 2016, 16:15","26 11 2027, 16:15","ACTIVE",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","SPO",37,"Long Term Sickness Absence",2,"26 02 2018, 16:15","26 11 2027, 16:15","SCHEDULED",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PSO",37,"Phased Return to Work",1,"03 12 2016, 16:15","28 11 2016, 16:15","ARCHIVED",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Phased Return to Work",2,"28 11 2016, 16:15","26 11 2027, 16:15","DELETED",'
}

module.exports.TEAM_EXPIRING_REDUCTIONS_RESULT = {
  reductionNotes:
  [{
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Disability',
    amount: 5,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'ACTIVE',
    additionalNotes: null,
    gradeCode: 'PO',
    managerResponsible: 'Joe Bloggs'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Long Term Sickness Absence',
    amount: 2,
    startDate: '26 02 2018, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'SCHEDULED',
    additionalNotes: null,
    gradeCode: 'SPO',
    managerResponsible: 'Frank Jones'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 1,
    startDate: '03 12 2016, 16:15',
    endDate: '28 11 2016, 16:15',
    status: 'ARCHIVED',
    additionalNotes: null,
    gradeCode: 'PSO',
    managerResponsible: 'Mary Brown'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 2,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'DELETED',
    additionalNotes: null,
    gradeCode: 'PO',
    managerResponsible: 'Jane Green'
  }]
}

module.exports.TEAM_EXPIRING_REDUCTIONS_CSV = {
  filename: ('Team_1_Reductions_Notes ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region","Probation Delivery Unit","Team","Offender Manager","Grade Code","Contracted Hours","Reason","Hours","Start Date","End Date","Status","Additional Notes","Manager Responsible"\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Disability",5,"28 11 2016, 16:15","26 11 2027, 16:15","ACTIVE",,"Joe Bloggs"\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","SPO",37,"Long Term Sickness Absence",2,"26 02 2018, 16:15","26 11 2027, 16:15","SCHEDULED",,"Frank Jones"\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PSO",37,"Phased Return to Work",1,"03 12 2016, 16:15","28 11 2016, 16:15","ARCHIVED",,"Mary Brown"\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Phased Return to Work",2,"28 11 2016, 16:15","26 11 2027, 16:15","DELETED",,"Jane Green"'
}

module.exports.LDU_REDUCTIONS_RESULT = {
  breadcrumbs:
  [{
    title: 'Probation Delivery Unit 1',
    link: '/probation/ldu/218',
    active: undefined
  },
  {
    title: 'Region 1',
    link: '/probation/region/146',
    active: undefined
  },
  { title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  reductionNotes:
  [{
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Disability',
    amount: 5,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'ACTIVE',
    additionalNotes: null,
    gradeCode: 'PO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Long Term Sickness Absence',
    amount: 2,
    startDate: '26 02 2018, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'SCHEDULED',
    additionalNotes: null,
    gradeCode: 'SPO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 1,
    startDate: '03 12 2016, 16:15',
    endDate: '28 11 2016, 16:15',
    status: 'ARCHIVED',
    additionalNotes: null,
    gradeCode: 'PSO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 2,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'DELETED',
    additionalNotes: null,
    gradeCode: 'PO'
  }],
  title: 'Probation Delivery Unit 1',
  subTitle: 'Probation Delivery Unit'
}

module.exports.LDU_REDUCTIONS_CSV = {
  filename: ('LDU_Cluster_1_Reductions_Notes ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region","Probation Delivery Unit","Team","Offender Manager","Grade Code","Contracted Hours","Reason","Hours","Start Date","End Date","Status","Additional Notes"\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Disability",5,"28 11 2016, 16:15","26 11 2027, 16:15","ACTIVE",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","SPO",37,"Long Term Sickness Absence",2,"26 02 2018, 16:15","26 11 2027, 16:15","SCHEDULED",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PSO",37,"Phased Return to Work",1,"03 12 2016, 16:15","28 11 2016, 16:15","ARCHIVED",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Phased Return to Work",2,"28 11 2016, 16:15","26 11 2027, 16:15","DELETED",'
}

module.exports.REGION_REDUCTIONS_RESULT = {
  breadcrumbs:
  [{
    title: 'Region 1',
    link: '/probation/region/146',
    active: undefined
  },
  { title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  reductionNotes:
  [{
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Disability',
    amount: 5,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'ACTIVE',
    additionalNotes: null,
    gradeCode: 'PO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Long Term Sickness Absence',
    amount: 2,
    startDate: '26 02 2018, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'SCHEDULED',
    additionalNotes: null,
    gradeCode: 'SPO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 1,
    startDate: '03 12 2016, 16:15',
    endDate: '28 11 2016, 16:15',
    status: 'ARCHIVED',
    additionalNotes: null,
    gradeCode: 'PSO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 2,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'DELETED',
    additionalNotes: null,
    gradeCode: 'PO'
  }],
  title: 'Region 1',
  subTitle: 'Region'
}

module.exports.REGION_REDUCTIONS_CSV = {
  filename: ('Region_1_Reductions_Notes ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region","Probation Delivery Unit","Team","Offender Manager","Grade Code","Contracted Hours","Reason","Hours","Start Date","End Date","Status","Additional Notes"\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Disability",5,"28 11 2016, 16:15","26 11 2027, 16:15","ACTIVE",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","SPO",37,"Long Term Sickness Absence",2,"26 02 2018, 16:15","26 11 2027, 16:15","SCHEDULED",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PSO",37,"Phased Return to Work",1,"03 12 2016, 16:15","28 11 2016, 16:15","ARCHIVED",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Phased Return to Work",2,"28 11 2016, 16:15","26 11 2027, 16:15","DELETED",'
}
