const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const workloadCapacityHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerIds = []
let workloadOwnerDefaultUrl
let teamDefaultUrl
let lduDefaultUrl
let regionDefaultUrl
let nationalDefaultUrl
let pageSubtitle

describe('View your caseload capacity flow', () => {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Staff)
    const results = await workloadCapacityHelper.selectIdsForWorkloadOwner()
    workloadOwnerIds = results
    workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
    teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id
    lduDefaultUrl = '/' + workloadTypes.PROBATION + '/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id
    regionDefaultUrl = '/' + workloadTypes.PROBATION + '/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id
    nationalDefaultUrl = '/' + workloadTypes.PROBATION + '/hmpps/0'
    await browser.url(workloadOwnerDefaultUrl)
  })

  it('should navigate to the workload owner caseload capacity screen', async () => {
    await browser.url(workloadOwnerDefaultUrl + '/caseload-capacity')
    pageSubtitle = await $('.govuk-caption-xl')
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal('Offender Manager')

    const fromDayField = await $('#capacity-from-day')
    const fromMonthField = await $('#capacity-from-month')
    const fromYearField = await $('#capacity-from-year')
    const toDayField = await $('#capacity-to-day')
    const toMonthField = await $('#capacity-to-month')
    const toYearField = await $('#capacity-to-year')
    const submit = await $('#caseload-filter-submit')

    await fromDayField.setValue('1')
    await fromMonthField.setValue('2')
    await fromYearField.setValue('2017')
    await toDayField.setValue('1')
    await toMonthField.setValue('2')
    await toYearField.setValue('2018')

    await submit.click()
    await browser.pause(3000)

    try {
      const errorSummary = await $('.govuk-error-summary')
      const exists = await errorSummary.isExisting()
      expect(exists).to.be.equal(false)
    } catch (error) {
      console.error(error)
      if (error.message === 'expected true to equal false') {
        throw error
      }
    }
  })

  it('should navigate to the team caseload capacity screen', async () => {
    await browser.url(teamDefaultUrl + '/caseload-capacity')
    pageSubtitle = await $('.govuk-caption-xl')
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal('Team')

    const fromDayField = await $('#capacity-from-day')
    const fromMonthField = await $('#capacity-from-month')
    const fromYearField = await $('#capacity-from-year')
    const toDayField = await $('#capacity-to-day')
    const toMonthField = await $('#capacity-to-month')
    const toYearField = await $('#capacity-to-year')
    const submit = await $('#caseload-filter-submit')

    await fromDayField.setValue('2')
    await fromMonthField.setValue('3')
    await fromYearField.setValue('2017')
    await toDayField.setValue('2')
    await toMonthField.setValue('3')
    await toYearField.setValue('2018')

    await submit.click()
    await browser.pause(3000)

    try {
      const errorSummary = await $('.govuk-error-summary')
      const exists = await errorSummary.isExisting()
      expect(exists).to.be.equal(false)
    } catch (error) {
      console.error(error)
      if (error.message === 'expected true to equal false') {
        throw error
      }
    }
  })

  it('should navigate to the ldu caseload capacity screen', async () => {
    await browser.url(lduDefaultUrl + '/caseload-capacity')
    pageSubtitle = await $('.govuk-caption-xl')
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal('Probation Delivery Unit')

    const fromDayField = await $('#capacity-from-day')
    const fromMonthField = await $('#capacity-from-month')
    const fromYearField = await $('#capacity-from-year')
    const toDayField = await $('#capacity-to-day')
    const toMonthField = await $('#capacity-to-month')
    const toYearField = await $('#capacity-to-year')
    const submit = await $('#caseload-filter-submit')

    await fromDayField.setValue('3')
    await fromMonthField.setValue('4')
    await fromYearField.setValue('2017')
    await toDayField.setValue('3')
    await toMonthField.setValue('4')
    await toYearField.setValue('2018')

    await submit.click()
    await browser.pause(3000)

    try {
      const errorSummary = await $('.govuk-error-summary')
      const exists = await errorSummary.isExisting()
      expect(exists).to.be.equal(false)
    } catch (error) {
      console.error(error)
      if (error.message === 'expected true to equal false') {
        throw error
      }
    }
  })

  it('should navigate to the region caseload capacity screen', async () => {
    await browser.url(regionDefaultUrl + '/caseload-capacity')
    pageSubtitle = await $('.govuk-caption-xl')
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal('Region')

    const fromDayField = await $('#capacity-from-day')
    const fromMonthField = await $('#capacity-from-month')
    const fromYearField = await $('#capacity-from-year')
    const toDayField = await $('#capacity-to-day')
    const toMonthField = await $('#capacity-to-month')
    const toYearField = await $('#capacity-to-year')
    const submit = await $('#caseload-filter-submit')

    await fromDayField.setValue('4')
    await fromMonthField.setValue('5')
    await fromYearField.setValue('2017')
    await toDayField.setValue('4')
    await toMonthField.setValue('5')
    await toYearField.setValue('2018')

    await submit.click()
    await browser.pause(3000)

    try {
      const errorSummary = await $('.govuk-error-summary')
      const exists = await errorSummary.isExisting()
      expect(exists).to.be.equal(false)
    } catch (error) {
      console.error(error)
      if (error.message === 'expected true to equal false') {
        throw error
      }
    }
  })

  it('should navigate to the national caseload capacity screen', async () => {
    await browser.url(nationalDefaultUrl + '/caseload-capacity')
    pageSubtitle = await $('.govuk-caption-xl')
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal('National')

    const fromDayField = await $('#capacity-from-day')
    const fromMonthField = await $('#capacity-from-month')
    const fromYearField = await $('#capacity-from-year')
    const toDayField = await $('#capacity-to-day')
    const toMonthField = await $('#capacity-to-month')
    const toYearField = await $('#capacity-to-year')
    const submit = await $('#caseload-filter-submit')

    await fromDayField.setValue('5')
    await fromMonthField.setValue('6')
    await fromYearField.setValue('2017')
    await toDayField.setValue('5')
    await toMonthField.setValue('6')
    await toYearField.setValue('2018')

    await submit.click()
    await browser.pause(3000)

    try {
      const errorSummary = await $('.govuk-error-summary')
      const exists = await errorSummary.isExisting()
      expect(exists).to.be.equal(false)
    } catch (error) {
      console.error(error)
      if (error.message === 'expected true to equal false') {
        throw error
      }
    }
  })

  after(function () {
    authenticationHelper.logout()
  })
})
