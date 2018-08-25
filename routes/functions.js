const {
    Biblioteca,
    Sala,
    Estante,
    Categoria,
    Estante_Categoria,
    Autor,
    Libro,
    Usuario,
    Transaccion,
    sequelize
} = require('../connection');

let token;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const htmlCode = require('./html')

var jwt = require('jsonwebtoken');

var fechaHoy = new Date().getTime();

exports.documentoLogin = function (documento, contrasena, res) {
    Usuario.findAll({
        where: {
            documento: documento,
            contrasena: contrasena
        }
    }).then((user) => {
        if (user.length == 1) {
            if (user.length > 0) {
                token = jwt.sign({
                    user
                }, 'secret');

                //res.redirect('home')
                res.json({
                    token: token
                });
            }
        } else {
            res.send('No existe ese usuario o la contraseña es incorrecta')
        }
    });
};

exports.verificar = function (req, res, next) {
    var token = req.headers.authorization;
    console.log(req.url);

    if ((req.url !== '/')) {
        if (!token) {
            res.status(401).send({
                error: "Es necesario el token de autenticación"
            })
            return;
        }

        jwt.verify(token, 'secret', function (err, user) {
            if (err) {
                res.status(401).send({
                    error: 'Token inválido'
                })
            } else {
                console.log("token valido");
                next();
                /*
                res.send({
                    message: 'Awwwww yeah!!!!'
                })*/
            }
        })
    } else {
        next();
    }
}

function startHome(res) {
    var cantidadAdministradores = 0;
    var cantidadUsuariosCorrientes = 0;
    var cantidadLibros = 0;
    var cantidadCategorias = 0;
    var cantidadEstantes = 0;
    var cantidadReservaciones = 0;
    var cantidadDevolucionesPendientes = 0;
    var cantidadPrestamos = 0;
    //var fechaHoy = new Date().getTime();

    Usuario.findAll({
        where: {
            tipo_usuario: 'Administrador'
        }
    }).then(function (admin) {
        cantidadAdministradores = admin.length;
        Usuario.findAll({
            where: {
                tipo_usuario: 'Usuario corriente'
            }
        }).then(function (user) {
            cantidadUsuariosCorrientes = user.length;
            Libro.findAll().then(function (book) {
                cantidadLibros = book.length;
                Categoria.findAll().then(function (category) {
                    cantidadCategorias = category.length;
                    Estante.findAll().then(function (shelf) {
                        cantidadEstantes = shelf.length;
                        Transaccion.findAll({
                            where: {
                                tipo_transaccion: 'Reservacion',
                                esprestado: false
                            }
                        }).then(function (reservation) {
                            cantidadReservaciones = reservation.length;
                            Transaccion.findAll({
                                where: {
                                    tipo_transaccion: 'Prestamo',
                                    esprestado: true
                                }
                            }).then(function (loanpending) {
                                cantidadDevolucionesPendientes = loanpending.length;
                                Transaccion.findAll({
                                    where: {
                                        tipo_transaccion: 'Prestamo',
                                        esprestado: false
                                    }
                                }).then(function (loan) {
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

    Libro.findAll({
        order: ['id_libro']
    }).then(function (book) {
        libro = book;
        Autor.findAll().then(function (author) {
            autor = author;
            for (i = 0; i < libro.length; i++) {
                for (j = 0; j < autor.length; j++) {
                    if (libro[i].fk_autor == autor[j].id_autor) {
                        html += htmlCode.mostrarLibros(libro[i], autor[j].nombre);
                    } else if (libro[i].fk_autor == null) {
                        html += htmlCode.mostrarLibros(libro[i], 'Anónimo');
                        break;
                    }
                }
            }
            res.render('catalog', {
                libros: html,
                libro: ''
            }); //Show all the added books
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

    Autor.findAll({
        order: ['id_autor']
    }).then(function (author) {
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
                    res.render('newbook', {
                        autor: htmlAutor,
                        estantes: htmlEstanteCategoria
                    });
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

function newInstitution(id_biblioteca, nombre, direccion, correo, telefono) {
    Biblioteca.create({
        id_biblioteca: parseInt(id_biblioteca),
        nombre: verificarNull(nombre),
        direccion: verificarNull(direccion),
        correo: verificarNull(correo),
        telefono: verificarNull(telefono)
    }).then(function () {

    }).catch(function (err) {
        console.log('Ha ocurrido un error ' + err)
    })
}

function verificarNull(variable) {
    return (variable == '') ? null : variable;
}

function chargeLoan(res) {
    htmlLoan =
        `<div class="table-responsive">
        <table class="table table-hover text-center">
            <thead>
                <tr class="success">
                    <th class="text-center">#</th>
                    <th class="text-center">Nombre del libro</th>
                    <th class="text-center">Nombre de usuario</th>
                    <th class="text-center">Tipo</th>
                    <th class="text-center">F. Solicitud</th>
                    <th class="text-center">F. Entrega</th>
                    <th class="text-center">Eliminar</th>
                </tr>
            </thead>
            <tbody>`
    var libro;
    var usuario;
    Transaccion.findAll({
        where: {
            tipo_transaccion: 'Prestamo',
            esprestado: false
        }
    }).then(function (loan) {
        Libro.findAll().then(function (books) {
            libro = books;
            Usuario.findAll().then(function (users) {
                usuario = users;
                if (loan.length > 0) {
                    for (let i = 0; i < loan.length; i++) {
                        for (let j = 0; j < libro.length; j++) {
                            for (let k = 0; k < usuario.length; k++) {
                                if ((loan[i].fk_libro == libro[j].id_libro) && (loan[i].fk_usuario == usuario[k].documento)) {
                                    htmlLoan +=
                                        `<tr>
                                        <td>${loan[i].id_transaccion}</td>
                                        <td>${libro[j].nombre}</td>
                                        <td>${usuario[k].nombres} ${usuario[k].apellidos}</td>
                                        <td>${loan[i].tipo_transaccion}</td>
                                        <td>${loan[i].fecha_solicitud}</td>
                                        <td>${loan[i].fecha_devolucion}</td>
                                        <td><button class="btn btn-danger btn-eliminar-transaccion" onclick="pasarId(${loan[i].id_transaccion})"><i class="zmdi zmdi-delete"></i></button></td>
                                    </tr>`
                                }
                            }
                        }
                    }
                    htmlLoan +=
                        `</tbody>
                        </table>
                        </div>`
                } else {
                    htmlLoan = '<h1 class="text-center">No hay registro de prestamos en este momento</h1>'
                }
                res.render('loan', {
                    loans: htmlLoan
                });
            })
        })
    })
}

function chargeLoanPending(res) {
    var htmlLoan =
        `<div class="table-responsive">
        <table class="table table-hover text-center">
            <thead>
                <tr class="success">
                    <th class="text-center">#</th>
                    <th class="text-center">Nombre del libro</th>
                    <th class="text-center">Nombre de usuario</th>
                    <th class="text-center">Tipo</th>
                    <th class="text-center">F. Solicitud</th>
                    <th class="text-center">F. Entrega</th>
                    <th class="text-center">Recibir</th>
                    <th class="text-center">Eliminar</th>
                </tr>
            </thead>
            <tbody>`;
    var libro;
    var usuario;
    var color;
    Transaccion.findAll({
        where: {
            tipo_transaccion: 'Prestamo',
            esprestado: true
        }
    }).then(function (loan) {
        Libro.findAll().then(function (books) {
            libro = books;
            Usuario.findAll().then(function (users) {
                usuario = users;
                if (loan.length > 0) {
                    for (let i = 0; i < loan.length; i++) {
                        for (let j = 0; j < libro.length; j++) {
                            for (let k = 0; k < usuario.length; k++) {
                                if ((loan[i].fk_libro == libro[j].id_libro) && (loan[i].fk_usuario == usuario[k].documento)) {
                                    color = (Date.parse(loan[i].fecha_devolucion) < new Date().getTime()) ? 'danger' : '';
                                    htmlLoan +=
                                        `<tr class=${color}>
                                        <td>${loan[i].id_transaccion}</td>
                                        <td>${libro[j].nombre}</td>
                                        <td>${usuario[k].nombres} ${usuario[k].apellidos}</td>
                                        <td>${loan[i].tipo_transaccion}</td>
                                        <td>${loan[i].fecha_solicitud}</td>
                                        <td>${loan[i].fecha_devolucion}</td>
                                        <td><button class="btn btn-success btn-recibir-prestamo" onclick="pasarId(${loan[i].id_transaccion})"><i class="zmdi zmdi-timer"></i></button></td>
                                        <td><button class="btn btn-danger btn-eliminar-transaccion" onclick="pasarId(${loan[i].id_transaccion})"><i class="zmdi zmdi-delete"></i></button></td>
                                    </tr>`
                                }
                            }
                        }
                    }
                    htmlLoan += `</tbody></table></div>`
                } else {
                    htmlLoan = '<h1 class="text-center">No hay registro de prestamos sin devolver en este momento</h1>'
                }
                res.render('loanpending', {
                    loans: htmlLoan
                });
            })
        })
    })
}

function chargeLoanReservation(res) {
    var htmlLoan =
        `<div class="table-responsive">
        <table class="table table-hover text-center">
            <thead>
                <tr class="success">
                    <th class="text-center">#</th>
                    <th class="text-center">Nombre del libro</th>
                    <th class="text-center">Nombre de usuario</th>
                    <th class="text-center">Tipo</th>
                    <th class="text-center">F. Solicitud</th>
                    <th class="text-center">F. Entrega</th>
                    <th class="text-center">Aprobar</th>
                    <th class="text-center">Eliminar</th>
                </tr>
            </thead>
            <tbody>`;
    var libro;
    var usuario;
    Transaccion.findAll({
        where: {
            tipo_transaccion: 'Reservacion'
        }
    }).then(function (loan) {
        Libro.findAll().then(function (books) {
            libro = books;
            Usuario.findAll().then(function (users) {
                usuario = users;
                if (loan.length > 0) {
                    for (let i = 0; i < loan.length; i++) {
                        for (let j = 0; j < libro.length; j++) {
                            for (let k = 0; k < usuario.length; k++) {
                                if ((loan[i].fk_libro == libro[j].id_libro) && (loan[i].fk_usuario == usuario[k].documento) && (loan[i].esprestado == false)) {
                                    htmlLoan +=
                                        `<tr>
                                        <td>${loan[i].id_transaccion}</td>
                                        <td>${libro[j].nombre}</td>
                                        <td>${usuario[k].nombres} ${usuario[k].apellidos}</td>
                                        <td>${loan[i].tipo_transaccion}</td>
                                        <td>${loan[i].fecha_solicitud}</td>
                                        <td>${loan[i].fecha_devolucion}</td>
                                        <td><button class="btn btn-success btn-aprobar-prestamo" onclick="pasarId(${loan[i].id_transaccion})"><i class="zmdi zmdi-timer"></i></button></td>
                                        <td><button class="btn btn-danger btn-eliminar-transaccion" onclick="pasarId(${loan[i].id_transaccion})"><i class="zmdi zmdi-delete"></i></button></td>
                                    </tr>`
                                }
                            }
                        }
                    }
                    htmlLoan += `</tbody>
                    </table>
                    </div>`

                } else {
                    htmlLoan = '<h1 class="text-center">No hay registro de reservaciones en este momento</h1>'
                }
                res.redirect('loanreservation');
            })
        })
    })
}

function accionReservacion(res, id_transaccion, accion) {
    if (accion == 'eliminar') {
        Transaccion.destroy({
            where: {
                id_transaccion: id_transaccion
            }
        }).then(() => {
            res.send();
        }).catch((err) => {

        });
    } else if (accion == 'aprobar') {
        Transaccion.update({
            tipo_transaccion: 'Prestamo',
            esprestado: true
        }, {
            where: {
                id_transaccion: {
                    [Op.eq]: id_transaccion
                }
            }
        }).then(() => {
            res.send();
        }).catch((err) => {

        });
    } else {
        console.log('Algo pasa')
    }
}

function accionPrestamosPendientes(res, id_transaccion, accion) {
    if (accion == 'eliminar') {
        Transaccion.destroy({
            where: {
                id_transaccion: id_transaccion
            }
        }).then(() => {
            res.send();
        }).catch((err) => {

        });
    } else if (accion == 'recibir') {
        Transaccion.update({
            tipo_transaccion: 'Prestamo',
            esprestado: false,
            fecha_devolucion: new Date().getTime()
        }, {
            where: {
                id_transaccion: {
                    [Op.eq]: id_transaccion
                }
            }
        }).then(() => {
            res.send();
        }).catch((err) => {

        });
    } else {
        console.log('Algo pasa')
    }
}

let cargarBibliotecas = (res) => {
    var htmlLibrary = htmlCode.tablaBiblioteca();
    Biblioteca.findAll().then((library) => {
        if (library.length > 0) {
            library.forEach(element => {
                htmlLibrary +=
                    `<tr>
                        <td>${verificarNullInformacion(element.id_biblioteca)}</td>
                        <td>${verificarNullInformacion(element.nombre)}</td>
                        <td>${verificarNullInformacion(element.direccion)}</td>
                        <td>${verificarNullInformacion(element.correo)}</td>
                        <td>${verificarNullInformacion(element.telefono)}</td>
                        <td><button class="btn btn-danger btn-eliminar-biblioteca" onclick="pasarId(${element.id_biblioteca})"><i class="zmdi zmdi-delete"></i></button></td>
                    </tr>`
            });
            htmlLibrary +=
                `</tbody>
                </table>
                </div>`
        }
        res.render('institution', {
            libraries: htmlLibrary
        });
    })
}

function verificarNullInformacion(variable) {
    return (variable == null) ? '--' : variable;
}

function accionBiblioteca(res, id_biblioteca) {
    Biblioteca.destroy({
        where: {
            id_biblioteca: id_biblioteca
        }
    }).then(() => {
        res.send();
    }).catch((err) => {
        console.log('ha ocurrido algo')
    });

}

function accionSala(res, id_sala) {
    Sala.destroy({
        where: {
            id_sala: id_sala
        }
    }).then(() => {
        res.send();
    }).catch((err) => {
        console.log('ha ocurrido algo')
    });

}

let cargarSala = (res) => {
    var htmlRoom = htmlCode.tablaSala();
    Sala.findAll().then((room) => {
        Biblioteca.findAll().then((library) => {
            if (room.length > 0) {
                for (let i = 0; i < room.length; i++) {
                    for (let j = 0; j < library.length; j++) {
                        if (room[i].fk_biblioteca == library[j].id_biblioteca) {
                            htmlRoom +=
                                `<tr>
                                    <td>${verificarNullInformacion(room[i].id_sala)}</td>
                                    <td>${verificarNullInformacion(room[i].nombre)}</td>
                                    <td>${verificarNullInformacion(library[j].nombre)}</td>
                                    <td><button class="btn btn-danger btn-eliminar-sala" onclick="pasarId(${room[i].id_sala})"><i class="zmdi zmdi-delete"></i></button></td>
                                </tr>`
                        }
                    }
                }
                htmlRoom += `</tbody></table></div>`
            }
            res.render('saloon', {
                salas: htmlRoom
            });
        })
    })
}

let cargarAgregarSala = (res) => {
    let htmlBilioteca = '';
    Biblioteca.findAll().then((biblioteca) => {
        if (biblioteca.length > 0) {
            biblioteca.forEach(element => {
                htmlBilioteca += `<option value="${element.id_biblioteca}">${element.nombre}</option>`;
            });
        }
        res.render('newsaloon', {
            bibliotecas: htmlBilioteca
        });
    });
}

let agregarSala = (id_sala, nombre, fk_biblioteca) => {
    Sala.create({
        id_sala: id_sala,
        nombre: nombre,
        fk_biblioteca: fk_biblioteca
    }).then(function () {

    }).catch(function (err) {
        console.log('EERRROOORR ' + err)
    })
}

let cargarCategorias = (res) => {
    var htmlTablaCategorias = htmlCode.tablaCategoria();
    Categoria.findAll().then((categorias) => {
        if (categorias.length > 0) {
            categorias.forEach(categoria => {
                htmlTablaCategorias +=
                    `<tr>
                    <td>${categoria.id_categoria}</td>
                    <td>${categoria.nombre}</td>
                    <td><button class="btn btn-danger btn-eliminar-categoria" onclick="pasarId(${categoria.id_categoria})"><i class="zmdi zmdi-delete"></i></button></td>
                </tr>`
            });
            htmlTablaCategorias += `</tbody></table></div>`
        }
        res.render('category', {
            categorias: htmlTablaCategorias
        })
    })
}

let eliminarCategoria = (res, id_categoria) => {
    Categoria.destroy({
        where: {
            id_categoria: id_categoria
        }
    }).then(() => {
        res.send();
    }).catch((err) => {
        console.log('Error ' + err)
    })
}

let agregarCategoria = (id_categoria, nombre, res) => {
    Categoria.create({
        id_categoria: id_categoria,
        nombre: nombre
    }).then(() => {

    }).catch((err) => {
        console.log('Ha ocurrido un error ' + err)
    })
}

let cargarEstantes = (res) => {
    var tablaEstante = htmlCode.tablaEstante();
    Estante.findAll().then((shelf) => {
        Sala.findAll().then((room) => {
            if (shelf.length > 0) {
                for (let i = 0; i < shelf.length; i++) {
                    for (let j = 0; j < room.length; j++) {
                        if (shelf[i].fk_sala == room[j].id_sala) {
                            tablaEstante +=
                                `<tr>
                                    <td>${verificarNullInformacion(shelf[i].id_estante)}</td>
                                    <td>${verificarNullInformacion(room[j].nombre)}</td>
                                    <td><button class="btn btn-danger btn-eliminar-estante" onclick="pasarId(${shelf[i].id_estante})"><i class="zmdi zmdi-delete"></i></button></td>
                                </tr>`
                        }
                    }
                }
                tablaEstante += `</tbody></table></div>`
            }
            res.render('shelf', {
                estantes: tablaEstante
            })
        })
    })
}

let eliminarEstantes = (res, id_estante) => {
    Estante.destroy({
        where: {
            id_estante: id_estante
        }
    }).then(() => {
        res.send()
    }).catch((err) => {
        console.log('Error ' + err);
    })
}

let cargarAgregarEstante = (res) => {
    var htmlSala = '';
    Sala.findAll().then((room) => {
        if (room.length > 0) {
            for (let i = 0; i < room.length; i++) {
                htmlSala += `<option value="${room[i].id_sala}">${room[i].nombre}</option>`;
            }
        }
        res.render('newshelf', {
            sala: htmlSala
        })
    })
}

let agregarEstante = (res, id_estante, fk_sala) => {
    Estante.create({
        id_estante: id_estante,
        fk_sala: fk_sala
    }).then(() => {

    }).catch((err) => {
        console.log('Ha ocurrido un error ' + err)
    })
}

let cargarEstanteCategoria = (res) => {
    var tablaEstanteCategoria = htmlCode.tablaEstanteCategoria();
    Estante_Categoria.findAll().then((shelf_cat) => {
        Estante.findAll().then((shelf) => {
            Categoria.findAll().then((category) => {
                if (shelf_cat.length > 0) {
                    for (let i = 0; i < shelf_cat.length; i++) {
                        for (let j = 0; j < shelf.length; j++) {
                            for (let k = 0; k < category.length; k++) {
                                if (shelf_cat[i].fk_estante == shelf[j].id_estante && shelf_cat[i].fk_categoria == category[k].id_categoria) {
                                    tablaEstanteCategoria +=
                                        `<tr>
                                        <td>${verificarNullInformacion(shelf_cat[i].id_estante_categoria)}</td>
                                        <td>Estante ${verificarNullInformacion(shelf[j].id_estante)}</td>
                                        <td>${verificarNullInformacion(category[k].nombre)}</td>
                                        <td><button class="btn btn-danger btn-eliminar-estante-categoria" onclick="pasarId(${shelf_cat[i].id_estante_categoria})"><i class="zmdi zmdi-delete"></i></button></td>
                                    </tr>`
                                }
                            }
                        }
                    }
                    tablaEstanteCategoria += `</tbody></table></div>`
                }
                res.render('shelf-category', {
                    estantescategoria: tablaEstanteCategoria
                })
            })
        })
    })
}

let eliminarEstanteCategoria = (res, id_estante_categoria) => {
    Estante_Categoria.destroy({
        where: {
            id_estante_categoria: id_estante_categoria
        }
    }).then(() => {
        res.send()
    }).catch((err) => {
        console.log('Error ' + err)
    })
}

let cargarAgregarEstanteCategoria = (res) => {
    var optionestante = '';
    var optioncategoria = '';
    Estante.findAll().then((shelf) => {
        Categoria.findAll().then((category) => {
            if (shelf.length > 0) {
                for (let i = 0; i < shelf.length; i++) {
                    optionestante += `<option value="${shelf[i].id_estante}">Estante ${shelf[i].id_estante}</option>`;
                }
            }
            if (category.length > 0) {
                for (let j = 0; j < category.length; j++) {
                    optioncategoria += `<option value="${category[j].id_categoria}">${category[j].nombre}</option>`;
                }
            }
            res.render('newshelf-category', {
                estante: optionestante,
                categoria: optioncategoria
            })
        })
    })
}

let agregarEstanteCategoria = (res, id_estante_categoria, fk_estante, fk_categoria) => {
    Estante_Categoria.create({
        id_estante_categoria: id_estante_categoria,
        fk_estante: fk_estante,
        fk_categoria: fk_categoria
    }).then(() => {
        res.send();
    }).catch((err) => {
        console.log('Erorr ' + err)
    })
}

let agregarAutor = (res, id_autor, nombre) => {
    Autor.create({
        id_autor: id_autor,
        nombre: nombre
    }).then(() => {

    }).catch((err) => {
        console.log('Err ' + err)
    })
}

let cargarUsuarios = (res) => {
    let tablaUsuario = htmlCode.tablaUsuario();
    Usuario.findAll().then((users) => {
        if (users.length > 0) {
            users.forEach(user => {
                tablaUsuario +=
                    `<tr>
                    <td>${verificarNullInformacion(user.documento)}</td>
                    <td>${verificarNullInformacion(user.nombres)}</td>
                    <td>${verificarNullInformacion(user.apellidos)}</td>
                    <td>${verificarNullInformacion(user.telefono)}</td>
                    <td>${verificarNullInformacion(user.correo)}</td>
                    <td>${verificarNullInformacion(user.tipo_usuario)}</td>
                    <td><button class="btn btn-success"><i class="zmdi zmdi-refresh"></i></button></td>
                    <td><button class="btn btn-danger btn-eliminar-estante-categoria" onclick="pasarId(${user.documento})"><i class="zmdi zmdi-delete"></i></button></td>
                </tr>`
            });
            tablaUsuario += `</tbody></table></div>`
        }
        res.render('users', {
            usuarios: tablaUsuario
        })
    })
}
let eliminarPrestamos = (res) => {
    Transaccion.destroy({
        where: {
            [Op.or]: [{
                esprestado: true
            }, {
                esprestado: false
            }]
        }
    }).then(() => {
        res.send()
    }).catch((err) => {
        console.log('Error ' + err)
    })
}

let cargarEstadisticas = (res) => {
    htmlUsuario = ''
    var htmlLibro = ''
    var usuario;
    var cantidadPrestamos;
    sequelize.query("SELECT COUNT(fk_usuario), fk_usuario from transaccion group by (fk_usuario) order by count desc", {
            type: sequelize.QueryTypes.SELECT
        })
        .then(transaccion => {
            sequelize.query("SELECT COUNT(fk_libro), fk_libro from transaccion group by (fk_libro) order by count desc", {
                    type: sequelize.QueryTypes.SELECT
                })
                .then(tranbook => {
                    sequelize.query("SELECT COUNT(id_transaccion) from transaccion", {
                            type: sequelize.QueryTypes.SELECT
                        })
                        .then(cantidad => {
                            Usuario.findAll({
                                attributes: ['documento', 'nombres', 'apellidos']
                            }).then((users) => {
                                usuario = users
                                Libro.findAll().then((book) => {
                                    Autor.findAll().then((author) => {
                                        cantidadPrestamos = cantidad[0].count
                                        console.log(usuario)
                                        console.log(transaccion)
                                        console.log(cantidad[0].count)
                                        if (transaccion.length > 0) {
                                            for (let i = 0; i < transaccion.length; i++) {
                                                for (let j = 0; j < usuario.length; j++) {
                                                    if (transaccion[i].fk_usuario == usuario[j].documento) {
                                                        htmlUsuario += `
                                                        <tr>
                                                            <td>${usuario[j].nombres} ${usuario[j].apellidos}</td>
                                                            <td>${transaccion[i].count}</td>
                                                            <td>${Math.round((parseInt(transaccion[i].count) / parseInt(cantidad[0].count)) * 100)}%</td>
                                                        </tr>`
                                                    }
                                                }
                                            }

                                            for (let i = 0; i < tranbook.length; i++) {
                                                for (let j = 0; j < book.length; j++) {
                                                    for (let k = 0; k < author.length; k++) {
                                                        if (tranbook[i].fk_libro == book[j].id_libro && book[j].fk_autor == author[k].id_autor) {
                                                            htmlLibro +=
                                                                `<tr>
                                                                <td>${book[j].nombre}</td>
                                                                <td>${author[k].nombre}</td>
                                                                <td>${tranbook[i].count}</td>
                                                                <td>${Math.round((parseInt(tranbook[i].count) / parseInt(cantidad[0].count)) * 100)}%</td>
                                                            </tr>`
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        res.render('report', {
                                            usuarios: htmlUsuario,
                                            libros: htmlLibro,
                                            numeroPrestamos: cantidadPrestamos
                                        })
                                        // We don't need spread here, since only the results will be returned for select queries
                                    })
                                })
                            })
                        })
                })
        })
}

let infoBook = (res, id_libro) => {
    var libro;
    Libro.findAll({
        where: {
            id_libro: id_libro
        }
    }).then((book) => {
        libro = book
        console.log(libro.length)
        if (libro.length > 0) {
            
        }
        htmlBook = `<h1>${libro.nombre}</h1>`

        console.log(libro.length)
        res.render('infobook', {
            libr: htmlBook
        })

        /*
        Autor.findOne({
            where: {
                id_autor: libro.fk_autor
            }
        }).then((author) => {
            
            

        })
        */
    })
}

exports.infoBook = infoBook;
exports.cargarEstadisticas = cargarEstadisticas;
exports.eliminarPrestamos = eliminarPrestamos;
exports.cargarUsuarios = cargarUsuarios;
exports.agregarAutor = agregarAutor;
exports.agregarEstanteCategoria = agregarEstanteCategoria;
exports.cargarAgregarEstanteCategoria = cargarAgregarEstanteCategoria;
exports.eliminarEstanteCategoria = eliminarEstanteCategoria;
exports.cargarEstanteCategoria = cargarEstanteCategoria;
exports.agregarEstante = agregarEstante;
exports.cargarAgregarEstante = cargarAgregarEstante;
exports.eliminarEstantes = eliminarEstantes;
exports.cargarEstantes = cargarEstantes;
exports.agregarCategoria = agregarCategoria;
exports.eliminarCategoria = eliminarCategoria;
exports.cargarCategorias = cargarCategorias;
exports.agregarSala = agregarSala;
exports.accionBiblioteca = accionBiblioteca;
exports.cargarBibliotecas = cargarBibliotecas;
exports.accionReservacion = accionReservacion;
exports.chargeLoanReservation = chargeLoanReservation;
exports.chargeLoanPending = chargeLoanPending;
exports.chargeLoan = chargeLoan;
exports.listBooks = listBooks;
exports.startHome = startHome;
exports.searchBook = searchBook;
exports.newBook = newBook;
exports.cargarAgregarLibro = cargarAgregarLibro;
exports.newInstitution = newInstitution;
exports.cargarSala = cargarSala;
exports.accionSala = accionSala;
exports.cargarAgregarSala = cargarAgregarSala;
exports.accionPrestamosPendientes = accionPrestamosPendientes;