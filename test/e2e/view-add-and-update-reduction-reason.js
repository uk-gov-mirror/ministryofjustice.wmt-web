const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')

let adminURL
let pageTitle
const ids = []

describe('View admin role', () => {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.DataAdmin)
    adminURL = '/admin'
    await browser.url(adminURL)
  })

  describe('should navigate to the manage reduction reasons page', () => {
    it('with the correct breadcrumbs and heading title', async () => {
      await browser.url(adminURL)
      const link = await $('[href="/manage-reduction-reasons"')
      await link.click()
      pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      expect(pageTitle, 'Manage Reduction Reasons title should be "Manage Reduction Reasons"').to.equal('Manage Reduction Reasons')
    })

    it('and then navigate to the add reduction reason page with the correct heading title', async () => {
      const link = await $('[href="/add-reduction-reason"')
      await link.click()
      pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      expect(pageTitle, 'Add Reduction Reason title should be "Add Reduction Reason"').to.equal('Add Reduction Reason')
    })

    it('and create a new reduction reason with optional fields filled in', async () => {
      const reductionName = await $('#reductionName')
      const reductionShortName = await $('#reductionShortName')
      const category = await $('#category')
      const allowancePercentage = await $('#allowancePercentage')
      const maxAllowancePercentage = await $('#maxAllowancePercentage')
      const monthsToExpiry = await $('#monthsToExpiry')
      const isEnabled = await $('#isEnabled')
      const submit = await $('#submit-button')

      await reductionName.setValue('Test Reduction Reason')
      await reductionShortName.setValue('TRR')
      await category.selectByVisibleText('Work Circumstances')
      await allowancePercentage.setValue(20)
      await maxAllowancePercentage.setValue(20)
      await monthsToExpiry.setValue(6)
      await isEnabled.selectByVisibleText('Enabled')
      await submit.click()
      await browser.pause(3000)
    })

    it('and open the newly created reduction with optional fields filled in', async () => {
      let reductionName, reductionShortName, category, allowancePercentage, maxAllowancePercentage, monthsToExpiry, isEnabled
      const lastReductionReason = await dataHelper.getLastRecordFromTable('reduction_reason')
      ids.push(lastReductionReason.id)
      const reductionLink = '/edit-reduction-reason?id=' + lastReductionReason.id
      const link = await $('[href="' + reductionLink + '"')
      await link.click()

      reductionName = await $('#reductionName')
      reductionShortName = await $('#reductionShortName')
      category = await $('#category')
      allowancePercentage = await $('#allowancePercentage')
      maxAllowancePercentage = await $('#maxAllowancePercentage')
      monthsToExpiry = await $('#monthsToExpiry')
      isEnabled = await $('#isEnabled')

      reductionName = await reductionName.getValue()
      reductionShortName = await reductionShortName.getValue()
      category = await category.getValue()
      allowancePercentage = await allowancePercentage.getValue()
      maxAllowancePercentage = await maxAllowancePercentage.getValue()
      monthsToExpiry = await monthsToExpiry.getValue()
      isEnabled = await isEnabled.getValue()

      expect(reductionName).to.equal('Test Reduction Reason')
      expect(reductionShortName).to.equal('TRR')
      expect(category).to.equal('3')
      expect(allowancePercentage).to.equal('20')
      expect(maxAllowancePercentage).to.equal('20')
      expect(monthsToExpiry).to.equal('6')
      expect(isEnabled).to.equal('true')
    })

    it('and create a new reduction reason with optional fields left blank', async () => {
      await browser.url('/add-reduction-reason')
      const reductionName = await $('#reductionName')
      const reductionShortName = await $('#reductionShortName')
      const category = await $('#category')
      const isEnabled = await $('#isEnabled')
      const submit = await $('#submit-button')

      await reductionName.setValue('Test Reduction Reason 2')
      await reductionShortName.setValue('TRR2')
      await category.selectByVisibleText('Work Circumstances')
      await isEnabled.selectByVisibleText('Enabled')
      await submit.click()
      await browser.pause(3000)
    })

    it('and open the newly created reduction reason with blank optional fields', async () => {
      let reductionName, reductionShortName, category, allowancePercentage, maxAllowancePercentage, monthsToExpiry, isEnabled
      const lastReductionReason = await dataHelper.getLastRecordFromTable('reduction_reason')
      ids.push(lastReductionReason.id)
      const reductionLink = '/edit-reduction-reason?id=' + lastReductionReason.id
      const link = await $('[href="' + reductionLink + '"')
      await link.click()

      reductionName = await $('#reductionName')
      reductionShortName = await $('#reductionShortName')
      category = await $('#category')
      allowancePercentage = await $('#allowancePercentage')
      maxAllowancePercentage = await $('#maxAllowancePercentage')
      monthsToExpiry = await $('#monthsToExpiry')
      isEnabled = await $('#isEnabled')

      reductionName = await reductionName.getValue()
      reductionShortName = await reductionShortName.getValue()
      category = await category.getValue()
      allowancePercentage = await allowancePercentage.getValue()
      maxAllowancePercentage = await maxAllowancePercentage.getValue()
      monthsToExpiry = await monthsToExpiry.getValue()
      isEnabled = await isEnabled.getValue()

      expect(reductionName).to.equal('Test Reduction Reason 2')
      expect(reductionShortName).to.equal('TRR2')
      expect(category).to.equal('3')
      expect(allowancePercentage).to.equal('')
      expect(maxAllowancePercentage).to.equal('')
      expect(monthsToExpiry).to.equal('')
      expect(isEnabled).to.equal('true')
    })

    it('and edit the newly created reduction reason ', async () => {
      const allowancePercentage = await $('#allowancePercentage')
      const maxAllowancePercentage = await $('#maxAllowancePercentage')
      const monthsToExpiry = await $('#monthsToExpiry')
      const submit = await $('#submit-button')

      await allowancePercentage.setValue(80)
      await maxAllowancePercentage.setValue(80)
      await monthsToExpiry.setValue(12)
      await submit.click()
      await browser.pause(3000)
    })

    it('and open the edited reduction reason', async () => {
      let reductionName, reductionShortName, category, allowancePercentage, maxAllowancePercentage, monthsToExpiry, isEnabled
      const lastReductionReason = await dataHelper.getLastRecordFromTable('reduction_reason')
      ids.push(lastReductionReason.id)
      const reductionLink = '/edit-reduction-reason?id=' + lastReductionReason.id
      const link = await $('[href="' + reductionLink + '"')
      await link.click()

      reductionName = await $('#reductionName')
      reductionShortName = await $('#reductionShortName')
      category = await $('#category')
      allowancePercentage = await $('#allowancePercentage')
      maxAllowancePercentage = await $('#maxAllowancePercentage')
      monthsToExpiry = await $('#monthsToExpiry')
      isEnabled = await $('#isEnabled')

      reductionName = await reductionName.getValue()
      reductionShortName = await reductionShortName.getValue()
      category = await category.getValue()
      allowancePercentage = await allowancePercentage.getValue()
      maxAllowancePercentage = await maxAllowancePercentage.getValue()
      monthsToExpiry = await monthsToExpiry.getValue()
      isEnabled = await isEnabled.getValue()

      expect(reductionName).to.equal('Test Reduction Reason 2')
      expect(reductionShortName).to.equal('TRR2')
      expect(category).to.equal('3')
      expect(allowancePercentage).to.equal('80')
      expect(maxAllowancePercentage).to.equal('80')
      expect(monthsToExpiry).to.equal('12')
      expect(isEnabled).to.equal('true')
    })
  })

  after(async function () {
    await dataHelper.deleteRecordsFromTableForIds('reduction_reason', ids)
    authenticationHelper.logout()
  })
})
