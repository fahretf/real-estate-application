const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.get('/nekretnine.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/nekretnine.html');
});

app.listen(3000);