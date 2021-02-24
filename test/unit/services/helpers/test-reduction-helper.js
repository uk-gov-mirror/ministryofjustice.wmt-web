const moment = require('moment')
const expect = require('chai').expect
const Reduction = require('../../../../app/services/domain/reduction')
const reductionHelper = require('../../../../app/services/helpers/reduction-helper')
const reductionStatusType = require('../../../../app/constants/reduction-status-type')

const activeStartDate = moment().subtract(30, 'days').toDate()
const activeEndDate = moment().add(30, 'days').toDate()
const scheduledStartDate = moment().add(30, 'days').toDate()
const scheduledEndDate = moment().add(60, 'days').toDate()
const archivedStartDate = moment().subtract(30, 'days').toDate()
const archivedEndDate = moment().subtract(15, 'days').toDate()

const REDUCTION_REASON = {
  maxAllowanceHours: 0
}

const ACTIVE_REDUCTION = new Reduction('1', '11',
  [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
  [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'active note', REDUCTION_REASON)
const SCHEDULED_REDUCTION = new Reduction('2', '12',
  [scheduledStartDate.getDate(), scheduledStartDate.getMonth() + 1, scheduledStartDate.getFullYear()],
  [scheduledEndDate.getDate(), scheduledEndDate.getMonth() + 1, scheduledEndDate.getFullYear()], 'scheduled note', REDUCTION_REASON)
const ARCHIVE_REDUCTION = new Reduction('3', '13',
  [archivedStartDate.getDate(), archivedStartDate.getMonth() + 1, archivedStartDate.getFullYear()],
  [archivedEndDate.getDate(), archivedEndDate.getMonth() + 1, archivedEndDate.getFullYear()], 'archive note', REDUCTION_REASON)
const DELETED_REDUCTION = new Reduction('4', '10',
  [archivedStartDate.getDate(), archivedStartDate.getMonth() + 1, archivedStartDate.getFullYear()],
  [archivedEndDate.getDate(), archivedEndDate.getMonth() + 1, archivedEndDate.getFullYear()], 'deleted note', REDUCTION_REASON)
DELETED_REDUCTION.status = reductionStatusType.DELETED
const REDUCTIONS = [ACTIVE_REDUCTION, SCHEDULED_REDUCTION, ARCHIVE_REDUCTION, DELETED_REDUCTION]

describe('services/helpers/reduction-helper', function () {
  describe('getReductionsByStatus', function () {
    it('should return reductions by status of active, scheduled, archived', function () {
      const result = reductionHelper.getReductionsByStatus(REDUCTIONS)
      expect(result.activeReductions.length).to.eql(1)
      expect(result.activeReductions[0]).to.eql(ACTIVE_REDUCTION)
      expect(result.scheduledReductions.length).to.eql(1)
      expect(result.scheduledReductions[0]).to.eql(SCHEDULED_REDUCTION)
      expect(result.archivedReductions.length).to.eql(1)
      expect(result.archivedReductions[0]).to.eql(ARCHIVE_REDUCTION)
    })
  })
})
