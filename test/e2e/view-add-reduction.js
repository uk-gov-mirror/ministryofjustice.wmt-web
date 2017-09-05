const expect = require('chai').expect

const dataHelper = require('../helpers/data/aggregated-data-helper')

var offenderManagerId
var offenderManagerUrl

describe('View adding a new reduction', () => {
  before(function () {
    return dataHelper.getAnyExistingWorkloadOwnerId()
        .then(function (results) {
          offenderManagerId = results
          offenderManagerUrl = '/offender-manager/' + offenderManagerId + '/add-reduction'
        })
  })

  describe('should navigate to the add reduction screen', () => {
    it('with the correct breadcrumbs and heading title', () => {
      return browser.url(offenderManagerUrl)
        .waitForExist('.breadcrumbs')
        .waitForExist('.heading-xlarge')
        .getText('.heading-xlarge')
        .then(function (text) {
          expect(text).to.equal('New reduction')
        })
    })

    it('and submit a new reduction form', () => {
      browser.setValue('#reductionType', 'Reduction 1')
      browser.setValue('#hours', '10')
      browser.setValue('#red_start_day', '1')
      browser.setValue('#red_start_month', '2')
      browser.setValue('#red_start_year', '2017')
      browser.setValue('#red_start_day', '1')
      browser.setValue('#red_start_month', '2')
      browser.setValue('#red_start_year', '2018')
      browser.setValue('#notes', 'New note')
      browser.submitForm('#reductionForm')
    })
  })
})
