//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {

    var options = {
        'method': 'GET',
        'url': 'https://cdn-api.co-vin.in/api/v2/admin/location/states',
    };
    request(options, function (error, response) {
        if (error) {
            throw new Error(error);
        }
        // console.log(response.body);
        const cowinData = JSON.parse(response.body);
        console.log(cowinData.states[0].state_name);
        const states = cowinData.states;
        console.log(typeof(states));
        console.log(states[1].state_name);
        const state_name=[];
        for(let i=0;i<=35;i++){
          state_name.push(states[i].state_name);
        }
        for(let i=0;i<=35;i++)console.log(state_name[i]);
        res.send("List of States");
    });


})

app.get("/district", function(req,res){
    var options = {
        'method': 'GET',
        'url': 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/9',
        'headers': {
            'Accept-Language': 'hi_IN'
          }
    }
    request(options, function(error,response){
        if(error) throw new Error(error);
        console.log(JSON.parse(response.body));
    })
    res.send("List of Districts");
})



const PORT = process.env.PORT || 3000;

app.listen(PORT,function(){
    console.log("Server Started on Port 3000");
});
