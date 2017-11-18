var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/hackaton";
var shortUrl = require('node-url-shortener');
var opn = require('opn');

exports.index = function(req, res){
	mongo.connect(mongoURL, function(){
var col = mongo.collection('url_details');
		              col.find().toArray(function(err,list){
		           	console.log("URL: "+list[0]._id);
	            	 res.render('index',{url:"",urls:list}); 
		              }
		              )});
};