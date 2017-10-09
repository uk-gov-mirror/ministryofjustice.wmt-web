const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')

var offenderManagerId
var reductionId
var reductionUrl

describe('View adding a new reduction', () => {
  before(function () {
    authenticationHerlp.login(authenticationHerlp.users.Manager)
    return dataHelper.getAnyExistingWorkloadOwnerIdWithActiveReduction()
      .then(function (results) {
        offenderManagerId = results.workloadOwnerId
        reductionId = results.reductionId
        reductionUrl = '/offender-manager/' + offenderManagerId + '/edit-reduction?reductionId=' + reductionId
      }).then(function () {
        return browser.url(reductionUrl).waitForExist('.breadcrumbs')
      })
  })

  describe('should navigate to the edit reduction screen', () => {
    it('with the archive and delete links', () => {
      return browser.url(reductionUrl)
        .waitForExist('.breadcrumbs')
        .waitForExist('.heading-xlarge')
        .getText('.heading-xlarge')
        .then(function (text) {
          expect(text).to.equal('Reduction')
        })
        .getText('=Archive reduction')
        .then(function (text) {
          expect(text).to.equal('Archive reduction')
        })
        .getText('=Delete reduction')
        .then(function (text) {
          expect(text).to.equal('Delete reduction')
        })
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
          browser.setValue('#redStartDay', '1')
          browser.setValue('#redStartMonth', '2')
          browser.setValue('#redStartYear', '2017')
          browser.setValue('#redStartDay', '1')
          browser.setValue('#redStartMonth', '2')
          browser.setValue('#redStartYear', '2018')
          browser.setValue('#notes', 'New note')
          browser.submitForm('#reductionForm')
        })
    })
  })

  after(function () {
    authenticationHerlp.logout()
  })
})
