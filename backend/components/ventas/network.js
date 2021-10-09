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
    controller.registrarVenta(req.body.venta_id, req.body.venta_total, req.body.detalle, req.body.fecha_de_pago, req.body.fecha_de_pago_futura, req.body.responsable)
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

module.exports = router;