const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const miEsquema = new Schema({
    usuario_email: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    date: Date,
});

const model = mongoose.model('Usuario', miEsquema);
module.exports = model;