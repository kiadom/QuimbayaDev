import logo from '../images/logologin.png';
import React, { useState } from "react";
import GoogleLogin from 'react-google-login';
import axios from "axios";

const Index = () => {

    const [count, setCount] = useState(0)


    const responseGoogle = (response) => {
        window.open("./principal", "_self");
        console.log(response.profileObj);
        console.log(response.profileObj.email)
        console.log(response.profileObj.name)
        const options = {
            method: 'POST',
            url: 'http://localhost:3001/usuarios',
            headers: { 'Content-Type': 'application/json' },
            data: {
                usuario_email: response.profileObj.email,
                nombre: response.profileObj.name,
                rol: 'vendedor',
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
        user: '',
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

        if (credencial.has(datos.user)) {
            if (datos.password === credencial.get(datos.user)) {
                alert("Bienvenido " + datos.user);
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
                        <input className="input" id="user" name="user" type="text" placeholder="Usuario" onChange={entrada} required=""></input>
                        <input className="input" id="password" name="password" type="password" placeholder="Contraseña" onChange={entrada} required=""></input>
                        <button className="boton" id="boton" type="submit" onClick={() => setCount(count + 1)}>Ingresar</button>
                        o
                        <GoogleLogin
                            clientId="622650298319-7cvili8fst11lvoi3cbc2l23sotjq939.apps.googleusercontent.com"
                            buttonText="Ingresar con Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />

                        <div id="g_id_onload"
                            data-client_id="622650298319-7cvili8fst11lvoi3cbc2l23sotjq939.apps.googleusercontent.com"
                            data-context="signin"
                            data-ux_mode="popup"
                            data-login_uri="http://localhost:3000/principal"
                            data-auto_prompt="false">
                        </div>

                        <div class="g_id_signin"
                            data-type="standard"
                            data-shape="rectangular"
                            data-theme="outline"
                            data-text="$ {button.text}"
                            data-size="large"
                            data-logo_alignment="left">
                        </div>

                    </form>

                </div>
            </div>
        </body>
    )
};

export default Index;