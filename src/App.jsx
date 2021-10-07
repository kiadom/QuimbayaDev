import Index from './pages';
import AdminUsuariosPage from './pages/admin_usuariosSprint3';
import RegistroProductosPage from './pages/registro_productos';
import EstadoProductosPage from './pages/maestro_productos';
import AdminVentasPage from './pages/admin_ventas';
import ClavePage from './pages/clave';
import PrincipalPage from './pages/principal';
import RegistroEstadoVentasPage from './pages/registro_estado_ventas';

import Layout from './layouts/Layout';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import React from "react";

function App() {
  return (
    <Router>
      <Switch>
        <Route path = {['/admin_usuariosSprint3', '/registro_productos', '/maestro_productos', '/admin_ventas', '/registro_estado_ventas']}>
          <Layout>
            <Switch>
              <Route path = '/admin_usuariosSprint3'>
                <AdminUsuariosPage />
              </Route>
              <Route path = '/registro_productos'>
                <RegistroProductosPage/>
              </Route>
              <Route path = '/maestro_productos'>
                <EstadoProductosPage/>
              </Route>
              <Route path = '/admin_ventas'>
                <AdminVentasPage />
              </Route>
              <Route path = '/registro_estado_ventas'>
                <RegistroEstadoVentasPage />
              </Route>
            </Switch>
          </Layout>
        </Route>
        <Route path = {['/principal']}>
          <MainLayout>
            <Switch>
              <Route path = '/principal'>
                <PrincipalPage />
              </Route>
            </Switch>
          </MainLayout>
        </Route>
        <Route path = {['clave', '/']}>
          <AuthLayout>
            <Switch>
            <Route path = '/clave'>
                <ClavePage />
              </Route>
              <Route path = '/'>
                <Index />
              </Route>
            </Switch>
          </AuthLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;