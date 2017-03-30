const proxyquire = require('proxyquire')
const MY_UTILISATION_URI = '/my-utilisation'
const route = require('../../../app/routes' + MY_UTILISATION_URI)
const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const sinon = require('sinon')
const expect = require('chai').expect

const ViewUtilisation = require('../../../app/services/domain/view-utilisation')

// test data
const USER_ID = 1
const YEAR = 2016

const UTILISATION_RESULTS = { headings:
   [ 'January',
     'February',
     'March',
     'April',
     'May',
     'June',
     'July',
     'August',
     'September',
     'October',
     'November',
     'December' ],
  values: [ 90, 100, 115, 100, 110, 118, 100, 93, 97, 101, 110, 99 ] }

describe(`${MY_UTILISATION_URI}`, function () {

  var app

  var ViewUtilisationStub = sinon.spy(function() {
    return sinon.createStubInstance(ViewUtilisation);
  });

  beforeEach(function () {
    app = routeHelper.buildApp(route)
  })

  describe(`GET ${MY_UTILISATION_URI}`, function () {

    it('should respond with a 200', function () {

      var viewUtilisation = new ViewUtilisationStub(USER_ID, YEAR)
      viewUtilisation.getCaseloadUtilisation.returns(UTILISATION_RESULTS)

      return supertest(app)
        .get(MY_UTILISATION_URI + "/" + USER_ID + "/" + YEAR)
        .expect(200)
        .expect(function () {
          expect(ViewUtilisationStub).to.have.been.calledWithNew;
          expect(viewUtilisation.getCaseloadUtilisation()).to.equal(UTILISATION_RESULTS);
          expect(viewUtilisation.getCaseloadUtilisation()).to.have.been.calledOnce;

        })
    })
  })
})