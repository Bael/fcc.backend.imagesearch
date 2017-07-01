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
