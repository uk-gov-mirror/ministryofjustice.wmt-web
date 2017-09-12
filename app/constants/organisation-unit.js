module.exports = {
  OFFENDER_MANAGER: {
    name: 'offender-manager',
    ref: 'I',
    displayText: 'Offender Manager',
    capacityView: 'individual_capacity_view',
    caseProgressView: 'individual_case_progress_view'
  },
  TEAM: {
    name: 'team',
    ref: 'T',
    displayText: 'Team',
    capacityView: 'team_capacity_view',
    caseProgressView: 'team_case_progress_view',
    overviewView: 'team_case_overview',
    caseloadView: 'team_caseload_view',
    childOrganisationLevel: 'offender-manager' },
  LDU: {
    name: 'ldu',
    ref: 'L',
    displayText: 'LDU Cluster',
    capacityView: 'ldu_capacity_view',
    caseProgressView: 'ldu_case_progress_view',
    overviewView: 'ldu_case_overview',
    caseloadView: 'ldu_caseload_view',
    childOrganisationLevel: 'team' },
  REGION: {
    name: 'region',
    ref: 'R',
    displayText: 'Division',
    capacityView: 'region_capacity_view',
    caseProgressView: 'region_case_progress_view',
    overviewView: 'region_case_overview',
    caseloadView: 'region_caseload_view',
    childOrganisationLevel: 'ldu' },
  NATIONAL: {
    name: 'hmpps',
    ref: 'N',
    displayText: 'National',
    capacityView: 'national_capacity_view',
    caseProgressView: 'national_case_progress_view',
    overviewView: 'national_case_overview',
    caseloadView: 'national_caseload_view',
    childOrganisationLevel: 'region' }
}
