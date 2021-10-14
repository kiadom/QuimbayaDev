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
    const [textoBoton, setTextoBoton] = useState('Ver Listado Usuarios' );
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

    useEffect(() => {
        const obtenerUsuarios = async() => {
            const options = {
                method: 'GET', 
                url: 'http://localhost:3001/usuarios'};
                await axios
                    .request(options)
                    .then(function (response) {
                        setUsuarios(response.data.body);
                    })
                    .catch(function (error) {
                    console.error(error);
                    });
        };
        if (ejecutarConsulta) {
            obtenerUsuarios();
            setEjecutarConsulta(false);
        }
    },[ejecutarConsulta]);



    useEffect(()=> {
    //obtener lista de usuarios desde el backend
        if(mostrarTabla){
            setEjecutarConsulta(true);
        }
    },[mostrarTabla]);

    useEffect(()=>{
        if(mostrarTabla){
            setTextoBoton('Ver Listado Usuarios'); // ojo, aquí iría Crear Usuario
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
                            {mostrarTabla ? (<TablaUsuarios listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta} />) : 
                            
                            ( <TablaUsuarios listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta} /> //ojo, no se quiere mostrar formulario de creación
                                //si se quiere monstrar hay que cambiar lo de la línea de arriba por las siguientes 4 líneas
                            //<FormularioCreacionUsuarios 
                            //    setMostrarTabla={setMostrarTabla}
                            //    listaUsuarios={usuarios}
                            //    setUsuarios={setUsuarios} />
                                )}
                            <ToastContainer position= "bottom-center" autoClose= {1000}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TablaUsuarios = ({listaUsuarios, setEjecutarConsulta})=> {
   
    useEffect(()=>{
        console.log("Este es el listado de usuarios en el componente de Tabla", listaUsuarios);
    },[listaUsuarios]);

      return (
        <div>
        <div className="rp_subtitulo">LISTADO DE USUARIOS ROLES Y ESTADOS</div>
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
                        return (
                            <FilaUsuario 
                                key = {nanoid()} 
                                usuario={usuario} 
                                setEjecutarConsulta={setEjecutarConsulta}
                            />
                        );
                    })}
                </tbody>
            </table>
        
        
        </div>
    );
};

const FilaUsuario = ({ usuario, setEjecutarConsulta }) => {
    console.log("usuario", usuario);
    const [edit, setEdit] = useState(false);
    const [infoNuevoUsuario, setinfoNuevoUsuario] = useState({
        usuario_email: usuario.usuario_email,
        nombre: usuario.nombre,
        rol: usuario.rol,
        estado: usuario.estado,

    });

const actualizarUsuario = async () => {
    console.log(infoNuevoUsuario);
    //enviar la info al Backend
    const options = {
        method: 'PATCH',
        url: 'http://localhost:3001/usuarios/' + infoNuevoUsuario.usuario_email,
        headers: {'Content-Type': 'application/json'},
        data: {
            rol: infoNuevoUsuario.rol,
            estado: infoNuevoUsuario.estado
            },
        };
        
    await axios.request(options).then(function (response) {
        console.log(response.data);
        toast.success("Usuario modificado con exito");
        setEdit(false);
        setEjecutarConsulta(true);
        })
        .catch(function (error) {
        console.error(error);
        toast.error("Error al modificar el Usuario");
        });
};

const eliminarUsuario = ()=>{
    //aqui va el código a borrar
}

const refreshPage = ()=>{
    window.location.reload();
  }


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
                                value={infoNuevoUsuario.rol}
                                onChange={(e)=> setinfoNuevoUsuario({...infoNuevoUsuario, rol:e.target.value})}
                                > 
                                <option disabled value={0}>None</option>
                                <option value="administrador">Administrador</option>
                                <option value="vendedor">Vendedor</option>
                        </select>
                    </td>
                    <td><select 
                                className="select"
                                name="estado" 
                                required
                                value={infoNuevoUsuario.estado}
                                onChange={(e)=> setinfoNuevoUsuario({...infoNuevoUsuario, estado:e.target.value})}> 
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
                    <div onClick={()=> actualizarUsuario()} className="boton_confirm">
                    <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    
                ) : (
                    <div onClick={()=>setEdit (!edit)} className="boton_update" >
                    <FontAwesomeIcon icon={faPencilAlt}/>
                    </div>
                    
                )}
            
                <div onClick={()=>eliminarUsuario()} className="boton_delete">
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