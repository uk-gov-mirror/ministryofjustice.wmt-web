module.exports = {
  OFFENDER_MANAGER: {
    name: 'offender-manager',
    ref: 'I',
    displayText: 'Offender Manager',
    capacityView: 'individual_capacity_view',
    caseProgressView: 'individual_case_progress_view',
    courtReporterOverview: 'individual_court_reporter_overview'
  },
  TEAM: {
    name: 'team',
    ref: 'T',
    displayText: 'Team',
    capacityView: 'team_capacity_view',
    capacityBreakdownView: 'team_capacity_breakdown_view',
    caseProgressView: 'team_case_progress_view',
    overviewView: 'team_case_overview',
    caseloadView: 'team_caseload_view',
    outstandingReportsView: 'team_outstanding_reports_view',
    courtReporterOverview: 'team_court_reporter_overview',
    childOrganisationLevel: 'offender-manager'
  },
  LDU: {
    name: 'ldu',
    ref: 'L',
    displayText: 'Probation Delivery Unit',
    capacityView: 'ldu_capacity_view',
    capacityBreakdownView: 'ldu_capacity_breakdown_view',
    caseProgressView: 'ldu_case_progress_view',
    overviewView: 'ldu_case_overview',
    caseloadView: 'ldu_caseload_view',
    outstandingReportsView: 'ldu_outstanding_reports_view',
    courtReporterOverview: 'ldu_court_reporter_overview',
    childOrganisationLevel: 'team'
  },
  REGION: {
    name: 'region',
    ref: 'R',
    displayText: 'Region',
    capacityView: 'region_capacity_view',
    capacityBreakdownView: 'region_capacity_breakdown_view',
    caseProgressView: 'region_case_progress_view',
    overviewView: 'region_case_overview',
    caseloadView: 'region_caseload_view',
    outstandingReportsView: 'region_outstanding_reports_view',
    courtReporterOverview: 'region_court_reporter_overview',
    childOrganisationLevel: 'ldu'
  },
  NATIONAL: {
    name: 'hmpps',
    ref: 'N',
    displayText: 'National',
    capacityView: 'national_capacity_view',
    capacityBreakdownView: 'national_capacity_breakdown_view',
    caseProgressView: 'national_case_progress_view',
    overviewView: 'national_case_overview',
    caseloadView: 'national_caseload_view',
    outstandingReportsView: 'national_outstanding_reports_view',
    courtReporterOverview: 'national_court_reporter_overview',
    childOrganisationLevel: 'region'
  }
}
