const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')

let adminURL
let workloadPointsURL
let pageTitle

describe('View admin role', () => {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.DataAdmin)
    adminURL = '/admin'
    workloadPointsURL = '/admin/workload-points'
    await browser.url(adminURL)
  })

  describe('should navigate to the admin page', () => {
    it('with the correct breadcrumbs and heading title', async () => {
      await browser.url(adminURL)
      pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      expect(pageTitle, 'Admin Page title should be "Admin"').to.equal('Admin')
    })

    it('with the correct breadcrumbs and heading title', async () => {
      await browser.url(adminURL)
      const link = await $('[href="' + workloadPointsURL + '"')
      await link.click()
      pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      expect(pageTitle, 'Workload Points Page title should be "Workload Points"').to.equal('Workload Points')
    })
  })

  after(async function () {
    authenticationHelper.logout()
  })
})
