const expect = require('chai').expect

describe('View landing page', () => {
  it('should navigate to the landing page and have a national view link present', () => {
    return browser.url('/')
      .waitForExist('.sln-overview-heading')
      .waitForExist('.sln-national-link')
      .getText('.sln-national-link')
      .then(function (text) {
        expect(text).to.equal('National Level Capacity')
      })
  })

  it('should click the national view link and the national view should appear', () => {
    return browser.url('/')
      .waitForExist('.sln-national-link')
      .click('.sln-national-link')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('.sln-page-subtitle')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('National')
      })
  })
})
