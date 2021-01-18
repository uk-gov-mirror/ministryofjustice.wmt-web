const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')
const config = require('../../config')

let adminUserURL
const username = 'John.Doe@' + config.ACTIVE_DIRECTORY_DOMAIN

describe('View adding a new user role', () => {
  before(async function () {
    await authenticationHerlp.login(authenticationHerlp.users.SystemAdmin)
    adminUserURL = '/admin/user'
    await browser.url(adminUserURL)
  })

  describe('should navigate to the user rights page', () => {
    it('with the correct breadcrumbs, heading title and roles to select from', async () => {
      await browser.url(adminUserURL)

      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const usernameField = await $('#username')
      await usernameField.setValue(username)

      let submit = await $('.govuk-button')
      await submit.click()

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText('.govuk-heading-xl')
      expect(text).to.equal('User rights')

      let radioButton = await $('#dataAdminRadio')
      await radioButton.click()
      let isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      radioButton = await $('#systemAdminRadio')
      await radioButton.click()
      isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      radioButton = await $('#managerRadio')
      await radioButton.click()
      isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      radioButton = await $('#staffRadio')
      await radioButton.click()
      isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      const fullname = await $('#fullname')
      await fullname.setValue('John Doe')

      submit = await $('.govuk-button')
      await submit.click()
    })
  })

  after(function () {
    authenticationHerlp.logout()
  })
})
