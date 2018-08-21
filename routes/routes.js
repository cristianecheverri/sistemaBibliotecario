'use strict';
var functions = require('./functions');
const { Biblioteca, Sala, Estante, Categoria, Autor, Libro, Usuario, Transaccion } = require('../connection');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index'); //Show login
    });

    // app.post('/', function (req, res) {
    //     //req.session.nombre = req.body.nombre;
    //     //res.redirect('home'); //Show login
    //     res.send('post')
    // });

    app.get('/home', function (req, res) {
        functions.startHome(res);
    });

    app.get('/newbook', function (req, res) {
        functions.cargarAgregarLibro(res);
    });

    app.post('/newbook', function (req, res) {
        var id_libro = req.body.id_libro;
        var isbn = req.body.isbn;
        var nombre = req.body.nombre;
        var lugar = req.body.lugar;
        var editorial = req.body.editorial;
        var numero_paginas = req.body.numero_paginas;
        var fk_autor = req.body.fk_autor;
        var fk_estante_categoria = req.body.fk_estante_categoria;

        functions.newBook(id_libro, isbn, nombre, lugar, editorial, numero_paginas, fk_autor, fk_estante_categoria);
    });

    app.get('/newuser', function (req, res) {
        res.render('newuser'); //Show the form for add a new user
    });

    app.get('/institution', function (req, res) {
        functions.cargarBibliotecas(res); //Show the registred institutions
    });

    app.post('/institution', function (req, res) {
        var id_biblioteca = req.body.id_biblioteca;
        functions.accionBiblioteca(res, id_biblioteca);
    })

    app.get('/newinstitution', function (req, res) {
        res.render('newinstitution'); //Lets add a new institution
    });

    app.post('/newinstitution', function (req, res) {
        var id_biblioteca = req.body.id_biblioteca;
        var nombre = req.body.nombre;
        var direccion = req.body.direccion;
        var correo = req.body.correo;
        var telefono = req.body.telefono;

        functions.newInstitution(id_biblioteca, nombre, direccion, correo, telefono);
    })

    app.get('/saloon', function (req, res) {
        functions.cargarSala(res) //show the registred rooms
    });

    app.post('/saloon', function (req, res) {
        var id_sala = req.body.id_sala;

        functions.accionSala(res, id_sala);
    })

    app.get('/newsaloon', function (req, res) {
        functions.cargarAgregarSala(res) //Lets add a new room
        //res.render('newsaloon'); 
    });

    app.post('/newsaloon', function (req, res) {
        var id_sala = req.body.id_sala;
        var nombre = req.body.nombre;
        var fk_biblioteca = req.body.fk_biblioteca;

        console.log(id_sala + ' ' + nombre + ' ' + fk_biblioteca)

        functions.agregarSala(id_sala, nombre, fk_biblioteca, res);
    })

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
        functions.listBooks(res);
    });

    app.get('/loan', function (req, res) {
        functions.chargeLoan(res); //Show all the loans
    });

    app.get('/loanpending', function (req, res) {
        functions.chargeLoanPending(res); //Show all the pending loans
    });

    app.get('/loanreservation', function (req, res) {
        functions.chargeLoanReservation(res); //Show all the reservations
    });

    app.post('/loanreservation', function (req, res) {
        var id_transaccion = req.body.id_transaccion;
        var accion = req.body.accion;
        console.log(id_transaccion)
        functions.accionReservacion(res, id_transaccion, accion); //Show all the reservations
    });

    app.get('/report', function (req, res) {
        res.render('report'); //Show the reports of books
    });

    app.get('/settings', function (req, res) {
        res.render('settings'); //Lets change some options of the system
    });

    app.get('/search', function (req, res) {
        res.render('search');
    });

    app.post('/search', function (req, res) {
        var nombreLibro = req.body.nombreLibro;
        console.log(nombreLibro);
        functions.searchBook(res, nombreLibro);
    });

    app.use(function (req, res, next) {
        res.status(404);
        res.render('notfound'); //Show a default page for 404 error
    });
};