const expect = require('chai').expect
const getSubNav = require('../../../app/services/get-sub-nav')
const Link = require('../../../app/services/domain/link')

describe('services/get-sub-nav', function () {
  var id = 1
  var organisationalUnitName = 'name'

  it('returns a list which has two elements', function () {
    var subNav = getSubNav(id, organisationalUnitName)
    expect(subNav.length).to.eql(2)
  })

  it('returns a list of Link objects', function () {
    var subNav = getSubNav(id, organisationalUnitName)
    subNav.forEach(function (element) {
      expect(element).instanceof(Link)
    })
  })

  it('returns the correct titles', function () {
    var subNav = getSubNav(id, organisationalUnitName)
    expect(subNav[0].title).to.eql('Capacity')
    expect(subNav[1].title).to.eql('Case Progress')
  })

  it('returns the correct links', function () {
    var subNav = getSubNav(id, organisationalUnitName)
    expect(subNav[0].link).to.eql('/' + organisationalUnitName + '/' + id + '/' + 'caseload-capacity')
    expect(subNav[1].link).to.eql('/' + organisationalUnitName + '/' + id + '/' + 'case-progress')
  })
})
