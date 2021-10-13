import Sidebar from "../components/Sidebar";
import React, {useEffect, useState, useRef} from "react";

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from "nanoid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersCog, faPencilAlt,faTrash,faCheck} from "@fortawesome/free-solid-svg-icons";

<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet"></link>


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

    const form = useRef(null); //cambio para patch

    useEffect(()=>{
        console.log("Este es el listado de usuarios en el componente de Tabla", listaUsuarios);
    },[listaUsuarios]);

    const submitEdit = (e)=>{
        e.preventDefault();
        const fd = new FormData(form.current); //cambio para patch
        console.log(e);
    };

    return (
        <div>
        <div className="rp_subtitulo">LISTADO DE USUARIOS ROLES Y ESTADOS</div>
        <form ref={form} onSubmit={submitEdit}>  {/*ref={form} es mun cambio para patch*/ } 
         
            <table className="table">
                <thead>
                    <tr>
                        <th>Correo</th>
                        <th>Nombre</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaUsuarios.map((usuario)=>{
                        return <FilaUsuario key = {nanoid()} usuario={usuario}/>;
                    })}
                </tbody>
            </table>
        </form>
        
        </div>
    );
};

const FilaUsuario = ({ usuario }) => {
    const [edit, setEdit] = useState(false);
    return (
        <tr>
            {edit? (
                <>
                    <td>{usuario.usuario_email}</td>
                    <td>{usuario.nombre}</td>
                    <td><select
                                className="select"  
                                name="rol"
                                required
                                defaultValue={usuario.rol}
                                > 
                                <option disabled value={0}>None</option>
                                <option value="administrador">Administrador</option>
                                <option value="vendedor">Vendedor</option>
                            </select></td>
                    <td><select 
                                className="select"
                                name="estado" 
                                required
                                defaultValue={usuario.estado}> 
                                    <option selected disabled value={0}>None</option>
                                    <option value="pendiente">Pendiente</option>
                                    <option value="autorizado">Autorizado</option>
                                    <option value="no_autorizado">No autorizado</option>
                            </select>
                    
                    
                    
                    
                    </td>
                </>
                ):(
                <>
                    <td>{usuario.usuario_email}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.rol}</td>
                    <td>{usuario.estado}</td>
                </>
            )}

            <td className="acciones">
                {edit? (
                    <div onClick={()=>setEdit (!edit)} className="boton_confirm"> 
                    <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    
                ) : (
                    <div onClick={()=>setEdit (!edit)} className="boton_update">
                    <FontAwesomeIcon icon={faPencilAlt}/>
                    </div>
                    
                )}
            
                <div className="boton_delete">
                    <FontAwesomeIcon icon={faTrash}/>
                </div>
            </td>
        </tr>
    );
}

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
              usuario_email: datos.usuario_email,
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

       
    };

    return <div>
        <div className="rp_subtitulo">INGRESE EL EMAIL DEL USUARIO Y LOS ROLES A MODIFICAR</div>
            <form ref={form} onSubmit={submitForm} >
                <table className="tabla">
                    <tr>
                        <td><p>Email del Usuario:</p></td>
                        <td><input
                            name="usuario_email"  
                            className="input_m" 
                            type="email"
                            placeholder="@email.com" required
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
                                id="rol" required> 
                                <option selected disabled value="">Seleccione</option>
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
                                id="estado" required>
                                    <option selected disabled value="">Seleccione</option>
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