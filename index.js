'use strict';
// ===================================================================================
// get all the tools we need
// ===================================================================================
var express = require('express'); //charges the express' module
var path = require('path');
var app = express(); //contains express' module
// ===================================================================================
// setup our express application
// ===================================================================================
app.set('port', process.env.PORT || 4001); //set the port for the server
app.use(express.static(path.join(__dirname, './public'))); //charge the static resources
app.set('view engine', 'ejs'); // set ejs like view engine
app.set('views', path.join(__dirname, './views/pages')); //charge the route of views
// ===================================================================================
// start our server
// ===================================================================================
var server = require('./server'); //requires our server
server.start(app); //inicialize our server 
