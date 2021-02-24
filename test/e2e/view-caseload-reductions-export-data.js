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

describe('View reductions export for a Data Admin', function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.DataAdmin)
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

  it('should include the reductions export for data admin users at team level', async function () {
    await browser.url(teamDefaultUrl + '/overview')
    const reductionExport = await $('.reduction-export')
    const exists = await reductionExport.isExisting()
    expect(exists).to.be.equal(true)
  })
  it('should include the reductions export for data admin users at ldu level', async function () {
    await browser.url(lduDefaultUrl + '/overview')
    const reductionExport = await $('.reduction-export')
    const exists = await reductionExport.isExisting()
    expect(exists).to.be.equal(true)
  })
  it('should include the reductions export for data admin users at region level', async function () {
    await browser.url(regionDefaultUrl + '/overview')
    const reductionExport = await $('.reduction-export')
    const exists = await reductionExport.isExisting()
    expect(exists).to.be.equal(true)
  })
  it('should not include the reductions export for data admin users at workload owner level', async function () {
    try {
      await browser.url(workloadOwnerDefaultUrl + '/overview')
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      expect(exists).to.be.equal(false)
    } catch (error) {
      console.error(error)
    }
  })
  it('should not include the reductions export for data admin users at national level', async function () {
    try {
      await browser.url(nationalDefaultUrl + '/overview')
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      expect(exists).to.be.equal(false)
    } catch (error) {
      console.error(error)
    }
  })

  after(function () {
    authenticationHelper.logout()
  })
})
