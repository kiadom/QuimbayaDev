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

function registrarProducto(producto){
    const miProducto = new Model(producto);
    miProducto.save();
}

async function listarProductos(filtroProducto){
    let filtro = {};
    if (filtroProducto !== null){
        filtro = {producto_id: filtroProducto};
    }
    const productos = await Model.find(filtro);
    return productos;
}

async function actualizarDatosProducto(producto_id, valor_unitario, estado){
    const productoEncontrado = await Model.findOne({
        producto_id: producto_id
    });
    productoEncontrado.valor_unitario = valor_unitario;
    productoEncontrado.estado = estado;
    const productoActualizado = await productoEncontrado.save();
    return productoActualizado;
}

module.exports = {
    add: registrarProducto,
    list: listarProductos,
    actualizarDatosProducto: actualizarDatosProducto,
}