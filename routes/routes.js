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

    app.get('/institution', function (req, res) {
        res.render('institution'); //Show the registred institutions
    });

    app.get('/newinstitution', function (req, res) {
        res.render('newinstitution'); //Lets add a new institution
    });

    app.get('/saloon', function (req, res) {
        res.render('saloon'); //Lets add a new institution
    });

    app.get('/newsaloon', function (req, res) {
        res.render('newsaloon'); //Lets add a new institution
    });

    app.get('/category', function (req, res) {
        res.render('category'); //Lets add a new institution
    });

    app.get('/newcategory', function (req, res) {
        res.render('newcategory'); //Lets add a new institution
    });

    app.get('/shelf', function (req, res) {
        res.render('shelf'); //Lets add a new institution
    });

    app.get('/newshelf', function (req, res) {
        res.render('newshelf'); //Lets add a new institution
    });

    app.get('/catalog', function (req, res) {
        res.render('catalog'); //Lets add a new institution
    });

    app.use(function (req, res, next) {
        res.status(404);
        res.render('notfound'); //Show a default page for 404 error
    });
};