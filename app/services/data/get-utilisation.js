const util2013 = [
  { utilisation_percentage: 30, month: 'January' },
  { utilisation_percentage: 80, month: 'February' },
  { utilisation_percentage: 120, month: 'March' },
  { utilisation_percentage: 100, month: 'April' },
  { utilisation_percentage: 90, month: 'May' },
  { utilisation_percentage: 118, month: 'June' },
  { utilisation_percentage: 130, month: 'July' },
  { utilisation_percentage: 93, month: 'August' },
  { utilisation_percentage: 97, month: 'September' },
  { utilisation_percentage: 101, month: 'October' },
  { utilisation_percentage: 110, month: 'November' },
  { utilisation_percentage: 99, month: 'December' }
]
const util2014 = [
  { utilisation_percentage: 90, month: 'January' },
  { utilisation_percentage: 100, month: 'February' },
  { utilisation_percentage: 115, month: 'March' },
  { utilisation_percentage: 100, month: 'April' },
  { utilisation_percentage: 110, month: 'May' },
  { utilisation_percentage: 118, month: 'June' },
  { utilisation_percentage: 100, month: 'July' },
  { utilisation_percentage: 93, month: 'August' },
  { utilisation_percentage: 97, month: 'September' },
  { utilisation_percentage: 101, month: 'October' },
  { utilisation_percentage: 110, month: 'November' },
  { utilisation_percentage: 99, month: 'December' }
]
const util2015 = [
  { utilisation_percentage: 50, month: 'January' },
  { utilisation_percentage: 80, month: 'February' },
  { utilisation_percentage: 40, month: 'March' },
  { utilisation_percentage: 100, month: 'April' },
  { utilisation_percentage: 110, month: 'May' },
  { utilisation_percentage: 78, month: 'June' },
  { utilisation_percentage: 50, month: 'July' },
  { utilisation_percentage: 120, month: 'August' },
  { utilisation_percentage: 150, month: 'September' },
  { utilisation_percentage: 20, month: 'October' },
  { utilisation_percentage: 30, month: 'November' },
  { utilisation_percentage: 66, month: 'December' }
]
const util2016 = [
  { utilisation_percentage: 120, month: 'January' },
  { utilisation_percentage: 120, month: 'February' },
  { utilisation_percentage: 110, month: 'March' },
  { utilisation_percentage: 100, month: 'April' },
  { utilisation_percentage: 90, month: 'May' },
  { utilisation_percentage: 70, month: 'June' },
  { utilisation_percentage: 30, month: 'July' },
  { utilisation_percentage: 15, month: 'August' },
  { utilisation_percentage: 15, month: 'September' },
  { utilisation_percentage: 100, month: 'October' },
  { utilisation_percentage: 100, month: 'November' },
  { utilisation_percentage: 80, month: 'December' }
]
const util2017 = [
  { utilisation_percentage: 115, month: 'January' },
  { utilisation_percentage: 59, month: 'February' },
  { utilisation_percentage: 98, month: 'March' }
]

module.exports = function (orgUnitType, id, date) {

  // Only needed until DB implemented, then switch/case can be scrapped.
  year = date.split('-', 3)
  yearInt = parseInt(year)
  switch(yearInt) {
    case 2014:
      return util2014
      break
    case 2015:
      return util2015
      break
    case 2016:
      return util2016
      break
    case 2017:
      return util2017
      break
    default:
      console.log(` provided (${year}).  2014-2017 supported only.`)
  }
}
