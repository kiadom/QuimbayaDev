const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const miEsquema = new Schema({
    producto_id: {
        type: String,
        required: true,
    },
    descripcion_producto: {
        type: String,
        required: true,
    },
    valor_unitario: {
        type: Number,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    date: Date,
});

const model = mongoose.model('Producto', miEsquema);
module.exports = model;