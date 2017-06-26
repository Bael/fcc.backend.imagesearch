const cheerio = require('cheerio');
/*

const search_text = encodeURIComponent("funny cats");
const per_page = 10;
const page = 10;

//const url = "https://duckduckgo.com/?q=cats&t=hz&atb=v70-4_z&iax=1&ia=images";
//const url = "https://yandex.ru/images/search?text=funny%20cats"

//request(url).pipe(fs.createWriteStream('doodle.png'));


const encodedSearchText = encodeURIComponent("funny cats");;


flickr.search(encodedSearchText, api_key, 5, 1, function(err, array) {
	if(err) {
		//resp.send(err);
		//resp.end();
		console.log(err);
		console.log("error is found");
	}
	else {
		console.log(JSON.stringify(body));
	}

});


*/


/*request(url, function(err, resp, body) {
	if(err) {
		//resp.send(err);
		//resp.end();
	}

	var $ = cheerio.load(body);
	var images = [];

	//const fruits = [];

	$(".serp-item__link").each(function(i, elem) {
  		var elem = $(this);
  		var href = elem.attr("href");
  		console.log(href);

  		var str = "img_url=";
  		var len = str.length;
  		let imgurl = href.split("&")[1].substring(len);

  		var imageObj = {
  							url: decodeURIComponent(imgurl),
  							alt: $(elem.children("img")[0]).attr("alt")
  						};
  		console.log(imageObj);
  		images.push(imageObj);

	});


	let imagesHTML = images.map((obj) => `<img src="${obj.url}"" alt="${obj.alt}" /> `);

	//console.log(images);
	fs.writeFile('images2.html', imagesHTML, (err) => {
 		if (err) throw err;
 		console.log('saved');
 		}
 	);



	//.pipe(fs.createWriteStream('doodle.png'))
	//resp.send(images);
})
*/



/*
http://api.bing.net/json.aspx?
AppId=Insert your AppId here
&Query=xbox%20site:microsoft.com
&Sources=Image&
Version=2.0
&Market=en-us
&Adult=Moderate
&Image.Count=10
&Image.Offset=0
&JsonType=callback
&JsonCallback=SearchCompleted
*/
