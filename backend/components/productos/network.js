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
    controller.registrarProducto(req.body.producto_id, req.body.descripcion_producto, req.body.valor_unitario, req.body.estado)
        .then((fullProducto) => {
            response.success(req, res, fullProducto, 201);
        })
        .catch(e => {
            response.error(req, res, 'Informacion invalida', 400, "Error en el controlador");
        });
});

router.get('/', function(req, res){
    const filtroProducto = req.query.producto_id || null;
    controller.listarProductos(filtroProducto)
        .then((listaProductos) => {
            response.success(req, res, listaProductos, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error inesperado', 500, e);
        })
})

router.patch('/:producto_id', function(req, res){
    controller.actualizarProducto(req.params.producto_id, req.body.estado)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e)
        })
})

module.exports = router;