const getArchive = require('./data/get-archive')
const calculateAvailablePoints = require('../../../wmt-probation-rules').calculateAvailablePoints
const DEFAULT_CONTRACTED_HOURS = 37
const DefaultContractedHours = require('../../../wmt-probation-rules').DefaultContractedHours

module.exports = function() {
    return getArchive().then(function(results) {
        
        //console.log('Nominal Target: ', results[10].nominalTarget)
        //console.log('Contracted Hours: ', results[10].contractedHours)
        // console.log('Hours Reduction: ', results[10].hoursReduction)
        //console.log('Calc available points: ', calculateAvailablePoints(results[10].nominalTarget, 5, results[10].contractedHours, results[10].hoursReduction, m))
        return calculateCapacity(results)
    })
}

var calculateCapacity = function(results) {
    results.forEach(function(result) {
        /** 
        let multipliers = []
        if(result.nominalTarget !== 0) {
            multipliers.push(result.nominalTarget)
        }
        if(result.contractedHours !== 0) {
            multipliers.push(result.contractedHours)
        } else {
            multipliers.push(DEFAULT_CONTRACTED_HOURS)
        }
        if(result.hoursReduction !== 0) {
            multipliers.push(result.hoursReduction)
        }
        if(typeof multipliers !== undefined && multipliers.length > 0) {
            let availablePoints = 1
            multipliers.forEach(function(mult) {
                availablePoints = availablePoints * mult
            })
            result.capacity = (result.totalPoints / availablePoints) * 100
            result.capacity = parseFloat(result.capacity).toFixed(2) + '%'
        } else {
            result.capacity = NaN // all three were zero.... EDIT
        }
        */
        let m = new DefaultContractedHours(37, 37)
        let availablePoints = calculateAvailablePoints(result.nominalTarget, 5, result.contractedHours, result.hoursReduction, m)
        result.capacity = (result.totalPoints / availablePoints) * 100
        result.capacity = parseFloat(result.capacity).toFixed(2) + '%'
        if(result.reduction === null) {
            result.reduction = 0
        }
    })
    return results
}