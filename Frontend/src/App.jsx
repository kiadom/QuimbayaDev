import Index from './pages';
import AdminUsuariosPage from './pages/admin_usuarios';
import EstadoProductosPage from './pages/maestro_productos';
import AdminVentasPage from './pages/admin_ventas';
import ClavePage from './pages/clave';
import PrincipalPage from './pages/principal';

import Layout from './layouts/Layout';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import React from "react";

function App() {
  return (
    <Router>
      <Switch>
        <Route path = {['/admin_usuarios', '/maestro_productos', '/admin_ventas']}>
          <Layout>
            <Switch>
              <Route path = '/admin_usuarios'>
                <AdminUsuariosPage />
              </Route>
              <Route path = '/maestro_productos'>
                <EstadoProductosPage/>
              </Route>
              <Route path = '/admin_ventas'>
                <AdminVentasPage />
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