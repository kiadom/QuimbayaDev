import Sidebar from "../components/Sidebar";
import React, {useEffect, useState, useRef} from "react";

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from "nanoid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars, faPencilAlt,faTrash} from "@fortawesome/free-solid-svg-icons";
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
    useEffect(()=>{
        console.log("Este es el listado de ventas en el componente de Tabla",listaVentas)
    },[listaVentas]);

    return (
        <div>
        <div className="rp_subtitulo">LISTADO DE VENTAS</div>
        <table className="table">
            
            <thead>
                <tr>
                    <th>ID VENTA</th>
                    <th>VENTA TOTAL</th>
                    <th>DETALLE</th>
                    <th>FECHA DE PAGO</th>
                    <th>FECHA DE PAGO FUTURA</th>
                    <th>RESPONSABLE</th>
                </tr>
            </thead>
            <tbody>
                {listaVentas.map((venta)=>{
                    return(
                        <tr>
                            <td>{venta.venta_id}</td>
                            <td>{venta.venta_total}</td>
                            <td>{venta.detalle}</td>
                            <td>{venta.fecha_de_pago}</td>
                            <td>{venta.fecha_de_pago_futura}</td>
                            <td>{venta.responsable}</td>
                            <td venta="edit">
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
              venta_total: nuevaVenta.venta_total,
              detalle: nuevaVenta.detalle,
              fecha_de_pago: nuevaVenta.fecha_de_pago,
              fecha_de_pago_futura: nuevaVenta.fecha_de_pago_futura,
              responsable: nuevaVenta.responsable,
            }
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
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
                        <td><p>Venta Total:</p></td>
                        <td><input 
                            name="venta_total" 
                            className="input_m" 
                            type="text"
                            placeholder="Venta Total" 
                            required/>
                        </td>
                    </tr>
                
                    <tr>
                        <td><p>Detalle:</p></td>
                        <td><input 
                            name="detalle" 
                            className="input_m" 
                            type="text"
                            placeholder="detalle" 
                            required/>
                        </td>
                    </tr>
                    
                    <tr>
                        <td><p>Fecha de Pago::</p></td>
                        <td><input 
                            name="fecha_de_pago" 
                            className="input_m" 
                            type="date"
                            required/>
                        </td>
                    </tr>

                    <tr>
                        <td><p>Fecha de Pago Futura:</p></td>
                        <td><input 
                            name="fecha_de_pago_futura" 
                            className="input_m" 
                            type="date"
                            required/>
                        </td>
                    </tr>
                    
                    <tr>
                        <td><p>Responsable:</p></td>
                        <td><input 
                            name="responsable" 
                            className="input_m" 
                            type="text"
                            placeholder="responsable" 
                            required/>
                        </td>
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