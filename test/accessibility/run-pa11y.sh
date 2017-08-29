#!/bin/bash

# Script to run pa11y accessibility checker against local running copy
# requires pa11y installed globally `npm install -g pa11y`
# requires existing workload data in the application so screens load correctly

if [ $# -ne 4 ]; then
  echo $0: usage: ./run-pa11y regionId lduId teamId omId
  exit 1
fi

regionId=$1
lduId=$2
teamId=$3
omId=$4

pa11yCommand="""pa11y --standard WCAG2AA --ignore "warning\;notice" --hide-elements "div[role=presentation],a[role=dynamic]" """

if [ $WMT_BASE_URL ]
then 
  host=$WMT_BASE_URL 
else
  host="http://localhost:3000"
fi 

urls=()
errors=false

# Root
urls+=("$host/")

# Capacity
capacity_url='caseload-capacity'
urls+=("$host/offender-manager/$omId/$capacity_url")
urls+=("$host/team/$teamId/$capacity_url")
urls+=("$host/ldu/$lduId/$capacity_url")
urls+=("$host/region/$regionId/$capacity_url")

# Case Progress
case_progress_url='case-progress'
urls+=("$host/offender-manager/$omId/$case_progress_url")
urls+=("$host/team/$teamId/$case_progress_url")
urls+=("$host/ldu/$lduId/$case_progress_url")
urls+=("$host/region/$regionId/$case_progress_url")

# Overview
overview_url='overview'
urls+=("$host/offender-manager/$omId/$overview_url")
urls+=("$host/team/$teamId/$overview_url")
urls+=("$host/ldu/$lduId/$overview_url")
urls+=("$host/region/$regionId/$overview_url")
urls+=("$host/hmpps/0/$overview_url")

# Caseload
caseload_url='caseload'
urls+=("$host/team/$teamId/$caseload_url")
urls+=("$host/ldu/$lduId/$caseload_url")

# Reduction
reduction_url='reduction'
urls+=("$host/offender-manager/$omId/$reduction_url")

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