'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//and create our instances
var app = express();

//set our port to either a predetermined port number if you have set
//it up, or 3001
var port = process.env.API_PORT || 3001;

app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/hellop.html'));
});

var server = app.listen(port, function(){
    console.log("server started on port " + port);
});

var request = require('request');


// request({
//
//     uri: 'https://api.onion.io/v1/devices/0a4d3921-66f9-4e1b-ad6d-531fad110687/onion/gpio',
//     method: 'post',
//
//     headers: {
//         "X-API-KEY": "RjSelpwWuElfLAsxbaYcjQnjPhElB7OWleIBFwGnQbjycXqYb32r3laoagfg2IzI"
//     },
//     body: {
//         "command": "set",
//         "params": {
//             "gpio": "0",
//             "value": "0"
//         }
//     },
//     json: true
// }, function () {
//     console.info('on');
// })