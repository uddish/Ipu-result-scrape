var express = require('express');
var bodyparser = require('body-parser');
var http = require('http');
var cheerio = require('cheerio');
var request = require('request');
const cache = require('memory-cache');
var app = express();
var cookieParser = require('cookie-parser');
var FormData = require('form-data');


app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//https://ipuresult.com/beforecr.php
//https://ipuresult.com/collegerank.php


function mkdataCookie(cookie) {
    var t, j;
    cookie = cookie.toString().replace(/,([^ ])/g, ",[12],$1").split(",[12],");
    for (var x = 0; x < cookie.length; x++) {
        cookie[x] = cookie[x].split("; ");
        j = cookie[x][0].split("=");
        t = {
            key: j[0],
            value: j[1]
        };
        for (var i = 1; i < cookie[x].length; i++) {
            j = cookie[x][i].split("=");
            t[j[0]] = j[1];
        }
        cookie[x] = t;
    }
    return cookie;
}
function dataCookieToString(dataCookie) {
    var t = "";
    for (var x = 0; x < dataCookie.length; x++) {
        t += ((t != "") ? "; " : "") + dataCookie[x].key + "=" + dataCookie[x].value;
    }
    return t;
} 

//Receiving the cookie and then sending it in headers
var form = new FormData();

form.append('Roll_No', '40514803115');
form.submit("https://ipuresult.com/index.php", function(err, response)   {
    response.resume();
    cookie = mkdataCookie(response.headers['set-cookie']);
    cookieString = dataCookieToString(cookie);
    console.log(cookieString);

    // request({
    //     url: "http://ipuresult.com/student_marks.php",
    //     method: "GET",
    //     headers: {'Cookie': cookieString}
    //     }, function(error, response, body)  {
    //         // console.log(response.body);
    //         $ = cheerio.load(response.body);
    //         $('.page td').each(function()   {
    //             console.log($(this).text());
    //         });
    // });
    request({
        url: "https://ipuresult.com/collegerank.php",
        method: "GET",
        headers: {'Cookie': cookieString}
        }, function(error, response, body)  {
            console.log(response.body);
            // $ = cheerio.load(response.body);
            // $('.page a').each(function()   {
                // console.log($(this).text());
            // });
    });
});


// request({
//     url: "https://ipuresult.com/index.php",
//     method: "PUT",
//     json: true,
// }, function(error, response, body)  {
//     cookie = mkdataCookie(response.headers['set-cookie']);
//     cookieString = dataCookieToString(cookie);
//     console.log(cookieString);

//     request({
//         url: "http://ipuresult.com/student_marks.php",
//         method: "GET",
//         headers: {'Cookie': cookieString}
//     }, function(error, response, body)  {
//         console.log(response.body);
//     })
// });







// request({
//     url: "http://ipuresult.com/student_marks.php",
//     method: "GET",
//     headers: {'Cookie' : 'PHPSESSID=c9574119b3921e734c0e6598886b2662'},
//     json: true,
//     // body: myJSONObject
// }, function (error, response, body){
//     console.log(response.body);
// });


var server = app.listen(3000, function() {
    console.log('Server listening on port' + server.address().port);
});