const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')
const caseProgressDataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerIds = []
let workloadOwnerDefaultUrl
let teamDefaultUrl
let lduDefaultUrl
let regionDefaultUrl
let nationalDefaultUrl

describe('View caseload progress flow', () => {
  before(async function () {
    await authenticationHerlp.login(authenticationHerlp.users.Staff)
    const results = await caseProgressDataHelper.selectIdsForWorkloadOwner()
    workloadOwnerIds = results
    workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
    teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id
    lduDefaultUrl = '/' + workloadTypes.PROBATION + '/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id
    regionDefaultUrl = '/' + workloadTypes.PROBATION + '/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id
    nationalDefaultUrl = '/' + workloadTypes.PROBATION + '/hmpps/0'
    await browser.url(workloadOwnerDefaultUrl + '/caseload-capacity')
  })

  it('should navigate to the workload owner caseload progress screen', async () => {
    await browser.url(workloadOwnerDefaultUrl + '/caseload-capacity')

    const breadcrumbs = await $('.govuk-breadcrumbs')
    let exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const subnav = await $('.wmt-sub-nav')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    // Check the href for case progress using the id exists
    const link = await $('[href="' + workloadOwnerDefaultUrl + '/case-progress"]')
    await link.click()

    const plotlyPlot = await $('.js-plotly-plot')
    exists = await plotlyPlot.isExisting()
    expect(exists).to.be.equal(true)

    const pageTitle = await $('.govuk-caption-xl')
    const text = await pageTitle.getText()
    expect(text).to.equal('Offender Manager')
  })

  it('should navigate to the team caseload progress screen', async () => {
    await browser.url(teamDefaultUrl + '/case-progress')

    const breadcrumbs = await $('.govuk-breadcrumbs')
    let exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const subnav = await $('.wmt-sub-nav')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    const caseloadCapacityLink = await $('[href="' + teamDefaultUrl + '/caseload-capacity"]')
    exists = await caseloadCapacityLink.isExisting()
    expect(exists).to.be.equal(true)

    const caseProgressLink = await $('[href="' + teamDefaultUrl + '/case-progress"]')
    exists = await caseProgressLink.isExisting()
    expect(exists).to.be.equal(true)

    const plotlyPlot = await $('.js-plotly-plot')
    exists = await plotlyPlot.isExisting()
    expect(exists).to.be.equal(true)

    const pageTitle = await $('.govuk-caption-xl')
    const text = await pageTitle.getText()
    expect(text).to.equal('Team')
  })

  it('should navigate to the ldu caseload progress screen', async () => {
    await browser.url(lduDefaultUrl + '/case-progress')

    const breadcrumbs = await $('.govuk-breadcrumbs')
    let exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const subnav = await $('.wmt-sub-nav')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    const caseloadCapacityLink = await $('[href="' + lduDefaultUrl + '/caseload-capacity"]')
    exists = await caseloadCapacityLink.isExisting()
    expect(exists).to.be.equal(true)

    const caseProgressLink = await $('[href="' + lduDefaultUrl + '/case-progress"]')
    exists = await caseProgressLink.isExisting()
    expect(exists).to.be.equal(true)

    const plotlyPlot = await $('.js-plotly-plot')
    exists = await plotlyPlot.isExisting()
    expect(exists).to.be.equal(true)

    const pageTitle = await $('.govuk-caption-xl')
    const text = await pageTitle.getText()
    expect(text).to.equal('Probation Delivery Unit')
  })

  it('should navigate to the region caseload progress screen', async () => {
    await browser.url(regionDefaultUrl + '/case-progress')

    const breadcrumbs = await $('.govuk-breadcrumbs')
    let exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const subnav = await $('.wmt-sub-nav')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    const caseloadCapacityLink = await $('[href="' + regionDefaultUrl + '/caseload-capacity"]')
    exists = await caseloadCapacityLink.isExisting()
    expect(exists).to.be.equal(true)

    const caseProgressLink = await $('[href="' + regionDefaultUrl + '/case-progress"]')
    exists = await caseProgressLink.isExisting()
    expect(exists).to.be.equal(true)

    const plotlyPlot = await $('.js-plotly-plot')
    exists = await plotlyPlot.isExisting()
    expect(exists).to.be.equal(true)

    const pageTitle = await $('.govuk-caption-xl')
    const text = await pageTitle.getText()
    expect(text).to.equal('Region')
  })

  it('should navigate to the national caseload progress screen', async () => {
    await browser.url(nationalDefaultUrl + '/case-progress')

    const breadcrumbs = await $('.govuk-breadcrumbs')
    let exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const subnav = await $('.wmt-sub-nav')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    const caseloadCapacityLink = await $('[href="' + nationalDefaultUrl + '/caseload-capacity"]')
    exists = await caseloadCapacityLink.isExisting()
    expect(exists).to.be.equal(true)

    const caseProgressLink = await $('[href="' + nationalDefaultUrl + '/case-progress"]')
    exists = await caseProgressLink.isExisting()
    expect(exists).to.be.equal(true)

    const plotlyPlot = await $('.js-plotly-plot')
    exists = await plotlyPlot.isExisting()
    expect(exists).to.be.equal(true)

    const pageTitle = await $('.govuk-caption-xl')
    const text = await pageTitle.getText()
    expect(text).to.equal('National')
  })

  it('should be accessible via the Case Progress tab on each org levels default view', async () => {
    await browser.url(nationalDefaultUrl)

    const nationalCaseProgressLink = await $('[href="' + nationalDefaultUrl + '/case-progress"]')
    let exists = await nationalCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await nationalCaseProgressLink.click()
    let plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)

    const nationalOverviewLink = await $('[href="' + nationalDefaultUrl + '/overview"]')
    exists = await nationalOverviewLink.isExisting()
    expect(exists).to.be.equal(true)
    await nationalOverviewLink.click()

    const regionLink = await $('[href="' + regionDefaultUrl + '"]')
    exists = await regionLink.isExisting()
    expect(exists).to.be.equal(true)
    await regionLink.click()

    const regionCaseProgressLink = await $('[href="' + regionDefaultUrl + '/case-progress"]')
    exists = await regionCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await regionCaseProgressLink.click()
    plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)

    const regionOverviewLink = await $('[href="' + regionDefaultUrl + '/overview"]')
    exists = await regionOverviewLink.isExisting()
    expect(exists).to.be.equal(true)
    await regionOverviewLink.click()

    const lduLink = await $('[href="' + lduDefaultUrl + '"]')
    exists = await lduLink.isExisting()
    expect(exists).to.be.equal(true)
    await lduLink.click()

    const lduLCaseProgressLink = await $('[href="' + lduDefaultUrl + '/case-progress"]')
    exists = await lduLCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await lduLCaseProgressLink.click()
    plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)

    const lduOverviewLink = await $('[href="' + lduDefaultUrl + '/overview"]')
    exists = await lduOverviewLink.isExisting()
    expect(exists).to.be.equal(true)
    await lduOverviewLink.click()

    const teamLink = await $('[href="' + teamDefaultUrl + '"]')
    exists = await teamLink.isExisting()
    expect(exists).to.be.equal(true)
    await teamLink.click()

    const teamCaseProgressLink = await $('[href="' + teamDefaultUrl + '/case-progress"]')
    exists = await teamCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await teamCaseProgressLink.click()
    plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)

    const teamOverviewLink = await $('[href="' + teamDefaultUrl + '/overview"]')
    exists = await teamOverviewLink.isExisting()
    expect(exists).to.be.equal(true)
    await teamOverviewLink.click()

    const workloadOwnerLink = await $('[href="' + workloadOwnerDefaultUrl + '"]')
    exists = await workloadOwnerLink.isExisting()
    expect(exists).to.be.equal(true)
    await workloadOwnerLink.click()

    const workloadOwnerCaseProgressLink = await $('[href="' + workloadOwnerDefaultUrl + '/case-progress"]')
    exists = await workloadOwnerCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await workloadOwnerCaseProgressLink.click()
    plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)
  })

  it('should be accessible via the Case Progress tab when on any other tab', async () => {
    await browser.url(teamDefaultUrl)
    let teamCaseProgressLink = await $('[href="' + teamDefaultUrl + '/case-progress"]')
    let exists = await teamCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await teamCaseProgressLink.click()
    let plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)

    const teamCaseloadLink = await $('[href="' + teamDefaultUrl + '/caseload"]')
    exists = await teamCaseloadLink.isExisting()
    expect(exists).to.be.equal(true)
    await teamCaseloadLink.click()

    teamCaseProgressLink = await $('[href="' + teamDefaultUrl + '/case-progress"]')
    exists = await teamCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await teamCaseProgressLink.click()
    plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)

    const teamCaseloadCapacityLink = await $('[href="' + teamDefaultUrl + '/caseload-capacity"]')
    exists = await teamCaseloadCapacityLink.isExisting()
    expect(exists).to.be.equal(true)
    await teamCaseloadCapacityLink.click()

    teamCaseProgressLink = await $('[href="' + teamDefaultUrl + '/case-progress"]')
    exists = await teamCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await teamCaseProgressLink.click()
    plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)
  })

  after(function () {
    authenticationHerlp.logout()
  })
})
