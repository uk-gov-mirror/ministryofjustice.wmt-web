module.exports = {
  getIsRequiredMessage: function (displayName) { return `${displayName} is required` },
  getIsAlphaMessage: function (displayName) { return `${displayName} must only contain letters` },
  getIsNumericMessage: function (displayName) { return `${displayName} must only contain numbers` },
  getIsRangeMessage: function (displayName, options) { return `${displayName} must be between ${options.min} and ${options.max}` },
  getIsIntegerMessage: function (displayName, options) { return `${displayName} must be a whole number between ${options.min} and ${options.max}` },
  getIsFloatMessage: function (displayName, options) { return `${displayName} must be a number between ${options.min} and ${options.max}` },
  getInvalidDateFormatMessage: function (displayName) { return `${displayName} was invalid` },
  getPastDateMessage: function (displayName) { return `${displayName} must be in the past` },
  getPastOrPresentDateMessage: function (displayName) { return `${displayName} must not be in the future` },
  getFutureDateMessage: function (displayName) { return `${displayName} must be in the future` },
  getIsDateLaterThanMessage: function (displayName, options) { return `${displayName} must be after ${options.secondaryDisplayName}` },
  getIsLessThanLengthMessage: function (displayName, options) { return `${displayName} must be shorter than ${options.length} characters` },
  getIsValidUsernameMessage: function (displayName) { return `${displayName} is invalid` },
  getIsBooleanMessage: function (displayName) { return `${displayName} must be true or false` }
}
