import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode, faCartArrowDown, faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars  } from "@fortawesome/free-solid-svg-icons";
library.add(faBarcode, faCartArrowDown, faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars);

const Sidebar = (props) => {
    return (    
        <div className="wrapper">
            <div className="sidebar">
                <div className="EncabezadoModulo">
                    <FontAwesomeIcon icon={props.icono} size="5x" color='#00ADB5'/> 
                    <h5>{props.titulo}</h5>
                </div>
                <ul>
                    <li><Link to = '/principal'>
                        <FontAwesomeIcon icon={faHome}/>
                        <span className="item"></span>  Inicio
                        </Link>
                    </li>
                    <li title="Registro Productos">
                        <Link to = '/registro_productos'>
                        <FontAwesomeIcon icon={faCartArrowDown}/>
                        <span className="item"></span>  Registrar Productos
                        </Link>
                    </li><ul><li title="Maestro Productos">
                        <Link to = '/maestro_productos'>
                        <FontAwesomeIcon icon={faBarcode}/>
                        <span className="item"></span>  Productos
                        </Link>
                    </li></ul>
                    
                    <li title="Registrar Pedidos Realizados por los Clientes">
                        <Link to = '/admin_ventas'>
                        <FontAwesomeIcon icon={faSearchDollar}/>
                        <span className="item"></span>  Registrar Ventas
                        </Link>
                    </li>
                    <ul>
                    <li title="Establecer el Estado Actual de una Venta">
                        <Link to = '/registro_estado_ventas'>
                            <FontAwesomeIcon icon={faThermometerThreeQuarters}/>
                            <span className="item"></span>  Ventas
                        </Link>
                    </li>
                    </ul>
                    <li title="Restringir y Otorgar Accesos al Sistema">
                        <Link to = '/admin_usuariosSprint3'>
                            <FontAwesomeIcon icon={faUsersCog}/>  
                            <span className="item"></span>  Gestión de Usuarios
                        </Link>
                    </li>
                    <li title="Salir del Sistema">
                        <Link to = '/'>
                            <FontAwesomeIcon icon={faSignOutAlt}/> 
                            <span className="item"></span>  Salir
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar