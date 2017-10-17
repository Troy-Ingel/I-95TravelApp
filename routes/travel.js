var express = require('express');
var router = express.Router();

const https = require('https');
const baseUrl = 'https://cttravelsmart.org/api/';
const apiKey = '860e2b8fe69b47c785ba57af53aceb6b';

router.get('/events', function(req, res){

	https.get(baseUrl + 'getevents?format=json&key=' + apiKey, (httpRes) => {
		let data = '';
		httpRes.on('data', (chunk)=> data += chunk);
		httpRes.on('end', ()=> res.json(JSON.parse(data)));
	}).on('error', (err) => {
		res.json(err);
	});
})

.get('/alerts', function(req, res){
	https.get(baseUrl + 'getalerts?format=json&key=' + apiKey, (httpRes) => {
		let data = '';
		httpRes.on('data', (chunk)=> data += chunk);
		httpRes.on('end', ()=> res.json(JSON.parse(data)));
	}).on('error', (err) => {
		res.json(err);
	});
});

module.exports = router