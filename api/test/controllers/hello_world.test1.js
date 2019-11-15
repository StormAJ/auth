var should = require("should");
var request = require("supertest");
var app = require("../../app");

describe("controllers", function() {
  describe("GET /users", function() {
    it("should accept a name parameter", function(done) {
      request(app)
        .get("/hello")
        .query({ name: "Scott" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);

          res.body.should.eql("Hello, Scott!");

          done();
        });
    });
  });
});
