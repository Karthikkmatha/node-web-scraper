var express = require('express');
var fs = require('fs');
var request = require('request');
var app     = express();
var opener = require('opener');


 app.get('/scrape', function(req, res){
//   //The url that we are trying to scrape the image from.

  //The structure of our request call.
  //The first parameter is our url.
  //The callback function takes three parameters, an error, a response, an html.

  request('https://www.instagram.com/edawgquaver/', function (error, response, body) {

      if (error) {
          console.log("Error scraping website: " + error);
      }

      if (response.statusCode != 200) {
          console.log("Invalid status code received: " + response.statusCode);
      }

      if (!error && response.statusCode == 200) {

          console.log("Successful Scraping");
          console.log("-------------------");

          //Extract image urls using pattern found by observing HTML (console.log the body variable)
          var imageUrls = body.match(/"thumbnail_src": "([\s\S]*?)"/gi);

          //Clean Image Urls
          for (var i = 0; i < imageUrls.length; i++){

              var cleanImageUrl = imageUrls[i];
              cleanImageUrl = cleanImageUrl.substring(16);
              cleanImageUrl = cleanImageUrl.substring(0,cleanImageUrl.length-1);
              cleanImageUrl = cleanImageUrl.substring(2)
              imageUrls[i] = cleanImageUrl
          }
      }
      fs.writeFile('output.json', JSON.stringify(imageUrls, null, 4), function(err){

          console.log('File successfully written! - Check your project directory for the output.json file');

      })
      opener([imageUrls[0], imageUrls[1], imageUrls[2]])
      res.send('Check your console!')
    }) ;
  })

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
