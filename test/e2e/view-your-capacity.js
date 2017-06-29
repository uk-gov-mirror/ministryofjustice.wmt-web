describe('View your caseload capacity flow', () => {
  it('should navigate to the caseload capacity screen', () => {
    return browser.url('/')

      .waitForExist('#caseload-capacity-link')
      .click('#caseload-capacity-link')
  })
})