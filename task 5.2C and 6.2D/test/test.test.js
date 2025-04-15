const expect = require("chai").expect;
const request = require("request");
const mongoose = require("mongoose");
const Project = require("../services/model");

describe("Project API Tests", function () {
    const baseUrl = "http://localhost:3006";
    let dbConnection;
  
    before(function(done) {
      mongoose.connect('mongodb://localhost:27017/myprojectDB_test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      dbConnection = mongoose.connection;
      
      dbConnection.once('open', () => done());
      dbConnection.on('error', (err) => done(err));
    });
  
    after(function(done) {
      // More robust cleanup
      mongoose.connection.db.dropDatabase()
        .then(() => mongoose.disconnect())
        .then(() => done())
        .catch(err => done(err));
    });
  

  describe("Basic Route Tests", function() {
    it("should return status 200 for home page", function(done) {
      request(baseUrl, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("GET /api/pjs", function() {
    it("should return status 200 with card list data", function(done) {
      request.get(`${baseUrl}/api/pjs`, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        const data = JSON.parse(body);
        expect(data).to.have.property("statusCode", 200);
        expect(data).to.have.property("data").that.is.an("array");
        expect(data.data.length).to.be.greaterThan(0);
        done();
      });
    });

    it("should return cards with titles", function(done) {
      request.get(`${baseUrl}/api/pjs`, function(error, response, body) {
        const data = JSON.parse(body);
        expect(data.data[0]).to.have.property('title');
        done();
      });
    });

    it("should return card data in correct format", function(done) {
      request.get(`${baseUrl}/api/pjs`, function(error, response, body) {
        const data = JSON.parse(body);
        expect(data).to.have.property('statusCode', 200);
        expect(data).to.have.property('data').that.is.an('array');
        done();
      });
    });

    it("should require email field", function(done) {
      const invalidProject = new Project({
        first_name: "NoEmail"
      });
    
      invalidProject.save()
        .then(() => done(new Error("Should have failed")))
        .catch(() => done());
    });

    it("should serve static images", function(done) {
      request.get(`${baseUrl}/images/kitten-2.jpeg`, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(response.headers['content-type']).to.match(/^image/);
        done();
      });
    });

    it("should save a project to database", function(done) {
      const testProject = new Project({
        first_name: "Simple",
        last_name: "Test",
        email: "simple@test.com",
        password: "123"
      });
      
      testProject.save()
        .then(() => done())
        .catch(err => done(err));
    });

    it("should return cards with required properties", function(done) {
      request.get(`${baseUrl}/api/pjs`, function(error, response, body) {
        const data = JSON.parse(body);
        data.data.forEach(item => {
          expect(item).to.have.property("title");
          expect(item).to.have.property("image");
          expect(item).to.have.property("link");
          expect(item).to.have.property("desciption"); 

        });
        done();
      });
    });
  });


  });
