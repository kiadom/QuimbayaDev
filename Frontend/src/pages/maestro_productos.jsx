import Sidebar from "../components/Sidebar";
import React, {useEffect, useState, useRef} from "react";

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from "nanoid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faPencilAlt, faTrash, faBarcode} from "@fortawesome/free-solid-svg-icons";

<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet"></link>


const EstadoProductosPage = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [productos, setProductos] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Ver Listado Productos' );
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

    useEffect(async()=>{
        const obtenerProductos = async() => {
            const options = {
                method: 'GET', 
                url: 'http://localhost:3001/productos'
            };

                await axios
                    .request(options)
                    .then(function (response) {
                        setProductos(response.data.body);
                        setEjecutarConsulta(false);
                    })
                    .catch(function (error) {
                    console.error(error);
                    });
        };
        if (ejecutarConsulta) {
            obtenerProductos();
        }
    },[ejecutarConsulta]);

        

    useEffect(()=> {
        //obtener lista de productos desde el backend
            if(mostrarTabla){
                setEjecutarConsulta(true);
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
                            {mostrarTabla ? (<TablaProductos listaProductos={productos} setEjecutarConsulta={setEjecutarConsulta}/>) : 
                            
                            (
                            
                            
                            
                            <FormularioCreacionProductos 
                                setMostrarTabla={setMostrarTabla}
                                listaProductos={productos}
                                setProductos={setProductos} />
                                )}
                            <ToastContainer position= "bottom-center" autoClose= {1000}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TablaProductos = ({listaProductos, setEjecutarConsulta})=> {

    useEffect(()=>{
        console.log("Este es el listado de productos en el componente de Tabla", listaProductos);
    },[listaProductos]);

    return (
        <div>
        <div className="rp_subtitulo">PRODUCTOS</div>

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
                        return (
                            <FilaProducto 
                                key = {nanoid()} 
                                producto={producto}
                                setEjecutarConsulta={setEjecutarConsulta}
                            />
                        )
                    })}
                </tbody>
            </table>

        
        </div>
    );
};

const FilaProducto = ({producto, setEjecutarConsulta}) =>{
    console.log("producto", producto);
    const [edit, setEdit] = useState(false);
    const [infoNuevoProducto, setinfoNuevoProducto] = useState({
        producto_id: producto.producto_id,
        descripcion_producto: producto.descripcion_producto,
        valor_unitario: producto.valor_unitario,
        estado: producto.estado

    });

const actualizarProducto = async () => {
    console.log(infoNuevoProducto);
    //enviar la info al Backend
    const options = {
        method: 'PATCH',
        url: 'http://localhost:3001/productos/' + infoNuevoProducto.producto_id,
        headers: {'Content-Type': 'application/json'},
        data: {
            valor_unitario: infoNuevoProducto.valor_unitario,
            estado: infoNuevoProducto.estado
            },
        };
        
    await axios.request(options).then(function (response) {
        console.log(response.data);
        toast.success("Producto modificado con exito");
        setEdit(false);
        setEjecutarConsulta(true);
        })
        .catch(function (error) {
        console.error(error);
        toast.error("Error al modificar el producto");
        });
};

const eliminarProducto = ()=>{
    //aqui va el código a borrar
}

const refreshPage = ()=>{
    window.location.reload();
  }


    return(
        <tr>
            {edit? (
                <>
                    <td>{producto.producto_id}</td>
                    <td>{producto.descripcion_producto}</td>
                    <td><input 
                            type="text" 
                            className="input_m"
                            name="valor_unitario"
                            required 
                            Value={infoNuevoProducto.valor_unitario} 
                            onChange={(e)=> setinfoNuevoProducto({...infoNuevoProducto, valor_unitario:e.target.value})}
                        /></td>
                    <td><select 
                                className="select"
                                name="estado"
                                required 
                                value={infoNuevoProducto.estado}
                                onChange={(e)=> setinfoNuevoProducto({...infoNuevoProducto, estado:e.target.value})}
                                >
                                <option value="Disponible">Disponible</option>
                                <option value="No disponible">No disponible</option>
                    </select></td>
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
                {edit? (
                    <div onClick={() => actualizarProducto()} className="boton_confirm">
                    <FontAwesomeIcon icon={faCheck}/>
                    </div>

                ) : (
                    <div onClick={() => setEdit(!edit)} className="boton_update">
                    <FontAwesomeIcon icon={faPencilAlt}/>
                    </div>

                )}

                <div onClick={()=>eliminarProducto()} className="boton_delete">
                    <FontAwesomeIcon icon={faTrash}/>
                </div>
            </td>
        </tr>
    );
}


const formatNumber = (valor_unitario)=>
    new Intl.NumberFormat('ES-MX', {
        style: 'currency',
        currency: 'COP'
    }).format(valor_unitario);


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
                            placeholder="Id Producto" 
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
                            placeholder="valor unitario" 
                            required/>
                        </td>
                    </tr>

                    <tr>
                        <td><p>ESTADO:</p></td>
                        <td><p>
                            <select 
                                className="select"     
                                name="estado" 
                                id="estado" required>
                                <option selected disabled value="">Selecione una opción</option>
                                <option value="Disponible">Disponible</option>
                                <option value="No disponible">No disponible</option>
                            </select>
                        </p></td>
                    </tr>
                
                    <tr>
                        <td>
                            <button  
                                type="submit" 
                                className="boton_m"
                                >Guardar
                            </button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
}

export default EstadoProductosPage;