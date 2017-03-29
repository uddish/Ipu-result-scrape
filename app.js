var express = require('express');
var bodyparser = require('body-parser');
var request = require('request');
var http = require('http');
var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
const cache = require('memory-cache');
var unirest = require('unirest');
var url = require('url');
var app = express();
var cookieParser = require('cookie-parser');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//https://ipuresult.com/index.php
//https://ipuresult.com/student_marks.php



// unirest.post('http://ipuresult.com/')
// .field('Roll_No', '40514803115') // Form field
// .end(function (response) {
//   console.log(response.body);
// });

// var myJSONObject = {Roll_No:'60714803115'};

// request({
//     url: "http://ipuresult.com/student_marks.php",
//     method: "GET"
// }, function(err, res, body)  {
//     console.log(body);
// })


request({
    url: "http://ipuresult.com/student_marks.php",
    method: "GET",
    headers: {'Cookie' : 'PHPSESSID=c9574119b3921e734c0e6598886b2662'},
    json: true,
    // body: myJSONObject
}, function (error, response, body){
    console.log(response.body);
});


var server = app.listen(3000, function() {
    console.log('Server listening on port' + server.address().port);
});