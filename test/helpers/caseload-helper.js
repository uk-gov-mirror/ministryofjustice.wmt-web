const caseType = require('../../app/constants/case-type')

const CASELOAD = {
  name: 'Todd Umptious',
  caseType: caseType.CUSTODY,
  grade: 'PO',
  id: 1,
  totalCases: 3,
  untiered: 1,
  d2: 1,
  d1: 0,
  c2: 0,
  c1: 1,
  b2: 0,
  b1: 1,
  a: 0
}

  // linkId = 2, grade = PO
const CUSTODY_CASELOAD_PO_0 = Object.assign({}, CASELOAD, { linkId: 2, caseType: caseType.CUSTODY })
const COMMUNITY_CASELOAD_PO_0 = Object.assign({}, CASELOAD, { linkId: 2, totalCases: 6, caseType: caseType.COMMUNITY })
const LICENSE_CASELOAD_PO_0 = Object.assign({}, CASELOAD, { linkId: 2, totalCases: 9, caseType: caseType.LICENSE })
module.exports.OVERALL_CASELOAD_PO_0 = Object.assign({}, CASELOAD, { linkId: 2, totalCases: 18, untiered: 3, d2: 3, c1: 3, b1: 3 })

  // linkId = 3, grade = PO
const CUSTODY_CASELOAD_PO_1 = Object.assign({}, CASELOAD, { linkId: 3, caseType: caseType.CUSTODY, name: 'Jerry Twig' })
const COMMUNITY_CASELOAD_PO_1 = Object.assign({}, CASELOAD, { linkId: 3, totalCases: 6, caseType: caseType.COMMUNITY, name: 'Jerry Twig' })
const LICENSE_CASELOAD_PO_1 = Object.assign({}, CASELOAD, { linkId: 3, totalCases: 10, caseType: caseType.LICENSE, name: 'Jerry Twig' })
module.exports.OVERALL_CASELOAD_PO_1 = Object.assign({}, CASELOAD, { linkId: 3, totalCases: 19, untiered: 3, d2: 3, c1: 3, b1: 3, name: 'Jerry Twig' })

  // linkId = 4, grade = PO
const CUSTODY_CASELOAD_PO_2 = Object.assign({}, CASELOAD, { linkId: 4, caseType: caseType.CUSTODY, name: 'Jemima Racktool' })
const COMMUNITY_CASELOAD_PO_2 = Object.assign({}, CASELOAD, { linkId: 4, totalCases: 6, caseType: caseType.COMMUNITY, name: 'Jemima Racktool' })
const LICENSE_CASELOAD_PO_2 = Object.assign({}, CASELOAD, { linkId: 4, totalCases: 11, caseType: caseType.LICENSE, name: 'Jemima Racktool' })
module.exports.OVERALL_CASELOAD_PO_2 = Object.assign({}, CASELOAD, { linkId: 4, totalCases: 20, untiered: 3, d2: 3, c1: 3, b1: 3, name: 'Jemima Racktool' })

  // linkId = 2, grade = PSO
const CUSTODY_CASELOAD_PSO_0 = Object.assign({}, CASELOAD, { linkId: 2, grade: 'PSO', caseType: caseType.CUSTODY })
const COMMUNITY_CASELOAD_PSO_0 = Object.assign({}, CASELOAD, { linkId: 2, grade: 'PSO', totalCases: 6, caseType: caseType.COMMUNITY })
const LICENSE_CASELOAD_PSO_0 = Object.assign({}, CASELOAD, { linkId: 2, grade: 'PSO', totalCases: 9, caseType: caseType.LICENSE })
module.exports.OVERALL_CASELOAD_PSO_0 = Object.assign({}, CASELOAD, { linkId: 2, grade: 'PSO', totalCases: 18, untiered: 3, d2: 3, c1: 3, b1: 3 })

  // linkId = 3, grade = PSO
const CUSTODY_CASELOAD_PSO_1 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 3, caseType: caseType.CUSTODY, name: 'Jerry Twig' })
const COMMUNITY_CASELOAD_PSO_1 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 3, totalCases: 6, caseType: caseType.COMMUNITY, name: 'Jerry Twig' })
const LICENSE_CASELOAD_PSO_1 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 3, totalCases: 10, caseType: caseType.LICENSE, name: 'Jerry Twig' })
module.exports.OVERALL_CASELOAD_PSO_1 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 3, totalCases: 19, untiered: 3, d2: 3, c1: 3, b1: 3, name: 'Jerry Twig' })

  // linkId = 4, grade = PSO
const CUSTODY_CASELOAD_PSO_2 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 4, caseType: caseType.CUSTODY, name: 'Jemima Racktool' })
const COMMUNITY_CASELOAD_PSO_2 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 4, totalCases: 6, caseType: caseType.COMMUNITY, name: 'Jemima Racktool' })
const LICENSE_CASELOAD_PSO_2 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 4, totalCases: 11, caseType: caseType.LICENSE, name: 'Jemima Racktool' })
module.exports.OVERALL_CASELOAD_PSO_2 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 4, totalCases: 20, untiered: 3, d2: 3, c1: 3, b1: 3, name: 'Jemima Racktool' })

module.exports.LDU_OVERALL_SUMMARY_LINKID_2 = {name: 'Todd Umptious', linkId: 2, totalCases: 36, custodyTotalCases: 6, communityTotalCases: 12, licenseTotalCases: 18}
module.exports.LDU_OVERALL_SUMMARY_LINKID_3 = {name: 'Jerry Twig', linkId: 3, totalCases: 38, custodyTotalCases: 6, communityTotalCases: 12, licenseTotalCases: 20}
module.exports.LDU_OVERALL_SUMMARY_LINKID_4 = {name: 'Jemima Racktool', linkId: 4, totalCases: 40, custodyTotalCases: 6, communityTotalCases: 12, licenseTotalCases: 22}

  // In team caseload the linkId is workloadOwner Id so is unique
  // ie only 3 entries (commuity, custody,license) for each linkId
  // Means we don't worry about grade in team caseloads
module.exports.TEAM_CASELOAD = [CUSTODY_CASELOAD_PO_0, CUSTODY_CASELOAD_PO_1, CUSTODY_CASELOAD_PO_2,
  COMMUNITY_CASELOAD_PO_0, COMMUNITY_CASELOAD_PO_1, COMMUNITY_CASELOAD_PO_2,
  LICENSE_CASELOAD_PO_0, LICENSE_CASELOAD_PO_1, LICENSE_CASELOAD_PO_2]

module.exports.TEAM_COMMUNITY_RESULTS = [COMMUNITY_CASELOAD_PO_0, COMMUNITY_CASELOAD_PO_1, COMMUNITY_CASELOAD_PO_2]
module.exports.TEAM_CUSTODY_RESULTS = [CUSTODY_CASELOAD_PO_0, CUSTODY_CASELOAD_PO_1, CUSTODY_CASELOAD_PO_2]
module.exports.TEAM_LICENSE_RESULTS = [LICENSE_CASELOAD_PO_0, LICENSE_CASELOAD_PO_1, LICENSE_CASELOAD_PO_2]

  // In ldu linkId is teamId, shared by multiple workload owners
  // Means we need to have same linkIds with mulitple grades
module.exports.LDU_CASELOAD = [CUSTODY_CASELOAD_PO_0, CUSTODY_CASELOAD_PO_1, CUSTODY_CASELOAD_PO_2,
  COMMUNITY_CASELOAD_PO_0, COMMUNITY_CASELOAD_PO_1, COMMUNITY_CASELOAD_PO_2,
  LICENSE_CASELOAD_PO_0, LICENSE_CASELOAD_PO_1, LICENSE_CASELOAD_PO_2,
  CUSTODY_CASELOAD_PSO_0, CUSTODY_CASELOAD_PSO_1, CUSTODY_CASELOAD_PSO_2,
  COMMUNITY_CASELOAD_PSO_0, COMMUNITY_CASELOAD_PSO_1, COMMUNITY_CASELOAD_PSO_2,
  LICENSE_CASELOAD_PSO_0, LICENSE_CASELOAD_PSO_1, LICENSE_CASELOAD_PSO_2]

module.exports.LDU_CUSTODY_RESULTS = [CUSTODY_CASELOAD_PO_0, CUSTODY_CASELOAD_PO_1, CUSTODY_CASELOAD_PO_2,
  CUSTODY_CASELOAD_PSO_0, CUSTODY_CASELOAD_PSO_1, CUSTODY_CASELOAD_PSO_2]

module.exports.LDU_CUSTODY_AGGREGATED_RESULTS = { 
  details: 
  [ { linkId: 2, name: 'Todd Umptious', grades: [
    {grade: CUSTODY_CASELOAD_PO_0.grade, totalCases: 3, untiered: 1, d2: 1, d1: 0, c2: 0, c1: 1, b2: 0, b1: 1, a: 0},
    {grade: CUSTODY_CASELOAD_PSO_0.grade, totalCases: 3, untiered: 1, d2: 1, d1: 0, c2: 0, c1: 1, b2: 0, b1: 1, a: 0}
] },
    { linkId: 3, name: 'Jerry Twig', grades: [
      {grade: CUSTODY_CASELOAD_PO_0.grade, totalCases: 3, untiered: 1, d2: 1, d1: 0, c2: 0, c1: 1, b2: 0, b1: 1, a: 0},
      {grade: CUSTODY_CASELOAD_PSO_0.grade, totalCases: 3, untiered: 1, d2: 1, d1: 0, c2: 0, c1: 1, b2: 0, b1: 1, a: 0}
  ] },
    { linkId: 4, name: 'Jemima Racktool', grades: [
      {grade: CUSTODY_CASELOAD_PO_0.grade, totalCases: 3, untiered: 1, d2: 1, d1: 0, c2: 0, c1: 1, b2: 0, b1: 1, a: 0},
      {grade: CUSTODY_CASELOAD_PSO_0.grade, totalCases: 3, untiered: 1, d2: 1, d1: 0, c2: 0, c1: 1, b2: 0, b1: 1, a: 0}
  ] } ],
 totals: 
  { PO: 
     { grade: 'PO',
       a: 0,
       b1: 3,
       b2: 0,
       c1: 3,
       c2: 0,
       d1: 0,
       d2: 3,
       untiered: 3,
       totalCases: 9,
       numberOfType: 3 },
    PSO: 
     { grade: 'PSO',
       a: 0,
       b1: 3,
       b2: 0,
       c1: 3,
       c2: 0,
       d1: 0,
       d2: 3,
       untiered: 3,
       totalCases: 9,
       numberOfType: 3 } },
 detailsPercentages: 
  [ { linkId: 2, name: 'Todd Umptious', grades: [ { grade: 'PO', a: 0, b1: 50, b2: 0, c1: 50, c2: 0, d1: 0, d2: 50, untiered: 50, totalCases: 50 },
{ grade: 'PSO', a: 0, b1: 50, b2: 0, c1: 50, c2: 0, d1: 0, d2: 50, untiered: 50, totalCases: 50 } ] },
    { linkId: 3, name: 'Jerry Twig', grades: [ { grade: 'PO', a: 0, b1: 50, b2: 0, c1: 50, c2: 0, d1: 0, d2: 50, untiered: 50, totalCases: 50 },
    { grade: 'PSO', a: 0, b1: 50, b2: 0, c1: 50, c2: 0, d1: 0, d2: 50, untiered: 50, totalCases: 50 } ] },
    { linkId: 4, name: 'Jemima Racktool', grades: [ { grade: 'PO', a: 0, b1: 50, b2: 0, c1: 50, c2: 0, d1: 0, d2: 50, untiered: 50, totalCases: 50 },
    { grade: 'PSO', a: 0, b1: 50, b2: 0, c1: 50, c2: 0, d1: 0, d2: 50, untiered: 50, totalCases: 50 } ] } ],
 percentageTotals: 
  { PO: 
     { grade: 'PO',
       a: 0,
       b1: 50,
       b2: 0,
       c1: 50,
       c2: 0,
       d1: 0,
       d2: 50,
       untiered: 50,
       totalCases: 50,
       numberOfType: 3 },
    PSO: 
     { grade: 'PSO',
       a: 0,
       b1: 50,
       b2: 0,
       c1: 50,
       c2: 0,
       d1: 0,
       d2: 50,
       untiered: 50,
       totalCases: 50,
       numberOfType: 3 } } 
}