#!/bin/bash

# Script to run pa11y accessibility checker against local running copy
# requires pa11y installed globally `npm install -g pa11y`
# requires existing workload data in the application so screens load correctly

if [ $# -ne 5 ]; then
  echo $0: usage: ./run-pa11y regionId lduId teamId omId crId
  exit 1
fi

regionId=$1
lduId=$2
teamId=$3
omId=$4
crId=$5

pa11yCommand="""pa11y --standard WCAG2AA --ignore "warning\;notice" --hide-elements "div[aria-hidden=true],a[role=dynamic],a[role=anchor-div]" """

if [ $WMT_BASE_URL ]
then 
  host=$WMT_BASE_URL 
else
  host="http://localhost:3000"
fi 

urls=()
errors=false

court_reports_base="$host/court-reports"
probation_base="$host/probation"

offender_manager='offender-manager'
team='team'
ldu='ldu'
region='region'
national='hmpps/0'

# Root
urls+=("$host/")

offender_manager='offender-manager'
team='team'
ldu='ldu'
region='region'
national='hmpps/0'

# Capacity
capacity_url='caseload-capacity'
urls+=("$probation_base/$offender_manager/$omId/$capacity_url")
urls+=("$probation_base/$team/$teamId/$capacity_url")
urls+=("$probation_base/$ldu/$lduId/$capacity_url")
urls+=("$probation_base/$region/$regionId/$capacity_url")

# Case Progress
case_progress_url='case-progress'
urls+=("$probation_base/$offender_manager/$omId/$case_progress_url")
urls+=("$probation_base/$team/$teamId/$case_progress_url")
urls+=("$probation_base/$ldu/$lduId/$case_progress_url")
urls+=("$probation_base/$region/$regionId/$case_progress_url")

# Overview
overview_url='overview'
urls+=("$probation_base/$offender_manager/$crId/$overview_url")
urls+=("$probation_base/$team/$teamId/$overview_url")
urls+=("$probation_base/$ldu/$lduId/$overview_url")
urls+=("$probation_base/$region/$regionId/$overview_url")
urls+=("$probation_base/$national/$overview_url")

# Court Reports Overview
urls+=("$court_reports_base/$offender_manager/$crId/$overview_url")
urls+=("$court_reports_base/$team/$teamId/$overview_url")
urls+=("$court_reports_base/$ldu/$lduId/$overview_url")
urls+=("$court_reports_base/$region/$regionId/$overview_url")
urls+=("$court_reports_base/$national/$overview_url")

# Caseload
caseload_url='caseload'
urls+=("$probation_base/$team/$teamId/$caseload_url")
urls+=("$probation_base/$ldu/$lduId/$caseload_url")
urls+=("$probation_base/$region/$regionId/$caseload_url")
urls+=("$probation_base/$national/$caseload_url")

# Contracted hours
contracted_hours_url='contracted-hours'
urls+=("$probation_base/$offender_manager/$omId/$contracted_hours_url")
urls+=("$probation_base/$court_reports/$offender_manager/$crId/$contracted_hours_url")

# Reduction
reductions_url='reductions'
add_reductions_url='add-reduction'
urls+=("$probation_base/$offender_manager/$omId/$reductions_url")
urls+=("$probation_base/$offender_manager/$omId/$add_reductions_url")
urls+=("$court_reports_base/$offender_manager/$crId/$reductions_url")
urls+=("$court_reports_base/$offender_manager/$crId/$add_reductions_url")

# Admin
admin='admin'
add_user='user'
add_user_rights='user-rights'
workload_points='workload-points'
urls+=("$host/$admin/$workload_points")
urls+=("$host/$admin/$add_user")
urls+=("$host/$admin/$add_user_rights")

for url in "${urls[@]}"
do
  $pa11yCommand $url
  if [ $? != 0 ]
  then
    errors=true
  fi
done

if [ "$errors" = true ]
then
  echo "Errors found"
  exit 1
fi
