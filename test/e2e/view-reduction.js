const expect = require('chai').expect

const dataHelper = require('../helpers/data/aggregated-data-helper')

var offenderManagerId
var offenderManagerUrl

describe('View adding a new reduction', () => {
  before(function () {
    return dataHelper.getAnyExistingWorkloadOwnerId()
      .then(function (results) {
        offenderManagerId = results
        offenderManagerUrl = '/offender-manager/' + offenderManagerId + '/reductions'
      })
  })

  describe('should navigate to the add reduction', () => {
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
  })
})
