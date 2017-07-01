const port = 4000;
const express = require('express');
const path = require('path');
const fs = require('fs');
const app  = express();
const gsearch = require('./gsearch-api-client');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const config = require('./config.js');
// num of rows to find
const num = 10;

let db;
const mongoUrl = process.env.MONGO_URI || `mongodb://localhost:27017/imagesearch`;
// Initialize connection once
MongoClient.connect(mongoUrl, function(err, database) {
  if(err) {
    throw err;
  }

  db = database;
	app.listen(port, () => console.log(`Listening port ${port} at` + new Date()));
});



app.use(express.static(path.join(__dirname, "/static")));
app.use(bodyParser.urlencoded({extended: 'false'}));
app.set('view engine', 'pug')

/*-------------- API -------------------- */
app.get("/api/search/:search", function(req, res) {
	console.log("search is: "+req.params.search);
	const encodedSearchText = decodeURIComponent(req.params.search);
	/// 0 or negative numbers are not valid
	let offset = Math.max(1, req.query.offset || 1);


	db.collection('latest').insert({term: encodedSearchText, searchdate: new Date()}, (err, res) => {
		if (err) throw err;
	});

	gsearch.search(encodedSearchText, config.google_api_key, config.search_engine, num, offset, function(err, array) {
		if(err) {
			res.send(err);
			res.end();
		}
		else {
			res.send(array);
		}
	});
	
});

app.get("/api/latestsearch/", function(req, res) {
	db.collection('latest').find().sort({searchdate:-1}).limit(10).toArray((err, result) => {
		if(err) throw err;
		res.send(result);
		res.end();
	});
});


/*-------------- TEST User interface -------------------- */
app.post("/test/search/", function(req, res) {
	let encodedSearchText = encodeURIComponent(req.body.search);
	let offset = req.body.offset;

	//console.log("search is: "+encodedSearchText);

	db.collection('latest').insert({term: encodedSearchText, searchdate: new Date()}, (err, res) => {
		if (err) throw err;
	});


	gsearch.search(encodedSearchText, config.google_api_key, config.search_engine, num, offset, function(err, array) {
		if(err) {

			res.send(JSON.stringify(err));
			res.end();
		}
		else {
  			res.render('result', { title: 'Result', images: array })

		}
	});

});
