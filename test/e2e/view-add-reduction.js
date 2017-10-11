const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')

var offenderManagerId
var offenderManagerUrl

describe('View adding a new reduction', () => {
  before(function () {
    authenticationHerlp.login(authenticationHerlp.users.Manager)
    return dataHelper.getAnyExistingWorkloadOwnerId()
        .then(function (results) {
          offenderManagerId = results
          offenderManagerUrl = '/offender-manager/' + offenderManagerId + '/add-reduction'
        }).then(function () {
          return browser.url(offenderManagerUrl).waitForExist('.breadcrumbs')
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

  after(function () {
    authenticationHerlp.logout()
  })
})
