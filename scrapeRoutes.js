var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var bodyParser = require('body-parser');
var unirest = require('unirest');
var scrape = require('./scrapeFunctions');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/faculty/it', function(req, res)  {
    scrape.getITFaculty(res);
})

app.get('/faculty/cse', function(req, res)  {
    scrape.getCSEFaculty(res);
})

app.get('/notices', function(req, res)  {
    scrape.getBtechNotices(res);
})

app.listen(8081);
console.log('Server is running on 8081...');



