const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')
const caseProgressDataHelper = require('../helpers/data/aggregated-data-helper')

var workloadOwnerIds = []
var workloadOwnerDefaultUrl
var teamDefaultUrl
var lduDefaultUrl
var regionDefaultUrl
var nationalDefaultUrl

describe('View caseload progress flow', () => {
  before(function () {
    authenticationHerlp.login(authenticationHerlp.users.Staff)
    return caseProgressDataHelper.selectIdsForWorkloadOwner()
      .then(function (results) {
        workloadOwnerIds = results
        workloadOwnerDefaultUrl = '/offender-manager/' + workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
        teamDefaultUrl = '/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id
        lduDefaultUrl = '/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id
        regionDefaultUrl = '/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id
        nationalDefaultUrl = '/hmpps/0'
      }).then(function () {
        return browser.url(workloadOwnerDefaultUrl + '/caseload-capacity').waitForExist('.breadcrumbs')
      })
  })

  it('should navigate to the workload owner caseload progress screen', () => {
    return browser.url(workloadOwnerDefaultUrl + '/caseload-capacity')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      // Check the href for case progress using the id exists
      .click('[href="' + workloadOwnerDefaultUrl + '/case-progress"]')
      .waitForExist('.js-plotly-plot')
      .waitForExist('.sln-page-subtitle')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Offender Manager')
      })
  })

  it('should navigate to the team caseload progress screen', () => {
    return browser.url(teamDefaultUrl + '/case-progress')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="' + teamDefaultUrl + '/caseload-capacity"]')
      .waitForExist('[href="' + teamDefaultUrl + '/case-progress"]')
      .waitForExist('.js-plotly-plot')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Team')
      })
  })

  it('should navigate to the ldu caseload progress screen', () => {
    return browser.url(lduDefaultUrl + '/case-progress')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="' + lduDefaultUrl + '/caseload-capacity"]')
      .waitForExist('[href="' + lduDefaultUrl + '/case-progress"]')
      .waitForExist('.js-plotly-plot')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('LDU Cluster')
      })
  })

  it('should navigate to the region caseload progress screen', () => {
    return browser.url(regionDefaultUrl + '/case-progress')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="' + regionDefaultUrl + '/caseload-capacity"]')
      .waitForExist('[href="' + regionDefaultUrl + '/case-progress"]')
      .waitForExist('.js-plotly-plot')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Division')
      })
  })

  it('should navigate to the national caseload progress screen', () => {
    return browser.url(nationalDefaultUrl + '/case-progress')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="' + nationalDefaultUrl + '/caseload-capacity"]')
      .waitForExist('[href="' + nationalDefaultUrl + '/case-progress"]')
      .waitForExist('.js-plotly-plot')
      .waitForExist('.breadcrumbs', true)
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('National')
      })
  })

  it('should be accessible via the Case Progress tab on each org levels default view', () => {
    return browser.url(nationalDefaultUrl)
      .click('[href="' + nationalDefaultUrl + '/case-progress"]')
      .waitForExist('#plotly-div-cases')
      .click('[href="' + nationalDefaultUrl + '/overview"]')
      .click('[href="' + regionDefaultUrl + '"]')
      .click('[href="' + regionDefaultUrl + '/case-progress"]')
      .waitForExist('#plotly-div-cases')
      .click('[href="' + regionDefaultUrl + '/overview"]')
      .click('[href="' + lduDefaultUrl + '"]')
      .click('[href="' + lduDefaultUrl + '/case-progress"]')
      .waitForExist('#plotly-div-cases')
      .click('[href="' + lduDefaultUrl + '/overview"]')
      .click('[href="' + teamDefaultUrl + '"]')
      .click('[href="' + teamDefaultUrl + '/case-progress"]')
      .waitForExist('#plotly-div-cases')
      .click('[href="' + teamDefaultUrl + '/overview"]')
      .click('[href="' + workloadOwnerDefaultUrl + '"]')
      .click('[href="' + workloadOwnerDefaultUrl + '/case-progress"]')
      .waitForExist('#plotly-div-cases')
  })

  it('should be accessible via the Case Progress tab when on any other tab', () => {
    return browser.url(teamDefaultUrl)
      .click('[href="' + teamDefaultUrl + '/case-progress"]')
      .waitForExist('#plotly-div-cases')
      .click('[href="' + teamDefaultUrl + '/caseload"]')
      .click('[href="' + teamDefaultUrl + '/case-progress"]')
      .waitForExist('#plotly-div-cases')
      .click('[href="' + teamDefaultUrl + '/caseload-capacity"]')
      .click('[href="' + teamDefaultUrl + '/case-progress"]')
      .waitForExist('#plotly-div-cases')
  })

  after(function () {
    authenticationHerlp.logout()
  })
})
