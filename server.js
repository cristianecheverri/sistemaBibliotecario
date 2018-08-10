var routes = require('./routes/routes.js');

function start(app) {
    var server = app.listen(app.get('port'), function () {
        console.log('Server listening on port ' + server.address().port);
        routes(app); //render the correct route
    });
}

exports.start = start;