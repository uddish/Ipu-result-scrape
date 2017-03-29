var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var Browser = require('zombie');
//Form scraper
// var request = require('request');
// request = request.defaults({jar: true});
// var pRequest = require("promisified-request").create(request);
// var fScraper = require("form-scraper");

// browser = new Browser();

// var formStructure = fScraper.fetchForm("#login", "https://ipuresult.com", pRequest);
// // console.log(formStructure); return false;

// var loginDetails = {Roll_No: '40514803115'};

// fScraper.submitForm(loginDetails, fScraper.provideForm(formStructure), pRequest).then( function (response) {
//     console.log(response.body);
// });


//*************************************************************************************************








//*************************************************************************************************




// browser.visit('https://ipuresult.com/', function()    {
//     browser.fill('#Roll_No', '40514803115');

//     browser.document.forms[0].submit();
//     // wait for new page to be loaded then fire callback function
//     browser.wait().then(function() {
//         console.log('Form submitted ok!');
//         // the resulting page will be displayed in your default browser
//         browser.viewInBrowser();
//     });

// })

request('http://it.mait.ac.in/index.php/people/faculty', function(err, res, body)   {
    if(err) {
        throw err;
    }

// //Scrapes all the faculty names
    $ = cheerio.load(body);
    $('.article-content td a').each(function()  {
        console.log($(this).text());
    })

});

// request('https://ipuresult.com/', function(err, res, body)   {
//     if(err) {
//         throw err;
//     }
//     var item = [];
//     $ = cheerio.load(body);
//     console.log(body);
//     $('pagel a').each(function()   {
//         var content = $(this);
//         var contentText = content.text();
//         console.log(contentText);
//         // if(contentText.search('Name') != -1) {
//         //     item.push(contentText);
//         // };
//     })
// })

//Scraping all the B.Tech notices from ipu.ac.in
// request('http://www.ipu.ac.in/exam_notices.php', function(err, res, body)   {
//     if(err) {
//         throw err;
//     }
//     var item = [];
//     $ = cheerio.load(body);
//     $('.table-box td a').each(function()   {
//         var content = $(this);
//         var contentText = content.text();
//         if(contentText.search('B. Tech') != -1) {
//             item.push(contentText);
//         };
//         console.log(contentText);
//     });
// })


