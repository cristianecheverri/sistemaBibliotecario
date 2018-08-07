'use strict';
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index'); //Show login
    });

    // app.post('/', function (req, res) {
    //     req.session.nombre = req.body.nombre;
    //     res.redirect('home'); //Show login
    // });

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
        res.render('saloon'); //show the registred rooms
    });

    app.get('/newsaloon', function (req, res) {
        res.render('newsaloon'); //Lets add a new room
    });

    app.get('/category', function (req, res) {
        res.render('category'); //Show the registred categories
    });

    app.get('/newcategory', function (req, res) {
        res.render('newcategory'); //Lets add a new category
    });

    app.get('/shelf', function (req, res) {
        res.render('shelf'); //Show the registred shelfs
    });

    app.get('/newshelf', function (req, res) {
        res.render('newshelf'); //Lets add a new shelf
    });

    app.get('/catalog', function (req, res) {
        res.render('catalog'); //Show all the added books
    });

    app.get('/loan', function (req, res) {
        res.render('loan'); //Show all the loans
    });

    app.get('/loanpending', function (req, res) {
        res.render('loanpending'); //Show all the pending loans
    });

    app.get('/loanreservation', function (req, res) {
        res.render('loanreservation'); //Show all the reservations
    });

    app.get('/report', function (req, res) {
        res.render('report'); //Show the reports of books
    });

    app.get('/settings', function (req, res) {
        res.render('settings'); //Lets change some options of the system
    });

    app.use(function (req, res, next) {
        res.status(404);
        res.render('notfound'); //Show a default page for 404 error
    });
};