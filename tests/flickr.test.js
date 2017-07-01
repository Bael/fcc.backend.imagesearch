// just testing that correct api return array of photo
const expect = require('expect');
const request = require('supertest');
const flickr = require('./../flickr.js');
const gsearch = require('./../gsearch-api-client.js');
const config = require('./../config');



describe("Image Search", function ()  {

  describe("#Search works with correct api key", function ()  {
      this.slow(5000);
      

      let api_key = process.env.valid_api_key;

  		it("should work", function(done) {
        let length = 10;
        gsearch.search("cats", config.google_api_key, config.search_engine, length, 1, function(err, array) {
          if(err) return done(err);
          array.forEach((val ) => expect(val).toIncludeKeys(["url", "thumbnail", "alt"]));
          expect(array.length).toBe(length);

          done();
        });
  		});

      
	});
});
