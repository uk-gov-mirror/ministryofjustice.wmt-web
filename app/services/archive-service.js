const getArchive = require('./data/get-archive')

module.exports = function() {
    let result = {}
    let archivePromise = getArchive()
    return archivePromise.then(function(results) {
        result = calculateCapacity(results)
        return result
    })

}

var calculateCapacity = function(results) {
    for(result in results) {
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
        let availablePoints
        for(mult in multipliers) {
            availablePoints = availablePoints * mult
        }
        if(availablePoints !== 0) {
            result.capacity = result.totalPoints / availablePoints
        } else {
            result.capacity = NaN // all three were zero.... EDIT
        } 
    }
    return results
}