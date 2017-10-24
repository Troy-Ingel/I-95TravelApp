var express = require('express');
var router = express.Router();
var url = ' https://cttravelsmart.org/List/GetData/Cameras?key=';
var key = '860e2b8fe69b47c785ba57af53aceb6b';
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


router.get('/roadCameras', function(req, res) {
    //Read in the payload file, which contains the JSON needed for the post request
    fs.readFile('payload.txt', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
            res.json(err);
        }
        if (data) {
            //If the file exists and contains data, send it to be posted
            postJson(JSON.parse(data));
        } else {
            console.log("No data to post");
        }
    });

    function postJson(payload) {
        //post the payload to the endpoint
        request({
            url: url + '/List/GetData/Cameras?key=' + key,
            method: "POST",
            json: true,
            body: payload
        }, function(error, response, body) {
            body.data.forEach(function(i){
                
                i.tooltipUrl = 'https://cttravelsmart.org' + i.tooltipUrl;
            
            });

            res.json(body.data);
        });
    }
});

module.exports = router