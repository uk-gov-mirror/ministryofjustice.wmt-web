const expect = require('chai').expect
const getSubNav = require('../../../app/services/get-sub-nav')
const Link = require('../../../app/services/domain/link')
const workloadTypes = require('../../../app/constants/workload-type')

describe('services/get-sub-nav', function () {
  const id = 1
  const organisationalUnitName = 'name'
  const omOrganisationalUnitName = 'offender-manager'
  const currentLink = '/' + workloadTypes.PROBATION + '/' + omOrganisationalUnitName + '/' + id + '/' + 'overview'

  it('returns a list which has five elements for offender-manager', function () {
    const subNav = getSubNav(id, omOrganisationalUnitName, currentLink)
    expect(subNav.length).to.eql(5)
  })

  it('returns a list which has 3 elements for a court-reporter', function () {
    const subNav = getSubNav(id, omOrganisationalUnitName, currentLink, workloadTypes.COURT_REPORTS)
    expect(subNav.length).to.eql(3)
  })

  it('returns a list which has four elements for non offender manager', function () {
    const subNav = getSubNav(id, organisationalUnitName, currentLink)
    expect(subNav.length).to.eql(5)
  })

  it('returns a list which has one elements for non offender manager court-report org', function () {
    const subNav = getSubNav(id, organisationalUnitName, currentLink, workloadTypes.COURT_REPORTS)
    expect(subNav.length).to.eql(1)
  })

  it('returns a list of Link objects', function () {
    const subNav = getSubNav(id, organisationalUnitName, currentLink)
    subNav.forEach(function (element) {
      expect(element).instanceof(Link)
    })
  })

  it('returns the correct titles for offender-manager', function () {
    const subNav = getSubNav(id, omOrganisationalUnitName, currentLink)
    expect(subNav[0].title).to.eql('Overview')
    expect(subNav[1].title).to.eql('Capacity')
    expect(subNav[2].title).to.eql('Contracted Hours')
    expect(subNav[3].title).to.eql('Case Progress')
    expect(subNav[4].title).to.eql('Reductions')
  })

  it('returns the correct titles for court-reporter', function () {
    const subNav = getSubNav(id, omOrganisationalUnitName, currentLink, workloadTypes.COURT_REPORTS)
    expect(subNav[0].title).to.eql('Overview')
    expect(subNav[1].title).to.eql('Contracted Hours')
    expect(subNav[2].title).to.eql('Reductions')
  })

  it('returns the correct titles for non offender-manager', function () {
    const subNav = getSubNav(id, organisationalUnitName, currentLink)
    expect(subNav[0].title).to.eql('Overview')
    expect(subNav[1].title).to.eql('Capacity')
    expect(subNav[2].title).to.eql('Caseload')
    expect(subNav[3].title).to.eql('Case Progress')
  })

  it('returns the correct titles for non offender-manager court-report org', function () {
    const subNav = getSubNav(id, organisationalUnitName, currentLink, workloadTypes.COURT_REPORTS)
    expect(subNav[0].title).to.eql('Court Reports Overview')
  })

  it('returns the correct links for offender-manager', function () {
    const subNav = getSubNav(id, omOrganisationalUnitName, currentLink)
    expect(subNav[0].link).to.eql('/' + workloadTypes.PROBATION + '/' + omOrganisationalUnitName + '/' + id + '/' + 'overview')
    expect(subNav[1].link).to.eql('/' + workloadTypes.PROBATION + '/' + omOrganisationalUnitName + '/' + id + '/' + 'caseload-capacity')
    expect(subNav[2].link).to.eql('/' + workloadTypes.PROBATION + '/' + omOrganisationalUnitName + '/' + id + '/' + 'contracted-hours')
    expect(subNav[3].link).to.eql('/' + workloadTypes.PROBATION + '/' + omOrganisationalUnitName + '/' + id + '/' + 'case-progress')
    expect(subNav[4].link).to.eql('/' + workloadTypes.PROBATION + '/' + omOrganisationalUnitName + '/' + id + '/' + 'reductions')
  })

  it('returns the correct links for court-reporter', function () {
    const subNav = getSubNav(id, omOrganisationalUnitName, currentLink, workloadTypes.COURT_REPORTS)
    expect(subNav[0].link).to.eql('/' + workloadTypes.COURT_REPORTS + '/' + omOrganisationalUnitName + '/' + id + '/' + 'overview')
    expect(subNav[1].link).to.eql('/' + workloadTypes.COURT_REPORTS + '/' + omOrganisationalUnitName + '/' + id + '/' + 'contracted-hours')
    expect(subNav[2].link).to.eql('/' + workloadTypes.COURT_REPORTS + '/' + omOrganisationalUnitName + '/' + id + '/' + 'reductions')
  })

  it('marks the current link as active', function () {
    const subNav = getSubNav(id, omOrganisationalUnitName, currentLink)
    expect(subNav[0].active).to.be.true //eslint-disable-line
    expect(subNav[1].active).to.be.undefined //eslint-disable-line
    expect(subNav[2].active).to.be.undefined //eslint-disable-line
    expect(subNav[3].active).to.be.undefined //eslint-disable-line    
    expect(subNav[4].active).to.be.undefined //eslint-disable-line
  })
})
