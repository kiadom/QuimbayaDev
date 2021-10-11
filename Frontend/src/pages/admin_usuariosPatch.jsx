import Sidebar from "../components/Sidebar";
import React, {useEffect, useState, useRef} from "react";

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from "nanoid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersCog, faPencilAlt,faTrash} from "@fortawesome/free-solid-svg-icons";
//library.add(faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars, faPencilAlt,faTrash);
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet"></link>

const usuariosBackend = [
    {
        usuario_id:"1010173523",
        nombre: "Carlos Andrés Méndez",
        rol: "Vendedor",
        estado: "Pendiente",
    },
    {
        usuario_id:"1112758173",
        nombre: "Nelson Alberto Cuervo",
        rol: "Vendedor",
        estado: "Autorizado",
    },
    {
        usuario_id:"51978698",
        nombre: "Rocio Pacheco Villabona",
        rol: "Administrador",
        estado: "Pendiente",
    },
];

const AdminUsuariosPage = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Asignar Rol' );

    useEffect(async()=>{

        const obtenerUsuarios = async() => {
            const options = {
                method: 'GET', 
                url: 'http://localhost:3001/usuarios'
            };

        await axios.
            request(options).
            then(function (response) {
                setUsuarios(response.data.body);
        })
        .catch(function (error) {
            console.error(error);
        });
    }
    
        //obtener lista de usuarios desde el backend
        if(mostrarTabla){
            obtenerUsuarios();
        }
    },[mostrarTabla]);

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
        console.log("Este es el listado de usuarios en el componente de Tabla", listaUsuarios);
    },[listaUsuarios]);

    return (
        <div>
        <div className="rp_subtitulo">LISTADO DE USUARIOS ROLES Y ESTADOS</div>
        <table className="table">
            
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {listaUsuarios.map((usuario)=>{
                    return(
                        <tr key = {nanoid()}>
                            <td>{usuario.usuario_id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.rol}</td>
                            <td>{usuario.estado}</td>
                            <td className="edit">
                                <button type="button" className="boton_update">
                                    <FontAwesomeIcon icon={faPencilAlt}/>
                                </button>
                                    
                                <button type="button" className="boton_delete">
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                                                               
                            </td>
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
    

    const submitForm = async (e)=>{
        e.preventDefault();
        const fd = new FormData(form.current);

        const datos = {};
        fd.forEach((value, key) => {
            datos[key]=value;
        });

        const options = {
            method: 'POST',
            url: 'http://localhost:3001/usuarios',
            headers: {'Content-Type': 'application/json'},
            data: {
              usuario_id: datos.usuario_id,
              nombre: datos.nombre,
              rol: datos.rol,
              estado: datos.estado
            },
          };
        
        await axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            toast.success("Usuario agregado con exito");
          })
          .catch(function (error) {
            console.error(error);
            toast.error("Error al crear el Usuario");
          });

        //setMostrarTabla(true)
        //console.log("Datos del Form Enviados", datos);
    };

    return <div>
        <div className="rp_subtitulo">INGRESE EL ID DEL USUARIO Y LOS ROLES A MODIFICAR</div>
            <form ref={form} onSubmit={submitForm} >
                <table className="tabla">
                    <tr>
                        <td><p>ID del Usuario:</p></td>
                        <td><input
                            name="usuario_id"  
                            className="input_m" 
                            type="text"
                            placeholder="Id Usuario" required
                            required/>
                        </td>
                    </tr>

                    <tr>
                        <td><p>Nombre del Usuario:</p></td>
                        <td><input 
                            name="nombre" 
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
                                name="rol"
                                required
                                defaultValue={0}
                                > 
                                <option disabled value={0}>None</option>
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
                                name="estado" 
                                required
                                defaultValue={0}> 
                                    <option selected disabled value={0}>None</option>
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