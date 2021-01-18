const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')

let adminArchiveURL, pageTitle, pageSubtitle

describe('View archive data', () => {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.DataAdmin)
    adminArchiveURL = '/archive-data/daily-caseload-data'
    await browser.url(adminArchiveURL)
  })
  describe('should navigate to the archive page', () => {
    it('with the correct breadcrumbs and heading title', async () => {
      await browser.url(adminArchiveURL)
      pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      pageSubtitle = await $('.govuk-caption-xl')
      pageSubtitle = await pageSubtitle.getText()

      expect(pageTitle).to.equal('Archived Daily Caseload Data')
      expect(pageSubtitle).to.equal('Archive Data')
    })
  })

  after(function () {
    authenticationHelper.logout()
  })
})
