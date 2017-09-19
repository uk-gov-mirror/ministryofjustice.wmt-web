module.exports = {
  getIsRequired: function (displayName) { return `${displayName} is required` },
  getIsAlpha: function (displayName) { return `${displayName} must only contain letters` },
  getIsNumeric: function (displayName) { return `${displayName} must only contain numbers` },
  getIsRangeMessage: function (displayName, options) { return `${displayName} must be between ${options.min} and ${options.max}` },
  getIsIntegerMessage: function (displayName, options) { return `${displayName} must be a whole number between ${options.min} and ${options.max}` },
  getIsFloatMessage: function (displayName, options) { return `${displayName} must be a number between ${options.min} and ${options.max}` }
}
