const request = require('request');

module.exports.search = function(searchTerms, api_key, cx, num, page, callback) {
  // page starts with 1. start index starts with next record. So need add 1.

  let start = Math.max(1, 1 + num * (page - 1));

  const url = `https://content.googleapis.com/customsearch/v1?c2coff=1&cx=${cx}&num=${num}&q=${searchTerms}&safe=medium&searchType=image&start=${start}&alt=json&key=${api_key}`

  request(url, function(err, resp, body) {
    if(err) {
      return callback(err);
    }

    let jsonBody = JSON.parse(body);
    
    if (resp && resp.statusCode === 200) {
      let array = jsonBody.items.map(makeImageObject);
      callback(null, array);
    } else {
      if (jsonBody && jsonBody.error) {
        return callback(jsonBody.error);
      } else {
        return callback({"errorMessage":"Unknown error. Status code: "+resp.statusCode });
      }
    }

  });
};

function makeImageObject(jsonSearchResult) {
  
  return {url:jsonSearchResult.link, alt:jsonSearchResult.title, thumbnail:jsonSearchResult.image.thumbnailLink};
}





