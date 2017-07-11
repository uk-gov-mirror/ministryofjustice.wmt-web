
const cheerio = require('cheerio')
const supertest = require('supertest')
const WORKLOAD_POINTS_URI = '/workload-points'
const app = require('../../../app/app')

describe(`${WORKLOAD_POINTS_URI}`, function () {
  describe(`GET ${WORKLOAD_POINTS_URI}`, function () {
    it('should respond with a 200', function () {
      return supertest(app)
        .get(WORKLOAD_POINTS_URI)
        .expect(200)
    })
  })

  describe(`POST ${WORKLOAD_POINTS_URI}`, function () {
    it('should accept valid requests', function (done) {
      var agent = supertest(app)
      agent.get(WORKLOAD_POINTS_URI)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return err
          }
          const $ = cheerio.load(res.text)
          var csrfToken = $('[name=_csrf]').val()
          agent.post(WORKLOAD_POINTS_URI)
                .set('cookie', res.headers['set-cookie'])
                .send({
                  _csrf: csrfToken,
                  workloadPoints: {
                    nominalTargetPointsPO: 11,
                    nominalTargetPointsSPO: 13
                  }
                })
                .expect(200)
                .end(done)
        })
    })

    it('should reject requests without a valid CSRF token', function (done) {
      var agent = supertest(app)
      agent.get(WORKLOAD_POINTS_URI)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return err
          }
          agent.post(WORKLOAD_POINTS_URI)
                .send({
                  _csrf: 'invalidToken'
                })
                .expect(403)
                .end(done)
        })
    })

    it('should accept strip malicious form data from requests', function (done) {
      var agent = supertest(app)
      agent.get(WORKLOAD_POINTS_URI)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return err
          }
          const $ = cheerio.load(res.text)
          var csrfToken = $('[name=_csrf]').val()
          agent.post(WORKLOAD_POINTS_URI)
                .set('cookie', res.headers['set-cookie'])
                .send({
                  _csrf: csrfToken,
                  workloadPoints: {
                    nominalTargetPointsPO: "<script>document.write('cookie monster')</script> download now"
                  }
                })
                .expect(200)
                .expect({ nominalTargetPointsPO: ' download now' })
                .end(done)
        })
    })
  })
})
