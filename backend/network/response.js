//Cada vez que una peticion sea correcta llega a este archivo para mostrar la respuesta
//Responde al usuario final y nos va a asegurar que las peticiones que llegan tengan la misma forma y el mismo sentido

exports.success = function(req, res, message, status){
    res.status(status || 200).send({
        error: '',
        body: message
    });
}

exports.error = function(req, res, message, status, details){
    console.error('[response error] ' + details);
    res.status(status || 500).send({
        error: message,
        body: ''
    });
}