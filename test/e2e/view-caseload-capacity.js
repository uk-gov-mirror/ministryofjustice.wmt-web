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
    pageSubtitle = await $('.sln-page-subtitle')
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal('Offender Manager')
  })

  it('should navigate to the team caseload capacity screen', async () => {
    await browser.url(teamDefaultUrl + '/caseload-capacity')
    pageSubtitle = await $('.sln-page-subtitle')
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal('Team')
  })

  it('should navigate to the ldu caseload capacity screen', async () => {
    await browser.url(lduDefaultUrl + '/caseload-capacity')
    pageSubtitle = await $('.sln-page-subtitle')
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal('LDU Cluster')
  })

  it('should navigate to the region caseload capacity screen', async () => {
    await browser.url(regionDefaultUrl + '/caseload-capacity')
    pageSubtitle = await $('.sln-page-subtitle')
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal('Division')
  })

  it('should navigate to the national caseload capacity screen', async () => {
    await browser.url(nationalDefaultUrl + '/caseload-capacity')
    pageSubtitle = await $('.sln-page-subtitle')
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal('National')
  })

  after(function () {
    authenticationHelper.logout()
  })
})
