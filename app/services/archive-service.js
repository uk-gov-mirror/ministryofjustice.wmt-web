const getArchive = require('./data/get-archive')
const calculateAvailablePoints = require('../../../wmt-probation-rules').calculateAvailablePoints
const DefaultContractedHours = require('../../../wmt-probation-rules').DefaultContractedHours

module.exports = function() {
    return getArchive().then(function(results) {
        return calculateCapacity(results)
    })
}

var calculateCapacity = function(results) {
    results.forEach(function(result) {
        if(result.reduction === null) {
            result.reduction = 0
        }
        if(result.comments === null) {
            result.comments = ''
        }
        let defaultContractedHours = new DefaultContractedHours(37.5, 37.5)
        let availablePoints = calculateAvailablePoints(result.nominalTarget, result.omTypeId, result.contractedHours, result.hoursReduction, defaultContractedHours)
        if(availablePoints === 0) {
            result.capacity = 'CHZ' // TODO: Contracted Hours Zero
        } else {
            result.capacity = parseFloat((result.totalPoints / availablePoints) * 100).toFixed(2) + '%'
        }
    })
    return results
}