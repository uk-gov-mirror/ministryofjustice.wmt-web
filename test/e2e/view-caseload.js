const expect = require('chai').expect

const dataHelper = require('../helpers/data/aggregated-data-helper')

var workloadOwnerIds = []
var workloadOwnerDefaultUrl
var teamDefaultUrl
var lduDefaultUrl
var regionDefaultUrl
var nationalDefaultUrl

describe('View your caseload flow', () => {
  before(function () {
    return dataHelper.selectIdsForWorkloadOwner()
      .then(function (results) {
        workloadOwnerIds = results
        workloadOwnerDefaultUrl = '/offender-manager/' + workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
        teamDefaultUrl = '/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id
        lduDefaultUrl = '/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id
        regionDefaultUrl = '/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id
        nationalDefaultUrl = '/hmpps/0'
      })
  })

  describe('should navigate to the team caseload screen', () => {
    it('with the correct breadcrumbs, subnav, title and export button', () => {
      return browser.url(teamDefaultUrl + '/caseload')
        .waitForExist('.breadcrumbs')
        .waitForExist('.sln-subnav')
        .waitForExist('.sln-export')
        .waitForExist('[href="' + teamDefaultUrl + '/caseload/csv"]')
        .waitForExist('[href="' + teamDefaultUrl + '/overview"]')
        .waitForExist('[href="' + teamDefaultUrl + '/caseload-capacity"]')
        .waitForExist('[href="' + teamDefaultUrl + '/case-progress"]')
        .waitForExist('.sln-page-subtitle')
        .getText('.sln-page-subtitle')
        .then(function (text) {
          expect(text).to.equal('Team')
        })
    })

    it('with the correct caseload total summary for each case type', function () {
      return browser.url(teamDefaultUrl + '/caseload')
        .getText('#custodyTotal')
        .then(function (text) {
          var textTotal = text.split('\n')
          expect(Number(textTotal[0])).to.not.be.empty // eslint-disable-line
          expect(textTotal[1]).to.eql('Custody cases')
        })
        .getText('#communityTotal')
        .then(function (text) {
          var textTotal = text.split('\n')
          expect(Number(textTotal[0])).to.not.be.empty // eslint-disable-line
          expect(textTotal[1]).to.eql('Community cases')
        })
        .getText('#licenseTotal')
        .then(function (text) {
          var textTotal = text.split('\n')
          expect(Number(textTotal[0])).to.not.be.empty // eslint-disable-line
          expect(textTotal[1]).to.eql('License cases')
        })
    })

    it('with the correct tabs and tables', () => {
      return browser.url(teamDefaultUrl + '/caseload')
        .waitForExist('[href="#overall"]')
        .waitForExist('.sln-table-caseload')
        .waitForExist('[href="' + workloadOwnerDefaultUrl)
        .click('[href="#custody"]')
        .waitForExist('.sln-table-caseload')
        .click('[href="#community"]')
        .waitForExist('.sln-table-caseload')
        .click('[href="#license"]')
        .waitForExist('.sln-table-caseload')
    })
  })

  describe('should navigate to the LDU caseload screen', () => {
    it('with the correct table, breadcrumbs and export button', () => {
      return browser.url(lduDefaultUrl + '/caseload')
        .waitForExist('.sln-table-caseload')
        .waitForExist('.breadcrumbs')
        .waitForExist('.sln-export')
        .waitForExist('[href="' + lduDefaultUrl + '/caseload/csv"]')
        .waitForExist('.sln-page-subtitle')
        .getText('.sln-page-subtitle')
        .then(function (text) {
          expect(text).to.equal('LDU Cluster')
        })
    })
  })

  it('should be accessible via the Caseload tab on Team and LDUs default view', () => {
    return browser.url(nationalDefaultUrl)
      .click('[href="' + regionDefaultUrl + '"]')
      .click('[href="' + lduDefaultUrl + '"]')
      .click('[href="' + lduDefaultUrl + '/caseload"]')
      .waitForExist('.sln-table-caseload')
      .click('[href="' + lduDefaultUrl + '/overview"]')
      .click('[href="' + teamDefaultUrl + '"]')
      .click('[href="' + teamDefaultUrl + '/caseload"]')
      .waitForExist('.sln-table-caseload')
  })

  it('should be accessible via the Case Progress tab when on any other tab', () => {
    return browser.url(teamDefaultUrl)
      .click('[href="' + teamDefaultUrl + '/caseload"]')
      .waitForExist('.sln-table-caseload')
      .click('[href="' + teamDefaultUrl + '/case-progress"]')
      .click('[href="' + teamDefaultUrl + '/caseload"]')
      .waitForExist('.sln-table-caseload')
      .click('[href="' + teamDefaultUrl + '/caseload-capacity"]')
      .click('[href="' + teamDefaultUrl + '/caseload"]')
      .waitForExist('.sln-table-caseload')
  })

  describe('should navigate to the Region caseload screen', () => {
    it('with the correct table, breadcrumbs and export button', () => {
      return browser.url(regionDefaultUrl + '/caseload')
        .waitForExist('.sln-table-caseload')
        .waitForExist('.breadcrumbs')
        .waitForExist('.sln-export')
        .waitForExist('[href="' + regionDefaultUrl + '/caseload/csv"]')
        .waitForExist('.sln-page-subtitle')
        .getText('.sln-page-subtitle')
        .then(function (text) {
          expect(text).to.equal('Division')
        })
    })

    it('should be accessible via the Caseload tab on regions default view', () => {
      return browser.url(nationalDefaultUrl)
        .click('[href="' + regionDefaultUrl + '"]')
        .click('[href="' + regionDefaultUrl + '/caseload"]')
        .waitForExist('.sln-table-caseload')
    })

    it('should be accessible via the Case Progress tab when on any other tab', () => {
      return browser.url(regionDefaultUrl)
        .click('[href="' + regionDefaultUrl + '/caseload"]')
        .waitForExist('.sln-table-caseload')
        .click('[href="' + regionDefaultUrl + '/case-progress"]')
        .click('[href="' + regionDefaultUrl + '/caseload"]')
        .waitForExist('.sln-table-caseload')
        .click('[href="' + regionDefaultUrl + '/caseload-capacity"]')
        .click('[href="' + regionDefaultUrl + '/caseload"]')
        .waitForExist('.sln-table-caseload')
    })
  })

  describe('should navigate to the National caseload screen', () => {
    it('with the correct table, breadcrumbs and export button', () => {
      return browser.url(nationalDefaultUrl + '/caseload')
        .waitForExist('.sln-table-caseload')
        .waitForExist('.breadcrumbs')
        .waitForExist('.sln-export')
        .waitForExist('[href="' + nationalDefaultUrl + '/caseload/csv"]')
        .waitForExist('.sln-page-subtitle')
        .getText('.sln-page-subtitle')
        .then(function (text) {
          expect(text).to.equal('National')
        })
    })

    it('should be accessible via the Caseload tab on regions default view', () => {
      return browser.url(nationalDefaultUrl)
        .click('[href="' + nationalDefaultUrl + '/caseload"]')
        .waitForExist('.sln-table-caseload')
    })

    it('should be accessible via the Case Progress tab when on any other tab', () => {
      return browser.url(nationalDefaultUrl)
        .click('[href="' + nationalDefaultUrl + '/caseload"]')
        .waitForExist('.sln-table-caseload')
        .click('[href="' + nationalDefaultUrl + '/case-progress"]')
        .click('[href="' + nationalDefaultUrl + '/caseload"]')
        .waitForExist('.sln-table-caseload')
        .click('[href="' + nationalDefaultUrl + '/caseload-capacity"]')
        .click('[href="' + nationalDefaultUrl + '/caseload"]')
        .waitForExist('.sln-table-caseload')
    })
  })
})
