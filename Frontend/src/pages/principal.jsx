import { Link} from "react-router-dom";
import Index from '../pages';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faSearchDollar, faUsersCog} from "@fortawesome/free-solid-svg-icons";
import { useGoogleLogin } from 'react-google-login'

const Principal = () => {
    let isSignedIn = true;

    return (
        <body className = 'bodyMain'>

            <div className="rp_subtitulo">BIENVENIDO</div>
            
            <div className="container overflow-hidden" id="grid">
                <div className="row gx-5 gy-3">
                    <div className="col-lg-6">  
                        {isSignedIn ? <Link to = '/maestro_productos'>
                    <div className="p-3 bg-light">
                        <FontAwesomeIcon icon={faCartArrowDown} size="5x" color='#00ADB5'/>           
                        <p>Productos</p>
                    </div></Link> : <Index />}
                    </div>   
                    <div className="col-lg-6">
                        <Link to = '/admin_ventas'>
                    <div className="p-3 bg-light">
                        <FontAwesomeIcon icon={faSearchDollar} size="5x" color='#00ADB5'/>
                        <p>Ventas</p>
                    </div></Link>
                    </div>                  
                    <div className="col-lg-12">
                        <Link to = '/admin_usuarios'>
                    <div className="p-3 bg-light">
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