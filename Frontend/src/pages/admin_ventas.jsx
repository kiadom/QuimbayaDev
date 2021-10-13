import Sidebar from "../components/Sidebar";
import React, {useEffect, useState, useRef} from "react";

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from "nanoid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersCog, faPencilAlt,faTrash,faCheck} from "@fortawesome/free-solid-svg-icons";

//library.add(faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars, faPencilAlt,faTrash);
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet"></link>

const AdminVentasPage = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [ventas, setVentas] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Registrar Venta' );

    useEffect(async()=>{

        const obtenerVentas = async() => {
            const options = {
                method: 'GET', 
                url: 'http://localhost:3001/ventas'
            };

        await axios.
            request(options).
            then(function (response) {
                setVentas(response.data.body);
        })
        .catch(function (error) {
            console.error(error);
        });
    }

        //obtener lista de ventas desde el backend
        if(mostrarTabla){
            obtenerVentas();
        }
    },[mostrarTabla]);

    useEffect(()=>{
        if(mostrarTabla){
            setTextoBoton('Registrar Venta');
        }
        else{
            setTextoBoton('Ver Reporte Ventas');
        }
    },[mostrarTabla]);

    return (
        <div>
            <div className="wrapper">
                <Sidebar icono = {faUsersCog} titulo = 'REGISTRAR VENTAS'/>

                <div className="principal">
                    <div className="Menu">
                        <div className="rp_titulo">REGISTRAR VENTAS</div>
                        <div className="rend_Dinamica">
                            <button onClick={()=>{
                                setMostrarTabla(!mostrarTabla);
                                }} 
                                className="boton_m" >{textoBoton}
                            </button>
                        </div>
                        <div className="rp_formulario">
                            {mostrarTabla ? (<TablaVentas listaVentas={ventas} />) : 
                            (<FormularioCreacionVentas 
                                setMostrarTabla={setMostrarTabla}
                                listaVentas={ventas}
                                setVentas={setVentas} />)}
                            <ToastContainer position= "bottom-center" autoClose= {1000}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TablaVentas = ({listaVentas})=> {

    const form = useRef(null);
    useEffect(()=>{
        console.log("Este es el listado de ventas en el componente de Tabla",listaVentas)
    },[listaVentas]);

    const submitEdit = (e)=>{
        e.preventDefault();
        const fd = new FormData(form.current);
        console.log(e);
    };

    return (
        <div>
        <div className="rp_subtitulo">LISTADO DE VENTAS</div>
        <form ref={form} onSubmit={submitEdit}>
            <table className="table">            
                <thead>
                    <tr>
                        <th>ID Venta</th>
                        <th>Detalle</th>
                        <th>Cantidad</th>
                        <th>Valor Producto</th>
                        <th>Total Venta</th>
                        <th>Fecha Venta</th>
                        <th>Fecha De Pago</th>
                        <th>Cliente ID</th>
                        <th>Nombre Cliente</th>
                        <th>Vendedor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaVentas.map((venta)=>{
                        return <FilaVenta key = {nanoid()} venta={venta}/>
                    })}
                </tbody>
            </table>

        </form>                
        </div>
    );
};

const FilaVenta = ({venta}) => {
    console.log("venta", venta);
    const [edit, setEdit] = useState(false);
    const [infoNuevoEstado, setinfoNuevoEstado]= useState({
        venta_id: venta.venta_id,
        detalle: venta.detalle,
        cantidad: venta.cantidad,
        precio_unitario_por_producto: venta.precio_unitario_por_producto,
        venta_total: venta.venta_total,
        fecha_venta: venta.fecha_venta,
        client_id: venta.client_id,
        nombre_cliente: venta.nombre_cliente,
        vendedor: venta.vendedor,
        estado: venta.estado,
    })

const actualizarVenta = async () => {
    console.log(infoNuevoEstado);

    const options = {
        method: 'PATCH',
        url: 'http://localhost:3001/admin_ventas/' + infoNuevoEstado.venta_id,
        headers: {'Content-Type': 'application/json'},
        data: {
            estado: infoNuevoEstado.estado
        },
    };
}

const eliminarVenta = ()=>{
        //aqui va el código a borrar
    }
    return(
        <tr>
            {edit?(
                <>
                    <td>{venta.venta_id}</td>
                    <td>{venta.detalle}</td>
                    <td>{venta.cantidad}</td>
                    <td>{venta.precio_unitario_por_producto}</td>
                    <td>{venta.venta_total}</td>
                    <td>{venta.fecha_venta}</td>
                    <td>{venta.client_id}</td>
                    <td>{venta.nombre_client}</td>
                    <td>{venta.vendedor}</td>
                    <td>{venta.estado}</td>
                    
                </>
                ):(
                <>
                    <td>{venta.venta_id}</td>
                    <td>{venta.detalle}</td>
                    <td>{venta.cantidad}</td>
                    <td>{venta.precio_unitario_por_producto}</td>
                    <td>{venta.venta_total}</td>
                    <td>{venta.fecha_venta}</td>
                    <td>{venta.client_id}</td>
                    <td>{venta.nombre_cliente}</td>
                    <td>{venta.vendedor}</td>
                    <td>{venta.estado}</td>
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
                        
                    <div onClick={()=>className="boton_delete">
                        <FontAwesomeIcon icon={faTrash}/>
                    </div>
            </td>
        </tr>
    );
}
   
                            
const FormularioCreacionVentas = ({setMostrarTabla, listaVentas, setVentas })=> {
    const form = useRef(null);
    

    const submitForm = async (e)=>{
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevaVenta = {};
        fd.forEach((value, key) => {
            nuevaVenta[key]=value;
        });

        const options = {
            method: 'POST',
            url: 'http://localhost:3001/ventas',
            headers: {'Content-Type': 'application/json'},
            data: {
              venta_id: nuevaVenta.venta_id,
              detalle: nuevaVenta.detalle,
              cantidad: nuevaVenta.cantidad,
              precio_unitario_por_producto: nuevaVenta.precio_unitario_por_producto,
              venta_total: nuevaVenta.venta_total,
              fecha_venta: nuevaVenta.fecha_venta,
              client_id: nuevaVenta.client_id,
              nombre_cliente: nuevaVenta.nombre_cliente,
              vendedor: nuevaVenta.vendedor,
              estado: nuevaVenta.estado,
            }
          };
          
        await axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            toast.success("Venta agregada con exito")
        })
        .catch(function (error) {
           console.error(error);
           toast.error("Error al crear venta");
        });

        //setMostrarTabla(true)
        //console.log("Datos del Form Enviados", nuevoUsuario);
    };

    return <div>
        <div className="rp_subtitulo">INGRESE LA INFORMACION DEL PEDIDO</div>
            <form ref={form} onSubmit={submitForm} >
                <table className="tabla">
                    <tr>
                        <td><p>Venta ID:</p></td>
                        <td><input
                            name="venta_id"  
                            className="input_m" 
                            type="text"
                            placeholder="Id Venta" required
                            required/>
                        </td>
                    </tr>

                    <tr>
                        <td><p>Detalle:</p></td>
                        <td><input 
                            name="detalle" 
                            className="input_m" 
                            type="text"
                            placeholder="Detalle" 
                            required/>
                        </td>
                    </tr>
                
                    <tr>
                        <td><p>Cantidad:</p></td>
                        <td><input 
                            name="cantidad" 
                            className="input_m" 
                            type="text"
                            placeholder="Cantidad" 
                            required/>
                        </td>
                    </tr>
                    
                    <tr>
                        <td><p>Valor Producto:</p></td>
                        <td><input 
                            name="precio_unitario_por_producto" 
                            className="input_m" 
                            type="text"
                            placeholder="Valor Producto"
                            required/>
                        </td>
                    </tr>

                    <tr>
                        <td><p>Total Venta:</p></td>
                        <td><input 
                            name="venta_total" 
                            className="input_m" 
                            type="text"
                            placeholder="Total Venta"
                            required/>
                        </td>
                    </tr>
                    
                    <tr>
                        <td><p>Fecha Venta:</p></td>
                        <td><input 
                            name="fecha_venta" 
                            className="input_m" 
                            type="date"
                            required/>
                        </td>
                    </tr>

                    <tr>
                        <td><p>Cliente ID:</p></td>
                        <td><input 
                            name="cliente_id" 
                            className="input_m" 
                            type="text"
                            placeholder="ID Cliente"
                            required/>
                        </td>
                    </tr>

                    <tr>
                        <td><p>Nombre Cliente:</p></td>
                        <td><input 
                            name="nombre_cliente" 
                            className="input_m" 
                            type="text"
                            placeholder="Nombre Cliente"
                            required/>
                        </td>
                    </tr>

                    <tr>
                        <td><p>Vendedor:</p></td>
                        <td><input 
                            name="vendedor" 
                            className="input_m" 
                            type="text"
                            placeholder="Vendedor"
                            required/>
                        </td>
                    </tr>

                    <tr>
                        <td><p>Estado Venta:</p></td>                
                        <td><p>
                            <select 
                                className="select"
                                name="estado" 
                                id="estado" required>
                                    <option selected disabled value="">Seleccione</option>
                                    <option value="en_proceso">En Proceso</option>
                                    <option value="cancelada">Cancelada</option>
                                    <option value="entregada">Entregada</option>
                            </select>
                        </p></td> 
                    </tr>
                    
                    <tr>
                        <td>
                            <button  
                                type="submit" 
                                className="boton_m"
                                >Ingresar Venta
                            </button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>;
};

export default AdminVentasPage;