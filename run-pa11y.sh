#!/bin/bash

# Script to run pa11y accessibility checker against local running copy
# generates html reports stored in test/accessibility
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

# Root
pa11y --standard WCAG2AA --ignore "notice" --hide-elements 'div[role=presentation]' --reporter html "http://localhost:3000/" > "test/accessibility/001-root.html"

# Caseload Capacity
capacity_url='caseload-capacity'
pa11y --standard WCAG2AA --ignore "notice" --hide-elements 'div[role=presentation]' --reporter html "http://localhost:3000/offender-manager/$omId/$capacity_url" > "test/accessibility/002-om-$capacity_url.html"
pa11y --standard WCAG2AA --ignore "notice" --hide-elements 'div[role=presentation]' --reporter html "http://localhost:3000/team/$teamId/$capacity_url" > "test/accessibility/003-team-$capacity_url.html"
pa11y --standard WCAG2AA --ignore "notice" --hide-elements 'div[role=presentation]' --reporter html "http://localhost:3000/ldu/$lduId/$capacity_url" > "test/accessibility/004-ldu-$capacity_url.html"
pa11y --standard WCAG2AA --ignore "notice" --hide-elements 'div[role=presentation]' --reporter html "http://localhost:3000/region/$regionId/$capacity_url" > "test/accessibility/005-region-$capacity_url.html"

# Case Progress
case_progress_url='case-progress'
pa11y --standard WCAG2AA --ignore "notice" --hide-elements 'div[role=presentation]' --reporter html "http://localhost:3000/offender-manager/$omId/$case_progress_url" > "test/accessibility/006-om-$case_progress_url.html"
pa11y --standard WCAG2AA --ignore "notice" --hide-elements 'div[role=presentation]' --reporter html "http://localhost:3000/team/$teamId/$case_progress_url" > "test/accessibility/007-team-case-$case_progress_url.html"
pa11y --standard WCAG2AA --ignore "notice" --hide-elements 'div[role=presentation]' --reporter html "http://localhost:3000/ldu/$lduId/$case_progress_url" > "test/accessibility/008-ldu-case-$case_progress_url.html"
pa11y --standard WCAG2AA --ignore "notice" --hide-elements 'div[role=presentation]' --reporter html "http://localhost:3000/region/$regionId/$case_progress_url" > "test/accessibility/009-region-$case_progress_url.html"
