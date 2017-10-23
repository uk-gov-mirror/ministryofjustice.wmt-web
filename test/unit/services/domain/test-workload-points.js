/* eslint-disable no-new */
const expect = require('chai').expect
const WorkloadPoints = require('../../../../app/services/domain/workload-points')
const ValidationError = require('../../../../app/services/errors/validation-error')

var VALID_WORKLOAD_POINTS = {
  previousWpId: '2',
  commA: '111',
  commB1: '101',
  commB2: '99',
  commC1: '55',
  commC2: '44',
  commD1: '22',
  commD2: '11',
  cusA: '44',
  cusB1: '34',
  cusB2: '33',
  cusC1: '22',
  cusC2: '21',
  cusD1: '11',
  cusD2: '10',
  licA: '150',
  licB1: '110',
  licB2: '99',
  licC1: '55',
  licC2: '54',
  licD1: '44',
  licD2: '43',
  sdr: '101',
  userId: '35',
  sdrConversion: '51',
  nominalTargetPso: '2001',
  nominalTargetPo: '2001',
  weightingOverdue: '0.0',
  weightingWarrants: '0.0',
  weightingUpw: '100.0',
  weightingArmsCommunity: '10.1',
  weightingArmsLicense: '10.2',
  defaultContractedHoursPo: '37',
  defaultContractedHoursPso: '37',
  parom: '121',
  isT2A: 'false'
}

describe('services/domain/workload-points', function () {
  it('should create a valid workload points object', function () {
    var workloadPoints = new WorkloadPoints(VALID_WORKLOAD_POINTS)
    expect(workloadPoints.commA).to.equal('111')
    expect(workloadPoints.commB1).to.equal('101')
    expect(workloadPoints.commB2).to.equal('99')
    expect(workloadPoints.commC1).to.equal('55')
    expect(workloadPoints.commC2).to.equal('44')
    expect(workloadPoints.commD1).to.equal('22')
    expect(workloadPoints.cusA).to.equal('44')
    expect(workloadPoints.cusB1).to.equal('34')
    expect(workloadPoints.cusB2).to.equal('33')
    expect(workloadPoints.cusC1).to.equal('22')
    expect(workloadPoints.cusC2).to.equal('21')
    expect(workloadPoints.cusD1).to.equal('11')
    expect(workloadPoints.cusD2).to.equal('10')
    expect(workloadPoints.defaultContractedHoursPo).to.equal('37')
    expect(workloadPoints.defaultContractedHoursPso).to.equal('37')
    expect(workloadPoints.sdrConversion).to.equal('51')
    expect(workloadPoints.licA).to.equal('150')
    expect(workloadPoints.licB1).to.equal('110')
    expect(workloadPoints.licB2).to.equal('99')
    expect(workloadPoints.licC1).to.equal('55')
    expect(workloadPoints.licC2).to.equal('54')
    expect(workloadPoints.licD1).to.equal('44')
    expect(workloadPoints.licD2).to.equal('43')
    expect(workloadPoints.userId).to.equal('35')
    expect(workloadPoints.nominalTargetPo).to.equal('2001')
    expect(workloadPoints.nominalTargetPso).to.equal('2001')
    expect(workloadPoints.parom).to.equal('121')
    expect(workloadPoints.sdr).to.equal('101')
    expect(workloadPoints.weightingOverdue).to.equal('0.0')
    expect(workloadPoints.weightingUpw).to.equal('100.0')
    expect(workloadPoints.weightingArmsCommunity).to.equal('10.1')
    expect(workloadPoints.weightingArmsLicense).to.equal('10.2')
    expect(workloadPoints.weightingWarrants).to.equal('0.0')
    expect(workloadPoints.isT2A).to.equal('false')
  })

  it('should raise a ValidationError if a Community Weighting field is out of range', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.commA = '1000'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if a Community Weighting field is not set', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.commD2 = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if a Custody Weighting field is out of range', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.cusB1 = '1000'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if a Custody Weighting field is not set', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.cusC2 = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if a License Weighting field is out of range', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.licC1 = '1000'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if a License Weighting field is not set', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.licC2 = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if Default Contracted Hours PO field is not set', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.defaultContractedHoursPo = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if Default Contracted Hours PSO field is not set', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.defaultContractedHoursPso = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if Default Contracted Hours PO field is outside valid range', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.defaultContractedHoursPo = '-1'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if Default Contracted Hours PSO field is outside valid range', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.defaultContractedHoursPso = '50'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if SDR field is outside valid range', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.sdr = '9000'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if SDR field is not set', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.sdr = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if SDR Conversion field is outside valid range', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.sdrConversion = '-4'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if SDR Conversion field is not set', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.sdrConversion = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if PAROM field is outside valid range', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.parom = '-1'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if PAROM field is not set', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.parom = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if Nominal Target PO field is outside valid range', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.nominalTargetPo = '10000'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if Nominal Target PSO field is not set', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.nominalTargetPo = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if Weighting Overdue field is outside valid range', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.weightingOverdue = '101'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if Weighting Overdue field is not set', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.weightingOverdue = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if Weighting Upw field is outside valid range', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.weightingUpw = '-1'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if Weighting Upw field is not set', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.weightingUpw = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if Weighting Warrants field is outside valid range', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.weightingWarrants = '-1'

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })

  it('should raise a ValidationError if Weighting Warrants field is not set', function () {
    var invalidWorkloadPoints = Object.assign({}, VALID_WORKLOAD_POINTS)
    invalidWorkloadPoints.weightingWarrants = ''

    expect(function () {
      new WorkloadPoints(invalidWorkloadPoints)
    }).to.throw(ValidationError)
  })
})
