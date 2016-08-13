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

describe('odata.query.orderby', function() {
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
  it('should default let items order with asc', function(done) {
    return request("http://localhost:" + PORT).get("/book?$orderby=price").expect(200).end(function(err, res) {
      var i, item, j, len, nextItem, ref;
      if (err) {
        return done(err);
      }
      res.body.should.be.have.property('value');
      ref = res.body.value;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        item = ref[i];
        nextItem = res.body.value[i + 1];
        if (nextItem) {
          (item.price <= nextItem.price).should.be["true"];
        }
      }
      return done();
    });
  });
  it('should let items order asc', function(done) {
    return request("http://localhost:" + PORT).get("/book?$orderby=price asc").expect(200).end(function(err, res) {
      var i, item, j, len, nextItem, ref;
      if (err) {
        return done(err);
      }
      res.body.should.be.have.property('value');
      ref = res.body.value;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        item = ref[i];
        nextItem = res.body.value[i + 1];
        if (nextItem) {
          (item.price <= nextItem.price).should.be["true"];
        }
      }
      return done();
    });
  });
  it('should let items order desc', function(done) {
    return request("http://localhost:" + PORT).get("/book?$orderby=price desc").expect(200).end(function(err, res) {
      var i, item, j, len, nextItem, ref;
      if (err) {
        return done(err);
      }
      res.body.should.be.have.property('value');
      ref = res.body.value;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        item = ref[i];
        nextItem = res.body.value[i + 1];
        if (nextItem) {
          (item.price >= nextItem.price).should.be["true"];
        }
      }
      return done();
    });
  });
  it('should let items order when use multiple fields', function(done) {
    return request("http://localhost:" + PORT).get("/book?$orderby=price,title").expect(200).end(function(err, res) {
      var i, item, j, len, nextItem, ref;
      if (err) {
        return done(err);
      }
      res.body.should.be.have.property('value');
      ref = res.body.value;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        item = ref[i];
        nextItem = res.body.value[i + 1];
        if (nextItem) {
          (item.price <= nextItem.price).should.be["true"];
          if (item.price === nextItem.price) {
            (item.title <= nextItem.title).should.be["true"];
          }
        }
      }
      return done();
    });
  });
  return it("should be ignore when order by not exist field", function(done) {
    return request("http://localhost:" + PORT).get("/book?$orderby=not-exist-field").expect(200, done);
  });
});

// ---
// generated by coffee-script 1.9.2
