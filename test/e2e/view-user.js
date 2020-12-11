const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')

let adminUserURL

describe('View adding a new user role', () => {
  before(async function () {
    await authenticationHerlp.login(authenticationHerlp.users.SystemAdmin)
    adminUserURL = '/admin/user'
    await browser.url(adminUserURL)
  })

  describe('should navigate to the user page', () => {
    it('with the correct breadcrumbs and heading title', async () => {
      await browser.url(adminUserURL)

      const breadcrumbs = await $('.breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const pageTitle = await $('.sln-page-title')
      const text = await pageTitle.getText('.sln-page-title')
      expect(text).to.equal('User rights')
    })

    it('and submit a form with a valid username', async () => {
      const username = await $('#username')
      await username.setValue('John.Doe')

      const submit = await $('.button')
      await submit.click()
    })
  })

  after(function () {
    authenticationHerlp.logout()
  })
})
