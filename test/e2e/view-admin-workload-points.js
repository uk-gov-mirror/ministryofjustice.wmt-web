const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const getWorloadPoints = require('../../app/services/data/get-workload-points')

const workloadPointsUrl = '/admin/workload-points'
let workloadPoints, pageTitle, pageSubtitle, link, prefix, tierA, tierB1, tierB2, tierC1, tierC2, tierD1, tierD2, tierE, tierF, tierG
let sdr, fdr, parom, overdue, warrants, upw, armsComm, armsLic
let nominalTargetPO, nominalTargetPSO
let contractedHoursPO, contractedHoursPSO, contractedHoursSPO
let editButton, saveButton, saveNotice, successMessage

describe('View / edit Workload Points', () => {
  before(async function () {
    workloadPoints = await getWorloadPoints(false)
    await authenticationHelper.login(authenticationHelper.users.DataAdmin)
    await browser.url(workloadPointsUrl)
  })

  describe('should navigate to the admin workload points screen', () => {
    it('with the correct breadcrumbs and headings', async () => {
      await browser.url(workloadPointsUrl)
      pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      pageSubtitle = await $('.govuk-caption-xl')
      pageSubtitle = await pageSubtitle.getText()
      expect(pageTitle, 'Workload Points page title should be "Workload Points"').to.equal('Workload Points')
      expect(pageSubtitle, 'Workload Points page subtitle should be "Admin"').to.equal('Admin')
      await browser.pause(5000)
    })

    it('with the correct tabs which become selected correctly', async () => {
      await browser.url(workloadPointsUrl)
      link = await $('[href="#custody"]')
      await link.click()
      await browser.pause(5000)
      prefix = '#cus-'
      tierA = await $(prefix + 'a')
      tierB1 = await $(prefix + 'b1')
      tierB2 = await $(prefix + 'b2')
      tierC1 = await $(prefix + 'c1')
      tierC2 = await $(prefix + 'c2')
      tierD1 = await $(prefix + 'd1')
      tierD2 = await $(prefix + 'd2')
      tierE = await $(prefix + 'e')
      tierF = await $(prefix + 'f')
      tierG = await $(prefix + 'g')

      tierA = await tierA.getValue()
      tierB1 = await tierB1.getValue()
      tierB2 = await tierB2.getValue()
      tierC1 = await tierC1.getValue()
      tierC2 = await tierC2.getValue()
      tierD1 = await tierD1.getValue()
      tierD2 = await tierD2.getValue()
      tierE = await tierE.getValue()
      tierF = await tierF.getValue()
      tierG = await tierG.getValue()

      expect(parseInt(tierA), 'Custody Tier A Weighting should be ' + workloadPoints.cusA).to.be.equal(workloadPoints.cusA)
      expect(parseInt(tierB1), 'Custody Tier B1 Weighting should be ' + workloadPoints.cusB1).to.be.equal(workloadPoints.cusB1)
      expect(parseInt(tierB2), 'Custody Tier B2 Weighting should be ' + workloadPoints.cusB2).to.be.equal(workloadPoints.cusB2)
      expect(parseInt(tierC1), 'Custody Tier C1 Weighting should be ' + workloadPoints.cusC1).to.be.equal(workloadPoints.cusC1)
      expect(parseInt(tierC2), 'Custody Tier C2 Weighting should be ' + workloadPoints.cusC2).to.be.equal(workloadPoints.cusC2)
      expect(parseInt(tierD1), 'Custody Tier D1 Weighting should be ' + workloadPoints.cusD1).to.be.equal(workloadPoints.cusD1)
      expect(parseInt(tierD2), 'Custody Tier D2 Weighting should be ' + workloadPoints.cusD2).to.be.equal(workloadPoints.cusD2)
      expect(parseInt(tierE), 'Custody Tier E Weighting should be ' + workloadPoints.cusE).to.be.equal(workloadPoints.cusE)
      expect(parseInt(tierF), 'Custody Tier F Weighting should be ' + workloadPoints.cusF).to.be.equal(workloadPoints.cusF)
      expect(parseInt(tierG), 'Custody Tier G Weighting should be ' + workloadPoints.cusG).to.be.equal(workloadPoints.cusG)

      // Licence
      link = await $('[href="#license"]')
      await link.click()
      await browser.pause(5000)
      prefix = '#lic-'
      tierA = await $(prefix + 'a')
      tierB1 = await $(prefix + 'b1')
      tierB2 = await $(prefix + 'b2')
      tierC1 = await $(prefix + 'c1')
      tierC2 = await $(prefix + 'c2')
      tierD1 = await $(prefix + 'd1')
      tierD2 = await $(prefix + 'd2')
      tierE = await $(prefix + 'e')
      tierF = await $(prefix + 'f')
      tierG = await $(prefix + 'g')

      tierA = await tierA.getValue()
      tierB1 = await tierB1.getValue()
      tierB2 = await tierB2.getValue()
      tierC1 = await tierC1.getValue()
      tierC2 = await tierC2.getValue()
      tierD1 = await tierD1.getValue()
      tierD2 = await tierD2.getValue()
      tierE = await tierE.getValue()
      tierF = await tierF.getValue()
      tierG = await tierG.getValue()

      expect(parseInt(tierA), 'Licence Tier A Weighting should be ' + workloadPoints.licA).to.be.equal(workloadPoints.licA)
      expect(parseInt(tierB1), 'Licence Tier B1 Weighting should be ' + workloadPoints.licB1).to.be.equal(workloadPoints.licB1)
      expect(parseInt(tierB2), 'Licence Tier B2 Weighting should be ' + workloadPoints.licB2).to.be.equal(workloadPoints.licB2)
      expect(parseInt(tierC1), 'Licence Tier C1 Weighting should be ' + workloadPoints.licC1).to.be.equal(workloadPoints.licC1)
      expect(parseInt(tierC2), 'Licence Tier C2 Weighting should be ' + workloadPoints.licC2).to.be.equal(workloadPoints.licC2)
      expect(parseInt(tierD1), 'Licence Tier D1 Weighting should be ' + workloadPoints.licD1).to.be.equal(workloadPoints.licD1)
      expect(parseInt(tierD2), 'Licence Tier D2 Weighting should be ' + workloadPoints.licD2).to.be.equal(workloadPoints.licD2)
      expect(parseInt(tierE), 'Licence Tier E Weighting should be ' + workloadPoints.licE).to.be.equal(workloadPoints.licE)
      expect(parseInt(tierF), 'Licence Tier F Weighting should be ' + workloadPoints.licF).to.be.equal(workloadPoints.licF)
      expect(parseInt(tierG), 'Licence Tier G Weighting should be ' + workloadPoints.licG).to.be.equal(workloadPoints.licG)

      // Community
      link = await $('[href="#community"]')
      await link.click()
      await browser.pause(5000)
      prefix = '#comm-'
      tierA = await $(prefix + 'a')
      tierB1 = await $(prefix + 'b1')
      tierB2 = await $(prefix + 'b2')
      tierC1 = await $(prefix + 'c1')
      tierC2 = await $(prefix + 'c2')
      tierD1 = await $(prefix + 'd1')
      tierD2 = await $(prefix + 'd2')
      tierE = await $(prefix + 'e')
      tierF = await $(prefix + 'f')
      tierG = await $(prefix + 'g')

      tierA = await tierA.getValue()
      tierB1 = await tierB1.getValue()
      tierB2 = await tierB2.getValue()
      tierC1 = await tierC1.getValue()
      tierC2 = await tierC2.getValue()
      tierD1 = await tierD1.getValue()
      tierD2 = await tierD2.getValue()
      tierE = await tierE.getValue()
      tierF = await tierF.getValue()
      tierG = await tierG.getValue()

      expect(parseInt(tierA), 'Community Tier A Weighting should be ' + workloadPoints.commA).to.be.equal(workloadPoints.commA)
      expect(parseInt(tierB1), 'Community Tier B1 Weighting should be ' + workloadPoints.commB1).to.be.equal(workloadPoints.commB1)
      expect(parseInt(tierB2), 'Community Tier B2 Weighting should be ' + workloadPoints.commB2).to.be.equal(workloadPoints.commB2)
      expect(parseInt(tierC1), 'Community Tier C1 Weighting should be ' + workloadPoints.commC1).to.be.equal(workloadPoints.commC1)
      expect(parseInt(tierC2), 'Community Tier C2 Weighting should be ' + workloadPoints.commC2).to.be.equal(workloadPoints.commC2)
      expect(parseInt(tierD1), 'Community Tier D1 Weighting should be ' + workloadPoints.commD1).to.be.equal(workloadPoints.commD1)
      expect(parseInt(tierD2), 'Community Tier D2 Weighting should be ' + workloadPoints.commD2).to.be.equal(workloadPoints.commD2)
      expect(parseInt(tierE), 'Community Tier E Weighting should be ' + workloadPoints.commE).to.be.equal(workloadPoints.commE)
      expect(parseInt(tierF), 'Community Tier F Weighting should be ' + workloadPoints.commF).to.be.equal(workloadPoints.commF)
      expect(parseInt(tierG), 'Community Tier G Weighting should be ' + workloadPoints.commG).to.be.equal(workloadPoints.commG)

      // Other
      link = await $('[href="#other"]')
      await link.click()
      await browser.pause(5000)
      sdr = await $('#sdr')
      fdr = await $('#sdrConversion')
      parom = await $('#parom')
      overdue = await $('#weightingOverdue')
      warrants = await $('#weightingWarrants')
      upw = await $('#weightingUpw')
      armsComm = await $('#weightingArmsCommunity')
      armsLic = await $('#weightingArmsLicense')

      nominalTargetPO = await $('#nominalTargetPo')
      nominalTargetPSO = await $('#nominalTargetPso')

      contractedHoursPO = await $('#defaultContractedHoursPo')
      contractedHoursPSO = await $('#defaultContractedHoursPso')
      contractedHoursSPO = await $('#defaultContractedHoursSpo')

      sdr = await sdr.getValue()
      fdr = await fdr.getValue()
      parom = await parom.getValue()
      overdue = await overdue.getValue()
      warrants = await warrants.getValue()
      upw = await upw.getValue()
      armsComm = await armsComm.getValue()
      armsLic = await armsLic.getValue()

      nominalTargetPO = await nominalTargetPO.getValue()
      nominalTargetPSO = await nominalTargetPSO.getValue()

      contractedHoursPO = await contractedHoursPO.getValue()
      contractedHoursPSO = await contractedHoursPSO.getValue()
      contractedHoursSPO = await contractedHoursSPO.getValue()

      expect(parseInt(sdr), 'SDR Weighting should be ' + workloadPoints.sdr).to.be.equal(workloadPoints.sdr)
      expect(parseInt(fdr), 'FDR Weighting should be ' + workloadPoints.sdrConversion).to.be.equal(workloadPoints.sdrConversion)
      expect(parseInt(parom), 'PAROM Weighting should be ' + workloadPoints.parom).to.be.equal(workloadPoints.parom)
      expect(parseInt(overdue), 'Overdue Weighting should be ' + workloadPoints.weightingOverdue).to.be.equal(workloadPoints.weightingOverdue)
      expect(parseInt(warrants), 'Warrants Weighting should be ' + workloadPoints.weightingWarrants).to.be.equal(workloadPoints.weightingWarrants)
      expect(parseInt(upw), 'UPW Weighting should be ' + workloadPoints.weightingUpw).to.be.equal(workloadPoints.weightingUpw)
      expect(parseInt(armsComm), 'ARMS Community Weighting should be ' + workloadPoints.weightingArmsCommunity).to.be.equal(workloadPoints.weightingArmsCommunity)
      expect(parseInt(armsLic), 'ARMS Licence Weighting should be ' + workloadPoints.weightingArmsLicense).to.be.equal(workloadPoints.weightingArmsLicense)

      expect(parseInt(nominalTargetPO), 'Nominal Target PO Weighting should be ' + workloadPoints.nominalTargetPo).to.be.equal(workloadPoints.nominalTargetPo)
      expect(parseInt(nominalTargetPSO), 'Nominal Target PSO Weighting should be ' + workloadPoints.nominalTargetPso).to.be.equal(workloadPoints.nominalTargetPso)
      expect(parseInt(contractedHoursPO), 'Contracted Hours PO Weighting should be ' + workloadPoints.defaultContractedHoursPo).to.be.equal(workloadPoints.defaultContractedHoursPo)
      expect(parseInt(contractedHoursPSO), 'Contracted Hours PSO Weighting should be ' + workloadPoints.defaultContractedHoursPso).to.be.equal(workloadPoints.defaultContractedHoursPso)
      expect(parseInt(contractedHoursSPO), 'Contracted Hours SPO Weighting should be ' + workloadPoints.defaultContractedHoursSpo).to.be.equal(workloadPoints.defaultContractedHoursSpo)
    })

    it('with the correct behaviour for the edit and save buttons', async () => {
      await browser.url(workloadPointsUrl)

      editButton = await $('#edit-button')
      await editButton.click()

      saveNotice = await $('#save-notice')
      saveNotice = await saveNotice.getText()
      expect(saveNotice, 'Save notice should contain "Saving changes made here"').to.contain('Saving changes made here')

      saveButton = await $('#save-button')
      await saveButton.click()

      successMessage = await $('.govuk-notification-banner__heading')
      successMessage = await successMessage.getText()

      expect(successMessage, 'Success message should equal "You have successfully updated the workload points!"').to.equal('You have successfully updated the workload points!')
    })
  })

  after(function () {
    authenticationHelper.logout()
  })
})
