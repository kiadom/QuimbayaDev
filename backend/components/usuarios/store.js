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

function registrarUsuario(usuario){
    const miUsuario = new Model(usuario);
    miUsuario.save();
}

async function listarUsuarios(filtroUsuario){
    let filtro = {};
    if (filtroUsuario !== null){
        filtro = {usuario_id: filtroUsuario};
    }
    const usuarios = await Model.find(filtro);
    return usuarios;
}

async function actualizarDatosUsuario(usuario_email, rol, estado){
    const usuarioEncontrado = await Model.findOne({
        usuario_email: usuario_email
    });
    usuarioEncontrado.rol = rol;
    usuarioEncontrado.estado = estado;
    const usuarioActualizado = await usuarioEncontrado.save();
    return usuarioActualizado;
}

module.exports = {
    add: registrarUsuario,
    list: listarUsuarios,
    actualizarDatosUsuario: actualizarDatosUsuario,
}