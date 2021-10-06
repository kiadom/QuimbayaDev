import Sidebar from "../components/Sidebar";
import React, {useState} from "react";
import axios from "axios";

import { library } from '@fortawesome/fontawesome-svg-core';
import {faCartArrowDown, faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars  } from "@fortawesome/free-solid-svg-icons";
library.add(faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars);

const RegistroProductosPage = () => {

    const [datos, setDatos] = useState({
        producto_id: '',
        descripción_producto: '',
        valor_unitario: '',
        estado:''
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
        alert("Los datos ingresados son: "+
        "\n \nProducto ID: " + datos.producto_id +
        "\nDescripción: " + datos.descripción_producto+ 
        "\nValor Unitario: " + datos.valor_unitario+
        "\nEstado: " + datos.estado);

        //Peticion POST a la base de datos. Escribe el registro del formulario en Mongo
        const options = {
            method: 'POST',
            url: 'http://localhost:3001/productos',
            headers: {'Content-Type': 'application/json'},
            data: {
              producto_id: datos.producto_id,
              descripcion_producto: datos.descripción_producto,
              valor_unitario: datos.valor_unitario,
              estado: datos.estado
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
                <Sidebar icono = {faCartArrowDown} titulo = 'REGISTRO PRODUCTOS'/>

                <div className= "principal">
                    <div className="Menu">
                        <div className="rp_titulo">REGISTRO PRODUCTOS</div>
                        <div className="rp_subtitulo">INGRESE PRODUCTO</div>

                        <div className="rp_formulario">
                            <form onSubmit={enviarDatos}>
                                <table className="tabla">
                                    <tr>
                                        <td><p>Producto ID:</p></td>
                                        <td><p><input className="input_m" type="text" id="producto_id" name="producto_id" onChange={entrada}/></p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Descripción Producto:</p></td>
                                        <td><p><input className="input_m" type="textarea" id="descripción_producto"name="descripción_producto" onChange={entrada}/></p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Valor Unitario:</p></td>
                                        <td><p><input className="input_m" type="text" id="valor_unitario" name="valor_unitario" onChange={entrada}/></p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Estado:</p></td>                
                                        <td><p><select className="select" id="estado" name="estado" onChange={entrada}>
                                            <option selected disabled>Elija estado del producto</option>
                                            <option value="disponible">Disponible</option>
                                            <option value="no_disponible">No disponible</option>
                                        </select></p></td> 
                                    </tr>
                                    <tfoot><tr>
                                            <td colSpan="2"> 
                                                <button className="boton_m" type="submit">INGRESAR PRODUCTO</button>
                                            </td>
                                    </tr></tfoot>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistroProductosPage;