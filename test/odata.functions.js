var conn, odata, request, should, support;

should = require('should');

request = require('supertest');

odata = require('../.');

support = require('./support');

conn = 'mongodb://localhost/odata-test';

describe('odata.functions', function() {
  it('get should work', function(done) {
    var PORT, s, server;
    server = odata(conn);
    server.get('/test', function(req, res, next) {
      return res.jsonp({
        test: 'ok'
      });
    });
    PORT = 0;
    return s = server.listen(PORT, function() {
      PORT = s.address().port;
      return request("http://localhost:" + PORT).get("/test").expect(200).end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.body.test.should.be.equal('ok');
        return done();
      });
    });
  });
  it('put should work', function(done) {
    var PORT, s, server;
    server = odata(conn);
    server.put('/test', function(req, res, next) {
      return res.jsonp({
        test: 'ok'
      });
    });
    PORT = 0;
    return s = server.listen(PORT, function() {
      PORT = s.address().port;
      return request("http://localhost:" + PORT).put("/test").expect(200).end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.body.test.should.be.equal('ok');
        return done();
      });
    });
  });
  it('post should work', function(done) {
    var PORT, s, server;
    server = odata(conn);
    server.post('/test', function(req, res, next) {
      return res.jsonp({
        test: 'ok'
      });
    });
    PORT = 0;
    return s = server.listen(PORT, function() {
      PORT = s.address().port;
      return request("http://localhost:" + PORT).post("/test").expect(200).end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.body.test.should.be.equal('ok');
        return done();
      });
    });
  });
  return it('put should work', function(done) {
    var PORT, s, server;
    server = odata(conn);
    server["delete"]('/test', function(req, res, next) {
      return res.jsonp({
        test: 'ok'
      });
    });
    PORT = 0;
    return s = server.listen(PORT, function() {
      PORT = s.address().port;
      return request("http://localhost:" + PORT)["delete"]("/test").expect(200).end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.body.test.should.be.equal('ok');
        return done();
      });
    });
  });
});

// ---
// generated by coffee-script 1.9.2
