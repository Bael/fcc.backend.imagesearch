// just testing that correct api return array of photo
const expect = require('expect');
const request = require('supertest');
const flickr = require('./../flickr.js');
const valid_api_key = process.env.apiKey;

describe("Image Search", function ()  {
	describe("#Search doesn't work with correct api key", function ()  {
    this.slow(5000);
    let api_key = "incorrect_key"
		it("should not work", function(done) {
      flickr.search("cats", api_key, 1, 1, function(err, array) {
        if(err) return done();
        done(new Error("should not pass"));
      });
		});
  });

  describe("#Search works with correct api key", function ()  {
      this.slow(5000);
      let api_key = process.env.valid_api_key;

  		it("should just work", function(done) {
        flickr.search("cats", api_key, 1, 1, function(err, array) {
          if(err) return done(err);
          done();
        });
  		});

      it("should fill object properties", function(done) {
        flickr.search("cats", api_key, 1, 1, function(err, array) {
          if(err) return done(err);
          array.forEach((val ) => expect(val).toIncludeKeys(["url", "thumbnail", "alt"]));
          done();
        });
  		});
	});
});
