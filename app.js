const apiFetch = require('node-fetch');
const express = require('express');
const app = express();
const https = require('https');
const http = require('http');

var fs = require('fs');
var rawData = JSON.parse(fs.readFileSync('./data.json'));
var country = rawData.data;
var countryArr = Object.values(country);

const health = require('@cloudnative/health-connect');
let healthcheck = new health.HealthChecker();

app.use('/health', health.HealthEndpoint(healthcheck))


app.get("/convert", (req, res) => {

  var countryName = req.query.countryName
  console.log(countryName);
  let response = "";
  
  countryArr.some(function (element) {
    if (element.name == countryName) {
      response = element.iso_alpha2;
         return true;
    } else {
      //console.log("in else");
      response = "No match found";
    }
  });
  res.send(response);
});

app.get("/diag", (req, res) => {
  https.get('https://www.travel-advisory.info/api', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      //console.log(resp)
      let response = {
        api_status: {
          statusCode: 200,
          status: "OK",
          body: "SUCCESS"
        }

        // body: JSON.parse(data)
      };
      res.send(response);

      //    console.log(JSON.parse(data));
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

});



app.listen(3001, () => {
  console.log('Server is running');
});