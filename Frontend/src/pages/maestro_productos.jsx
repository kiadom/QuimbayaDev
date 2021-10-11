import Sidebar from "../components/Sidebar";
import React, {useEffect, useState, useRef} from "react";

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from "nanoid";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars, faPencilAlt, faTrash, faBarcode} from "@fortawesome/free-solid-svg-icons";
//library.add(faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars, faPencilAlt,faTrash);
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet"></link>

const EstadoProductosPage = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [productos, setProductos] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Asignar Rol' );

    useEffect(async()=>{

        const obtenerProductos = async() => {
            const options = {
                method: 'GET', 
                url: 'http://localhost:3001/productos'
            };

        await axios.
            request(options).
            then(function (response) {
                setProductos(response.data.body);
        })
        .catch(function (error) {
            console.error(error);
        });
    }
    
        //obtener lista de productos desde el backend
        if(mostrarTabla){
            obtenerProductos();
        }
    },[mostrarTabla]);

    useEffect(()=>{
        if(mostrarTabla){
            setTextoBoton('Crear Producto');
        }
        else{
            setTextoBoton('Ver Listado Productos');
        }
    },[mostrarTabla]);

    return (
        <div>
            <div className="wrapper">
                <Sidebar icono = {faBarcode} titulo = 'PRODUCTOS'/>

                <div className="principal">
                    <div className="Menu">
                        <div className="rp_titulo">MAESTRO DE PRODUCTOS</div>
                        <div className="rend_Dinamica">
                            <button onClick={()=>{
                                setMostrarTabla(!mostrarTabla);
                                }} 
                                className="boton_m" >{textoBoton}
                            </button>
                        </div>
                        <div className="rp_formulario">
                            {mostrarTabla ? (<TablaProductos listaProductos={productos} />) : 
                            (<FormularioCreacionProductos 
                                setMostrarTabla={setMostrarTabla}
                                listaProductos={productos}
                                setProductos={setProductos} />)}
                            <ToastContainer position= "bottom-center" autoClose= {1000}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TablaProductos = ({listaProductos})=> {

    const form = useRef(null);
    useEffect(()=>{
        console.log("Este es el listado de productos en el componente de Tabla", listaProductos);
    },[listaProductos]);

    const submitEdit = (e)=>{
        e.preventDefault();
        const fd = new FormData(form.current);
        console.log(e);
    };

    return (
        <div>
        <div className="rp_subtitulo">PRODCUTOS</div>
        <form ref={form} onSubmit={submitEdit}>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Producto</th>
                        <th>Descripcion</th>
                        <th>Valor Unitario</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProductos.map((producto)=>{
                        return <FilaProducto key = {nanoid()} producto={producto}/>;
                    })}
                </tbody>
            </table>
        </form>
        
        </div>
    );
};

const FilaProducto = ({producto}) =>{
    const form = useRef(null);
    
    const submitForm = async (e)=>{
        e.preventDefault();
        const fd = new FormData(form.current);

        const actualProducto = {};
        fd.forEach((value, key) => {
            actualProducto[key]=value;
        });

        const options = {
            method: 'PATCH',
            url: 'http://localhost:3001/productos',
            headers: {'Content-Type': 'application/json'},
            data: {
              producto_id: actualProducto.producto_id,
              descripcion_producto: actualProducto.descripcion_producto,
              valor_unitario: actualProducto.valor_unitario,
              estado: actualProducto.estado
            },
          };
        
        await axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            toast.success("Producto actualizado con exito");
          })
          .catch(function (error) {
            console.error(error);
            toast.error("Error al actualizar el Producto");
          });
          
        //setMostrarTabla(true)
        //console.log("Datos del Form Enviados", nuevoUsuario);
    };

    const [edit, setEdit] = useState(false);
    return(
        <tr>
            {edit? (
                <>
                    <td><input type="text" className="input_m" defaultValue={producto.producto_id} /></td>
                    <td><input type="text" className="input_m" defaultValue={producto.descripcion_producto} /></td>
                    <td><input type="text" className="input_m" defaultValue={producto.valor_unitario} /></td>
                    <td><input type="text" className="input_m" defaultValue={producto.estado} /></td>
                </>
            ):(
                <>
                    <td>{producto.producto_id}</td>
                    <td>{producto.descripcion_producto}</td>
                    <td>{producto.valor_unitario}</td>
                    <td>{producto.estado}</td>
                </>
            )}
            <td className="acciones">
                {edit?(
                    <div onClick={() => setEdit(!edit)} className="boton_confirm">
                    <FontAwesomeIcon icon={faCheck}/>
                    </div>
                ):(
                    <div onClick={() => setEdit(!edit)} className="boton_update">
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

const FormularioCreacionProductos = ({setMostrarTabla, listaProductos, setProductos })=> {
    const form = useRef(null);
    
    const submitForm = async (e)=>{
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoProducto = {};
        fd.forEach((value, key) => {
            nuevoProducto[key]=value;
        });

        const options = {
            method: 'POST',
            url: 'http://localhost:3001/productos',
            headers: {'Content-Type': 'application/json'},
            data: {
              producto_id: nuevoProducto.producto_id,
              descripcion_producto: nuevoProducto.descripcion_producto,
              valor_unitario: nuevoProducto.valor_unitario,
              estado: nuevoProducto.estado
            },
          };
        
        await axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            toast.success("Producto agregado con exito");
          })
          .catch(function (error) {
            console.error(error);
            toast.error("Error al crear el Producto");
          });
          
        //setMostrarTabla(true)
        //console.log("Datos del Form Enviados", nuevoUsuario);
    };

    return <div>
        <div className="rp_subtitulo">INGRESE EL PRODUCTO</div>
            <form ref={form} onSubmit={submitForm} >
                <table className="tabla">
                    <tr>
                        <td><p>ID DEL PRODUCTO:</p></td>
                        <td><input
                            name="producto_id"  
                            className="input_m" 
                            type="text"
                            placeholder="Id Producto" required
                            required/>
                        </td>
                    </tr>

                    <tr>
                        <td><p>DESCRIPCION:</p></td>
                        <td><input 
                            name="descripcion_producto" 
                            className="input_m" 
                            type="text"
                            placeholder="Descripcion del producto" 
                            required/>
                        </td>
                    </tr>

                    <tr>
                        <td><p>VALOR:</p></td>
                        <td><input 
                            name="valor_unitario" 
                            className="input_m" 
                            type="text"
                            placeholder="" 
                            required/>
                        </td>
                    </tr>

                    <tr>
                        <td><p>ESTADO:</p></td>
                        <td><input 
                            name="estado" 
                            className="input_m" 
                            type="text"
                            placeholder="Estado del producto" 
                            required/>
                        </td>
                    </tr>
                
                    <tr>
                        <td>
                            <button  
                                type="submit" 
                                className="boton_m"
                                >Actualizar
                            </button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
}

export default EstadoProductosPage;