const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerIds = []
let workloadOwnerId
let workloadOwnerDefaultUrl
let teamDefaultUrl
let lduDefaultUrl
let nationalDefaultUrl
let regionDefaultUrl

describe('View reductions export for a Manager', function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Manager)
    const results = await dataHelper.selectIdsForWorkloadOwner()
    workloadOwnerIds = results
    workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
    workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerId
    teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id
    lduDefaultUrl = '/' + workloadTypes.PROBATION + '/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id
    regionDefaultUrl = '/' + workloadTypes.PROBATION + '/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id
    nationalDefaultUrl = '/' + workloadTypes.PROBATION + '/hmpps/0'
    await browser.url(workloadOwnerDefaultUrl + '/overview')
  })

  it('should include the reductions export for managers at team level', async function () {
    await browser.url(teamDefaultUrl + '/overview')
    const reductionExport = await $('.reduction-export')
    const exists = await reductionExport.isExisting()
    expect(exists).to.be.equal(true)
  })
  it('should include the reductions export for managers at ldu level', async function () {
    await browser.url(lduDefaultUrl + '/overview')
    const reductionExport = await $('.reduction-export')
    const exists = await reductionExport.isExisting()
    expect(exists).to.be.equal(true)
  })
  it('should include the reductions export for managers at region level', async function () {
    await browser.url(regionDefaultUrl + '/overview')
    const reductionExport = await $('.reduction-export')
    const exists = await reductionExport.isExisting()
    expect(exists).to.be.equal(true)
  })
  it('should not include the reductions export for managers at workload owner level', async function () {
    await browser.url(workloadOwnerDefaultUrl + '/overview')
    const reductionExport = await $('.reduction-export')
    const exists = await reductionExport.isExisting()
    expect(exists).to.be.equal(false)
  })
  it('should not include the reductions export for managers at national level', async function () {
    await browser.url(nationalDefaultUrl + '/overview')
    const reductionExport = await $('.reduction-export')
    const exists = await reductionExport.isExisting()
    expect(exists).to.be.equal(false)
  })

  after(function () {
    authenticationHelper.logout()
  })
})
