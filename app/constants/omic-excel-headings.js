// WMT0160: add new tiers
const caseHeaders = [
  'Com Untiered',
  'Com G',
  'Com F',
  'Com E',
  'Com D2',
  'Com D1',
  'Com C2',
  'Com C1',
  'Com B2',
  'Com B1',
  'Com A',
  'Lic Untiered',
  'Lic G',
  'Lic F',
  'Lic E',
  'Lic D2',
  'Lic D1',
  'Lic C2',
  'Lic C1',
  'Lic B2',
  'Lic B1',
  'Lic A',
  'Cus Untiered',
  'Cus G',
  'Cus F',
  'Cus E',
  'Cus D2',
  'Cus D1',
  'Cus C2',
  'Cus C1',
  'Cus B2',
  'Cus B1',
  'Cus A'
]
const nameHeaders = [
  'Region',
  'Probation Delivery Unit',
  'Team',
  'OM Name',
  'Grade',
  'Total Cases',
  'Nominal Target',
  'Contracted Hours',
  'Default Contracted Hours',
  'Reduction Hours',
  'CMS Points',
  'CMS %',
  'GS Points',
  'GS %', 'SDR Points',
  'FDR Points',
  'Parom Points',
  'ARMS Comm Points',
  'ARMS Licence Points',
  'Custody Points',
  'Licence Points',
  'Overall Total Points',
  'Available Points',
  'Remaining Points',
  'Current % Capacity'
]
const reportHeaders = [
  'SDR',
  'FDR (SDR Conversion)',
  'Parom',
  'ARMS Comm',
  'ARMS Licence'
]
const caseTypeHeaders = [
  'Active Cases',
  'Warrants (0%)',
  'UPW (100%)',
  'Overdue Terminations (0%)'
]

module.exports.caseHeaders = caseHeaders

module.exports.nameHeaders = nameHeaders

module.exports.reportHeaders = reportHeaders

module.exports.caseTypeHeaders = caseTypeHeaders
