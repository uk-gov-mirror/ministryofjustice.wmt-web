class DisplayTable {
  constructor (headings, rows) {
    this.headings = headings
    this.rows = rows
    this.isValid()
  }

  isValid () {
    if (this.headings.length < 1) {
      throw new Error('No headings found')
    }
  }
}

module.exports = DisplayTable
