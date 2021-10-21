//Se encarga de comprobar que las peticiones sean correctas para poder entrar o cancelarlas si hay problemas o fallas
//Se encarga de configurar la informacion importante como base de datos o cabeceras

//Libreria express para poder utilizar el servidor de Node
const express = require('express'); 

//Modulo de express que permite trabajar con el body de la peticion
const bodyParser = require('body-parser');

//El router permite separar peticiones (cabeceras, metodos, URL)
const router = require('./network/routes');

var cors = require('cors');
const app = express(); //Inicializacion de express
app.use(bodyParser.json()); //Metodo para trabajar exclusivo con ficheros json
app.use(bodyParser.urlencoded({extended: false}));

//Se define el puerto de salida local
const port = 3001;

//Evita el problema CORS al momento de mandar peticiones
router(app.use(cors()));

app.set('port', process.env.PORT || port);

app.get('/', (req, res) =>{
    res.json("Backend QuimbayaDev");
})

//Ejecutar la aplicacion en el puerto definido previamente en la variable puerto
app.listen(app.get('port'), async () => {
    //Mensaje en consola para verificar que la aplicacion esta iniciada
    console.log('La aplicacion esta escuchando en http://localhost:' + app.get('port'));
});