const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')

var workloadOwnerIds = []
var workloadOwnerId
var workloadOwnerGrade
var workloadOwnerDefaultUrl
var teamDefaultUrl
var lduDefaultUrl
var regionDefaultUrl
var nationalDefaultUrl

describe('View overview', function () {
  before(function () {
    authenticationHerlp.login(authenticationHerlp.users.Staff)
    return dataHelper.selectIdsForWorkloadOwner()
      .then(function (results) {
        workloadOwnerIds = results
        workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
        workloadOwnerDefaultUrl = '/offender-manager/' + workloadOwnerId
        teamDefaultUrl = '/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id
        lduDefaultUrl = '/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id
        regionDefaultUrl = '/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id
        nationalDefaultUrl = '/hmpps/0'
        return results
      })
      .then(function (builtInserts) {
        dataHelper.selectGradeForWorkloadOwner(workloadOwnerId)
        .then(function (gradeResult) {
          workloadOwnerGrade = gradeResult
        })
      }).then(function () {
        return browser.url(workloadOwnerDefaultUrl + '/overview').waitForExist('.breadcrumbs')
      })
  })

  it('should navigate to the workload owner overview page', function () {
    return browser.url(workloadOwnerDefaultUrl + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('.sln-export')
      .waitForExist('[href="' + workloadOwnerDefaultUrl + '/overview/csv"]')
      .waitForExist('.sln-grade')
      .getText('.sln-grade')
      .then(function (text) {
        expect(text).to.equal(workloadOwnerGrade)
      })
  })

  it('should navigate to the team overview page', function () {
    return browser.url(teamDefaultUrl + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('.sln-export')
      .waitForExist('[href="' + teamDefaultUrl + '/overview/csv"]')
      .waitForExist('[href="' + workloadOwnerDefaultUrl + '"]')
      .getText('.sln-table-org-level')
      .then(function (text) {
        expect(text).to.equal('Offender Manager')
      })
  })

  it('should naviagte to the ldu overview page', function () {
    return browser.url(lduDefaultUrl + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('.sln-export')
      .waitForExist('[href="' + lduDefaultUrl + '/overview/csv"]')
      .waitForExist('[href="' + teamDefaultUrl + '"]')
      .getText('.sln-table-org-level')
      .then(function (text) {
        expect(text).to.equal('Team')
      })
  })

  it('should naviagte to the region overview page', function () {
    return browser.url(regionDefaultUrl + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('.sln-export')
      .waitForExist('[href="' + regionDefaultUrl + '/overview/csv"]')
      .waitForExist('[href="' + lduDefaultUrl + '"]')
      .getText('.sln-table-org-level')
      .then(function (text) {
        expect(text).to.equal('LDU Cluster')
      })
  })

  it('should navigate to the national overview page', function () {
    return browser.url(nationalDefaultUrl + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('.sln-export')
      .waitForExist('[href="' + nationalDefaultUrl + '/overview/csv"]')
      .waitForExist('[href="' + regionDefaultUrl + '"]')
      .getText('.sln-table-org-level')
      .then(function (text) {
        expect(text).to.equal('Division')
      })
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
    authenticationHerlp.logout()
  })
})
