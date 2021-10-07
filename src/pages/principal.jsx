import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars  } from "@fortawesome/free-solid-svg-icons";

const Principal = () => {
    return (
        <body className = 'bodyMain'>

            <div className="rp_subtitulo">BIENVENIDO</div>
            
            <div class="container overflow-hidden" id="grid">
                <div class="row gx-5 gy-3">
                    <div class="col-lg-6">  
                        <Link to = '/registro_productos'>
                    <div class="p-3 bg-light">
                        <FontAwesomeIcon icon={faCartArrowDown} size="5x" color='#00ADB5'/>           
                        <p>Productos</p>
                    </div></Link>
                    </div>   
                    <div class="col-lg-6">
                        <Link to = '/registro_estado_ventas'>
                    <div class="p-3 bg-light">
                        <FontAwesomeIcon icon={faSearchDollar} size="5x" color='#00ADB5'/>
                        <p>Ventas</p>
                    </div></Link>
                    </div>                  
                    <div class="col-lg-12">
                        <Link to = '/admin_usuariosSprint3'>
                    <div class="p-3 bg-light">
                        <FontAwesomeIcon icon={faUsersCog} size="5x" color='#00ADB5'/>                      
                        <p>Gestion de Usuarios</p>
                        </div></Link>
                    </div>
                </div>
            </div>
        </body>
    )
};

export default Principal;