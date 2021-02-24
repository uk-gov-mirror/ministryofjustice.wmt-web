const expect = require('chai').expect
const getExportCsv = require('../../../app/services/get-export-csv')
const orgUnit = require('../../../app/constants/organisation-unit')
const tabs = require('../../../app/constants/wmt-tabs')
const helper = require('../../helpers/export-csv-helper')

describe('services/get-export-csv', function () {
  describe('should return the correct csv object', function () {
    it('for Team Caseload', function () {
      expect(getExportCsv(orgUnit.TEAM.name, helper.TEAM_CASELOAD_RESULT, tabs.CASELOAD).csv).to.eql(helper.TEAM_CASELOAD_CSV.csv)
    })

    it('for LDU Caseload', function () {
      expect(getExportCsv(orgUnit.LDU.name, helper.LDU_CASELOAD_RESULT, tabs.CASELOAD).csv).to.eql(helper.LDU_CASELOAD_CSV.csv)
    })

    it('for Region Caseload', function () {
      expect(getExportCsv(orgUnit.REGION.name, helper.REGION_CASELOAD_RESULT, tabs.CASELOAD).csv).to.eql(helper.REGION_CASELOAD_CSV.csv)
    })

    it('for National Caseload', function () {
      expect(getExportCsv(orgUnit.NATIONAL.name, helper.NATIONAL_CASELOAD_RESULT, tabs.CASELOAD).csv).to.eql(helper.NATIONAL_CASELOAD_CSV.csv)
    })

    it('for Offender Manager Overview', function () {
      expect(getExportCsv(orgUnit.OFFENDER_MANAGER.name, helper.OM_OVERVIEW_RESULT, tabs.OVERVIEW).csv).to.eql(helper.OM_OVERVIEW_CSV.csv)
    })

    it('for Team Overview', function () {
      expect(getExportCsv(orgUnit.TEAM.name, helper.TEAM_OVERVIEW_RESULT, tabs.OVERVIEW).csv).to.eql(helper.TEAM_OVERVIEW_CSV.csv)
    })

    it('for LDU Overview', function () {
      expect(getExportCsv(orgUnit.LDU.name, helper.LDU_OVERVIEW_RESULT, tabs.OVERVIEW).csv).to.eql(helper.LDU_OVERVIEW_CSV.csv)
    })

    it('for Region Overview', function () {
      expect(getExportCsv(orgUnit.REGION.name, helper.REGION_OVERVIEW_RESULT, tabs.OVERVIEW).csv).to.eql(helper.REGION_OVERVIEW_CSV.csv)
    })

    it('for National Overview', function () {
      expect(getExportCsv(orgUnit.NATIONAL.name, helper.NATIONAL_OVERVIEW_RESULT, tabs.OVERVIEW).csv).to.eql(helper.NATIONAL_OVERVIEW_CSV.csv)
    })

    it('for Team reductions', function () {
      expect(getExportCsv(orgUnit.TEAM.name, helper.TEAM_REDUCTIONS_RESULT, tabs.REDUCTIONS_EXPORT).csv).to.eql(helper.TEAM_REDUCTIONS_CSV.csv)
    })

    it('for LDU reductions', function () {
      expect(getExportCsv(orgUnit.LDU.name, helper.LDU_REDUCTIONS_RESULT, tabs.REDUCTIONS_EXPORT).csv).to.eql(helper.LDU_REDUCTIONS_CSV.csv)
    })

    it('for Region reductions', function () {
      expect(getExportCsv(orgUnit.REGION.name, helper.REGION_REDUCTIONS_RESULT, tabs.REDUCTIONS_EXPORT).csv).to.eql(helper.REGION_REDUCTIONS_CSV.csv)
    })

    it('for ARMS Export', function () {
      expect(getExportCsv(orgUnit.TEAM.name, helper.ARMS_EXPORT_RESULT.armsExportDetails, tabs.EXPORT.ARMS_EXPORT).csv).to.eql(helper.ARMS_EXPORT_CSV.csv)
    })

    it('for Workload Percentage Breakdown Export', function () {
      expect(getExportCsv(orgUnit.TEAM.name, helper.PERCENTAGE_WORKLOAD_EXPORT_RESULT.percentageWorkloadExportDetails, tabs.EXPORT.WORKLOAD_PERCENTAGE_EXPORT).csv).to.eql(helper.PERCENTAGE_WORKLOAD_EXPORT_CSV.csv)
    })

    it('for Case Details Export', function () {
      expect(getExportCsv(orgUnit.TEAM.name, helper.CASE_DETAILS_EXPORT_RESULT.caseDetailsExportDetails, tabs.EXPORT.CASE_DETAILS_EXPORT).csv).to.eql(helper.CASE_DETAILS_EXPORT_CSV.csv)
    })

    it('for CMS Export', function () {
      expect(getExportCsv(orgUnit.TEAM.name, helper.CMS_EXPORT_RESULT.cmsExportDetails, tabs.EXPORT.CMS_EXPORT).csv).to.eql(helper.CMS_EXPORT_CSV.csv)
    })

    it('for Group Supervision Export', function () {
      expect(getExportCsv(orgUnit.TEAM.name, helper.GS_EXPORT_RESULT.gsExportDetails, tabs.EXPORT.GROUP_SUPERVISION_EXPORT).csv).to.eql(helper.GS_EXPORT_CSV.csv)
    })

    it('for Suspended Lifers Export', function () {
      expect(getExportCsv(orgUnit.TEAM.name, helper.SUSPENDED_LIFER_EXPORT_RESULT.suspendedLiferExportDetails, tabs.EXPORT.SUSPENDED_LIFERS_EXPORT).csv).to.eql(helper.SUSPENDED_LIFER_CSV.csv)
    })

    it('for Expiring Reductions Export', function () {
      expect(getExportCsv(orgUnit.TEAM.name, helper.TEAM_EXPIRING_REDUCTIONS_RESULT.reductionNotes, tabs.EXPORT.EXPIRING_REDUCTIONS).csv).to.eql(helper.TEAM_EXPIRING_REDUCTIONS_CSV.csv)
    })
  })
  describe('should format the capacity percentage when exporting overviews', function () {
    it('to a 1DP number with a percentage symbol', function () {
      const capacityExport = getExportCsv(orgUnit.REGION.name, helper.PERCENTAGE_FORMAT_TEST, tabs.OVERVIEW).csv
      expect(capacityExport).to.include('115.3%')
    })
  })
})
