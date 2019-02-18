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

  var baseFontStyle = { size: defaultFontSize }

  var caseStyle = wb.createStyle({
    alignment: {
      wrapText: true
    },
    font: baseFontStyle
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  })

  var averagePercentageStyle = wb.createStyle({
    font: baseFontStyle,
    numberFormat: '#%; -#%; 0%',
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: '#FFFF00'
    }
  })

  var cmsGsPercentageStyle = wb.createStyle({
    font: baseFontStyle,
    numberFormat: '0.0%; -0.0%; 0%',
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: '#FFFF00'
    }
  })

  var percentageStyle = wb.createStyle({
    font: baseFontStyle,
    numberFormat: '#%; -#%; 0%'
  })

  var roundedStyle = wb.createStyle({
    font: baseFontStyle,
    numberFormat: '#; -#; 0'
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
    roundedStyle: roundedStyle
  }
}
