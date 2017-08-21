const expect = require('chai').expect

describe('View landing Page and national view', () => {
  it('should navigate to the landing page and have a link present', () => {
    return browser.url('/')
      .waitForExist('.sln-overview-heading')
      .waitForExist('.sln-capacity-link')
      .getText('.sln-capacity-link')
      .then(function (text) {
        expect(text).to.equal('National Level Capacity')
      })
  })
  it('should click the link and the national view should appear', () => {
    return browser.url('/')
      .waitForExist('.sln-capacity-link')
      .click('.sln-capacity-link')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('.sln-page-subtitle')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('National')
      })
  })
})
