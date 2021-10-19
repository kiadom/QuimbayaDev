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
    controller.registrarVenta(req.body.venta_id, req.body.detalle, req.body.cantidad, req.body.precio_unitario_por_producto, req.body.venta_total, req.body.fecha_venta, req.body.cliente_id, req.body.nombre_cliente, req.body.vendedor, req.body.estado)
        .then((fullVenta) => {
            response.success(req, res, fullVenta, 201);
        })
        .catch(e => {
            response.error(req, res, 'Informacion invalida', 400, "Error en el controlador");
        });
});

router.get('/', function(req, res){
    const filtroVenta = req.query.venta_id || null;
    controller.listarVentas(filtroVenta)
        .then((listaVentas) => {
            response.success(req, res, listaVentas, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error inesperado', 500, e);
        })
})

router.patch('/:venta_id', function(req, res){
    controller.actualizarVenta(req.params.venta_id, req.body.estado)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e)
        })
})

module.exports = router;