module.exports.determineCaseStyle = function (header, styles) {
  let styleToApply
  switch (header) {
    case 'Com Untiered':
    case 'Com D0':
    case 'Com D1':
    case 'Com D2':
    case 'Com D3':
    case 'Com C0':
    case 'Com C1':
    case 'Com C2':
    case 'Com C3':
    case 'Com B0':
    case 'Com B1':
    case 'Com B2':
    case 'Com B3':
    case 'Com A0':
    case 'Com A1':
    case 'Com A2':
    case 'Com A3':
      styleToApply = styles.commStyle
      break
    case 'Lic Untiered':
    case 'Lic D0':
    case 'Lic D1':
    case 'Lic D2':
    case 'Lic D3':
    case 'Lic C0':
    case 'Lic C1':
    case 'Lic C2':
    case 'Lic C3':
    case 'Lic B0':
    case 'Lic B1':
    case 'Lic B2':
    case 'Lic B3':
    case 'Lic A0':
    case 'Lic A1':
    case 'Lic A2':
    case 'Lic A3':
      styleToApply = styles.licStyle
      break
    case 'Cus Untiered':
    case 'Cus D0':
    case 'Cus D1':
    case 'Cus D2':
    case 'Cus D3':
    case 'Cus C0':
    case 'Cus C1':
    case 'Cus C2':
    case 'Cus C3':
    case 'Cus B0':
    case 'Cus B1':
    case 'Cus B2':
    case 'Cus B3':
    case 'Cus A0':
    case 'Cus A1':
    case 'Cus A2':
    case 'Cus A3':
      styleToApply = styles.cusStyle
      break
    case 'T2A Com Untiered':
    case 'T2A Com D0':
    case 'T2A Com D1':
    case 'T2A Com D2':
    case 'T2A Com D3':
    case 'T2A Com C0':
    case 'T2A Com C1':
    case 'T2A Com C2':
    case 'T2A Com C3':
    case 'T2A Com B0':
    case 'T2A Com B1':
    case 'T2A Com B2':
    case 'T2A Com B3':
    case 'T2A Com A0':
    case 'T2A Com A1':
    case 'T2A Com A2':
    case 'T2A Com A3':
      styleToApply = styles.t2aCommStyle
      break
    case 'T2A Lic Untiered':
    case 'T2A Lic D0':
    case 'T2A Lic D1':
    case 'T2A Lic D2':
    case 'T2A Lic D3':
    case 'T2A Lic C0':
    case 'T2A Lic C1':
    case 'T2A Lic C2':
    case 'T2A Lic C3':
    case 'T2A Lic B0':
    case 'T2A Lic B1':
    case 'T2A Lic B2':
    case 'T2A Lic B3':
    case 'T2A Lic A0':
    case 'T2A Lic A1':
    case 'T2A Lic A2':
    case 'T2A Lic A3':
      styleToApply = styles.t2aLicStyle
      break
    case 'T2A Cus Untiered':
    case 'T2A Cus D0':
    case 'T2A Cus D1':
    case 'T2A Cus D2':
    case 'T2A Cus D3':
    case 'T2A Cus C0':
    case 'T2A Cus C1':
    case 'T2A Cus C2':
    case 'T2A Cus C3':
    case 'T2A Cus B0':
    case 'T2A Cus B1':
    case 'T2A Cus B2':
    case 'T2A Cus B3':
    case 'T2A Cus A0':
    case 'T2A Cus A1':
    case 'T2A Cus A2':
    case 'T2A Cus A3':
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
  const commRange = { start: 26, end: 93 }
  const licRange = { start: 94, end: 161 }
  const cusRange = { start: 162, end: 229 }
  const t2aCommRage = { start: 230, end: 297 }
  const t2aLicRange = { start: 298, end: 365 }
  const t2aCusRange = { start: 366, end: 433 }
  const reportsRange = { start: 434, end: 438 }

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
