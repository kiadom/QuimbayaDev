
import React, { useState, useEffect } from 'react';

const AdminUsuariosPage = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);  
    return (
        <div>
            <div className="rp_titulo">GESTIÓN DE USUARIOS Y ROLES</div>
            <button className="boton_m">Actualizar Información de Usuarios</button>
            {mostrarTabla ? <tablaUsuarios/>:<formularioCreacionUsuarios/> }
        </div>
    );
};


    const tablaUsuarios = () => {
        return (
            <div>
                <h2>Esto es un div pero se convertirá en la tabla de vehículos</h2>
            </div>
        )
    }

    const formularioCreacionUsuarios = () => {
        return (
            <div>
                <div className="wrapper">
                    
                    <div className="principal">
                        <div className="Menu">
                            <div className="rp_titulo">GESTIÓN DE USUARIOS</div>
                            <div className="rp_subtitulo">INGRESE EL ID DEL USUARIO Y LOS ROLES A MODIFICAR</div>
                            <div className="rp_formulario">
                                <form >
                                    <table className="tabla">
                                        <tr>
                                            <td><p>ID del Usuario:</p></td>
                                            <td><input className="input_m" type="text" id="id_usuario" 
                                            name="id_usuario" placeholder="Id Usuario" ></input></td>
                                        </tr>
                                        <tr>
                                            <td><p>Rol Autorizado:</p></td>
                                            <td><p>< select className="select" id="tipo_usuario" 
                                            name="tipo_usuario" >
                                                <option selected disabled>Seleccione Tipo Usuario</option>
                                                <option value="administrador">Administrador</option>
                                                <option value="vendedor">Vendedor</option>
                                            </select></p></td> 
                                        </tr>
                                        <tr>
                                            <td><p>Estado Usuario:</p></td>                
                                            <td><p><select className="select" id="estado_usuario" 
                                            name="estado_usuario" >
                                                <option selected disabled>Seleccione Estado Usuario</option>
                                                <option value="pendiente">Pendiente</option>
                                                <option value="autorizado">Autorizado</option>
                                                <option value="no_autorizado">No autorizado</option>
                                            </select></p></td> 
                                        </tr>
                                        <tr>
                                            <td><input className="boton_m" type="reset" 
                                            value="Borrar"/></td>
                                            <td><input className="boton_m" type="submit" 
                                            value="Actualizar"/></td>
                                        </tr>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



export default AdminUsuariosPage;