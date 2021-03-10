const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerIds = []
let teamDefaultUrl
let lduDefaultUrl
let regionDefaultUrl
let nationalDefaultUrl
let results
let pageSubtitle
let overall, community, custody, licence
let national, region, ldu, team

describe('View your caseload flow', () => {
  before(async function () {
    await authenticationHerlp.login(authenticationHerlp.users.Staff)
    results = await dataHelper.selectIdsForWorkloadOwner()
    workloadOwnerIds = results
    teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id
    lduDefaultUrl = '/' + workloadTypes.PROBATION + '/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id
    regionDefaultUrl = '/' + workloadTypes.PROBATION + '/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id
    nationalDefaultUrl = '/' + workloadTypes.PROBATION + '/hmpps/0'
    await browser.url(teamDefaultUrl + '/caseload')
  })

  describe('should navigate to the team caseload screen', () => {
    it('with the correct breadcrumbs, subnav, title and export button', async () => {
      await browser.url(teamDefaultUrl + '/caseload')
      pageSubtitle = await $('.govuk-caption-xl')
      pageSubtitle = await pageSubtitle.getText()
      expect(pageSubtitle).to.equal('Team')
    })

    it('with the correct caseload total summary for each case type', async () => {
      await browser.url(teamDefaultUrl + '/caseload')
      custody = await $('#custodyTotal')
      custody = await custody.getText()
      let textTotal = custody.split('\n')

      expect(Number(textTotal[0])).to.be.greaterThan(-1)// eslint-disable-line
      expect(textTotal[1]).to.eql('Custody cases')

      community = await $('#communityTotal')
      community = await community.getText()
      textTotal = community.split('\n')
      expect(Number(textTotal[0])).to.be.greaterThan(-1) // eslint-disable-line
      expect(textTotal[1]).to.eql('Community cases')

      licence = await $('#licenseTotal')
      licence = await licence.getText()
      textTotal = licence.split('\n')
      expect(Number(textTotal[0])).to.be.greaterThan(-1) // eslint-disable-line
      expect(textTotal[1]).to.eql('License cases')
    })

    it('with the correct tabs and tables', async () => {
      await browser.url(teamDefaultUrl + '/caseload')
      overall = await $('[href="#overall"]')
      overall = await $('#overall-enhanced')
      custody = await $('#custody-enhanced')
      community = await $('#community-enhanced')
      licence = await $('#license-enhanced')

      custody = await $('[href="#custody"]')
      await custody.click()
      custody = await $('.sln-table-caseload-custody')

      community = await $('[href="#community"]')
      await community.click()
      community = await $('.sln-table-caseload-community')

      licence = await $('[href="#license"]')
      await licence.click()
      licence = await $('.sln-table-caseload-license')
    })
  })

  describe('should navigate to the LDU caseload screen', () => {
    it('with the correct table, breadcrumbs and export button', async () => {
      await browser.url(lduDefaultUrl + '/caseload')
      pageSubtitle = await $('.govuk-caption-xl')
      pageSubtitle = await pageSubtitle.getText()
      expect(pageSubtitle).to.equal('Probation Delivery Unit')

      const grade = await $('.sln-table-caseload-by-grade')
      let exists = await grade.isExisting()
      expect(exists).to.be.equal(true)

      const summary = await $('.sln-table-caseload-overall-summary')
      exists = await summary.isExisting()
      expect(exists).to.be.equal(true)

      overall = await $('[href="#overall"]')
      exists = await overall.isExisting()
      expect(exists).to.be.equal(true)

      overall = await $('#overall-enhanced')
      exists = await overall.isExisting()
      expect(exists).to.be.equal(true)

      custody = await $('#custody-enhanced')
      exists = await custody.isExisting()
      expect(exists).to.be.equal(true)

      community = await $('#community-enhanced')
      exists = await community.isExisting()
      expect(exists).to.be.equal(true)

      licence = await $('#license-enhanced')
      exists = await licence.isExisting()
      expect(exists).to.be.equal(true)

      custody = await $('[href="#custody"]')
      await custody.click()
      custody = await $('.sln-table-caseload-custody')

      community = await $('[href="#community"]')
      await community.click()
      community = await $('.sln-table-caseload-community')

      licence = await $('[href="#license"]')
      await licence.click()
      licence = await $('.sln-table-caseload-license')
    })

    it('should be accessible via the Caseload tab on Team and LDUs default view', async () => {
      await browser.url(nationalDefaultUrl)
      region = await $('[href="' + regionDefaultUrl + '"]')
      await region.click()
      ldu = await $('[href="' + lduDefaultUrl + '"]')
      await ldu.click()
      ldu = await $('[href="' + lduDefaultUrl + '/caseload"]')
      await ldu.click()

      const grade = await $('.sln-table-caseload-by-grade')
      const exists = await grade.isExisting()
      expect(exists).to.be.equal(true)

      ldu = await $('[href="' + lduDefaultUrl + '/overview"]')
      await ldu.click()

      team = await $('[href="' + teamDefaultUrl + '"]')
      await team.click()

      team = await $('[href="' + teamDefaultUrl + '/caseload"]')
      await team.click()
    })

    it('should be accessible via the Case Progress tab when on any other tab', async () => {
      await browser.url(teamDefaultUrl)
      team = await $('[href="' + teamDefaultUrl + '/caseload"]')
      await team.click()

      team = await $('[href="' + teamDefaultUrl + '/case-progress"]')
      await team.click()

      team = await $('[href="' + teamDefaultUrl + '/caseload"]')
      await team.click()

      team = await $('[href="' + teamDefaultUrl + '/caseload-capacity"]')
      await team.click()

      team = await $('[href="' + teamDefaultUrl + '/caseload"]')
      await team.click()
    })
  })

  describe('should navigate to the Region caseload screen', () => {
    it('with the correct table, breadcrumbs and export button', async () => {
      await browser.url(regionDefaultUrl + '/caseload')
      pageSubtitle = await $('.govuk-caption-xl')
      pageSubtitle = await pageSubtitle.getText()
      expect(pageSubtitle).to.equal('Region')
    })

    it('should be accessible via the Caseload tab on regions default view', async () => {
      await browser.url(nationalDefaultUrl)
      region = await $('[href="' + regionDefaultUrl + '"]')
      await region.click()

      region = await $('[href="' + regionDefaultUrl + '/caseload"]')
      await region.click()

      const grade = await $('.sln-table-caseload-by-grade')
      const exists = await grade.isExisting()
      expect(exists).to.be.equal(true)
    })

    it('should be accessible via the Case Progress tab when on any other tab', async () => {
      await browser.url(regionDefaultUrl)
      region = await $('[href="' + regionDefaultUrl + '/caseload"]')
      await region.click()

      let grade = await $('.sln-table-caseload-by-grade')
      let exists = await grade.isExisting()
      expect(exists).to.be.equal(true)

      region = await $('[href="' + regionDefaultUrl + '/case-progress"]')
      await region.click()

      region = await $('[href="' + regionDefaultUrl + '/caseload"]')
      await region.click()

      grade = await $('.sln-table-caseload-by-grade')
      exists = await grade.isExisting()
      expect(exists).to.be.equal(true)
      region = await $('[href="' + regionDefaultUrl + '/caseload-capacity"]')
      await region.click()

      region = await $('[href="' + regionDefaultUrl + '/caseload"]')
      await region.click()

      grade = await $('.sln-table-caseload-by-grade')
      exists = await grade.isExisting()
      expect(exists).to.be.equal(true)
    })
  })

  describe('should navigate to the National caseload screen', () => {
    it('with the correct table, breadcrumbs and export button', async () => {
      await browser.url(nationalDefaultUrl + '/caseload')
      pageSubtitle = await $('.govuk-caption-xl')
      pageSubtitle = await pageSubtitle.getText()
      expect(pageSubtitle).to.equal('National')
    })

    it('should be accessible via the Caseload tab on regions default view', async () => {
      await browser.url(nationalDefaultUrl)
      national = await $('[href="' + nationalDefaultUrl + '/caseload"]')
      await national.click()

      const grade = await $('.sln-table-caseload-by-grade')
      const exists = await grade.isExisting()
      expect(exists).to.be.equal(true)
    })

    it('should be accessible via the Case Progress tab when on any other tab', async () => {
      await browser.url(nationalDefaultUrl)

      national = await $('[href="' + nationalDefaultUrl + '/caseload"]')
      await national.click()

      let grade = await $('.sln-table-caseload-by-grade')
      let exists = await grade.isExisting()
      expect(exists).to.be.equal(true)

      national = await $('[href="' + nationalDefaultUrl + '/case-progress"]')
      await national.click()

      national = await $('[href="' + nationalDefaultUrl + '/caseload"]')
      await national.click()

      grade = await $('.sln-table-caseload-by-grade')
      exists = await grade.isExisting()
      expect(exists).to.be.equal(true)

      national = await $('[href="' + nationalDefaultUrl + '/caseload-capacity"]')
      await national.click()

      national = await $('[href="' + nationalDefaultUrl + '/caseload"]')
      await national.click()

      grade = await $('.sln-table-caseload-by-grade')
      exists = await grade.isExisting()
      expect(exists).to.be.equal(true)
    })
  })

  after(function () {
    authenticationHerlp.logout()
  })
})
