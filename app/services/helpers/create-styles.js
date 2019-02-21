module.exports = function (wb) {
  var defaultFontSize = 10
  var defaultHorizontalAlignment = 'center'
  var patternType = 'solid'
  var lavender = '#EE82EE'
  var gold = '#FFCC99'
  var blueGray = '#6699CC'
  var sageGreen = '#9dc183'
  var azureBlue = '#0080FF'
  var magentaPink = '#FF0090'
  var persianGreen = '#00A572'
  var aquaBlue = '#00FFFF'
  var black = '#000000'
  var goldenYellow = '#FAFAD2'
  var lightGray = '#D3D3D3'

  var baseFontStyle = { size: defaultFontSize }
  var baseMediumBorderStyle =  {
    left: {
      style: 'medium',
      color: black
    },
    right: {
      style: 'medium',
      color: black
    },
    top: {
      style: 'medium',
      color: black
    },
    bottom: {
      style: 'medium',
      color: black
    },
    diagonal: {
      style: 'medium',
      color: black
    },
    diagonalDown: true,
    diagonalUp: true,
    outline: true
  }

  var baseLightBorderStyle =  {
    left: {
      style: 'thin',
      color: black
    },
    right: {
      style: 'thin',
      color: black
    },
    top: {
      style: 'thin',
      color: black
    },
    bottom: {
      style: 'thin',
      color: black
    },
    diagonal: {
      style: 'thin',
      color: black
    },
    diagonalDown: true,
    diagonalUp: true,
    outline: true
  }

  var caseStyle = wb.createStyle({
    alignment: {
      wrapText: true
    },
    font: baseFontStyle,
    border: baseLightBorderStyle
  })

  var nonEditableCaseStyle = wb.createStyle({
    alignment: {
      wrapText: true
    },
    font: baseFontStyle,
    border: baseLightBorderStyle,
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: lightGray
    }
  })

  var editableStyle = wb.createStyle({
    alignment: {
      wrapText: true
    },
    font: baseFontStyle,
    border: baseLightBorderStyle,
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: goldenYellow
    }
  })

  var totalAverageStyle = wb.createStyle({
    alignment: {
      wrapText: true
    },
    font: baseFontStyle,
    border: baseMediumBorderStyle,
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: goldenYellow
    }
  })

  var nameHeadersStyle = wb.createStyle({
    font: baseFontStyle,
    alignment: {
      horizontal: defaultHorizontalAlignment,
      wrapText: true
    },
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: lavender
    },
    border: baseMediumBorderStyle
  })

  var commStyle = wb.createStyle({
    font: baseFontStyle,
    alignment: {
      horizontal: defaultHorizontalAlignment,
      wrapText: true
    },
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: gold
    },
    border: baseMediumBorderStyle
  })

  var licStyle = wb.createStyle({
    font: baseFontStyle,
    alignment: {
      horizontal: defaultHorizontalAlignment,
      wrapText: true
    },
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: blueGray
    },
    border: baseMediumBorderStyle
  })

  var cusStyle = wb.createStyle({
    font: baseFontStyle,
    alignment: {
      horizontal: defaultHorizontalAlignment,
      wrapText: true
    },
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: sageGreen
    },
    border: baseMediumBorderStyle
  })

  var t2aCommStyle = wb.createStyle({
    font: baseFontStyle,
    alignment: {
      horizontal: defaultHorizontalAlignment,
      wrapText: true
    },
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: azureBlue
    },
    border: baseMediumBorderStyle
  })

  var t2aLicStyle = wb.createStyle({
    font: baseFontStyle,
    alignment: {
      horizontal: defaultHorizontalAlignment,
      wrapText: true
    },
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: magentaPink
    },
    border: baseMediumBorderStyle
  })

  var t2aCusStyle = wb.createStyle({
    font: baseFontStyle,
    alignment: {
      horizontal: defaultHorizontalAlignment,
      wrapText: true
    },
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: persianGreen
    },
    border: baseMediumBorderStyle
  })

  var reportsStyle = wb.createStyle({
    font: baseFontStyle,
    alignment: {
      horizontal: defaultHorizontalAlignment,
      wrapText: true
    },
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: aquaBlue
    },
    border: baseMediumBorderStyle
  })

  var sumStyle = wb.createStyle({
    font: {
      size: defaultFontSize,
      color: '#FFFFFF'
    },
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: '#0000FF'
    },
    border: baseMediumBorderStyle
  })

  var roundedSumStyle = wb.createStyle({
    font: {
      size: defaultFontSize,
      color: '#FFFFFF'
    },
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: '#0000FF'
    },
    numberFormat: '#; -#; 0'
  })

  var averageStyle = wb.createStyle({
    font: baseFontStyle,
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: '#FFFF00'
    },
    border: baseMediumBorderStyle
  })

  var averagePercentageStyle = wb.createStyle({
    font: baseFontStyle,
    numberFormat: '#%; -#%; 0%',
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: '#FFFF00'
    },
    border: baseMediumBorderStyle
  })

  var cmsGsPercentageStyle = wb.createStyle({
    font: baseFontStyle,
    numberFormat: '0.0%; -0.0%; 0%',
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: '#FFFF00'
    },
    border: baseMediumBorderStyle
  })

  var percentageStyle = wb.createStyle({
    font: baseFontStyle,
    numberFormat: '#%; -#%; 0%',
    border: baseLightBorderStyle,
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: lightGray
    }
  })

  var roundedStyle = wb.createStyle({
    font: baseFontStyle,
    numberFormat: '#; -#; 0',
    border: baseLightBorderStyle,
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: lightGray
    }
  })

  return {
    caseStyle: caseStyle,
    nameHeadersStyle: nameHeadersStyle,
    commStyle: commStyle,
    cusStyle: cusStyle,
    licStyle: licStyle,
    t2aCommStyle: t2aCommStyle,
    t2aCusStyle: t2aCusStyle,
    t2aLicStyle: t2aLicStyle,
    reportsStyle: reportsStyle,
    sumStyle: sumStyle,
    roundedSumStyle: roundedSumStyle,
    averageStyle: averageStyle,
    averagePercentageStyle: averagePercentageStyle,
    cmsGsPercentageStyle: cmsGsPercentageStyle,
    percentageStyle: percentageStyle,
    roundedStyle: roundedStyle,
    editableStyle: editableStyle,
    nonEditableCaseStyle: nonEditableCaseStyle,
    totalAverageStyle: totalAverageStyle
  }
}
