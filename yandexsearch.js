const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const search_text = encodeURIComponent("trololo cats");
const per_page = 10;
const page = 10;

const url = "https://yandex.ru/images/search?text="+search_text;


const encodedSearchText = encodeURIComponent("funny cats");;


request(url, function(err, resp, body) {
	if(err) {
    console.log("search errr " + err);
		//resp.send(err);
		//resp.end();
	}

	var $ = cheerio.load(body);
	var images = [];

	

	$(".serp-item").each(function(i, elem) {
  		var elem = $(this);


      var data = JSON.parse(elem.attr("data-bem"));
      var item = data["serp-item"];

      console.log(JSON.stringify(item, "/", 2));
      var preview = item.preview[0].url;

      var str = "img_url=";
      var len = str.length;

      var detail_url = item.detail_url.split("&")[1].substring(len);

      var alt = $(elem.children(".serp-item__thumb")).attr("alt");


      var imageObj = {
  							url: decodeURIComponent(detail_url),
                preview: preview,
  							alt: alt
  						};
  		console.log(imageObj);
  		images.push(imageObj);


	});



  console.log("images.length = "+images.length);

	//let imagesHTML = images.map((obj) => `<img src="${obj.url}" alt="${obj.alt}" /> `);

  let imagesHTML = images.map((obj) => `<img src="${obj.url}"  /> `);

	//console.log(images);
	fs.writeFile('images2.html', imagesHTML, (err) => {
 		if (err) throw err;
 		console.log('saved');
 		}
 	);

})



