const expect = require('chai').expect
const Reduction = require('../../../../app/services/domain/reduction')
const reductionHelper = require('../../../../app/services/helpers/reduction-helper')
const reductionStatusType = require('../../../../app/constants/reduction-status-type')

var currentDate = new Date()
var activeStartDate = new Date(new Date().setDate(currentDate.getDate() - 30))
var activeEndDate = new Date(new Date().setDate(currentDate.getDate() + 30))
var scheduledStartDate = new Date(new Date().setDate(currentDate.getDate() + 30))
var scheduledEndDate = new Date(new Date().setDate(currentDate.getDate() + 60))

var ACTIVE_REDUCTION = new Reduction(1, 10, activeStartDate, activeEndDate, 'active note', reductionStatusType.ACTIVE)
var SCHEDULED_REDUCTION = new Reduction(2, 10, scheduledStartDate, scheduledEndDate, 'scheduled note', reductionStatusType.SCHEDULED)
var ARCHIVE_REDUCTION = new Reduction(3, 10, new Date(), new Date(), 'archive note', reductionStatusType.ARCHIVED)
var DELETED_REDUCTION = new Reduction(4, 10, new Date(), new Date(), 'deleted note', reductionStatusType.DELETED)

var REDUCTIONS = [ACTIVE_REDUCTION, SCHEDULED_REDUCTION, ARCHIVE_REDUCTION, DELETED_REDUCTION]

describe('services/helpers/reduction-helper', function () {
  describe('getReductionsByStatus', function () {
    it('should return reductions by status of active archived and scheduled', function () {
      var result = reductionHelper.getReductionsByStatus(REDUCTIONS)
      expect(result.activeReductions.length).to.eql(1)
      expect(result.activeReductions[0]).to.eql(ACTIVE_REDUCTION)
      expect(result.scheduledReductions.length).to.eql(1)
      expect(result.scheduledReductions[0]).to.eql(SCHEDULED_REDUCTION)
      expect(result.archivedReductions.length).to.eql(1)
      expect(result.archivedReductions[0]).to.eql(ARCHIVE_REDUCTION)
    })
  })
})
