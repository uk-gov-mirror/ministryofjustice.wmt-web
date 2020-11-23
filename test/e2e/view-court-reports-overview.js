const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const crDataHelper = require('../helpers/data/court-reports-aggregated-data-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerId
let workloadOwnerGrade
let workloadOwnerDefaultUrl
let teamDefaultUrl
let lduDefaultUrl
let regionDefaultUrl
let nationalDefaultUrl

describe('View court-reports overview', function () {
  before(function () {
    authenticationHelper.login(authenticationHelper.users.Manager)
    return crDataHelper.selectIdsForCourtReporterWorkloadOwner()
      .then(function (results) {
        workloadOwnerId = results.filter((item) => item.table === 'workload_owner')[0].id
        workloadOwnerDefaultUrl = '/' + workloadTypes.COURT_REPORTS + '/offender-manager/' + workloadOwnerId
        teamDefaultUrl = '/' + workloadTypes.COURT_REPORTS + '/team/' + results.filter((item) => item.table === 'team')[0].id
        lduDefaultUrl = '/' + workloadTypes.COURT_REPORTS + '/ldu/' + results.filter((item) => item.table === 'ldu')[0].id
        regionDefaultUrl = '/' + workloadTypes.COURT_REPORTS + '/region/' + results.filter((item) => item.table === 'region')[0].id
        nationalDefaultUrl = '/' + workloadTypes.COURT_REPORTS + '/hmpps/0'
        return results
      })
      .then(function (builtInserts) {
        dataHelper.selectGradeForWorkloadOwner(workloadOwnerId)
          .then(function (gradeResult) {
            workloadOwnerGrade = gradeResult
          })
      })
  })

  it('should navigate to the court-reporter overview page', function () {
    return browser.url(workloadOwnerDefaultUrl + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('.sln-grade')
      .getText('.sln-grade')
      .then(function (text) {
        expect(text).to.equal(workloadOwnerGrade)
      })
  })

  it('should navigate to the team court-reports overview page', function () {
    return browser.url(teamDefaultUrl + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="' + workloadOwnerDefaultUrl + '"]')
      .waitForExist('.sln-table-overview')
      .getText('.sln-table-org-level')
      .then(function (text) {
        expect(text).to.equal('Offender Manager')
      })
  })

  it('should naviagte to the ldu court-reports overview page', function () {
    return browser.url(lduDefaultUrl + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="' + teamDefaultUrl + '"]')
      .waitForExist('.sln-table-overview')
      .getText('.sln-table-org-level')
      .then(function (text) {
        expect(text).to.equal('Team')
      })
  })

  it('should naviagte to the region court-reports overview page', function () {
    return browser.url(regionDefaultUrl + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="' + lduDefaultUrl + '"]')
      .waitForExist('.sln-table-overview')
      .getText('.sln-table-org-level')
      .then(function (text) {
        expect(text).to.equal('LDU Cluster')
      })
  })

  it('should navigate to the national court-reports overview page', function () {
    return browser.url(nationalDefaultUrl + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="' + regionDefaultUrl + '"]')
      .waitForExist('.sln-table-overview')
      .getText('.sln-table-org-level')
      .then(function (text) {
        expect(text).to.equal('Division')
      })
  })

  it('should navigate to overview page from any other tab', function () {
    return browser.url(workloadOwnerDefaultUrl + '/contracted-hours')
      .waitForExist('.sln-subnav')
      .click('[href="' + workloadOwnerDefaultUrl + '/overview"]')
      .waitForExist('.sln-grade')
      .waitForExist('.sln-subnav')
      .click('[href="' + workloadOwnerDefaultUrl + '/reductions"]')
      .waitForExist('.sln-subnav')
      .click('[href="' + workloadOwnerDefaultUrl + '/overview"]')
      .waitForExist('.sln-grade')
  })

  it('should allow the user to navigate down the org hierarchy from the national page', function () {
    return browser.url(nationalDefaultUrl + '/overview')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('National')
      })
      .click('[href="' + regionDefaultUrl + '"]')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Division')
      })
      .click('[href="' + lduDefaultUrl + '"]')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('LDU Cluster')
      })
      .click('[href="' + teamDefaultUrl + '"]')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Team')
      })
      .click('[href="' + workloadOwnerDefaultUrl + '"]')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Offender Manager')
      })
  })

  it('should contain breadcrumbs which allow the user to navigate up the org hierarchy', function () {
    return browser.url(workloadOwnerDefaultUrl)
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Offender Manager')
      })
      .waitForExist('[href="' + teamDefaultUrl + '"]')
      .waitForExist('[href="' + lduDefaultUrl + '"]')
      .waitForExist('[href="' + regionDefaultUrl + '"]')
      .waitForExist('[href="' + nationalDefaultUrl + '"]')
      .click('[href="' + teamDefaultUrl + '"]')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Team')
      })
      .click('[href="' + lduDefaultUrl + '"]')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('LDU Cluster')
      })
      .click('[href="' + regionDefaultUrl + '"]')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Division')
      })
      .click('[href="' + nationalDefaultUrl + '"]')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('National')
      })
  })

  after(function () {
    authenticationHelper.logout()
  })
})
