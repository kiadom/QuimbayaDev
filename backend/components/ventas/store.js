//Controller comprueba que este bien todo y pasa la informacion a Store.
//Archivo encargado de gestionar las bases de datos.
//Archivo que dice donde y como se guarda la informacion

const db = require('mongoose');
const Model= require('./model');

db.Promise = global.Promise;
db.connect('mongodb+srv://QuimbayaDev-admin:7QWbDsJNaJGZIskx@clusterdbquimbayadev.upwen.mongodb.net/quimbaya-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});
console.log('[db] Conectada con exito');

function registrarVenta(venta){
    const miVenta = new Model(venta);
    miVenta.save();
}

async function listarVentas(filtroVenta){
    let filtro = {};
    if (filtroVenta !== null){
        filtro = {venta_id: filtroVenta};
    }
    const ventas = await Model.find(filtro);
    return ventas;
}

async function actualizarDatosVenta(venta_id, estado){
    const ventaEncontrada = await Model.findOne({
        venta_id: venta_id,
    });
    ventaEncontrada.estado = estado;
    const ventaActualizada = await ventaEncontrada.save();
    return ventaActualizada;
}

module.exports = {
    add: registrarVenta,
    list: listarVentas,
    actualizarDatosVenta: actualizarDatosVenta,
}