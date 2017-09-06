class Reduction {
  constructor (reasonForReductionId, hours, reductionStartDate, reductionEndDate, notes, status) {
    this.reasonForReductionId = reasonForReductionId
    this.hours = hours
    this.reductionStartDate = reductionStartDate
    this.reductionEndDate = reductionEndDate
    this.notes = notes
    this.status = status
  }
}

module.exports = Reduction
