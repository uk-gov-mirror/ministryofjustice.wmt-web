function roundValuesToOneDecimalPlace(){
    var toRounds = document.getElementsByClassName('sln-to-round')
    for(var i=0; i < toRounds.length; i++){
      var roundedValue = Math.round(toRounds[i].innerHTML * 10 ) / 10
      toRounds[i].innerHTML = roundedValue + '%'
    }
  }