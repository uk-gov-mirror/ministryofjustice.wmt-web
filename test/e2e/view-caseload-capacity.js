const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')
const workloadCapacityHelper = require('../helpers/data/aggregated-data-helper')

var workloadOwnerIds = []
var workloadOwnerDefaultUrl
var teamDefaultUrl
var lduDefaultUrl
var regionDefaultUrl
var nationalDefaultUrl

describe('View your caseload capacity flow', () => {
  before(function () {
    authenticationHerlp.login(authenticationHerlp.users.Staff)
    return workloadCapacityHelper.selectIdsForWorkloadOwner()
      .then(function (results) {
        workloadOwnerIds = results
        workloadOwnerDefaultUrl = '/offender-manager/' + workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
        teamDefaultUrl = '/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id
        lduDefaultUrl = '/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id
        regionDefaultUrl = '/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id
        nationalDefaultUrl = '/hmpps/0'
      }).then(function () {
        return browser.url(workloadOwnerDefaultUrl).waitForExist('.breadcrumbs')
      })
  })

  it('should navigate to the workload owner caseload capacity screen', () => {
    return browser.url(workloadOwnerDefaultUrl + '/caseload-capacity')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="' + workloadOwnerDefaultUrl + '/caseload-capacity"]')
      .waitForExist('[href="' + workloadOwnerDefaultUrl + '/case-progress"]')
      .waitForExist('.plot-container.plotly')
      .waitForExist('.sln-page-subtitle')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Offender Manager')
      })
  })

  it('should navigate to the team caseload capacity screen', () => {
    return browser.url(teamDefaultUrl + '/caseload-capacity')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="' + teamDefaultUrl + '/caseload-capacity"]')
      .waitForExist('[href="' + teamDefaultUrl + '/case-progress"]')
      .waitForExist('.plot-container.plotly')
      .waitForExist('.sln-page-subtitle')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Team')
      })
  })

  it('should navigate to the ldu caseload capacity screen', () => {
    return browser.url(lduDefaultUrl + '/caseload-capacity')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="' + lduDefaultUrl + '/caseload-capacity"]')
      .waitForExist('[href="' + lduDefaultUrl + '/case-progress"]')
      .waitForExist('.plot-container.plotly')
      .waitForExist('.sln-page-subtitle')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('LDU Cluster')
      })
  })

  it('should navigate to the region caseload capacity screen', () => {
    return browser.url(regionDefaultUrl + '/caseload-capacity')
    .waitForExist('.breadcrumbs')
    .waitForExist('.sln-subnav')
    .waitForExist('[href="' + regionDefaultUrl + '/caseload-capacity"]')
    .waitForExist('[href="' + regionDefaultUrl + '/case-progress"]')
    .waitForExist('.plot-container.plotly')
    .waitForExist('.sln-page-subtitle')
    .getText('.sln-page-subtitle')
    .then(function (text) {
      expect(text).to.equal('Division')
    })
  })

  it('should navigate to the national caseload capacity screen', () => {
    return browser.url(nationalDefaultUrl + '/caseload-capacity')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="' + nationalDefaultUrl + '/caseload-capacity"]')
      .waitForExist('[href="' + nationalDefaultUrl + '/case-progress"]')
      .waitForExist('.js-plotly-plot')
      .waitForExist('.breadcrumbs', true)
      .waitForExist('.sln-page-subtitle')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('National')
      })
  })

  it('should be accessible via the Capacity tab on each org levels default view', () => {
    return browser.url(nationalDefaultUrl)
      .click('[href="' + nationalDefaultUrl + '/caseload-capacity"]')
      .waitForExist('#plotly-div-line')
      .click('[href="' + nationalDefaultUrl + '/overview"]')
      .click('[href="' + regionDefaultUrl + '"]')
      .click('[href="' + regionDefaultUrl + '/caseload-capacity"]')
      .waitForExist('#plotly-div-line')
      .click('[href="' + regionDefaultUrl + '/overview"]')
      .click('[href="' + lduDefaultUrl + '"]')
      .click('[href="' + lduDefaultUrl + '/caseload-capacity"]')
      .waitForExist('#plotly-div-line')
      .click('[href="' + lduDefaultUrl + '/overview"]')
      .click('[href="' + teamDefaultUrl + '"]')
      .click('[href="' + teamDefaultUrl + '/caseload-capacity"]')
      .waitForExist('#plotly-div-line')
      .click('[href="' + teamDefaultUrl + '/overview"]')
      .click('[href="' + workloadOwnerDefaultUrl + '"]')
      .click('[href="' + workloadOwnerDefaultUrl + '/caseload-capacity"]')
      .waitForExist('#plotly-div-line')
  })

  it('should be accessible via the Capacity tab when on any other tab', () => {
    return browser.url(teamDefaultUrl)
      .click('[href="' + teamDefaultUrl + '/caseload-capacity"]')
      .waitForExist('#plotly-div-line')
      .click('[href="' + teamDefaultUrl + '/case-progress"]')
      .click('[href="' + teamDefaultUrl + '/caseload-capacity"]')
      .waitForExist('#plotly-div-line')
      .click('[href="' + teamDefaultUrl + '/caseload"]')
      .click('[href="' + teamDefaultUrl + '/caseload-capacity"]')
      .waitForExist('#plotly-div-line')
  })

  after(function () {
    authenticationHerlp.logout()
  })
})
