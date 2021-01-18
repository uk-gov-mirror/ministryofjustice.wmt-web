const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerIds = []
let workloadOwnerId
let workloadOwnerDefaultUrl

describe('View contracted hours', function () {
  before(async function () {
    await authenticationHerlp.login(authenticationHerlp.users.Manager)
    const results = await dataHelper.selectIdsForWorkloadOwner()
    workloadOwnerIds = results
    workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
    workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerId
    await browser.url(workloadOwnerDefaultUrl + '/contracted-hours')
  })

  it('should navigate to the workload owner contracted-hours page', async function () {
    await browser.url(workloadOwnerDefaultUrl + '/contracted-hours')

    const breadcrumbs = await $('.govuk-breadcrumbs')
    let exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const subnav = await $('.wmt-sub-nav')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    const actionForm = await $('.sln-form-action')
    exists = await actionForm.isExisting()
    expect(exists).to.be.equal(true)

    const link = await $('[href="' + workloadOwnerDefaultUrl + '/overview"]')
    await link.click()

    const pageTitle = await $('.govuk-caption-xl')
    const text = await pageTitle.getText()
    expect(text).to.equal('Offender Manager')
  })

  it('should be accessible via the Contracted Hours tab when on any other tab', async () => {
    await browser.url(workloadOwnerDefaultUrl + '/overview')
    let subnav = await $('.wmt-sub-nav')
    let exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    let contractedHoursLink = await $('[href="' + workloadOwnerDefaultUrl + '/contracted-hours"]')
    await contractedHoursLink.click()
    let actionForm = await $('.sln-form-action')
    exists = await actionForm.isExisting()
    expect(exists).to.be.equal(true)

    const caseloadCapacityLink = await $('[href="' + workloadOwnerDefaultUrl + '/caseload-capacity"]')
    await caseloadCapacityLink.click()
    subnav = await $('.wmt-sub-nav')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    contractedHoursLink = await $('[href="' + workloadOwnerDefaultUrl + '/contracted-hours"]')
    await contractedHoursLink.click()
    actionForm = await $('.sln-form-action')
    exists = await actionForm.isExisting()
    expect(exists).to.be.equal(true)

    const caseProgressLink = await $('[href="' + workloadOwnerDefaultUrl + '/case-progress"]')
    await caseProgressLink.click()
    subnav = await $('.wmt-sub-nav')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    contractedHoursLink = await $('[href="' + workloadOwnerDefaultUrl + '/contracted-hours"]')
    await contractedHoursLink.click()
    actionForm = await $('.sln-form-action')
    exists = await actionForm.isExisting()
    expect(exists).to.be.equal(true)
  })

  after(function () {
    authenticationHerlp.logout()
  })
})
