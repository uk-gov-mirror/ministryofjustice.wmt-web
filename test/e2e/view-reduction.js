const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')

var offenderManagerId
var offenderManagerUrl
var reductionId
var reductionUrl

describe('View adding a new reduction', () => {
  before(function () {
    authenticationHerlp.login(authenticationHerlp.users.Manager)
    return dataHelper.getAnyExistingWorkloadOwnerIdWithActiveReduction()
      .then(function (results) {
        offenderManagerId = results.workloadOwnerId
        offenderManagerUrl = '/offender-manager/' + offenderManagerId + '/reductions'
        reductionId = results.reductionId
        reductionUrl = '/offender-manager/' + offenderManagerId + '/edit-reduction?reductionId=' + reductionId
      }).then(function () {
        return browser.url(offenderManagerUrl).waitForExist('.breadcrumbs')
      })
  })

  describe('should navigate to the reduction', () => {
    it('with the correct breadcrumbs and heading title', () => {
      return browser.url(offenderManagerUrl)
        .waitForExist('.breadcrumbs')
        .waitForExist('.sln-subnav')
        .waitForExist('.sln-page-subtitle')
        .getText('.sln-page-subtitle')
        .then(function (text) {
          expect(text).to.equal('Offender Manager')
        })
    })

    it('with an active table', () => {
      return browser.url(offenderManagerUrl)
        .getText('#headingActive')
        .then(function (text) {
          expect(text).to.equal('Active')
        })
        .getText('#active_type')
        .then(function (text) {
          expect(text).to.equal('Type')
        })
        .getText('#active_hours')
        .then(function (text) {
          expect(text).to.equal('Hours')
        })
        .getText('#active_start_date')
        .then(function (text) {
          expect(text).to.equal('Start date')
        })
        .getText('#active_end_date')
        .then(function (text) {
          expect(text).to.equal('End date')
        })
    })

    it('with a scheduled table', () => {
      return browser.url(offenderManagerUrl)
        .getText('#headingScheduled')
        .then(function (text) {
          expect(text).to.equal('Scheduled')
        })
        .getText('#scheduled_type')
        .then(function (text) {
          expect(text).to.equal('Type')
        })
        .getText('#scheduled_hours')
        .then(function (text) {
          expect(text).to.equal('Hours')
        })
        .getText('#scheduled_start_date')
        .then(function (text) {
          expect(text).to.equal('Start date')
        })
        .getText('#scheduled_end_date')
        .then(function (text) {
          expect(text).to.equal('End date')
        })
    })
    it('with an archived table', () => {
      return browser.url(offenderManagerUrl)
        .getText('#headingArchived')
        .then(function (text) {
          expect(text).to.equal('Archived')
        })
        .getText('#archived_type')
        .then(function (text) {
          expect(text).to.equal('Type')
        })
        .getText('#archived_hours')
        .then(function (text) {
          expect(text).to.equal('Hours')
        })
        .getText('#archived_start_date')
        .then(function (text) {
          expect(text).to.equal('Start date')
        })
        .getText('#archived_end_date')
        .then(function (text) {
          expect(text).to.equal('End date')
        })
    })

    it('should be able to navigate to existing reduction screen', () => {
      return browser.url(offenderManagerUrl)
        .waitForExist('.breadcrumbs')
        .waitForExist('.sln-subnav')
        .waitForExist('.sln-page-subtitle')
        .waitForExist('[href="' + reductionUrl + '"]')
        .click('[href="' + reductionUrl + '"]')
        .waitForExist('.heading-xlarge')
        .getText('.heading-xlarge')
        .then(function (text) {
          expect(text).to.equal('Reduction')
        })
    })
  })

  after(function () {
    authenticationHerlp.logout()
  })
})
