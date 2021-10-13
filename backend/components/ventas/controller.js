//Tiene la logica del componente. Logica del negocio.
//Si el mensaje necesita una fecha o llamar a otro componente, se hace aqui.
//El usuario viene bien, el texto viene bien, hacer comprobaciones, ese tipo de cosas se hacen aca
//Recibe la informacion de Network. Controller hace las comprobaciones y podra guardar la informacion pasandolo a store

const store = require('./store');

function registrarVenta(venta_id, venta_total, detalle, fecha_de_pago, fecha_de_pago_futura, responsable){
    return new Promise((resolve, reject) => {
        if (!venta_id || !venta_total || !detalle || !fecha_de_pago || !fecha_de_pago_futura || !responsable){
            console.error('[productoController] La informacion esta incompleta');
            return reject('Los datos son incorrectos');
        }

        const fullVenta = {
            venta_id: venta_id,
            venta_total: venta_total,
            detalle: detalle,
            fecha_de_pago: fecha_de_pago,
            fecha_de_pago_futura: fecha_de_pago_futura,
            responsable: responsable,
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

function actualizarVenta(venta_id, fecha_de_pago_futura, responsable){
    return new Promise(async (resolve, reject) => {
        if(!venta_id || !fecha_de_pago_futura || !responsable){
            return reject('Datos invalidos')
        }
        const result = await store.actualizarDatosVenta(venta_id, fecha_de_pago_futura, responsable);
        resolve(result);
    })
}

module.exports = {
    registrarVenta,
    listarVentas,
    actualizarVenta,
};