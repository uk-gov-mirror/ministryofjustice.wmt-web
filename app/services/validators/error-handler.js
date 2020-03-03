const FIELD_NAMES = require('./validation-field-names')

class ErrorHandler {
  constructor () {
    this.errors = {}
  }

  add (fieldName, message, options) {
    if (!Object.prototype.hasOwnProperty.call(this.errors, fieldName)) {
      this.errors[fieldName] = []
    }
    if (options !== undefined && options.secondaryFieldName !== undefined) {
      options.secondaryDisplayName = FIELD_NAMES[options.secondaryFieldName]
    }
    this.errors[fieldName].push(message(FIELD_NAMES[fieldName], options))
  }

  get () {
    var errors = this.errors
    for (var field in errors) {
      if (errors[field].length > 0) {
        return errors
      }
    }
    return false
  }
}

module.exports = function () {
  return new ErrorHandler()
}
