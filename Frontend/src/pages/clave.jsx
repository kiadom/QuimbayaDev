import logologin from '../images/logologin.png'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars  } from "@fortawesome/free-solid-svg-icons";
library.add(faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars);

const ClavePage = () => {
    return (
        <body className = 'bodyAuth'>
            <div class="contenedor">
                <div class="contenedor-login">
                    
                <div class="contenedor-logo">
                    <img class="logo" src={logologin} alt=""/>
                </div>

                <form>
                    <input class="input-pass" id="password-old" name="password-old" type="password" placeholder="Contraseña actual" required/>
                    <input class="input-pass" id="password-new" name="password-new" type="password" placeholder="Nueva contraseña" required/>
                    <input class="input-pass" id="password-copy" name="password-copy" type="password" placeholder="Repetir contraseña" required/>
                    <button class="boton" type="submit" onclick="cambiarContrasena()">Cambiar</button>
                </form>

                </div>
            </div>
        </body>
    )
};

export default ClavePage;