import Sidebar from "../components/Sidebar";
import React, {useState} from "react";
import axios from "axios";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars  } from "@fortawesome/free-solid-svg-icons";
library.add(faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars);

const AdminVentasPage = () => {
    const [datos, setDatos] = useState({
        venta_id: '',
        venta_total: '',
        detalle: '',
        fecha_de_pago: '',
        fecha_de_pago_futura: '',
        responsable: ''
    })

    const entrada = (e) => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
            
        })
    }

    const enviarDatos = async (e) => {
        e.preventDefault();

        //Alert para mostrar los datos ingresados por el usuarios en el formulario
        alert("Los datos del pedido ingresado son: \nID: "+ datos.venta_id +
         "\nVenta total: " + datos.venta_total+ 
         "\nDetalle: " + datos.detalle+ 
         "\nFecha de Pago: " + datos.fecha_de_pago+ 
         "\nFecha de Pago Futura: " + datos.fecha_de_pago_futura+ 
         "\nResponsable: " + datos.responsable);

         //Peticion POST a la base de datos. Escribe el registro del formulario en Mongo
         const options = {
            method: 'POST',
            url: 'http://localhost:3001/ventas',
            headers: {'Content-Type': 'application/json'},
            data: {
              venta_id: datos.venta_id,
              venta_total: datos.venta_total,
              detalle: datos.detalle,
              fecha_de_pago: datos.fecha_de_pago,
              fecha_de_pago_futura: datos.fecha_de_pago_futura,
              responsable: datos.responsable
            }
          };
          
          await axios.request(options).then(function (response) {
            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
          });
    }

    return (
        <div>
            <div className="wrapper">
                <Sidebar icono = {faSearchDollar} titulo = 'REGISTRAR VENTAS'/>

                <div className="principal">
                    <div className="Menu">
                        <div className="rp_titulo">REGISTRAR VENTAS</div>
                        <div className="rp_subtitulo">INGRESE LA INFORMACION DEL PEDIDO</div>
                        
                        <div className="rp_formulario1">
                            <form onSubmit={enviarDatos}>
                                <table className="tabla">
                                    <tr>
                                        <td><p>Venta ID:</p></td>
                                        <td><p><input className="input_m" type="text" id="venta_id" name="venta_id" size="30" onChange={entrada}/></p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Venta Total: </p></td>
                                        <td><p><input className="input_m" type="text" id="venta_total" name="venta_total" size="30" onChange={entrada}/></p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Detalle: </p></td>
                                        <td><p><input className="input_m" type="text" id="detalle" name="detalle" size="30" onChange={entrada}/></p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Fecha de Pago: </p></td>
                                        <td><p><input className="input_m" type="date" id="fecha_de_pago" name="fecha_de_pago" size="30" onChange={entrada}/></p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Fecha de Pago Futura:&emsp;&emsp;</p></td>
                                        <td><p><input className="input_m" type="date" id="fecha_de_pago_futura" name="fecha_de_pago_futura" size="30" onChange={entrada}/></p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Responsable: </p></td>
                                        <td><p><input className="input_m" type="text" id="responsable" name="responsable" size="30" onChange={entrada}/></p></td>
                                    </tr>
                                    <tfoot>
                                    <tr>
                                        <td colSpan="2">
                                            <button className="boton_m" type="submit">Ingresar Pedido</button>
                                        </td>
                                    </tr>
                                        </tfoot>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminVentasPage;