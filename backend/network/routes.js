//Archivo para gestionar las rutas, archivo exclusivo de red
//Va a ver hacia donde quiere ir la peticion y va a llamar al componente adecuado
//Cuando el routes.js detecte que tenemos una peticion que viene hacia los productos, ventas o usuarios, se la pasa al componente
//Routes no tendria que hacer nada porque el componente es quien debe determinar si esta bien

const producto = require('../components/productos/network');
const venta = require('../components/ventas/network');
const usuario = require('../components/usuarios/network');

//Responde las peticiones. Rutas que queremos que escuche para que genere una respuesta
const routes = function(server){
    server.use('/productos', producto);
    server.use('/ventas', venta);
    server.use('/usuarios', usuario);
}

module.exports = routes;