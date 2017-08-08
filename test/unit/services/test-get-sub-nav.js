const expect = require('chai').expect
const getSubNav = require('../../../app/services/get-sub-nav')
const Link = require('../../../app/services/domain/link')

describe('services/get-sub-nav', function () {
  var id = 1
  var organisationalUnitName = 'name'

  it('returns a list which has four elements', function () {
    var subNav = getSubNav(id, organisationalUnitName)
    expect(subNav.length).to.eql(4)
  })

  it('returns a list of Link objects', function () {
    var subNav = getSubNav(id, organisationalUnitName)
    subNav.forEach(function (element) {
      expect(element).instanceof(Link)
    })
  })

  it('returns the correct titles', function () {
    var subNav = getSubNav(id, organisationalUnitName)
    expect(subNav[0].title).to.eql('Overview')
    expect(subNav[1].title).to.eql('Capacity')
    expect(subNav[2].title).to.eql('Case Progress')
    expect(subNav[3].title).to.eql('Caseload')
  })

  it('returns the correct links', function () {
    var subNav = getSubNav(id, organisationalUnitName)
    expect(subNav[0].link).to.eql('/' + organisationalUnitName + '/' + id + '/' + 'overview')
    expect(subNav[1].link).to.eql('/' + organisationalUnitName + '/' + id + '/' + 'caseload-capacity')
    expect(subNav[2].link).to.eql('/' + organisationalUnitName + '/' + id + '/' + 'case-progress')
    expect(subNav[3].link).to.eql('/' + organisationalUnitName + '/' + id + '/' + 'caseload')
  })

  it('marks the current link as active', function () {
    var currentLink = '/' + organisationalUnitName + '/' + id + '/' + 'overview'
    var subNav = getSubNav(id, organisationalUnitName, currentLink)
    expect(subNav[0].active).to.be.true //eslint-disable-line
    expect(subNav[1].active).to.be.undefined //eslint-disable-line
    expect(subNav[2].active).to.be.undefined //eslint-disable-line
    expect(subNav[3].active).to.be.undefined //eslint-disable-line
  })
})
