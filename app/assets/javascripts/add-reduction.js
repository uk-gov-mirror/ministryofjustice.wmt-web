// Set current year dynamically
  var currentYear = new Date().getYear()
  document.getElementById('start-year').setAttribute('min', currentYear)

  var chosenReduction

  var populateHours = function () {

    var value = ''

    var chosenReductionIndex = document.getElementById("select-box").selectedIndex

    // Dummy option in dropdown means array is offset by one.
    chosenReduction = refData[chosenReductionIndex - 1]
    
    if (chosenReduction.allowancePercentage !== null) {
      document.getElementById('hours').value = chosenReduction.allowanceHours
      document.getElementById('hours').setAttribute('readonly', true)
    } else {
      document.getElementById('hours').value = value
      document.getElementById('hours').removeAttribute('readonly')
    }
    
    if (chosenReduction.maxAllowancePercentage !== null) {
      document.getElementById('hours').setAttribute('max', chosenReduction.maxAllowanceHours)
    } else {
      document.getElementById('hours').removeAttribute('max')
    }
  }

  var calculateExpiry = function () {    
    var chosenReductionIndex = document.getElementById("select-box").selectedIndex
    chosenReduction = refData[chosenReductionIndex]

    var startMonth = document.getElementById("start-month").value
    var readonly = false
    var endDate = null
    var startDate

    if (chosenReduction.monthsToExpiry !== null) {
      if (Number(startMonth) > 0 && Number(startMonth) < 13) {
        var startDate = new Date(Number(document.getElementById("start-year").value),
                                 Number(document.getElementById("start-month").value),
                                 Number(document.getElementById("start-day").value))
        var endDate = new Date(startDate.setMonth(startDate.getMonth() + chosenReduction.monthsToExpiry))
        readonly = true
      }
    }

    if (readonly){
      document.getElementById('end-day').setAttribute('readonly', readonly)
      document.getElementById('end-month').setAttribute('readonly', readonly)
      document.getElementById('end-year').setAttribute('readonly', readonly)
    } else {
      document.getElementById('end-day').removeAttribute('readonly')
      document.getElementById('end-month').removeAttribute('readonly')
      document.getElementById('end-year').removeAttribute('readonly')
    }
    if(endDate !== null) {
      document.getElementById('end-day').value = endDate.getDay()
      document.getElementById('end-month').value = endDate.getMonth()
      document.getElementById('end-year').value = endDate.getFullYear()
    } else {
      document.getElementById('end-day').value = ''
      document.getElementById('end-month').value = ''
      document.getElementById('end-year').value = ''
    }
  }