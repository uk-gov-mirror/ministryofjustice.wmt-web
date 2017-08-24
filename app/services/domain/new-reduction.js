class NewReduction {
  constructor (reasonForReductionId, hours, reductionStartDate, reductionEndDate, notes) {
    this.reasonForReductionId = reasonForReductionId
    this.hours = hours
    this.reductionStartDate = reductionStartDate
    this.reductionEndDate = reductionEndDate
    this.notes = notes
  }
}

module.exports = NewReduction
