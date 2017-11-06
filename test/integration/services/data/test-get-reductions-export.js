const expect = require('chai').expect

const getReductionsExport = require('../../../../app/services/data/get-reduction-notes-export')
const orgUnitConstants = require('../../../../app/constants/organisation-unit')

describe('services/data/get-reduction-notes-export', function() {
    


    it('should return an empty list when team does not exist', function () {
        return getReductionsExport(9999999, orgUnitConstants.TEAM.name)
        .then(function (results) {
          expect(results).to.be.empty //eslint-disable-line
        })
    })
    
    it('should return an empty list when ldu does not exist', function () {
        return getReductionsExport(9999999, orgUnitConstants.LDU.name)
        .then(function (results) {
          expect(results).to.be.empty //eslint-disable-line
        })
    })
    
    it('should return an empty list when region does not exist', function () {
        return getReductionsExport(9999999, orgUnitConstants.REGION.name)
        .then(function (results) {
          expect(results).to.be.empty //eslint-disable-line
        })
    })
})