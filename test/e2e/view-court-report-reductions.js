const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/court-reports-aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
let offenderManagerId
let offenderManagerUrl

describe('View reductions page for court-reporter', () => {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Manager)
    const results = await dataHelper.getAnyExistingCourtReporterId()
    offenderManagerId = results
    offenderManagerUrl = '/' + workloadTypes.COURT_REPORTS + '/offender-manager/' + offenderManagerId + '/reductions'
    await browser.url(offenderManagerUrl)
  })

  describe('should navigate to the get reductions page for court-reporter', () => {
    it('with the correct breadcrumbs and heading title', async () => {
      await browser.url(offenderManagerUrl)

      const breadcrumbs = await $('.govuk-breadcrumbs')
      let exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const subnav = await $('.wmt-sub-nav')
      exists = await subnav.isExisting()
      expect(exists).to.be.equal(true)

      const pageTitle = await $('.govuk-caption-xl')
      const text = await pageTitle.getText()
      expect(text).to.equal('Offender Manager')
    })

    it('with an active table', async () => {
      await browser.url(offenderManagerUrl)
      let element = await $('#headingActive')
      let text = await element.getText()
      expect(text).to.contain('Active')

      element = await $('#active_type')
      text = await element.getText()
      expect(text).to.equal('Type')

      element = await $('#active_hours')
      text = await element.getText()
      expect(text).to.equal('Hours')

      element = await $('#active_start_date')
      text = await element.getText()
      expect(text).to.equal('Start date')

      element = await $('#active_end_date')
      text = await element.getText()
      expect(text).to.equal('End date')
    })

    it('with a scheduled table', async () => {
      await browser.url(offenderManagerUrl)
      let element = await $('#headingScheduled')
      let text = await element.getText()
      expect(text).to.contain('Scheduled')

      element = await $('#scheduled_type')
      text = await element.getText()
      expect(text).to.equal('Type')

      element = await $('#scheduled_hours')
      text = await element.getText()
      expect(text).to.equal('Hours')

      element = await $('#scheduled_start_date')
      text = await element.getText()
      expect(text).to.equal('Start date')

      element = await $('#scheduled_end_date')
      text = await element.getText()
      expect(text).to.equal('End date')
    })

    it('with an archived table', async () => {
      await browser.url(offenderManagerUrl)
      let element = await $('#headingArchived')
      let text = await element.getText()
      expect(text).to.contain('Archived')

      element = await $('#archived_type')
      text = await element.getText()
      expect(text).to.equal('Type')

      element = await $('#archived_hours')
      text = await element.getText()
      expect(text).to.equal('Hours')

      element = await $('#archived_start_date')
      text = await element.getText()
      expect(text).to.equal('Start date')

      element = await $('#archived_end_date')
      text = await element.getText()
      expect(text).to.equal('End date')
    })

    // it('should be able to navigate to existing reduction screen', async () => {
    //   await browser.url(offenderManagerUrl)
    //   let breadcrumbs = await $('.govuk-breadcrumbs')
    //   let exists = await breadcrumbs.isExisting()
    //   expect(exists).to.be.equal(true)

    //   let subnav = await $('.wmt-sub-nav')
    //   exists = await subnav.isExisting()
    //   expect(exists).to.be.equal(true)

    //   let reductionLink = await $('[href="' + reductionUrl + '"]')
    //   await reductionLink.click()

    //   let pageTitle = await $('.govuk-heading-xl')
    //   let text = await pageTitle.getText()
    //   expect(text).to.equal('Reduction')
    // })
  })

  after(function () {
    authenticationHelper.logout()
  })
})
