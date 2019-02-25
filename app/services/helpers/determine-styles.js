module.exports.determineCaseStyle = function (header, styles) {
  var styleToApply
  switch (header) {
    case 'Com Untiered':
    case 'Com D2':
    case 'Com D1':
    case 'Com C2':
    case 'Com C1':
    case 'Com B2':
    case 'Com B1':
    case 'Com A':
      styleToApply = styles.commStyle
      break
    case 'Lic Untiered':
    case 'Lic D2':
    case 'Lic D1':
    case 'Lic C2':
    case 'Lic C1':
    case 'Lic B2':
    case 'Lic B1':
    case 'Lic A':
      styleToApply = styles.licStyle
      break
    case 'Cus Untiered':
    case 'Cus D2':
    case 'Cus D1':
    case 'Cus C2':
    case 'Cus C1':
    case 'Cus B2':
    case 'Cus B1':
    case 'Cus A':
      styleToApply = styles.cusStyle
      break
    case 'T2A Com Untiered':
    case 'T2A Com D2':
    case 'T2A Com D1':
    case 'T2A Com C2':
    case 'T2A Com C1':
    case 'T2A Com B2':
    case 'T2A Com B1':
    case 'T2A Com A':
      styleToApply = styles.t2aCommStyle
      break
    case 'T2A Lic Untiered':
    case 'T2A Lic D2':
    case 'T2A Lic D1':
    case 'T2A Lic C2':
    case 'T2A Lic C1':
    case 'T2A Lic B2':
    case 'T2A Lic B1':
    case 'T2A Lic A':
      styleToApply = styles.t2aLicStyle
      break
    case 'T2A Cus Untiered':
    case 'T2A Cus D2':
    case 'T2A Cus D1':
    case 'T2A Cus C2':
    case 'T2A Cus C1':
    case 'T2A Cus B2':
    case 'T2A Cus B1':
    case 'T2A Cus A':
      styleToApply = styles.t2aCusStyle
      break
    default:
      styleToApply = styles.caseStyle
      break
  }
  return styleToApply
}

module.exports.determineWeightingStyle = function (columnNo, styles) {
  var styleToApply
  var commRange = { start: 25, end: 56 }
  var licRange = { start: 57, end: 88 }
  var cusRange = { start: 89, end: 120 }
  var t2aCommRage = { start: 121, end: 152 }
  var t2aLicRange = { start: 153, end: 184 }
  var t2aCusRange = { start: 185, end: 216 }
  var reportsRange = { start: 217, end: 221 }

  if (columnNo >= commRange.start && columnNo <= commRange.end) {
    styleToApply = styles.commStyle
  } else if (columnNo >= licRange.start && columnNo <= licRange.end) {
    styleToApply = styles.licStyle
  } else if (columnNo >= cusRange.start && columnNo <= cusRange.end) {
    styleToApply = styles.cusStyle
  } else if (columnNo >= t2aCommRage.start && columnNo <= t2aCommRage.end) {
    styleToApply = styles.t2aCommStyle
  } else if (columnNo >= t2aLicRange.start && columnNo <= t2aLicRange.end) {
    styleToApply = styles.t2aLicStyle
  } else if (columnNo >= t2aCusRange.start && columnNo <= t2aCusRange.end) {
    styleToApply = styles.t2aCusStyle
  } else if (columnNo >= reportsRange.start && columnNo <= reportsRange.end) {
    styleToApply = styles.reportsStyle
  } else {
    styleToApply = styles.caseStyle
  }
  return styleToApply
}
