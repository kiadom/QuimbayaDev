//Endpoints e informacion que tenga que ver con el protocolo HTTP
// Archivo que se encarga de recibir la peticion HTTP, procesar la informacion y enviarla al controlador
//Cada vez que una peticion sea manda la respuesta a response

const express = require('express');
const response = require('../../network/response');
const controller = require('./controller')
const router = express.Router();

//Para cualquier ruta devuelva la funcion
//La funcion tiene dos parametros, req y res. Son los dos parametros que tiene cualquier funcion HTTP
router.post('/', function(req, res){
    controller.registrarUsuario(req.body.usuario_id, req.body.rol, req.body.estado)
        .then((fullUsuario) => {
            response.success(req, res, fullUsuario, 201);
        })
        .catch(e => {
            response.error(req, res, 'Informacion invalida', 400, "Error en el controlador");
        });
});

router.get('/', function(req, res){
    const filtroUsuario = req.query.usuario_id || null;
    controller.listarUsuarios(filtroUsuario)
        .then((listaUsuarios) => {
            response.success(req, res, listaUsuarios, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error inesperado', 500, e);
        })
})

router.patch('/:usuario_id', function(req, res){
    controller.actualizarUsuario(req.params.usuario_id, req.body.rol)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e)
        })
})

module.exports = router;