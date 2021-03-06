let id;
let id_libro, isbn, nombre, lugar, editorial, numero_paginas, autor;

$(document).ready(function () {

    $(window).load(function () {
        $(".custom-scroll-containers").mCustomScrollbar({
            theme: "dark-thin",
            scrollbarPosition: "inside",
            autoHideScrollbar: true,
            scrollButtons: {
                enable: true
            }
        });
    });

    $('.pruebas').click(function () {

        $.ajax({
            type: 'GET',
            data: JSON.stringify(),
            contentType: 'application/json',
            url: 'http://localhost:4001/loanreservation',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
            },
            success: function (data) {
                window.location;
            },

        });

    });


    $('.tooltips-general').tooltip('hide');

    $('.mobile-menu-button').on('click', function () {
        var mobileMenu = $('.navbar-lateral');
        if (mobileMenu.css('display') == 'none') {
            mobileMenu.fadeIn(300);
        } else {
            mobileMenu.fadeOut(300);
        }
    });

    $('.dropdown-menu-button').on('click', function () {
        var dropMenu = $(this).next('ul');
        dropMenu.slideToggle('slow');
    });

    $('.exit-system-button').on('click', function (e) {
        e.preventDefault();
        var LinkExitSystem = $(this).attr("data-href");
        swal({
            title: "¿Estás seguro?",
            text: "Quieres salir del sistema y cerrar la sesión actual",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Si, salir",
            cancelButtonText: "No, cancelar",
            animation: "slide-from-top",
            closeOnConfirm: false
        }, function () {
            window.location = LinkExitSystem;
        });
    });

    $('.search-book-button').click(function (e) {
        e.preventDefault();
        var LinkSearchBook = $(this).attr("data-href");
        window.location = LinkSearchBook;
    });

    $('.btn-buscar-libro').click(function (e) {
        e.preventDefault();

        var dataLibro = {};
        dataLibro.nombreLibro = $('#input-buscar-libro').val();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(dataLibro),
            contentType: 'application/json',
            url: 'http://localhost:4001/search',
            success: function (data) {
                $("#search").html(data);
            },

        });
    });

    $('#btn-login').click(function (e) {
        e.preventDefault();
        alert("entro");
        var usuario = {};
        usuario.documento = $('#input-documento').val();
        usuario.contrasena = $('#input-contrasena').val();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(usuario),
            contentType: 'application/json',
            url: 'http://localhost:4001/',
            success: function (data) {
                localStorage.setItem('token', data.token);
                //alert(data.token);
            },
        });
    });

    $('.btn-agregar-libro').click(function (e) {
        e.preventDefault();

        var agregarLibro = {};
        agregarLibro.id_libro = $('#input-agregar-libro-id').val();
        agregarLibro.isbn = $('#input-agregar-libro-isbn').val();
        agregarLibro.nombre = $('#input-agregar-libro-nombre').val();
        agregarLibro.lugar = $('#input-agregar-libro-lugar').val();
        agregarLibro.editorial = $('#input-agregar-libro-editorial').val();
        agregarLibro.numero_paginas = $('#input-agregar-libro-numero-paginas').val();
        agregarLibro.fk_autor = $('#input-agregar-libro-autor').val();
        agregarLibro.fk_estante_categoria = $('#input-agregar-libro-estante-categoria').val();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(agregarLibro),
            contentType: 'application/json',
            url: 'http://localhost:4001/newbook',
            success: swal({
                icon: "success",
                type: "success",
                title: 'Libro agregado correctamente'
            }, function () {
                window.location.reload(true);
            })
        });
    });

    $('.btn-agregar-biblioteca').click(function (e) {
        e.preventDefault();

        var agregarBiblioteca = {};
        agregarBiblioteca.id_biblioteca = $('#input-agregar-biblioteca-id').val();
        agregarBiblioteca.nombre = $('#input-agregar-biblioteca-nombre').val();
        agregarBiblioteca.direccion = $('#input-agregar-biblioteca-direccion').val();
        agregarBiblioteca.correo = $('#input-agregar-biblioteca-correo').val();
        agregarBiblioteca.telefono = $('#input-agregar-biblioteca-telefono').val();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(agregarBiblioteca),
            contentType: 'application/json',
            url: 'http://localhost:4001/newinstitution',
            success: swal({
                icon: "success",
                type: "success",
                title: 'Biblioteca agregada correctamente'
            }, function () {
                window.location.reload(true);
            })
        });
    });

    $('.btn-agregar-autor').click(function (e) {
        e.preventDefault();

        var autor = {};
        autor.id_autor = $('#input-agregar-autor-id').val();
        autor.nombre = $('#input-agregar-autor-nombre').val();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(autor),
            contentType: 'application/json',
            url: 'http://localhost:4001/newauthor',
            success: swal({
                icon: "success",
                type: "success",
                title: 'Autor agregado correctamente'
            }, function () {
                window.location.reload(true);
            })
        });
    });

    $('.btn-agregar-categoria').click(function (e) {
        e.preventDefault();

        var agregarCategoria = {};
        agregarCategoria.id_categoria = $('#input-agregar-categoria-id').val();
        agregarCategoria.nombre = $('#input-agregar-categoria-nombre').val();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(agregarCategoria),
            contentType: 'application/json',
            url: 'http://localhost:4001/newcategory',
            success: swal({
                icon: "success",
                type: "success",
                title: 'Categoria agregada correctamente'
            }, function () {
                window.location.reload(true);
            })
        });
    });

    $('.btn-agregar-estante').click(function (e) {
        e.preventDefault();

        var agregarEstante = {};
        agregarEstante.id_estante = $('#input-agregar-estante-id').val();
        agregarEstante.fk_sala = $('#input-agregar-estante-sala').val();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(agregarEstante),
            contentType: 'application/json',
            url: 'http://localhost:4001/newshelf',
            success: swal({
                icon: "success",
                type: "success",
                title: 'Estante agregada correctamente'
            }, function () {
                window.location.reload(true);
            })
        });
    });

    $('.btn-agregar-sala').click(function (e) {
        e.preventDefault();

        var agregarSala = {};
        agregarSala.id_sala = $('#input-agregar-sala-id').val();
        agregarSala.nombre = $('#input-agregar-sala-nombre').val();
        agregarSala.fk_biblioteca = $('#input-agregar-sala-biblioteca').val();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(agregarSala),
            contentType: 'application/json',
            url: 'http://localhost:4001/newsaloon',
            success: swal({
                icon: "success",
                type: "success",
                title: 'Sala agregada correctamente'
            }, function () {
                window.location.reload(true);
            })
        });
    });

    $('.btn-agregar-estante-categoria').click(function (e) {
        e.preventDefault();

        var agregarEstanteCategoria = {};
        agregarEstanteCategoria.id_estante_categoria = $('#input-agregar-estante-categoria-id').val();
        agregarEstanteCategoria.fk_estante = $('#input-agregar-estante-categoria-estante').val();
        agregarEstanteCategoria.fk_categoria = $('#input-agregar-estante-categoria-categoria').val();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(agregarEstanteCategoria),
            contentType: 'application/json',
            url: 'http://localhost:4001/newshelf-category',
            success: swal({
                icon: "success",
                type: "success",
                title: 'Estante - Categoria agregada correctamente'
            }, function () {
                window.location.reload(true);
            })
        });
    });

    $('.btn-eliminar-transaccion').click(function () {
        swal({
            title: "¿Seguro que quieres eliminar esta transacción?",
            text: "Esta acción ya no se podrá deshacer, Así que piénsalo bien.",
            type: "error",
            showCancelButton: true,
            confirmButtonColor: '#FF2301',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro',
            cancelButtonText: "Cancelar"
        }, function () {

            var transaccion = {};
            transaccion.id_transaccion = id;
            transaccion.accion = 'eliminar'

            $.ajax({
                type: 'POST',
                data: JSON.stringify(transaccion),
                contentType: 'application/json',
                url: 'http://localhost:4001/loanreservation',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'))
                },
                success: function (data) {
                    window.location.reload(true);
                },

            });
        });
    });

    $('.btn-eliminar-prestamos').click(function () {
        swal({
            title: "¿Seguro que quieres eliminar todos los prestamos?",
            text: "Esta acción ya no se podrá deshacer, Así que piénsalo bien.",
            type: "error",
            showCancelButton: true,
            confirmButtonColor: '#FF2301',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro',
            cancelButtonText: "Cancelar"
        }, function () {

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: 'http://localhost:4001/settings',
                success: swal({
                    icon: "success",
                    type: "success",
                    title: 'Todos los prestamos y reservaciones eliminados de manera correcta'
                }, function () {
                    window.location.reload(true)
                })

            });
        });
    });

    $('.btn-eliminar-estante-categoria').click(function () {
        swal({
            title: "¿Seguro que quieres eliminar este estante - categoria?",
            text: "Esta acción ya no se podrá deshacer, Así que piénsalo bien.",
            type: "error",
            showCancelButton: true,
            confirmButtonColor: '#FF2301',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro',
            cancelButtonText: "Cancelar"
        }, function () {

            var estantecategoria = {};
            estantecategoria.id_estante_categoria = id;

            $.ajax({
                type: 'POST',
                data: JSON.stringify(estantecategoria),
                contentType: 'application/json',
                url: 'http://localhost:4001/shelf-category',
                success: function (data) {
                    window.location.reload(true);
                },

            });
        });
    });

    $('.btn-eliminar-biblioteca').click(function () {
        swal({
            title: "¿Seguro que quieres eliminar esta biblioteca?",
            text: "Esta acción ya no se podrá deshacer, Así que piénsalo bien.",
            type: "error",
            showCancelButton: true,
            confirmButtonColor: '#FF2301',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro',
            cancelButtonText: "Cancelar"
        }, function () {

            var biblioteca = {};
            biblioteca.id_biblioteca = id;

            $.ajax({
                type: 'POST',
                data: JSON.stringify(biblioteca),
                contentType: 'application/json',
                url: 'http://localhost:4001/institution',
                success: function (data) {
                    window.location.reload(true);
                },
                error: function () {
                    console.log('error')
                }

            });
        });
    });

    $('.btn-eliminar-sala').click(function () {
        swal({
            title: "¿Seguro que quieres eliminar esta sala?",
            text: "Esta acción ya no se podrá deshacer, Así que piénsalo bien.",
            type: "error",
            showCancelButton: true,
            confirmButtonColor: '#FF2301',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro',
            cancelButtonText: "Cancelar"
        }, function () {

            var sala = {};
            sala.id_sala = id;

            $.ajax({
                type: 'POST',
                data: JSON.stringify(sala),
                contentType: 'application/json',
                url: 'http://localhost:4001/saloon',
                success: function (data) {
                    window.location.reload(true);
                },
                error: function (err) {
                    console.log('error ' + err)
                }

            });
        });
    });

    $('.btn-eliminar-categoria').click(function () {
        swal({
            title: "¿Seguro que quieres eliminar esta categoría?",
            text: "Esta acción ya no se podrá deshacer, Así que piénsalo bien.",
            type: "error",
            showCancelButton: true,
            confirmButtonColor: '#FF2301',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro',
            cancelButtonText: "Cancelar"
        }, function () {

            var categoria = {};
            categoria.id_categoria = id;

            $.ajax({
                type: 'POST',
                data: JSON.stringify(categoria),
                contentType: 'application/json',
                url: 'http://localhost:4001/category',
                success: function (data) {
                    window.location.reload();
                },
                error: function (err) {
                    console.log('error ' + err)
                }

            });
        });
    });

    $('.btn-eliminar-estante').click(function () {
        swal({
            title: "¿Seguro que quieres eliminar este estante?",
            text: "Esta acción ya no se podrá deshacer, Así que piénsalo bien.",
            type: "error",
            showCancelButton: true,
            confirmButtonColor: '#FF2301',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro',
            cancelButtonText: "Cancelar"
        }, function () {

            var estante = {};
            estante.id_estante = id;

            $.ajax({
                type: 'POST',
                data: JSON.stringify(estante),
                contentType: 'application/json',
                url: 'http://localhost:4001/shelf',
                success: function (data) {
                    window.location.reload();
                },
                error: function (err) {
                    console.log('error ' + err)
                }

            });
        });
    });

    $('.btn-aprobar-prestamo').click(function () {

        swal({
            title: "¿Estás seguro que deseas aprobar esta reservación?",
            text: "Esta acción ya no se podrá deshacer, Así que piénsalo bien.",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro',
            cancelButtonText: "Cancelar"
        }, function () {

            var transaccion = {};
            transaccion.id_transaccion = id;
            transaccion.accion = 'aprobar'

            $.ajax({
                type: 'POST',
                data: JSON.stringify(transaccion),
                contentType: 'application/json',
                url: 'http://localhost:4001/loanreservation',
                success: function (data) {
                    window.location.reload(true);
                },

            });
        });
    });

    $('.btn-recibir-prestamo').click(function () {

        swal({
            title: "¿Estás seguro que deseas recibir este prestamo?",
            text: "Esta acción ya no se podrá deshacer, Así que piénsalo bien.",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro',
            cancelButtonText: "Cancelar"
        }, function () {

            var transaccion = {};
            transaccion.id_transaccion = id;
            transaccion.accion = 'recibir'

            $.ajax({
                type: 'POST',
                data: JSON.stringify(transaccion),
                contentType: 'application/json',
                url: 'http://localhost:4001/loanpending',
                success: function (data) {
                    window.location.reload(true);
                },

            });
        });
    });

    
    $('.btn-informacion-libro').click(function () {

        var libro = {}
        libro.id_libro = id;

        //alert(libro.id_libro)

        $.ajax({
            type: 'GET',
            url: 'http://localhost:4001/infobook',
            data: {id_libro: id},
            contentType: 'application/json', 
            success: function(data){
                $('.libros').html(data);
            }
        })

        
    });
    
    // $('.btn-informacion-libro').on('click', function () {
    //     $('#ModalLibroInfo').modal({
    //         show: true,
    //         backdrop: "static"
    //     });
    // });

    $('.btn-help').on('click', function () {
        $('#ModalHelp').modal({
            show: true,
            backdrop: "static"
        });
    });
});

function pasarId(idEntrante) {
    id = idEntrante;
}

function pasarInfoLibro(id_libroEntrante, isbnEntrante, nombreEntrante, lugarEntrante, editorialEntrante, numero_paginasEntrante, autorEntrante) {
    id_libro = id_libroEntrante;
    isbn = isbnEntrante;
    nombre = nombreEntrante;
    lugar = lugarEntrante;
    editorial = editorialEntrante;
    numero_paginas = numero_paginasEntrante;
    autor = autorEntrante;
}