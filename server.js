function iniciar(app) {
    var server = app.listen(app.get('port'), function(){
        console.log('Server listening on port ' + server.address().port);
    });
}

exports.iniciar = iniciar;