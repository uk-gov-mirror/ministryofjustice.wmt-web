module.exports.determineCaseStyle = function (header, styles) {
  let styleToApply
  switch (header) {
    case 'Com Untiered':
    case 'Com G':
    case 'Com F':
    case 'Com E':
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
    case 'Lic G':
    case 'Lic F':
    case 'Lic E':
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
    case 'Cus G':
    case 'Cus F':
    case 'Cus E':
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
    case 'T2A Com G':
    case 'T2A Com F':
    case 'T2A Com E':
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
    case 'T2A Lic G':
    case 'T2A Lic F':
    case 'T2A Lic E':
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
    case 'T2A Cus G':
    case 'T2A Cus F':
    case 'T2A Cus E':
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
  let styleToApply
  const commRange = { start: 26, end: 69 }
  const licRange = { start: 70, end: 113 }
  const cusRange = { start: 114, end: 157 }
  const t2aCommRage = { start: 158, end: 201 }
  const t2aLicRange = { start: 202, end: 245 }
  const t2aCusRange = { start: 246, end: 289 }
  const reportsRange = { start: 290, end: 294 }

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
