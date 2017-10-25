const ValidationError = require('../errors/validation-error')
const ErrorHandler = require('../validators/error-handler')
const FieldValidator = require('../validators/field-validator')

class WorkloadPoints {
  constructor (request) {
    this.previousWpId = request.previousWpId
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
    this.userId = request.userId
    this.sdr = request.sdr
    this.sdrConversion = request.sdrConversion
    this.nominalTargetPso = request.nominalTargetPso
    this.nominalTargetPo = request.nominalTargetPo
    this.weightingOverdue = request.weightingOverdue
    this.weightingWarrants = request.weightingWarrants
    this.weightingUpw = request.weightingUpw
    this.weightingArmsCommunity = request.weightingArmsCommunity
    this.weightingArmsLicense = request.weightingArmsLicense
    this.defaultContractedHoursPo = request.defaultContractedHoursPo
    this.defaultContractedHoursPso = request.defaultContractedHoursPso
    this.parom = request.parom
    this.paroms_enabled = 1
    this.isValid()
  }

  isValid () {
    var errors = ErrorHandler()
    FieldValidator(this.cusA, 'cusA', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusB1, 'cusB1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusB2, 'cusB2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusC1, 'cusC1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusC2, 'cusC2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusD1, 'cusD1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.cusD2, 'cusD2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commA, 'commA', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commB1, 'commB1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commB2, 'commB2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commC1, 'commC1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commC2, 'commC2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commD1, 'commD1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.commD2, 'commD2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licA, 'licA', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licB1, 'licB1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licB2, 'licB2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licC1, 'licC1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licC2, 'licC2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licD1, 'licD1', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.licD2, 'licD2', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.sdr, 'sdr', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.userId, 'userId', errors)
      .isRequired()
    FieldValidator(this.sdrConversion, 'sdrConversion', errors)
      .isRequired()
      .isInt(0, 999)
    FieldValidator(this.nominalTargetPso, 'nominalTargetPso', errors)
      .isRequired()
      .isInt(0, 9999)
    FieldValidator(this.nominalTargetPo, 'nominalTargetPo', errors)
      .isRequired()
      .isInt(0, 9999)
    FieldValidator(this.weightingOverdue, 'weightingOverdue', errors)
      .isRequired()
      .isFloat(0, 100.0)
    FieldValidator(this.weightingUpw, 'weightingUpw', errors)
      .isRequired()
      .isFloat(0, 100.0)
    FieldValidator(this.weightingWarrants, 'weightingWarrants', errors)
      .isRequired()
      .isFloat(0, 100.0)
    FieldValidator(this.weightingArmsCommunity, 'weightingArmsCommunity', errors)
      .isRequired()
      .isFloat(0, 100.0)
    FieldValidator(this.weightingArmsLicense, 'weightingArmsLicense', errors)
      .isRequired()
      .isFloat(0, 100.0)
    FieldValidator(this.defaultContractedHoursPo, 'defaultContractedHoursPo', errors)
      .isRequired()
      .isInt(0, 37)
    FieldValidator(this.defaultContractedHoursPso, 'defaultContractedHoursPso', errors)
      .isRequired()
      .isInt(0, 37)
    FieldValidator(this.parom, 'parom', errors)
      .isRequired()
      .isInt(0, 999)

    var validationErrors = errors.get()
    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}

module.exports = WorkloadPoints
