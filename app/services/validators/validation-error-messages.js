module.exports = {
  getIsRequired: function (displayName) { return `${displayName} is required` },
  getInvalidDateFormatMessage: function (displayName) { return `${displayName} was invalid` },
  getIsOlderThanMaxHistory: function (displayName, options) { return `Date range must be within the past ${options.years} years`},
  getPastDateMessage: function (displayName) { return `${displayName} must be in the past` },
}
