var express = require('express');
var cheerio = require('cheerio');
var request = require('request');

var facultyObject;
var ITfaculty = new Object();
var CSEfaculty = new Object();
var noticeObject;

function scrape()    {

//fetches all the faculty names
    this.getITFaculty = function(res) {

        request({
            url: 'http://it.mait.ac.in/index.php/people/faculty',
            method: "GET", 
        }, function(err, res, body) {
            if(err) {
                throw err;
            }
            //Scrapes all the faculty names
            $ = cheerio.load(body);
            var arr = [];
            var facultyName;
            for(var i = 0; i < $('.article-content td a').length; i++)  {
                // facultyObject = new Object;
                facultyName = $('.article-content td a').eq(i).text();
                arr.push(facultyName);
                // facultyObject.faculty_IT = facultyName;
                // console.log(arr);
            }
            facultyObject = {};
            for(j = 0; j < arr.length; j++) {
                facultyObject[(j+1)] = arr[j];
            }
            ITfaculty.IT = facultyObject;
            console.log(ITfaculty);
        });
         setTimeout((function() {res.send(ITfaculty)}), 1500);
    }
    this.getCSEFaculty = function(res) {

        request({
            url: 'http://cse.mait.ac.in/index.php/people/faculty',
            method: "GET", 
        }, function(err, res, body) {
            if(err) {
                throw err;
            }
            //Scrapes all the faculty names
            $ = cheerio.load(body);
            var arr = [];
            for(var i = 0; i < $('.article-content td a').length; i++)  {
                var facultyName;
                facultyName = $('.article-content td a').eq(i).text();
                arr.push(facultyName);
                // facultyObject.faculty_IT = facultyName;
                // console.log(arr);
            }
            facultyObject = {};
            for(j = 0; j < arr.length; j++) {
                facultyObject[(j+1)] = arr[j];
            }
            CSEfaculty.CSE = facultyObject;
            console.log(CSEfaculty);
        });
         setTimeout((function() {res.send(CSEfaculty)}), 1500);
    }

    //Scraping all the B.Tech notices from ipu.ac.in
    this.getBtechNotices = function(res){
        
        request('http://www.ipu.ac.in/exam_notices.php', function(err, res, body)   {
            if(err) {
                throw err;
            }
            var notice = [];
            var noticeLink = [];
            $ = cheerio.load(body);
            $('.table-box td [href]').each(function()   {
                var content = $(this);
                var contentText = content.text();

                var txt = 'B. Tech';
                var txt1 = 'B.Tech';
                if(contentText.indexOf(txt) > -1 || contentText.indexOf(txt) > -1)   {
                    notice.push(contentText);
                    noticeLink.push(content.attr('href'))
                };
                console.log(notice);
            });
            // noticeObject = {};
            // for(j = 0; j < item.length; j++) {
                // noticeObject[(j+1)] = item[j];
            // }
            // console.log(noticeObject);
        });   
        // setTimeout((function() {res.send(noticeObject)}), 3000);
    }
}

module.exports = new scrape();