require('dotenv').config();
require('./api/models/dbconnection.js');
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');
var bodyparser = require('body-parser');
app.set('port', process.env.PORT || 3008);

//Middleware - Logging requests that comes in
app.use(function(request, response, next){
    console.log(request.method, request.url);
    next();
});

app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use('/api/broadcast-service', routes);

var server = app.listen(app.get('port'), function(result){
    var port = server.address().port;
    console.log('It runs on ' + port );
});