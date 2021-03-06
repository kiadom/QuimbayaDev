import Sidebar from "../components/Sidebar";
import React, {useEffect, useState, useRef} from "react";

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars, faPencilAlt, faTrash, faBarcode} from "@fortawesome/free-solid-svg-icons";
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
    useEffect(()=>{
        console.log("Este es el listado de productos en el componente de Tabla",listaProductos)
    },[listaProductos]);

    return (
        <div>
        <div className="rp_subtitulo">PRODUCTOS</div>
        <table className="table">
            
            <thead>
                <tr>
                    <th>ID Producto</th>
                    <th>Descripci??n</th>
                    <th>Valor unitario</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {listaProductos.map((producto)=>{
                    return(
                        <tr>
                            <td>{producto.producto_id}</td>
                            <td>{producto.descripcion_producto}</td>
                            <td>{producto.valor_unitario}</td>
                            <td>{producto.estado}</td>
                            <td className="edit">
                                <button type="button" class="btn btn-info">
                                    <FontAwesomeIcon icon={faPencilAlt}/>
                                </button>
                                    
                                <button type="button" class="btn btn-secondary">
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
        </div>;
};

export default EstadoProductosPage;