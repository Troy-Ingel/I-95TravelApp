var express = require('express');
var router = express.Router();

const https = require('https');
const baseUrl = 'https://maps.googleapis.com/maps/api/directions/json';
const apiKey = 'AIzaSyDKWd6bBOs6KH10TcE5729ZTWeUdrIdyLI';

router.get('/', function(req, res){

	const origin = req.query.origin;
	const destination = req.query.destination;
	var url = baseUrl + '?origin=' + origin + '&destination=' + destination;
	url += '&key=' + apiKey;
	url += '&mode=transit';

	https.get(url, (httpRes) => {
		let data = '';
		httpRes.on('data', (chunk)=> data += chunk);
		httpRes.on('end', ()=>{
			res.json(JSON.parse(data));
		});
	}).on('error', (err) => {
		res.json(err);
	});
})

module.exports = router;