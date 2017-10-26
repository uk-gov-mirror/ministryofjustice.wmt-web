const expect = require('chai').expect
const getExportCsv = require('../../../app/services/get-export-csv')
const orgUnit = require('../../../app/constants/organisation-unit')
const tabs = require('../../../app/constants/wmt-tabs')
const helper = require('../../helpers/export-csv-helper')

describe('services/get-export-csv', function () {
  describe('should return the correct csv object', function () {
    it('for Team Caseload', function () {
      expect(getExportCsv(orgUnit.TEAM.name, helper.TEAM_CASELOAD_RESULT, tabs.CASELOAD)).to.eql(helper.TEAM_CASELOAD_CSV)
    })

    it('for LDU Caseload', function () {
      expect(getExportCsv(orgUnit.LDU.name, helper.LDU_CASELOAD_RESULT, tabs.CASELOAD)).to.eql(helper.LDU_CASELOAD_CSV)
    })

    it('for Region Caseload', function () {
      expect(getExportCsv(orgUnit.REGION.name, helper.REGION_CASELOAD_RESULT, tabs.CASELOAD)).to.eql(helper.REGION_CASELOAD_CSV)
    })

    it('for National Caseload', function () {
      expect(getExportCsv(orgUnit.NATIONAL.name, helper.NATIONAL_CASELOAD_RESULT, tabs.CASELOAD)).to.eql(helper.NATIONAL_CASELOAD_CSV)
    })

    it('for Offender Manager Overview', function () {
      expect(getExportCsv(orgUnit.OFFENDER_MANAGER.name, helper.OM_OVERVIEW_RESULT, tabs.OVERVIEW)).to.eql(helper.OM_OVERVIEW_CSV)
    })

    it('for Team Overview', function () {
      expect(getExportCsv(orgUnit.TEAM.name, helper.TEAM_OVERVIEW_RESULT, tabs.OVERVIEW)).to.eql(helper.TEAM_OVERVIEW_CSV)
    })

    it('for remaining Overviews', function () {
      expect(getExportCsv(orgUnit.LDU.name, helper.LDU_OVERVIEW_RESULT, tabs.OVERVIEW)).to.eql(helper.LDU_OVERVIEW_CSV)
      expect(getExportCsv(orgUnit.REGION.name, helper.LDU_OVERVIEW_RESULT, tabs.OVERVIEW).csv).to.include(helper.REGION_OVERVIEW_HEADINGS)
      expect(getExportCsv(orgUnit.NATIONAL.name, helper.LDU_OVERVIEW_RESULT, tabs.OVERVIEW).csv).to.include(helper.NATIONAL_OVERVIEW_HEADINGS)
    })
  })
  describe('should format the capacity when exporting overviews', function () {
    it('to two decimal figures', function () {
      var capacityExport = getExportCsv(orgUnit.TEAM.name, helper.TEAM_OVERVIEW_RESULT, tabs.OVERVIEW).csv
      expect(capacityExport).to.include('107.37')
      expect(capacityExport).to.include('106.84')
    })
    it('with a percentage symbol', function () {
      var capacityExport = getExportCsv(orgUnit.TEAM.name, helper.TEAM_OVERVIEW_RESULT, tabs.OVERVIEW).csv
      expect(capacityExport).to.include('107.37%')
      expect(capacityExport).to.include('106.84%')
    })
    it('for Offender Manager overview', function () {
      var capacityExport = getExportCsv(orgUnit.OFFENDER_MANAGER.name, helper.OM_OVERVIEW_RESULT, tabs.OVERVIEW).csv
      expect(capacityExport).to.include('105.00%')
    })
  })
})
