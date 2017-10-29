// variables
var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
// constants
const url = ' https://cttravelsmart.org/List/GetData/Cameras?key=';
const key = '860e2b8fe69b47c785ba57af53aceb6b';

// endpoint for fetching all I-95 road camera links
router.get('/', function(req, res) {
    // Read in the payload file, which contains the JSON needed for the post request
    fs.readFile('payload.txt', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
            res.json(err);
        }
        if (data) {
            // if the file exists and contains data, try to post it
            postJson(JSON.parse(data));
        } else {
            console.log("No data to post");
        }
    });

    // This function takes a json payload, posts it to the endpoint,
    // and gets back json containing the road camera data.
    function postJson(payload) {
        request({
            url: url + '/List/GetData/Cameras?key=' + key,
            method: "POST",
            json: true,
            body: payload
        }, function(error, response, body) {
            body.data.forEach(function(i){
                // prepend the base-url to the link provided by json
                i.tooltipUrl = 'https://cttravelsmart.org' + i.tooltipUrl;
            });
            // send the modified json
            res.json(body.data);
        });
    }
});

module.exports = router