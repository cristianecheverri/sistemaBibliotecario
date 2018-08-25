let tablaBiblioteca = () => {
    return `<div class="table-responsive">
                <table class="table table-hover text-center">
                    <thead>
                        <tr class="success">
                            <th class="text-center">Código</th>
                            <th class="text-center">Nombre</th>
                            <th class="text-center">Dirección</th>
                            <th class="text-center">Correo</th>
                            <th class="text-center">Telefono</th>
                            <th class="text-center">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>`
}

let mostrarLibros = (libro, autor) => {
    return `<div class="media media-hover">
                <div class="media-left media-middle">
                    <a href="#!" class="tooltips-general" data-toggle="tooltip" data-placement="right" title="Más información del libro">
                        <img class="media-object" src="assets/img/book.png" alt="Libro" width="48" height="48">
                    </a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading">${libro.nombre}</h4>
                    <div class="pull-left">
                        <strong>${autor}</strong><br>
                    </div>
                    <p class="text-center pull-right">
                        <a href="infobook" class="btn btn-info btn-xs btn-informacion-libro" onclick="pasarId(${libro.id_libro})" 
                            style="margin-right: 10px;"><i class="zmdi zmdi-info-outline"></i> &nbsp;&nbsp; Más información</a>
                    </p>

                     

                </div>
            </div>`
}

let tablaSala = () => {
    return `<div class="table-responsive">
            <table class="table table-hover text-center">
                <thead>
                    <tr class="success">
                        <th class="text-center">Código</th>
                        <th class="text-center">Nombre</th>
                        <th class="text-center">Biblioteca</th>
                        <th class="text-center">Eliminar</th>
                    </tr>
                </thead>
                <tbody>`
}

let tablaCategoria = () => {
    return `<div class="table-responsive">
                <table class="table table-hover text-center">
                    <thead>
                        <tr class="success">
                            <th class="text-center">Código</th>
                            <th class="text-center">Nombre</th>
                            <th class="text-center">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>`
}

let tablaEstante = () => {
    return `<div class="table-responsive">
                <table class="table table-hover text-center">
                    <thead>
                        <tr class="success">
                            <th class="text-center">Código</th>
                            <th class="text-center">Nombre</th>
                            <th class="text-center">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>`
}

let tablaEstanteCategoria = () => {
    return `<div class="table-responsive">
                <table class="table table-hover text-center">
                    <thead>
                        <tr class="success">
                            <th class="text-center">Código</th>
                            <th class="text-center">Estante</th>
                            <th class="text-center">Categoria</th>
                            <th class="text-center">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>`
}

let tablaUsuario = () => {
    return `<div class="table-responsive">
                <table class="table table-hover text-center">
                    <thead>
                        <tr class="success">
                            <th class="text-center">Documento</th>
                            <th class="text-center">Nombres</th>
                            <th class="text-center">Apellidos</th>
                            <th class="text-center">Telefono</th>
                            <th class="text-center">Correo</th>
                            <th class="text-center">Tipo de usuario</th>
                            <th class="text-center">Actualizar</th>
                            <th class="text-center">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>`
}

let mostrarLibro = (libro, autor) => {
    return `<h2>${libro.nombre}</h2>`
}

exports.mostrarLibro = mostrarLibro;
exports.tablaUsuario = tablaUsuario;
exports.tablaEstanteCategoria = tablaEstanteCategoria;
exports.tablaEstante = tablaEstante;
exports.tablaBiblioteca = tablaBiblioteca;
exports.mostrarLibros = mostrarLibros;
exports.tablaSala = tablaSala;
exports.tablaCategoria = tablaCategoria;