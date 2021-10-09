import Sidebar from "../components/Sidebar";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBarcode, faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars  } from "@fortawesome/free-solid-svg-icons";
library.add(faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars);

const EstadoProductosPage = () => {
    
    return (
        <div>
            <div className="wrapper">
                <Sidebar icono = {faBarcode} titulo = 'PRODUCTOS'/>

                <div className= "principal">
                    <div className="Menu">
                        <div className="rp_titulo">MAESTRO DE PRODUCTOS</div>
                        <div className="rp_subtitulo">PRODUCTOS</div>

                        <div className="rp_formulario">
                            <form action=''>
                                <table className="tabla_">
                                    <tr>
                                        <td><p>Producto ID:</p></td>
                                        <td><p><input className="input_m" type="text" id="producto_id" name="producto_id" size="30"/></p></td>
                                        <td>
                                        <button className="btn btn-info" type="button" onclick='ingresarEstado()'>Buscar</button>
                                    </td>
                                    </tr>
                                </table>
                                
                            </form>
                            <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Producto ID</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Valor unitario</th>
                                <th scope="col">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">1212</th>
                                <td>Pantalón</td>
                                <td>12000</td>
                                <td>Disponible</td>
                                <td>
                                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-info">Editar</button>
                                <button type="button" class="btn btn-secondary">Eliminar</button>
                                </div>
                                </td>
                                </tr>
                                <tr>
                                <th scope="row">1313</th>
                                <td>Camisa</td>
                                <td>9000</td>
                                <td>No Disponible</td>
                                <td>
                                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-info">Editar</button>
                                <button type="button" class="btn btn-secondary">Eliminar</button>
                                </div>
                                </td>
                                </tr>
                                <tr>
                                <th scope="row">1414</th>
                                <td>Medias</td>
                                <td>5000</td>
                                <td>No Disponible</td>
                                <td>
                                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-info">Editar</button>
                                <button type="button" class="btn btn-secondary">Eliminar</button>
                                </div>
                                </td>
                                </tr>

                            </tbody>
                            </table>
                    
                        </div>
                    
                        
                    
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstadoProductosPage;