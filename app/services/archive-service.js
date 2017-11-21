const getArchive = require('./data/get-archive')

module.exports = function() {
    return getArchive().then(function(results) {
        return calculateCapacity(results)
    })
}

var calculateCapacity = function(results) {
    results.forEach(function(result) {
        let multipliers = []
        if(result.nominalTarget !== 0) {
            multipliers.push(result.nominalTarget)
        }
        if(result.contractedHours !== 0) {
            multipliers.push(result.contractedHours)
        }
        if(result.hoursReduction !== 0) {
            multipliers.push(result.hoursReduction)
        }
        if(typeof multipliers !== undefined && multipliers.length > 0) {
            let availablePoints = 1
            multipliers.forEach(function(mult) {
                availablePoints = availablePoints * mult
            })
            result.capacity = result.totalPoints / availablePoints
            result.capacity = parseFloat(result.capacity).toFixed(2) + '%'
        } else {
            result.capacity = NaN // all three were zero.... EDIT
        }
        if(result.reduction === null) {
            result.reduction = 0
        }
    })
    return results
}