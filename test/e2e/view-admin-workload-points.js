const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')

var workloadPointsUrl = '/admin/workload-points'

describe('View / edit Workload Points', () => {
  before(function () {
    authenticationHerlp.login(authenticationHerlp.users.DataAdmin)
    return browser.url(workloadPointsUrl).waitForExist('.breadcrumbs')
  })

  describe('should navigate to the admin workload points screen', () => {
    it('with the correct breadcrumbs and headings', () => {
      return browser.url(workloadPointsUrl)
        .waitForExist('.breadcrumbs')
        .waitForExist('.sln-page-title')
        .getText('.sln-page-title')
        .then(function (text) {
          expect(text).to.equal('Workload Points')
        })
        .waitForExist('.sln-page-subtitle')
        .getText('.sln-page-subtitle')
        .then(function (text) {
          expect(text).to.equal('Admin')
        })
    })

    it('with the correct tabs which become selected correctly', () => {
      return browser.url(workloadPointsUrl)
        .waitForExist('[href="#custody"]')
        .getAttribute('#custody-enhanced', 'class')
        .then(function (text) {
          expect(text).to.contain('tabs-panel-selected')
        })
        .getAttribute('#license-enhanced', 'class')
        .then(function (text) {
          expect(text).to.not.contain('tabs-panel-selected')
        })
        .getAttribute('#community-enhanced', 'class')
        .then(function (text) {
          expect(text).to.not.contain('tabs-panel-selected')
        })
        .getAttribute('#other-enhanced', 'class')
        .then(function (text) {
          expect(text).to.not.contain('tabs-panel-selected')
        })
        .click('[href="#license"]')
        .getAttribute('#custody-enhanced', 'class')
        .then(function (text) {
          expect(text).to.not.contain('tabs-panel-selected')
        })
        .getAttribute('#license-enhanced', 'class')
        .then(function (text) {
          expect(text).to.contain('tabs-panel-selected')
        })
        .getAttribute('#community-enhanced', 'class')
        .then(function (text) {
          expect(text).to.not.contain('tabs-panel-selected')
        })
        .getAttribute('#other-enhanced', 'class')
        .then(function (text) {
          expect(text).to.not.contain('tabs-panel-selected')
        })
        .click('[href="#community"]')
        .getAttribute('#community-enhanced', 'class')
        .then(function (text) {
          expect(text).to.contain('tabs-panel-selected')
        })
        .click('[href="#other"]')
        .getAttribute('#other-enhanced', 'class')
        .then(function (text) {
          expect(text).to.contain('tabs-panel-selected')
        })
    })

    it('with the correct behaviour for the edit and save buttons', () => {
      return browser.url(workloadPointsUrl)
        .waitForExist('#edit-button')
        .getAttribute('.form-control', 'readonly')
        .then(function (readonly) {
          expect(readonly).to.contain('true')
          expect(readonly).to.not.contain('false')
        })
        .click('#edit-button')
        .getAttribute('.form-control', 'readonly')
        .then(function (readonly) {
          expect(readonly).to.not.contain('true')
        })
        .waitForExist('#save-notice')
        .getText('#save-notice')
        .then(function (text) {
          expect(text).to.contain('Saving changes made here')
        })
        .click('#save-button')
        .getAttribute('.form-control', 'readonly')
        .then(function (readonly) {
          expect(readonly).to.contain('true')
          expect(readonly).to.not.contain('false')
        })
    })
  })
  after(function () {
    authenticationHerlp.logout()
  })
})
