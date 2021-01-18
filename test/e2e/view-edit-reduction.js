const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const moment = require('moment')

let offenderManagerId
let reductionUrl
let offenderManagerUrl
let reductionTypeField, hoursField, startDayField, startMonthField, startYearField, endDayField, endMonthField, endYearField, notesField, submit

describe('View editing a new reduction', () => {
  before(async function () {
    await authenticationHerlp.login(authenticationHerlp.users.Manager)
    const results = await dataHelper.getAnyExistingWorkloadOwnerId()
    offenderManagerId = results
    offenderManagerUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + offenderManagerId + '/add-reduction'
    await browser.url(offenderManagerUrl)
  })

  it('with the correct breadcrumbs and heading title', async () => {
    await browser.url(offenderManagerUrl)
    const breadcrumbs = await $('.govuk-breadcrumbs')
    const exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const pageTitle = await $('.govuk-heading-xl')
    const text = await pageTitle.getText()
    expect(text).to.equal('New reduction')
  })

  it('after first adding a new reduction', async () => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
    reductionTypeField = await $('#select-box')
    hoursField = await $('#hours')
    startDayField = await $('#start-day')
    startMonthField = await $('#start-month')
    startYearField = await $('#start-year')
    endDayField = await $('#end-day')
    endMonthField = await $('#end-month')
    endYearField = await $('#end-year')
    notesField = await $('#textarea')
    submit = await $('#submit-button')

    await reductionTypeField.selectByVisibleText('Other')
    await hoursField.setValue('10')
    await startDayField.setValue('1')
    await startMonthField.setValue('2')
    await startYearField.setValue('2017')
    await endDayField.setValue('1')
    await endMonthField.setValue('2')
    await endYearField.setValue('2025')
    await notesField.setValue(currentTime)

    await submit.click()
    await browser.pause(5000)

    const reduction = await dataHelper.getLastRecordFromTable('reductions')
    reductionUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + offenderManagerId + '/edit-reduction?reductionId=' + reduction.id
  })

  describe('should navigate to the edit reduction screen', () => {
    it('with the archive and delete links', async () => {
      await browser.url(reductionUrl)

      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const pageTitle = await $('.govuk-heading-xl')
      let text = await pageTitle.getText()
      expect(text).to.equal('Reduction')

      const activeReduction = await $('=Archive reduction')
      text = await activeReduction.getText()
      expect(text).to.equal('Archive reduction')

      const deleteReduction = await $('=Delete reduction')
      text = await deleteReduction.getText()
      expect(text).to.equal('Delete reduction')
    })
  })

  describe('should navigate to the edit reduction screen and be editable', () => {
    it('with the correct breadcrumbs and heading title', async () => {
      await browser.url(reductionUrl)
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
      reductionTypeField = await $('#select-box')
      hoursField = await $('#hours')
      startDayField = await $('#start-day')
      startMonthField = await $('#start-month')
      startYearField = await $('#start-year')
      endDayField = await $('#end-day')
      endMonthField = await $('#end-month')
      endYearField = await $('#end-year')
      notesField = await $('#textarea')
      submit = await $('#submit-button')

      await reductionTypeField.selectByVisibleText('Other')
      await hoursField.setValue('10')
      await startDayField.setValue('1')
      await startMonthField.setValue('2')
      await startYearField.setValue('2017')
      await endDayField.setValue('1')
      await endMonthField.setValue('2')
      await endYearField.setValue('2027')
      await notesField.setValue(currentTime)

      await submit.click()
      await browser.pause(5000)

      const reduction = await dataHelper.getLastRecordFromTable('reductions')
      const reductionURL = '/probation/offender-manager/' + reduction.workload_owner_id + '/edit-reduction?reductionId=' + reduction.id
      const link = await $('[href="' + reductionURL + '"')
      await link.click()
      notesField = await $('#textarea')
      notesField = await notesField.getValue()
      expect(reduction.notes, 'Last inserted reduction should have the following notes: ' + currentTime).to.be.equal(currentTime)
      expect(notesField, 'The notes field of the last inserted reduction should have the following contents: ' + currentTime).to.be.equal(currentTime)
    })
  })

  describe('Clicking on Archive reduction link', function () {
    it('should post the reduction for a ARCHIVE status', async function () {
      await browser.url(reductionUrl)
      const activeReduction = await $('=Archive reduction')
      const text = await activeReduction.getAttribute('href')
      expect(text).to.equal('javascript:document.archiveReduction.submit()')
    })

    it('should post the reduction for a DELETE status', async function () {
      await browser.url(reductionUrl)
      const deleteReduction = await $('=Delete reduction')
      const text = await deleteReduction.getAttribute('href')
      expect(text).to.equal('javascript:document.deleteReduction.submit()')
    })
  })

  after(function () {
    return dataHelper.deleteLastRecordFromTables(['reductions_history', 'reductions'])
  })
})
