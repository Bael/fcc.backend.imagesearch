const fs = require('fs');

var obj = {};

const filename = "settings.json";

if (fs.existsSync(filename)) {
    obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
    
}

module.exports.api_key = obj.api_key || process.env.FLICKR_API_KEY;
module.exports.google_api_key = obj.google_api_key || process.env.GOOGLE_API_KEY;
module.exports.search_engine = obj.search_engine || process.env.SEARCH_ENGINE;


