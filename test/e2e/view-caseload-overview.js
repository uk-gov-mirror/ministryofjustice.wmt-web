const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const log = require('../../app/logger')

let workloadOwnerIds = []
let workloadOwnerId
let workloadOwnerGrade
let workloadOwnerDefaultUrl
let teamDefaultUrl
let lduDefaultUrl
let regionDefaultUrl
let nationalDefaultUrl

describe('View overview', function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Staff)
    const results = await dataHelper.selectIdsForWorkloadOwner()
    workloadOwnerIds = results
    workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
    workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerId
    teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id
    lduDefaultUrl = '/' + workloadTypes.PROBATION + '/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id
    regionDefaultUrl = '/' + workloadTypes.PROBATION + '/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id
    nationalDefaultUrl = '/' + workloadTypes.PROBATION + '/hmpps/0'
    workloadOwnerGrade = await dataHelper.selectGradeForWorkloadOwner(workloadOwnerId)
    await browser.url(workloadOwnerDefaultUrl + '/overview')
  })

  it('should navigate to the workload owner overview page', async function () {
    await browser.url(workloadOwnerDefaultUrl + '/overview')
    let grade = await $('.sln-grade')
    grade = await grade.getText()
    expect(grade).to.equal(workloadOwnerGrade)
  })

  it('should not include the reductions export at workload owner level', async function () {
    await browser.url(workloadOwnerDefaultUrl + '/overview')
    try {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      expect(exists).to.be.false //eslint-disable-line
    } catch (error) {
      log.error(error)
    }
  })

  it('should navigate to the team overview page', async function () {
    await browser.url(teamDefaultUrl + '/overview')
    const element = await $('.sln-table-org-level')
    const text = await element.getText()
    expect(text).to.equal('Offender Manager')
  })

  it('should naviagte to the ldu overview page', async function () {
    await browser.url(lduDefaultUrl + '/overview')
    const element = await $('.sln-table-org-level')
    const text = await element.getText()
    expect(text).to.equal('Team')
  })

  it('should naviagte to the region overview page', async function () {
    await browser.url(regionDefaultUrl + '/overview')
    const element = await $('.sln-table-org-level')
    const text = await element.getText()
    expect(text).to.equal('Probation Delivery Unit')
  })

  it('should navigate to the national overview page', async function () {
    await browser.url(nationalDefaultUrl + '/overview')
    const element = await $('.sln-table-org-level')
    const text = await element.getText()
    expect(text).to.equal('Region')
  })

  it('should not include the reductions export for staff at team level', async function () {
    await browser.url(teamDefaultUrl + '/overview')
    try {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      expect(exists).to.be.false //eslint-disable-line
    } catch (error) {
      log.error(error)
    }
  })

  it('should not include the reductions export for staff at region level', async function () {
    await browser.url(regionDefaultUrl + '/overview')
    try {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      expect(exists).to.be.false //eslint-disable-line
    } catch (error) {
      log.error(error)
    }
  })

  it('should not include the reductions export for staff at ldu level', async function () {
    await browser.url(lduDefaultUrl + '/overview')
    try {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      expect(exists).to.be.false //eslint-disable-line
    } catch (error) {
      log.error(error)
    }
  })

  it('should not include the reductions export for staff at national level', async function () {
    await browser.url(nationalDefaultUrl + '/overview')
    try {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      expect(exists).to.be.false //eslint-disable-line
    } catch (error) {
      log.error(error)
    }
  })

  it('should not include the reductions export for staff at workload owner level', async function () {
    await browser.url(workloadOwnerDefaultUrl + '/overview')
    try {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      expect(exists).to.be.false //eslint-disable-line
    } catch (error) {
      log.error(error)
    }
  })

  it('should allow the user to navigate down the org hierarchy from the national page', async function () {
    await browser.url(nationalDefaultUrl + '/overview')
    let pageTitle = await $('.govuk-caption-xl')
    let text = await pageTitle.getText()
    expect(text).to.equal('National')
    let link = await $('[href="' + regionDefaultUrl + '"]')
    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Region')
    link = await $('[href="' + lduDefaultUrl + '"]')
    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Probation Delivery Unit')
    link = await $('[href="' + teamDefaultUrl + '"]')
    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Team')
    link = await $('[href="' + workloadOwnerDefaultUrl + '"]')
    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Offender Manager')
  })

  it('should contain breadcrumbs which allow the user to navigate up the org hierarchy', async function () {
    await browser.url(workloadOwnerDefaultUrl)
    let pageTitle = await $('.govuk-caption-xl')
    let text = await pageTitle.getText()
    expect(text).to.equal('Offender Manager')

    let link = await $('[href="' + nationalDefaultUrl + '"]')
    let exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    link = await $('[href="' + regionDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    link = await $('[href="' + lduDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    link = await $('[href="' + teamDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Team')

    link = await $('[href="' + lduDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Probation Delivery Unit')

    link = await $('[href="' + regionDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Region')

    link = await $('[href="' + nationalDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('National')
  })

  it('should not include the reductions export for managers at workload owner level', async function () {
    await browser.url(workloadOwnerDefaultUrl + '/overview')
    try {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      expect(exists).to.be.false //eslint-disable-line
    } catch (error) {
      log.error(error)
    }
  })

  it('should not include the reductions export for managers at national level', async function () {
    await browser.url(nationalDefaultUrl + '/overview')
    try {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      expect(exists).to.be.false //eslint-disable-line
    } catch (error) {
      log.error(error)
    }
  })

  after(function () {
    authenticationHelper.logout()
  })
})
