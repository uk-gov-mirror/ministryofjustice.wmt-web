describe('View your caseload capacity flow', () => {
  it('should navigate to the caseload capacity screen', () => {
    return browser.url('/')

      // Navigate to caseload capacity screen
      .waitForExist('#caseload-capacity-link')
      .click('#caseload-capacity-link')

      // Check that plotly graph exists
      .waitForExist('.plot-container.plotly')
  })
})
