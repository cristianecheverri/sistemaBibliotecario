const { Biblioteca, Sala, Estante, Categoria, Autor, Libro, Usuario, Transaccion } = require('../connection');
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
    var nombreLibro;
    var nombreAutor;
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
                                    <a href="#!" class="btn btn-info btn-xs" style="margin-right: 10px;"><i class="zmdi zmdi-info-outline"></i> &nbsp;&nbsp; Más información</a>
                                </p>
                            </div>
                        </div>`
                    } else if (libro[i].fk_autor == null) {
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
                                <strong>Anónimo</strong><br>
                                </div>
                                <p class="text-center pull-right">
                                    <a href="#!" class="btn btn-info btn-xs btn-libro" style="margin-right: 10px;" id="${libro[i].id_libro}"><i class="zmdi zmdi-info-outline"></i> &nbsp;&nbsp; Más información</a>
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

function searchBook(res) {
    var htmlLibrosBusqueda = '';
    var librosEncontrados;
    Libro.findAll({
        where: {
            nombre: {
                [Op.iLike]: '%lol%'
            }
        }
    }).then(function (books) {
        librosEncontrados = books;
        if (librosEncontrados.length > 0) {
            for (let i = 0; i < librosEncontrados.length; i++) {
                htmlLibrosBusqueda += `<h2>${librosEncontrados[i].nombre}</h2>`;
            }
            res.render('search', { html: htmlLibrosBusqueda });
        } else {
            htmlLibrosBusqueda = `<h3 class="text-center all-tittles">resultados de la búsqueda</h3>
            <h2 class="text-center"><i class="zmdi zmdi-mood-bad zmdi-hc-5x"></i><br><br>Lo sentimos, no hemos encontrado ningún libro con el nombre <strong>ingresado</strong> en el sistema</h2>`
            res.render('search', { html: htmlLibrosBusqueda });
        }
    });
}

exports.listBooks = listBooks;
exports.startHome = startHome;
exports.searchBook = searchBook