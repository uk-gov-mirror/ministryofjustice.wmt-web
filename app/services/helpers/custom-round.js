module.exports.customRound = function (number) {
  if (number || number === 0) {
    if ((number % 1) !== 0) {
      let decimal = number % 1
      if (decimal < 0.59999999 && decimal >= 0.5) {
        number = Math.floor(number)
      } else {
        number = Math.round(number)
      }
    }
    return number
  } else {
    return undefined
  }
}
