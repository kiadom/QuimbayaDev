//Tiene la logica del componente. Logica del negocio.
//Si el mensaje necesita una fecha o llamar a otro componente, se hace aqui.
//El usuario viene bien, el texto viene bien, hacer comprobaciones, ese tipo de cosas se hacen aca
//Recibe la informacion de Network. Controller hace las comprobaciones y podra guardar la informacion pasandolo a store

const store = require('./store');

function registrarProducto(producto_id, descripcion_producto, valor_unitario, estado){
    return new Promise((resolve, reject) => {
        if (!producto_id || !descripcion_producto || !valor_unitario || !estado){
            console.error('[productoController] La informacion esta incompleta');
            return reject('Los datos son incorrectos');
        }

        const fullProducto = {
            producto_id: producto_id,
            descripcion_producto: descripcion_producto,
            valor_unitario: valor_unitario,
            estado: estado,
            date: new Date(),
        };

    store.add(fullProducto);
    resolve(fullProducto);
    })
};

function listarProductos(filtroProducto){
    return new Promise((resolve, reject) => {
        resolve(store.list(filtroProducto));
    })
}

function actualizarProducto(producto_id, estado){
    return new Promise(async (resolve, reject) => {
        if(!producto_id || !estado){
            return reject('Datos invalidos')
        }
        const result = await store.actualizarEstadoProducto(producto_id, estado);
        resolve(result);
    })
}

module.exports = {
    registrarProducto,
    listarProductos,
    actualizarProducto,
};