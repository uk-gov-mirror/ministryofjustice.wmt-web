const expect = require('chai').expect
const getSubNav = require('../../../app/services/get-sub-nav')
const Link = require('../../../app/services/domain/link')

describe('services/get-sub-nav', function () {
  var id = 1
  var organisationalUnitName = 'name'
  var omOrganisationalUnitName = 'offender-manager'

  it('returns a list which has four elements', function () {
    var subNav = getSubNav(id, organisationalUnitName)
    expect(subNav.length).to.eql(4)
  })

  it('returns a list which has five elements for offender-manager', function () {
    var subNav = getSubNav(id, omOrganisationalUnitName)
    expect(subNav.length).to.eql(5)
  })

  it('returns a list of Link objects', function () {
    var subNav = getSubNav(id, organisationalUnitName)
    subNav.forEach(function (element) {
      expect(element).instanceof(Link)
    })
  })

  it('returns the correct titles', function () {
    var subNav = getSubNav(id, omOrganisationalUnitName)
    expect(subNav[0].title).to.eql('Overview')
    expect(subNav[1].title).to.eql('Capacity')
    expect(subNav[2].title).to.eql('Caseload')
    expect(subNav[3].title).to.eql('Contracted Hours')
    expect(subNav[4].title).to.eql('Case Progress')
  })

  it('returns the correct links', function () {
    var subNav = getSubNav(id, omOrganisationalUnitName)
    expect(subNav[0].link).to.eql('/' + omOrganisationalUnitName + '/' + id + '/' + 'overview')
    expect(subNav[1].link).to.eql('/' + omOrganisationalUnitName + '/' + id + '/' + 'caseload-capacity')
    expect(subNav[2].link).to.eql('/' + omOrganisationalUnitName + '/' + id + '/' + 'caseload')
    expect(subNav[3].link).to.eql('/' + omOrganisationalUnitName + '/' + id + '/' + 'contracted-hours')
    expect(subNav[4].link).to.eql('/' + omOrganisationalUnitName + '/' + id + '/' + 'case-progress')
  })

  it('marks the current link as active', function () {
    var currentLink = '/' + omOrganisationalUnitName + '/' + id + '/' + 'overview'
    var subNav = getSubNav(id, omOrganisationalUnitName, currentLink)
    expect(subNav[0].active).to.be.true //eslint-disable-line
    expect(subNav[1].active).to.be.undefined //eslint-disable-line
    expect(subNav[2].active).to.be.undefined //eslint-disable-line
    expect(subNav[3].active).to.be.undefined //eslint-disable-line    
    expect(subNav[4].active).to.be.undefined //eslint-disable-line
  })
})
