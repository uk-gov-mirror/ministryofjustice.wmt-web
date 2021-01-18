const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const crDataHelper = require('../helpers/data/court-reports-aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerIds = []
let workloadOwnerId
let workloadOwnerDefaultUrl

describe('View contracted hours for court reporter', async function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Manager)
    const results = await crDataHelper.selectIdsForCourtReporterWorkloadOwner()
    workloadOwnerIds = results
    workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
    workloadOwnerDefaultUrl = '/' + workloadTypes.COURT_REPORTS + '/offender-manager/' + workloadOwnerId
    return browser.url(workloadOwnerDefaultUrl + '/contracted-hours')
  })

  it('should navigate to the court reporter contracted-hours page', async function () {
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
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    const pageTitle = await $('.govuk-caption-xl')
    const text = await pageTitle.getText()
    expect(text).to.equal('Offender Manager')
  })

  it('should be accessible via the Contracted Hours tab when on any other tab', async () => {
    await browser.url(workloadOwnerDefaultUrl + '/overview')

    const subnav = await $('.wmt-sub-nav')
    let exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    const link = await $('[href="' + workloadOwnerDefaultUrl + '/contracted-hours"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)
  })

  after(function () {
    authenticationHelper.logout()
  })
})
