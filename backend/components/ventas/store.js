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

async function actualizarDatosVenta(detalle, cantidad, precio_unitario_por_producto, venta_total, fecha_venta, cliente_id, nombre_cliente, vendedor, estado){
    const ventaEncontrada = await Model.findOne({
        venta_id: venta_id,
        detalle: detalle,
        cantidad: cantidad,
        precio_unitario_por_producto: precio_unitario_por_producto,
        venta_total: venta_total,
        fecha_venta: fecha_venta,
        cliente_id: cliente_id,
        nombre_cliente: nombre_cliente,
        vendedor: vendedor,
        estado: estado
    });
    ventaEncontrada.detalle = detalle;
    ventaEncontrada.cantidad = cantidad;
    ventaEncontrada.precio_unitario_por_producto = precio_unitario_por_producto;
    ventaEncontrada.venta_total = venta_total;
    ventaEncontrada.fecha_venta = fecha_venta;
    ventaEncontrada.cliente_id = cliente_id;
    ventaEncontrada.nombre_cliente = nombre_cliente;
    ventaEncontrada.vendedor = vendedor;
    ventaEncontrada.estado = estado;
    const ventaActualizada = await ventaEncontrada.save();
    return ventaActualizada;
}

module.exports = {
    add: registrarVenta,
    list: listarVentas,
    actualizarDatosVenta: actualizarDatosVenta,
}