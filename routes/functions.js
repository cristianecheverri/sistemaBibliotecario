const { Biblioteca, Sala, Estante, Categoria, Estante_Categoria, Autor, Libro, Usuario, Transaccion } = require('../connection');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function startHome(res) {
    var cantidadAdministradores = 0;
    var cantidadUsuariosCorrientes = 0;
    var cantidadLibros = 0;
    var cantidadCategorias = 0;
    var cantidadEstantes = 0;
    var cantidadReservaciones = 0;
    var cantidadDevolucionesPendientes = 0;
    var cantidadPrestamos = 0

    Usuario.findAll({ where: { tipo_usuario: 'Administrador' } }).then(function (admin) {
        cantidadAdministradores = admin.length;
        Usuario.findAll({ where: { tipo_usuario: 'Usuario corriente' } }).then(function (user) {
            cantidadUsuariosCorrientes = user.length;
            Libro.findAll().then(function (book) {
                cantidadLibros = book.length;
                Categoria.findAll().then(function (category) {
                    cantidadCategorias = category.length;
                    Estante.findAll().then(function (shelf) {
                        cantidadEstantes = shelf.length;
                        Transaccion.findAll({ where: { tipo_transaccion: 'Reservacion' } }).then(function (reservation) {
                            cantidadReservaciones = reservation.length;
                            Transaccion.findAll({ where: { tipo_transaccion: 'Devolucion pendiente' } }).then(function (loanpending) {
                                cantidadDevolucionesPendientes = loanpending.length;
                                Transaccion.findAll({ where: { tipo_transaccion: 'Prestamo' } }).then(function (loan) {
                                    cantidadPrestamos = loan.length;
                                    res.render('home', {
                                        cantidad_administradores: cantidadAdministradores,
                                        cantidad_usuarios_corrientes: cantidadUsuariosCorrientes,
                                        cantidad_libros: cantidadLibros,
                                        cantidad_categorias: cantidadCategorias,
                                        cantidad_estantes: cantidadEstantes,
                                        cantidad_reservaciones: cantidadReservaciones,
                                        cantidad_devoluciones_pendientes: cantidadDevolucionesPendientes,
                                        cantidad_prestamos: cantidadPrestamos
                                    }); //Show home
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}


function listBooks(res) {
    var html = '';
    var libro;
    var autor;
    var i, j;

    Libro.findAll().then(function (book) {
        libro = book;
        Autor.findAll().then(function (author) {
            autor = author;
            for (i = 0; i < libro.length; i++) {
                for (j = 0; j < autor.length; j++) {
                    if (libro[i].fk_autor == autor[j].id_autor) {
                        html +=
                            `<div class="media media-hover">
                            <div class="media-left media-middle">
                                <a href="#!" class="tooltips-general" data-toggle="tooltip" data-placement="right" title="Más información del libro">
                                    <img class="media-object" src="assets/img/book.png" alt="Libro" width="48" height="48">
                                </a>
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading">${i + 1} - ${libro[i].nombre}</h4>
                                <div class="pull-left">
                                    <strong>${author[j].nombre}</strong><br>
                                </div>
                                <p class="text-center pull-right">
                                    <a href="" id="${libro[i].id_libro}" class="btn btn-info btn-xs" style="margin-right: 10px;"><i class="zmdi zmdi-info-outline"></i> &nbsp;&nbsp; Más información</a>
                                </p>
                            </div>
                        </div>`
                    } else if (libro[i].fk_autor == null) {
                        html +=
                            `<div class="media media-hover">
                            <div class="media-left media-middle">
                                <a href="" class="tooltips-general" data-toggle="tooltip" data-placement="right" title="Más información del libro">
                                    <img class="media-object" src="assets/img/book.png" alt="Libro" width="48" height="48">
                                </a>
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading">${i + 1} - ${libro[i].nombre}</h4>
                                <div class="pull-left">
                                <strong>Anónimo</strong><br>
                                </div>
                                <p class="text-center pull-right">
                                    <a href="" class="btn btn-info btn-xs btn-libro" style="margin-right: 10px;" id="${libro[i].id_libro}"><i class="zmdi zmdi-info-outline"></i> &nbsp;&nbsp; Más información</a>
                                </p>
                            </div>
                        </div>`
                        break;
                    }
                }
            }
            res.render('catalog', { libros: html }); //Show all the added books
        });
    });
}

function searchBook(res, libroABuscar, id) {
    var htmlLibrosBusqueda = '<h3 class="text-center all-tittles">resultados de la búsqueda</h3>';
    var librosEncontrados;
    var autores;
    Libro.findAll({
        where: {
            nombre: {
                [Op.iLike]: `%${libroABuscar}%`
            }
        }
    }).then(function (books) {
        librosEncontrados = books;
        Autor.findAll().then(function (author) {
            autores = author;
            if (librosEncontrados.length > 0) {
                for (let i = 0; i < librosEncontrados.length; i++) {
                    for (let j = 0; j < autores.length; j++) {
                        if (librosEncontrados[i].fk_autor == autores[j].id_autor) {
                            htmlLibrosBusqueda +=
                                `<div class="media media-hover">
                            <div class="media-left media-middle">
                                <a href="" class="tooltips-general" data-toggle="tooltip" data-placement="right" title="Más información del libro">
                                    <img class="media-object" src="assets/img/book.png" alt="Libro" width="48" height="48">
                                </a>
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading">${i + 1} - ${librosEncontrados[i].nombre}</h4>
                                <div class="pull-left">
                                    <strong>${autores[j].nombre}</strong><br>
                                </div>
                                <p class="text-center pull-right">
                                    <a href="" id="${librosEncontrados[i].id_libro}" class="btn btn-info btn-xs button-information" style="margin-right: 10px;"><i class="zmdi zmdi-info-outline"></i> &nbsp;&nbsp; Más información</a>
                                </p>
                            </div>
                        </div>`;
                        }
                    }
                }
            } else {
                htmlLibrosBusqueda += `<h2 class="text-center"><i class="zmdi zmdi-mood-bad zmdi-hc-5x"></i><br><br>Lo sentimos, no hemos encontrado ningún libro con el nombre <strong>ingresado</strong> en el sistema</h2>`
            }

            res.send(htmlLibrosBusqueda);

        });
    });
}


function cargarAgregarLibro(res) {
    var autores;
    var estante_categoria;
    var estantes;
    var categorias;
    var htmlAutor = '';
    var htmlEstanteCategoria = '';

    Autor.findAll({order:['id_autor']}).then(function (author) {
        autores = author;
        Estante_Categoria.findAll().then(function (estantes_categorias) {
            estante_categoria = estantes_categorias;
            Estante.findAll().then(function (shelfs) {
                estantes = shelfs;
                Categoria.findAll().then(function (category) {
                    categorias = category;
                    if (autores.length > 0) {
                        for (let i = 0; i < autores.length; i++) {
                            htmlAutor += `<option value="${autores[i].id_autor}">${autores[i].nombre}</option>`;
                        }
                    }
                    if (estante_categoria) {
                        for (let j = 0; j < estante_categoria.length; j++) {
                            for (let k = 0; k < estantes.length; k++) {
                                for (let l = 0; l < categorias.length; l++) {
                                    if (estante_categoria[j].fk_estante == estantes[k].id_estante && estante_categoria[j].fk_categoria == categorias[l].id_categoria) {
                                        htmlEstanteCategoria += `<option value="${estante_categoria[j].id_estante_categoria}">Estante ${estantes[k].id_estante} - ${categorias[l].nombre}</option>`
                                    }
                                }
                            }
                        }
                    }
                    res.render('newbook', { autor: htmlAutor, estantes: htmlEstanteCategoria });
                });
            });
        });
    });
}


function newBook(id_libro, isbn, nombre, lugar, editorial, numero_paginas, fk_autor, fk_estante_categoria) {
    Libro.create({
        id_libro: parseInt(id_libro),
        isbn: verificarNull(isbn),
        nombre: verificarNull(nombre),
        lugar: verificarNull(lugar),
        editorial: verificarNull(editorial),
        numero_paginas: verificarNull(numero_paginas),
        fk_autor: verificarNull(fk_autor),
        fk_estante_categoria: verificarNull(fk_estante_categoria)
    }).then(function () {
        console.log('Libro creado');
    }).catch(function (err) {
        console.log('Ha ocurrido un error' + err)
    })
}

function verificarNull(variable) {
    return (variable == '') ? null : variable;
}

exports.listBooks = listBooks;
exports.startHome = startHome;
exports.searchBook = searchBook;
exports.newBook = newBook;
exports.cargarAgregarLibro = cargarAgregarLibro;