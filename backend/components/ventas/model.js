const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const miEsquema = new Schema({
    venta_id: {
        type: String,
        required: true,
    },
    venta_total: {
        type: Number,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
    },
    precio_unitario_por_producto: {
        type: String,
        required: true,
    },
    fecha_venta: {
        type: Date,
        required: true,
    },
    cliente_id: {
        type: String,
        required: true,
    },
    nombre_cliente:{
        type: String,
        requiered: true,
    },
    vendedor:{
        type: String,
        requiered: true,
    },
    estado:{
        type: String,
        requiered: true,
    },
    date: Date,
});

const model = mongoose.model('Venta', miEsquema);
module.exports = model;