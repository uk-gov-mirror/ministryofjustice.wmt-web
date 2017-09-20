const ValidationError = require('../errors/validation-error')
const ErrorHandler = require('../validators/error-handler')

class WorkloadPoints {
  constructor (request) {
    this.commA = request.commA
    this.commB1 = request.commB1
    this.commB2 = request.commB2
    this.commC1 = request.commC1
    this.commC2 = request.commC2
    this.commD1 = request.commD1
    this.commD2 = request.commD2
    this.cusA = request.cusA
    this.cusB1 = request.cusB1
    this.cusB2 = request.cusB2
    this.cusC1 = request.cusC1
    this.cusC2 = request.cusC2
    this.cusD1 = request.cusD1
    this.cusD2 = request.cusD2
    this.licA = request.licA
    this.licB1 = request.licB1
    this.licB2 = request.licB2
    this.licC1 = request.licC1
    this.licC2 = request.licC2
    this.licD1 = request.licD1
    this.licD2 = request.licD2
    this.user_id = request.user_id
    this.sdr = request.sdr
    this.fdr = request.fdr
    this.nominalTargetPso = request.nominalTargetPso
    this.nominalTargetPo = request.nominalTargetPo
    this.weightingOverdue = request.weightingOverdue
    this.weightingWarrants = request.weightingWarrants
    this.weightingUpw = request.weightingUpw
    this.defaultContractedHoursPo = request.defaultContractedHoursPo
    this.defaultContractedHoursPso = request.defaultContractedHoursPso
    this.parom = request.parom
    this.paroms_enabled = 1
  }

  isValid () {
    var errors = ErrorHandler()
    var validationErrors = errors.get()
    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}

module.exports = WorkloadPoints
