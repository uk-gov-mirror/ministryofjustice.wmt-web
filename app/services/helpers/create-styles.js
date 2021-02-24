module.exports = function (wb) {
  const defaultFontSize = 10
  const defaultHorizontalAlignment = 'center'
  const patternType = 'solid'
  const lavender = '#EE82EE'
  const gold = '#FFCC99'
  const blueGray = '#6699CC'
  const sageGreen = '#9dc183'
  const azureBlue = '#0080FF'
  const magentaPink = '#FF0090'
  const persianGreen = '#00A572'
  const aquaBlue = '#00FFFF'
  const black = '#000000'
  const goldenYellow = '#FAFAD2'
  const lightGray = '#D3D3D3'

  const baseFontStyle = { size: defaultFontSize }
  const baseMediumBorderStyle = {
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

  const baseLightBorderStyle = {
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

  const caseStyle = wb.createStyle({
    alignment: {
      wrapText: true
    },
    font: baseFontStyle,
    border: baseLightBorderStyle
  })

  const nonEditableCaseStyle = wb.createStyle({
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

  const editableStyle = wb.createStyle({
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

  const totalAverageStyle = wb.createStyle({
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

  const nameHeadersStyle = wb.createStyle({
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

  const commStyle = wb.createStyle({
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

  const licStyle = wb.createStyle({
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

  const cusStyle = wb.createStyle({
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

  const t2aCommStyle = wb.createStyle({
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

  const t2aLicStyle = wb.createStyle({
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

  const t2aCusStyle = wb.createStyle({
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

  const reportsStyle = wb.createStyle({
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

  const sumStyle = wb.createStyle({
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

  const roundedSumStyle = wb.createStyle({
    font: {
      size: defaultFontSize,
      color: '#FFFFFF'
    },
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: '#0000FF'
    },
    numberFormat: '#; -#; 0',
    border: baseMediumBorderStyle
  })

  const averageStyle = wb.createStyle({
    font: baseFontStyle,
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: '#FFFF00'
    },
    border: baseMediumBorderStyle
  })

  const averagePercentageStyle = wb.createStyle({
    font: baseFontStyle,
    numberFormat: '0.0%; -0.0%; 0%',
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: '#FFFF00'
    },
    border: baseMediumBorderStyle
  })

  const cmsGsPercentageStyle = wb.createStyle({
    font: baseFontStyle,
    numberFormat: '0.0%; -0.0%; 0%',
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: '#FFFF00'
    },
    border: baseMediumBorderStyle
  })

  const percentageStyle = wb.createStyle({
    font: baseFontStyle,
    numberFormat: '0.0%; -0.0%; 0%',
    border: baseLightBorderStyle,
    fill: {
      type: 'pattern',
      patternType: patternType,
      fgColor: lightGray
    }
  })

  const roundedStyle = wb.createStyle({
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
