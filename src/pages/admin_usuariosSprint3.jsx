import Sidebar from "../components/Sidebar";
import React, {useEffect, useState} from "react";

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
    {
        Id:"1013600362",
        Nombre: "Juan Manuel Suárez",
        Rol: "Administrador",
        Estado: "No Autorizado",
    },
    {
        Id:"80217086",
        Nombre: "Luis Alonso Rondón",
        Rol: "Administrador",
        Estado: "Autorizado",
    },
];

const AdminUsuariosPage = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Asignar Rol' );

    useEffect( ()=>{
        //obtener lista de usuarios desde el backend
        setUsuarios(usuariosBackend);
    },[])

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
                            {mostrarTabla ? (<TablaUsuarios listaUsuarios={usuarios} />) : 
                            (<FormularioCreacionUsuarios 
                                funcionParaMostrarLaTabla={setMostrarTabla}
                                listaUsuarios={usuarios}
                                funcionParaAgregarUnUsuario={setUsuarios} />)}
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
                {listaUsuarios.map((usuario)=>{
                    return(
                        <tr>
                            <td>{usuario.Id}</td>
                            <td>{usuario.Nombre}</td>
                            <td>{usuario.Rol}</td>
                            <td>{usuario.Estado}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>;
};

const FormularioCreacionUsuarios = ( {
    funcionParaMostrarLaTabla,
    listaUsuarios,
    funcionParaAgregarUnUsuario,
} )=> {
    const [idUsuario,setIdUsuario] = useState ();
    const [nombreUsuario,setNombreUsuario] = useState ();
    const [rolUsuario,setRolUsuario] = useState ();
    const [estadoUsuario,setEstadoUsuario] = useState ();
    
    const enviarAlBackend = ()=> {
        console.log("Id: ", idUsuario, "Nombre: ", nombreUsuario, "Rol: ",rolUsuario, "Estado: ",estadoUsuario);
        toast.success("Usuario creado exitosamente");
        funcionParaMostrarLaTabla(true);
        funcionParaAgregarUnUsuario([
            ...listaUsuarios,
            {Id:idUsuario, Nombre:nombreUsuario, Rol:rolUsuario, Estado:estadoUsuario},
        ]);
    };

    //useEffect(() => {
    //    console.log("Hola, de nuevo Yo un useEffect")
    //},[]);

    //useEffect( () => {
    //    console.log("Esta es una funcion que se ejecuta cada que cambia el valor del ID del usuario")
    //    console.log("El valor de la variable es: ", idUsuario )
    // }, [idUsuario] )

    return <div>
        <div className="rp_subtitulo">INGRESE EL ID DEL USUARIO Y LOS ROLES A MODIFICAR</div>
            <form className="tabla">
                <tr>
                    <td><p>ID del Usuario:</p></td>
                    <td><input 
                    onChange={(e) => {setIdUsuario(e.target.value)}} 
                    className="input_m" type="text"  
                    placeholder="Id Usuario"></input></td>
                </tr>

                <tr>
                    <td><p>Nombre del Usuario:</p></td>
                    <td><input 
                    onChange={(e) => {setNombreUsuario(e.target.value)}} 
                    className="input_m" type="text" 
                    placeholder="Nombre Usuario"></input></td>
                </tr>
            
                <tr>
                    <td><p>Rol Autorizado:</p></td>
                    <td><p>< select 
                    onChange={(e) => {setRolUsuario(e.target.value)}} 
                    className="select" >
                        <option selected disabled>Seleccione Tipo Usuario</option>
                        <option value="administrador">Administrador</option>
                        <option value="vendedor">Vendedor</option>
                    </select></p></td> 
                </tr>
                
                <tr>
                    <td><p>Estado Usuario:</p></td>                
                    <td><p><select 
                    onChange={(e) => {setEstadoUsuario(e.target.value)}} 
                    className="select">
                        <option selected disabled>Seleccione Estado Usuario</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="autorizado">Autorizado</option>
                        <option value="no_autorizado">No autorizado</option>
                    </select></p></td> 
                </tr>
                
                <tr>
                    <td><input className="boton_m" type="reset" 
                    value="Borrar"/></td>
                    <td><button  type="button" onClick={enviarAlBackend} className="boton_m">Enviar Datos</button>  
                   </td>
                </tr>
            </form>
    </div>;
};

export default AdminUsuariosPage;