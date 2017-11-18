var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/hackaton";
var shortUrl = require('node-url-shortener');
var opn = require('opn');

exports.generate = function(req, res){
	var org=req.param("orgurl");
	console.log("ORG: "+org);
	shortUrl.short(org, function(err, url){
		var newURL={org_url:org,short_url:url};
	    mongo.connect(mongoURL, function(){
	        console.log('Connected to mongo at: ' + mongoURL);
	        var col1 = mongo.collection('url_details');
	        col1.insertOne(newURL, function(err, result) {
	            if (err) throw err;
	            else{
	            	console.log(url);
	            	var col = mongo.collection('url_details');
		              col.find().toArray(function(err,list){
		           	console.log("URL: "+list[0]._id);
	            	 res.render('index',{url:url,urls:list}); 
		              });
	            
	            }
	            });
	    });
		    
	});
 
};