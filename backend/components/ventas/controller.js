//Tiene la logica del componente. Logica del negocio.
//Si el mensaje necesita una fecha o llamar a otro componente, se hace aqui.
//El usuario viene bien, el texto viene bien, hacer comprobaciones, ese tipo de cosas se hacen aca
//Recibe la informacion de Network. Controller hace las comprobaciones y podra guardar la informacion pasandolo a store

const store = require('./store');

function registrarVenta(venta_id, venta_total, cantidad, precio_unitario_por_producto, fecha_venta, cliente_id, nombre_cliente, vendedor, estado){
    return new Promise((resolve, reject) => {
        if (!venta_id || !venta_total || !cantidad || !precio_unitario_por_producto || !fecha_venta || !cliente_id || !nombre_cliente || !vendedor || !estado){
            console.error('[productoController] La informacion esta incompleta');
            return reject('Los datos son incorrectos');
        }

        const fullVenta = {
            venta_id: venta_id, 
            venta_total: venta_total,
            cantidad: cantidad,
            precio_unitario_por_producto: precio_unitario_por_producto,
            fecha_venta: fecha_venta,
            cliente_id: cliente_id,
            nombre_cliente: nombre_cliente,
            vendedor: vendedor,
            estado: estado,
            date: new Date(),
        };

    store.add(fullVenta);
    resolve(fullVenta);
    })
};

function listarVentas(filtroVenta){
    return new Promise((resolve, reject) => {
        resolve(store.list(filtroVenta));
    })
}

function actualizarVenta(venta_id, venta_total, cantidad, precio_unitario_por_producto, fecha_venta, cliente_id, nombre_cliente, vendedor, estado){
    return new Promise(async (resolve, reject) => {
        if(!venta_id || !venta_total || !cantidad || !precio_unitario_por_producto || !fecha_venta || !cliente_id || !nombre_cliente || !vendedor || !estado){
            return reject('Datos invalidos')
        }
        const result = await store.actualizarDatosVenta(venta_id, venta_total, cantidad, precio_unitario_por_producto, fecha_venta, cliente_id, nombre_cliente, vendedor, estado);
        resolve(result);
    })
}

module.exports = {
    registrarVenta,
    listarVentas,
    actualizarVenta,
};