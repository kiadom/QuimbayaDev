import logo from '../images/logologin.png';
import React, { useState } from "react";
import {GoogleLogin} from 'react-google-login';
import axios from "axios";

const Index = () => {

    const [count, setCount] = useState(0)

    const intentoFallido =(response) =>{
        alert("Autentificación fallida")
    }

    const responseGoogle = (response) => {
            console.log(response.profileObj)
            window.open("./principal", "_self");

            const options = {
                method: 'POST',
                url: 'http://localhost:3001/usuarios',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    usuario_email: response.profileObj.email,
                    nombre: response.profileObj.name,
                    rol: 'pendiente',
                    estado: 'pendiente'
                }
            };
    
            axios.request(options).then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        }
        
    const [datos, setDatos] = useState({
        user_p: '',
        password: ''
    })

    const entrada = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value

        })
    }

    const enviarDatos = (e) => {
        e.preventDefault();

        let credencial = new Map();
        credencial.set("administrador", "admin")
        credencial.set("vendedeor", "vendedor")

        if (credencial.has(datos.user_p)) {
            if (datos.password === credencial.get(datos.user_p)) {
                alert("Bienvenido " + datos.user_p);
                window.open("./principal", "_self");
                return false;
            } else {
                alert("Datos incorrectos")
                if (count === 3) {
                    alert("Excedió el numero de intentos permitidos. \nBLOQUEADO \ncomuniquese con TI")
                    document.getElementById('boton').disabled = true;
                    document.getElementById('user').disabled = true
                    document.getElementById('password').disabled = true;
                }
            }

        } else {
            alert("Datos incorrectos")
            if (count === 3) {
                alert("Excedió el numero de intentos permitidos. \nBLOQUEADO \nComuniquese con TI")
                document.getElementById('boton').disabled = true;
                document.getElementById('user').disabled = true
                document.getElementById('password').disabled = true;
            }
        }
    }

    return (
        <body className='bodyAuth'>
            <div className="contenedor">
                <div className="contenedor-login">

                    <div className="contenedor-logo">
                        <img className="logo" src={logo} alt="logo-quimbaya"></img>
                    </div>

                    <form className="contenedor-info" id="form" name="Ingreso" onSubmit={enviarDatos}>
                        <input className="input" id="user" name="user_p" type="text" placeholder="Usuario" onChange={entrada} required=""></input>
                        <input className="input" id="password" name="password" type="password" placeholder="Contraseña" onChange={entrada} required=""></input>
                        <button className="boton" id="boton" type="submit" onClick={() => setCount(count + 1)}>Ingresar</button>
                        o
                        <GoogleLogin
                            clientId="622650298319-7cvili8fst11lvoi3cbc2l23sotjq939.apps.googleusercontent.com"
                            buttonText="Ingresar con Google"
                            onSuccess={responseGoogle}
                            onFailure={intentoFallido}
                            cookiePolicy={'single_host_origin'}
                        />
                    </form>

                </div>
            </div>
        </body>
    )
};

export default Index;