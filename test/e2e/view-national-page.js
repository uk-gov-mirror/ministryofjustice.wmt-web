const expect = require('chai').expect

describe('View landing Page and national view', () => {
  it('should navigate to the landing page and have a link present', () => {
    return browser.url('/')
      .waitForExist('.head-xlarge')
      .waitForExist('.caseload-capacity-link')
      .getText('.caseload-capacity-link')
      .then(function (text) {
        expect(text).to.equal('National Level Capacity')
      })
  })
  it('should click the link and the national view should appear', () => {
    return browser.url('/')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('.sln-page-subtitle')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('National')
      })
  })
})
