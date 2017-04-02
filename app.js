var express = require('express');
var bodyparser = require('body-parser');
var http = require('http');
var cheerio = require('cheerio');
var request = require('request');
var app = express();
var FormData = require('form-data');


app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//Convert Cookie from the headers to a String
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

// Receiving the cookie and then sending it in headers
//Getting the whole result
var form = new FormData();
form.append('Roll_No', '40514803115');
form.submit("https://ipuresult.com/index.php", function(err, response)   {
    response.resume();
    cookie = mkdataCookie(response.headers['set-cookie']);
    cookieString = dataCookieToString(cookie);
    console.log(cookieString);

    request({
        url: "http://ipuresult.com/student_marks.php",
        method: "GET",
        headers: {'Cookie': cookieString}
        }, function(error, response, body)  {
            // console.log(response.body);
            $ = cheerio.load(response.body);
            $('.page td').each(function()   {
                console.log($(this).text());
            });
        });
    });


//To get College Rank
// form.append('Roll_No', '40514803115');
// form.submit("https://ipuresult.com/index.php", function(err, response)   {
//     response.resume();
//     cookie = mkdataCookie(response.headers['set-cookie']);
//     cookieString = dataCookieToString(cookie);
//     console.log(cookieString);

//     request({
//         url: "https://ipuresult.com/beforecr.php",
//         method: "GET",
//         headers: {'Cookie': cookieString}
//         }, function(error, response, body)  {
//             var item = [];
//             $ = cheerio.load(response.body);
//             $('.page b a').each(function()   {
//                 console.log($(this).text());
//             });
//     });
// });

//To get University Rank
// form.append('Roll_No', '40514803115');
// form.submit("https://ipuresult.com/index.php", function(err, response)   {
//     response.resume();
//     cookie = mkdataCookie(response.headers['set-cookie']);
//     cookieString = dataCookieToString(cookie);
//     console.log(cookieString);

//     request({
//         url: "https://ipuresult.com/beforeur.php",
//         method: "GET",
//         headers: {'Cookie': cookieString}
//         }, function(error, response, body)  {
//             var item = [];
//             $ = cheerio.load(response.body);
//             $('.page b a').each(function()   {
//                 console.log($(this).text());
//             });
//     });
// });


var server = app.listen(3000, function() {
    console.log('Server listening on port' + server.address().port);
});