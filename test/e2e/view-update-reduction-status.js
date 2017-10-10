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

  describe('Clicking on Archive reduction link', function () {
    it('should post the reduction for a ARCHIVE status', function () {
      return browser.url(reductionUrl)
        .getAttribute('=Archive reduction', 'href')
        .then(function (text) {
          expect(text).to.equal('javascript:document.archiveReduction.submit()')
        })
    })

    it('should post the reduction for a DELETE status', function () {
      return browser.url(reductionUrl)
        .getAttribute('=Delete reduction', 'href')
        .then(function (text) {
          expect(text).to.equal('javascript:document.deleteReduction.submit()')
        })
    })
  })

  after(function () {
    authenticationHerlp.logout()
  })
})
