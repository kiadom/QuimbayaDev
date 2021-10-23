import Index from './pages';
import AdminUsuariosPage from './pages/admin_usuarios';
import EstadoProductosPage from './pages/maestro_productos';
import AdminVentasPage from './pages/admin_ventas';
import PrincipalPage from './pages/principal';

import Layout from './layouts/Layout';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import React from "react";

import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <Auth0Provider
      domain="acceso-app-quimbayadev.us.auth0.com"
      clientId="XmuI5XJKsKSeCzIgM5o9e1AX3Trhv0nT"
      redirectUri={window.location.origin}
    >
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
          <Route path = {['/']}>
            <AuthLayout>
              <Switch>
                <Route path = '/'>
                  <Index />
                </Route>
              </Switch>
            </AuthLayout>
          </Route>
        </Switch>
      </Router>
    </Auth0Provider>
  );
}

export default App;