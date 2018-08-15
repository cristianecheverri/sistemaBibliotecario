$(document).ready(function () {
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
            success: function (data) {
                alert(data)
                //$("#search").html(data);
            },

        });
    });





    $('.btn-help').on('click', function () {
        $('#ModalHelp').modal({
            show: true,
            backdrop: "static"
        });
    });
});
(function ($) {
    $(window).load(function () {
        $(".custom-scroll-containers").mCustomScrollbar({
            theme: "dark-thin",
            scrollbarPosition: "inside",
            autoHideScrollbar: true,
            scrollButtons: { enable: true }
        });
    });
})(jQuery);