module.exports = function (number) {
  if (number || number === 0) {
    if ((number % 1) !== 0) {
      const decimal = (number % 1).toFixed(4)
      if (decimal < 0.6 && decimal >= 0.5) {
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
