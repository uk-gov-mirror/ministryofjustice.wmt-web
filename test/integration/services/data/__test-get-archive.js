const expect = require('chai').expect

const getArchive = require('../../../../app/services/data/__get_archive')

var inserts = []

describe('', function () {

  it('should retrieve archive', function () {
    return getArchive()
      .then(function (results) {
        console.log(results)
        expect(results).to.be.a('number')
      })
  })

})
