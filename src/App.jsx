import './App.css';
import admin_usuarios from "/pages/admin_usuarios";
import admin_vendedores from "/pages/admin_vendedores";
import admin_ventas from "/pages/admin_ventas";
import clave from "/pages/clave";
import entrada from "/pages/entrada";
import principal from "/pages/principal";
import registro_estado_ventas from "/pages/registro_estado_ventas";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/admin_usuarios">
            <admin_usuarios/>
          </Route>
          
          <Route path="/admin_vendedores">
            <admin_vendedores/>
          </Route>
          
          <Route path="/admin_ventas">
            <admin_ventas/>
          </Route>
          
          <Route path="/clave">
            <clave/>
          </Route>
          
          <Route path="/entrada">
            <entrada/>
          </Route>
          
          <Route path="/principal">
            <principal/>
          </Route>
          
          <Route path="/registro_estado_ventas">
            <registro_estado_ventas/>
          </Route>

        </Switch>
      </Router>       
    </div>
  );
}

export default App;
