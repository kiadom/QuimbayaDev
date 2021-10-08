import Sidebar from "../components/Sidebar";
import React, {useEffect, useState, useRef} from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars  } from "@fortawesome/free-solid-svg-icons";
library.add(faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars);



const usuariosBackend = [
    {
        Id:"1010173523",
        Nombre: "Carlos Andrés Méndez",
        Rol: "Vendedor",
        Estado: "Pendiente",
    },
    {
        Id:"1112758173",
        Nombre: "Nelson Alberto Cuervo",
        Rol: "Vendedor",
        Estado: "Autorizado",
    },
    {
        Id:"51978698",
        Nombre: "Rocio Pacheco Villabona",
        Rol: "Administrador",
        Estado: "Pendiente",
    },
];

const AdminUsuariosPage = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Asignar Rol' );

    useEffect( ()=>{
        //obtener lista de usuarios desde el backend
        setUsuarios(usuariosBackend);
    },[]);

    useEffect(()=>{
        if(mostrarTabla){
            setTextoBoton('Asignar Rol');
        }
        else{
            setTextoBoton('Ver Listado Usuarios');
        }
    },[mostrarTabla]);

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
                            {mostrarTabla ? (<TablaUsuarios listaUsuarios={usuarios} />) : 
                            (<FormularioCreacionUsuarios 
                                setMostrarTabla={setMostrarTabla}
                                listaUsuarios={usuarios}
                                setUsuarios={setUsuarios} />)}
                            <ToastContainer position= "bottom-center" autoClose= {1000}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TablaUsuarios = ({listaUsuarios})=> {
    useEffect(()=>{
        console.log("Este es el listado de usuarios en el componente de Tabla",listaUsuarios)
    },[listaUsuarios]);

    return (
        <div>
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
                {listaUsuarios.map((usuario)=>{
                    return(
                        <tr>
                            <td>{usuario.Id}</td>
                            <td>{usuario.Nombre}</td>
                            <td>{usuario.Rol}</td>
                            <td>{usuario.Estado}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
    );
};

const FormularioCreacionUsuarios = ({setMostrarTabla, listaUsuarios, setUsuarios })=> {
    const form = useRef(null);
    

    const submitForm =(e)=>{
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoUsuario = {};
        fd.forEach((value, key) => {
            nuevoUsuario[key]=value;
        });

        setMostrarTabla(true)
        setUsuarios([...listaUsuarios, nuevoUsuario]);
        // Identificafr el caso de Exito y mostrar un Toast de exito
        toast.success("Usuario agregado con exito");
        // Identificafr el caso de Error y mostrar un Toast de error
        //toast.error("Error al crear el Usuario");
        console.log("Datos del Form Enviados", nuevoUsuario);
    };

    return <div>
        <div className="rp_subtitulo">INGRESE EL ID DEL USUARIO Y LOS ROLES A MODIFICAR</div>
            <form ref={form} onSubmit={submitForm} >
                <table className="tabla">
                    <tr>
                        <td><p>ID del Usuario:</p></td>
                        <td><input
                            name="Id"  
                            className="input_m" 
                            type="text"
                            placeholder="Id Usuario" required
                            required/>
                        </td>
                    </tr>

                    <tr>
                        <td><p>Nombre del Usuario:</p></td>
                        <td><input 
                            name="Nombre" 
                            className="input_m" 
                            type="text"
                            placeholder="Nombre Usuario" 
                            required/>
                        </td>
                    </tr>
                
                    <tr>
                        <td><p>Rol Autorizado:</p></td>
                        <td><p>
                            <select
                                className="select"  
                                name="Rol"
                                required
                                defaultValue={0}
                                > 
                                <option disabled value={0}>Seleccione Tipo Usuario</option>
                                <option value="administrador">Administrador</option>
                                <option value="vendedor">Vendedor</option>
                            </select>
                        </p></td> 
                    </tr>
                    
                    <tr>
                        <td><p>Estado Usuario:</p></td>                
                        <td><p>
                            <select 
                                className="select"
                                name="Estado" 
                                required
                                defaultValue={0}> 
                                    <option selected disabled value={0}>Seleccione Estado Usuario</option>
                                    <option value="pendiente">Pendiente</option>
                                    <option value="autorizado">Autorizado</option>
                                    <option value="no_autorizado">No autorizado</option>
                            </select>
                        </p></td> 
                    </tr>
                    
                    <tr>
                        <td>
                            <button  
                                type="submit" 
                                className="boton_m"
                                >Actualizar Rol
                            </button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>;
};

export default AdminUsuariosPage;