// to execute in strict mode ES5+
"use strict";
(function(){
    var express = require('express'),
        http = require('http'),
        cookieParser = require(cookie-parser),
        bodyParser = require(body-parser);

    var app = express();

    // where are the server side views
    app.set('views', __dirname + '/views');
    // where are the jade templates (server side)
    app.set('view engine', 'jade');
    app.set('port',8080);
    // where is the public folder
    app.use(express.static(__dirname + '/public'));

    // routing location
    var insurance = require('./server_routes/insurance.js');

    //re-routing to insurance server router file
    app.get('/', function(req,res){
       res.redirect(303,'/insurance')
    });

    http.createServer(app).listen(app.get('port'));

}).call(this);