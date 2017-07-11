const expect = require('chai').expect
const getSubNav = require('../../../app/services/get-sub-nav')
const Link = require('../../../app/services/domain/link')

describe('services/get-sub-nav', function () {
  var id = 1
  var organisationalUnitName = 'name'

  it('returns a list which has one element', function () {
    var subNav = getSubNav(id, organisationalUnitName)
    expect(subNav.length).to.eql(1)
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
  })

  it('returns the correct links', function () {
    var subNav = getSubNav(id, organisationalUnitName)
    expect(subNav[0].link).to.eql('/' + organisationalUnitName + '/' + id + '/' + 'caseload-capacity')
  })
})
