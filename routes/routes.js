'use strict';
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index'); //Show login
    });

    app.get('/home', function (req, res) {
        res.render('home'); //Show home
    });

    app.get('/newbook', function (req, res) {
        res.render('newbook'); //Show the form for add a new book
    });

    app.get('/newuser', function (req, res) {
        res.render('newuser'); //Show the form for add a new user
    });

    app.use(function (req, res, next) {
        res.status(404);
        res.render('notfound'); //Show a default page for 404 error
    });
};