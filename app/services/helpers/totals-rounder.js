module.exports = function (totals) {
    totals.totalContractedHours = totals.totalContractedHours.toFixed(1)
    totals.totalReduction = totals.totalReduction.toFixed(1)
    return totals
}
