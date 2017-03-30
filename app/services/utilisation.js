class ViewUtilisation {
  constructor (reference, day, month, year) {
    this.reference = reference
    this.fields = [ day, month, year ]
    this.dob = dateFormatter.build(day, month, year)
    this.dobEncoded = dateFormatter.encodeDate(this.dob)
    this.isValid()
  }

}

module.exports = Utilisation
