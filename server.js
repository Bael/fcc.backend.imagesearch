const port = 4000;

const express = require('express');
const path = require('path');

const fs = require('fs');
const app  = express();
const flickr = require('./flickr');
const bodyParser = require('body-parser');

app.listen(port, () => console.log(`Listening port ${port} at` + new Date()));

app.use(express.static(path.join(__dirname, "/static")));
app.use(bodyParser.urlencoded({extended: 'false'}));
app.set('view engine', 'pug')

app.get("/api/search/:search", function(req, res) {
	console.log("search is: "+req.params.search);
	const encodedSearchText = encodeURIComponent(req.params.search);
	let offset = req.query.offset || 1;
	let api_key = process.env.valid_api_key;

	flickr.search(encodedSearchText, api_key, 10, offset, function(err, array) {
		if(err) {
			res.send(err);
			res.end();
		}
		else {
			res.send(array);
		}
	});
});

app.post("/test/search/", function(req, res) {
	console.log("search is: "+req.params.search);

	let encodedSearchText = req.body.search;
	let offset = req.body.offset;
	let api_key = process.env.valid_api_key;

	flickr.search(encodedSearchText, api_key, 10, offset, function(err, array) {
		if(err) {
			res.send(err);
			res.end();
		}
		else {
  		res.render('result', { title: 'Result', images: array })

		}
	});
});
