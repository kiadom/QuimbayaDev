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
    detalle: {
        type: String,
        required: true,
    },
    fecha_de_pago: {
        type: Date,
        required: true,
    },
    fecha_de_pago_futura: {
        type: Date,
        required: true,
    },
    responsable: {
        type: String,
        required: true,
    },
    date: Date,
});

const model = mongoose.model('Venta', miEsquema);
module.exports = model;