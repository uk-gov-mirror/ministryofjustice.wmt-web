// WMT0229: add new tiers
const caseHeaders = [
  'Com Untiered',
  'Com D0',
  'Com D1',
  'Com D2',
  'Com D3',
  'Com C0',
  'Com C1',
  'Com C2',
  'Com C3',
  'Com B0',
  'Com B1',
  'Com B2',
  'Com B3',
  'Com A0',
  'Com A1',
  'Com A2',
  'Com A3',
  'Lic Untiered',
  'Lic D0',
  'Lic D1',
  'Lic D2',
  'Lic D3',
  'Lic C0',
  'Lic C1',
  'Lic C2',
  'Lic C3',
  'Lic B0',
  'Lic B1',
  'Lic B2',
  'Lic B3',
  'Lic A0',
  'Lic A1',
  'Lic A2',
  'Lic A3',
  'Cus Untiered',
  'Cus D0',
  'Cus D1',
  'Cus D2',
  'Cus D3',
  'Cus C0',
  'Cus C1',
  'Cus C2',
  'Cus C3',
  'Cus B0',
  'Cus B1',
  'Cus B2',
  'Cus B3',
  'Cus A0',
  'Cus A1',
  'Cus A2',
  'Cus A3'
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
  'Total Caseload Points',
  'Total Caseload Points - T2A',
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
