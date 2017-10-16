const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/court-reports-aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

var offenderManagerId
var offenderManagerUrl

describe('View adding a new reduction for court-reporter', () => {
  before(function () {
    authenticationHelper.login(authenticationHelper.users.Manager)
    return dataHelper.getAnyExistingWorkloadOwnerIdWithActiveReduction()
        .then(function (results) {
          offenderManagerId = results.workloadOwnerId
          offenderManagerUrl = '/' + workloadTypes.COURT_REPORTS + '/offender-manager/' + offenderManagerId + '/add-reduction'
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
    })
  })

  after(function () {
    authenticationHelper.logout()
  })
})
