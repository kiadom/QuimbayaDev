import logo from '../images/logologin.png';
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Index = () => {

    const { loginWithRedirect } = useAuth0();

    return (
        <body className='bodyAuth'>
            <div className="contenedor">
                <div className="contenedor-login">

                    <div className="contenedor-logo">
                        <img className="logo" src={logo} alt="logo-quimbaya"></img>
                    </div>
                        <button 
                            onClick={() => loginWithRedirect()}
                            className="boton" id="boton" type="submit">Ingresar
                        </button>

                </div>
            </div>
        </body>
    )
};

export default Index;