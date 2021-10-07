import Sidebar from "../components/Sidebar";
import React, {useEffect, useState} from "react";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars  } from "@fortawesome/free-solid-svg-icons";
library.add(faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars);


const AdminUsuariosPage = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [textoBoton, setTextoBoton] = useState('Asignar Rol' )

    useEffect(()=>{
        if(mostrarTabla){
            setTextoBoton('Asignar Rol');
        }
        else{
            setTextoBoton('Ver Listado Usuarios');
        }
    },[mostrarTabla])
    
    return (
        <div>
            <div className="wrapper">
                    <Sidebar icono = {faUsersCog} titulo = 'GESTIÓN DE USUARIOS'/>

                <div className="principal">
                    <div className="Menu">
                        <div className="rp_titulo">GESTIÓN DE USUARIOS</div>
                        <div className="rend_Dinamica">
                            <button onClick={()=>{
                                setMostrarTabla(!mostrarTabla);
                                }} 
                                className="boton_m" >{textoBoton}
                            </button>
                        </div>
                        <div className="rp_formulario">
                            {mostrarTabla ? <TablaUsuarios /> : <FormularioCreacionUsuarios /> }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TablaUsuarios = ()=> {
    return <div>
        <div className="rp_subtitulo">LISTADO DE USUARIOS ROLES Y ESTADOS</div>
        <table className="formulario">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Rol</th>
                    <th>Estado</th>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>51978698     .</td>
                    <td>Rocio Pacheco     .</td>
                    <td>Administrador     .</td>
                    <td>Pendiente     .</td>
                </tr>
                <tr>
                    <td>1013600362     .</td>
                    <td>Juan Manuel Suárez Rodríguez     .</td>
                    <td>Administrador     .</td>
                    <td>Autorizado     .</td>
                </tr>
                <tr>
                    <td>80217086     .</td>
                    <td>Luis Alonso Rondón Rodríguez     .</td>
                    <td>Administrador     .</td>
                    <td>Autorizado     .</td>
                </tr>


            </tbody>
        </table>
    </div>;
};

const FormularioCreacionUsuarios = ()=> {
    return <div>
        <div className="rp_subtitulo">INGRESE EL ID DEL USUARIO Y LOS ROLES A MODIFICAR</div>
        <form>
            <table className="tabla">
                <tr>
                    <td><p>ID del Usuario:</p></td>
                    <td><input className="input_m" type="text" id="id_usuario" 
                    name="id_usuario" placeholder="Id Usuario"></input></td>
                </tr>
            
                <tr>
                    <td><p>Rol Autorizado:</p></td>
                    <td><p>< select className="select" id="tipo_usuario" 
                    name="tipo_usuario">
                        <option selected disabled>Seleccione Tipo Usuario</option>
                        <option value="administrador">Administrador</option>
                        <option value="vendedor">Vendedor</option>
                    </select></p></td> 
                </tr>
                
                <tr>
                    <td><p>Estado Usuario:</p></td>                
                    <td><p><select className="select" id="estado_usuario" 
                    name="estado_usuario">
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

    </div>;
};

export default AdminUsuariosPage;