var express = require("express");
var path = require("path");
var app = new express();
var port = 5000 || process.env.port;
app.set("view engine" , "ejs");
app.get("/" , (req,res)=>{
    res.sendFile(path.join(__dirname , 'weather_api_home.html'));
}) ;
app.get("/next" , (req,res)=>{
    var Song = req.query.Song;
    var Artist = req.query.Artist;  
    var url = 'http://lyric-api.herokuapp.com/api/find/' + Artist + '/' + Song;
    const request = require('request');
    var bodyq;
    request(url, function(err, res, body) {
        bodyq = JSON.parse(body);
        console.log(bodyq.lyric);
});
    res.render(path.join(__dirname , "index.ejs") , {lyrics : bodyq.lyric});
});
app.listen(port , ()=>{console.log(`Server is working with ${port}`)})