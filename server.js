function iniciar(app) {
    var server = app.listen(app.get('port'), function () {
        console.log('Server listening on port ' + server.address().port);
        const { Biblioteca, Sala, Estante, Categoria, Autor, Libro, Usuario, Transaccion } = require('./connection');
    });
}

exports.iniciar = iniciar;