const request = require('request');

module.exports.search =  searchPhoto;

function searchPhoto(encodedSearchText, api_key, per_page, page, callback) {

  const request_url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&api_key=${api_key}&text=${encodedSearchText}&per_page=${per_page}&page=${page}&format=json&nojsoncallback=1`


  request(request_url, function(err, resp, body) {
  	if(err) {
  		callback(err);
      return;
  	}

    jsonBody = JSON.parse(body);

    console.log(jsonBody);
    if (jsonBody.stat === "fail") {
      return callback(jsonBody.message);
    }
    else {

      let array = jsonBody.photos.photo.map(makeImageObject);
      callback(null, array);
    }
  });

};

// transform result to required  object
function makeImageObject(urlJSONObject) {

  const {farm, title, server, id, secret} = urlJSONObject;

  return {
    url:`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`,
    thumbnail:`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_s.jpg`,
    alt:title
  }

}

/*

const api_key = "5d32721316e054dca98e856f44f461c0" + "trololo";
const apy_secret="6b58e80b680680a1"
///&api_sig=db127ebf1be43755fcf7b35361f59222
const search_text = encodeURIComponent("funny cats");
const per_page = 10;
const page = 10;




//request(url).pipe(fs.createWriteStream('doodle.png'));
const encodedSearchText = encodeURIComponent("funny cats");
searchPhoto(encodedSearchText, api_key, 5, 1, function(err, array) {
  console.log(err);
});
*/
