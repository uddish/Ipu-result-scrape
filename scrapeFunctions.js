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
        var facultyArr = [];
        var arr = [];
        request({
            url: 'http://it.mait.ac.in/index.php/people/faculty',
            method: "GET", 
        }, function(err, res, body) {
            if(err) {
                throw err;
            }
             //Scrapes all the faculty names
            $ = cheerio.load(body);
            for(var i = 0; i < $('.article-content td a').length; i++)  {
                var facultyName;
                facultyName = $('.article-content td a').eq(i).text();
                arr.push(facultyName);
            }
            facultyObject = {};
            for(j = 0; j < arr.length; j++) {
                facultyObject[(j+1)] = arr[j];
            }
            ITfaculty.IT = facultyObject;
            var facultyDetails = {
                Designation: '',
                Qualification: ''
            }
            $('.article-content table tr td table tr td:nth-child(2) p').filter(function()   {
                 
                 var info = $(this);
                // var info = $('.article-content table tr td table tr td:nth-child(2) p');
                 var infoText = info.text();
                //  console.log(infoText);

                 if(infoText.indexOf('Designation') > -1)   {
                     facultyDetails.Designation = infoText.substring(24, infoText.length);
                    }
                 else if(infoText.indexOf('Qualification') > -1)   {
                     facultyDetails.Qualification = infoText.substring(26, infoText.length);
                 }
                 else if(infoText.indexOf('Total') > -1)    {
                    facultyDetails.exp = infoText.substring(39, infoText.length);
                 	facultyArr.push(facultyDetails);
                     facultyDetails = {
                     Designation: '',
                     Qualification: ''
                    }
                 }  

             });
             ITfaculty.details = facultyArr;
        });
         setTimeout((function() {res.send(ITfaculty)}), 2000);
    }

    this.getCSEFaculty = function(res) {
        var facultyArr = [];
        var arr = [];
        request({
            url: 'http://cse.mait.ac.in/index.php/people/faculty',
            method: "GET", 
        }, function(err, res, body) {
            if(err) {
                throw err;
            }
            //Scrapes all the faculty names
            $ = cheerio.load(body);
            for(var i = 0; i < $('.article-content td a').length; i++)  {
                var facultyName;
                facultyName = $('.article-content td a').eq(i).text();
                arr.push(facultyName);
            }
            facultyObject = {};
            for(j = 0; j < arr.length; j++) {
                facultyObject[(j+1)] = arr[j];
            }
            CSEfaculty.CSE = facultyObject;
            // console.log(CSEfaculty);
            var facultyDetails = {
                Designation: '',
                Qualification: ''
            }
 
             $('.article-content table tr td table tr td:nth-child(2) p').filter(function()   {
                
                 var info = $(this);
                 var infoText = info.text();
                
                 if(infoText.indexOf('Designation') > -1)   {
                     facultyDetails.Designation = infoText.substring(24, infoText.length);
                    }
                 else if(infoText.indexOf('Qualification') > -1)   {
                     facultyDetails.Qualification = infoText.substring(26, infoText.length);
                 }
                 else if(infoText.indexOf('Total') > -1)    {
                    facultyDetails.exp = infoText.substring(39, infoText.length);
                 	facultyArr.push(facultyDetails);
                     facultyDetails = {
                     Designation: '',
                     Qualification: ''
                    }
                 }  

             })
             CSEfaculty.details = facultyArr;

        });
         setTimeout((function() {res.send(CSEfaculty)}), 2000);
    }


    //Scraping all the B.Tech notices from ipu.ac.in
    this.getBtechNotices = function(res){
        var notice = [];
        request('http://www.ipu.ac.in/exam_notices.php', function(err, res, body)   {
            if(err) {
                throw err;
            }
            $ = cheerio.load(body);
                noticeObject = {
                name: '', 
                url: ''
            }
            $('.table-box td [href]').each(function()   {
                var content = $(this);
                var contentText = content.text();

                var txt = 'B. Tech';
                var txt1 = 'B.Tech';
                if(contentText.indexOf(txt) > -1 || contentText.indexOf(txt) > -1)   {

                    noticeObject.name = contentText;
                    noticeObject.url = content.attr('href');
                    notice.push(noticeObject);
                    noticeObject = {
                    name: '', 
                    url: ''
                    }
                };
                console.log(notice);
            });
        });   
        setTimeout((function() {res.send(notice)}), 3000);
    }
}

module.exports = new scrape();