const expect = require('chai').expect

const dataHelper = require('../helpers/data/aggregated-data-helper')

var offenderManagerId
var reductionId
var reductionUrl

describe('View adding a new reduction', () => {
  before(function () {
    return dataHelper.getAnyExistingWorkloadOwnerIdWithActiveReduction()
        .then(function (results) {
          offenderManagerId = results.workloadOwnerId
          reductionId = results.reductionId
          reductionUrl = '/offender-manager/' + offenderManagerId + '/edit-reduction?reductionId=' + reductionId
        })
  })

  describe('should navigate to the edit reduction screen and be editable', () => {
    it('with the correct breadcrumbs and heading title', () => {
      return browser.url(reductionUrl)
        .waitForExist('.breadcrumbs')
        .waitForExist('.heading-xlarge')
        .getText('.heading-xlarge')
        .then(function (text) {
          expect(text).to.equal('Reduction')
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
})
