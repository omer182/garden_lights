/**
 * Created by Yoav Rosenbaum on 8/17/2017.
 */
var request = require('request');

function clicked(){
    console.log("Clicked");
}



function onButtonClick(){

    console.log("HI")

    request({

        uri: 'https://api.onion.io/v1/devices/0a4d3921-66f9-4e1b-ad6d-531fad110687/onion/gpio',
        method: 'post',

        headers: {
            "X-API-KEY": "RjSelpwWuElfLAsxbaYcjQnjPhElB7OWleIBFwGnQbjycXqYb32r3laoagfg2IzI"
        },
        body: {
            "command": "set",
            "params": {
                "gpio": "0",
                "value": "1"
            }
        },
        json: true
    }, function () {
        console.info('on');
    })
}