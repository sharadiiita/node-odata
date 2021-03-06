var PORT, odata, request, should, support;

should = require('should');

request = require('supertest');

odata = require('../.');

support = require('./support');

PORT = 0;

describe('model.custom.id', function() {
  before(function(done) {
    var s, server;
    server = odata('mongodb://localhost/odata-test');
    server.resource('custom-id', {
      id: Number
    });
    return s = server.listen(PORT, function() {
      PORT = s.address().port;
      return done();
    });
  });
  return it('should work', function(done) {
    return request("http://localhost:" + PORT).post('/custom-id').send({
      id: 100
    }).expect(201, done);
  });
});

// ---
// generated by coffee-script 1.9.2
