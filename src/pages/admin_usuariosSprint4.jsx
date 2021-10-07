import Sidebar from "../components/Sidebar";
import React, {useEffect, useState} from "react";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars  } from "@fortawesome/free-solid-svg-icons";
library.add(faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars);


const AdminUsuariosPage = () => {

    const [nombreUsuario, setNombreUsuario]= useState('');

    useEffect(() => {
        console.log("hola, soy un use effect que se hace una sola vez cuando la pagina se renderiza");
    }, []);

    useEffect(() => {
        console.log('esto es una funcion que se ejecuta cada que cambia el valor del nombreusuario');
        console.log('El valor de la variable es', nombreUsuario);
    }, [nombreUsuario]);

    const enviarDatosALBackend = () => (
        console.log('El valor de la variable ID Usuario es: ', nombreUsuario )
    );
    

        
    return (
        <div>
            <div className="wrapper">
                    <Sidebar icono = {faUsersCog} titulo = 'GESTIÓN DE USUARIOS'/>

                <div className="principal">
                    <div className="Menu">
                        <div className="rp_titulo">GESTIÓN DE USUARIOS</div>
                        <div className="rp_subtitulo">INGRESE EL ID DEL USUARIO Y LOS ROLES A MODIFICAR</div>

                        <div className="rp_formulario">
                            <form>
                                <input 
                                    onChange={(e) => {
                                        setNombreUsuario(e.target.value);
                                    }} 
                                    type="text" 
                                    placeholder="ID del Usuario"
                                    />
                                <input 
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                    }}  
                                    type="text" 
                                    placeholder="Nombre del Usuario"/>
                                <input 
                                     onChange={(e) => {
                                    console.log(e.target.value);
                                    }} 
                                    type="text" placeholder="Rol del Usuario"/>
                                <button type='button' onClick={enviarDatosALBackend} >Enviar datos</button>
                            </form>


                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

const tablaUsuarios = ()=> {
    return <div>Esto es un Div pero debería ser una tabla mostrando todos los Usuarios</div>
}

const formularioCreacionUsuarios = ()=> {
    return <div>Esto es un Div pero debería ser un formulario para creación o actualización de roles de Usuarios</div>
}

export default AdminUsuariosPage;