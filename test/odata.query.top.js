var PORT, bookSchema, books, odata, request, should, support;

should = require('should');

request = require('supertest');

odata = require('../.');

support = require('./support');

PORT = 0;

bookSchema = {
  author: String,
  description: String,
  genre: String,
  price: Number,
  publish_date: Date,
  title: String
};

books = void 0;

describe('odata.query.top', function() {
  before(function(done) {
    var conn, server;
    conn = 'mongodb://localhost/odata-test';
    server = odata(conn);
    server.resource('book', bookSchema);
    return support(conn, function(data) {
      var s;
      books = data;
      return s = server.listen(PORT, function() {
        PORT = s.address().port;
        return done();
      });
    });
  });
  it('should top items', function(done) {
    return request("http://localhost:" + PORT).get("/book?$top=1").expect(200).end(function(err, res) {
      if (err) {
        return done(err);
      }
      res.body.value.length.should.be.equal(1);
      return done();
    });
  });
  it('should iginre when top not a number', function(done) {
    return request("http://localhost:" + PORT).get("/book?$top=not-a-number").expect(200).end(function(err, res) {
      if (err) {
        return done(err);
      }
      res.body.value.length.should.be.equal(books.length);
      return done();
    });
  });
  return it('should ignore when top not a positive number', function(done) {
    return request("http://localhost:" + PORT).get("/book?$top=-1").expect(200).end(function(err, res) {
      if (err) {
        return done(err);
      }
      res.body.value.length.should.be.equal(books.length);
      return done();
    });
  });
});

// ---
// generated by coffee-script 1.9.2
