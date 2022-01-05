import React from 'react';
import {
 BrowserRouter, Route, Routes, Navigate 
} from 'react-router-dom';
import { isAuthenticated } from './services/auth';
import Login from './pages/index.js';
import Home from './pages/home/index.js';
import Detalhe from './pages/detalhe';

export function PrivateRoute({ children, props }) {
  let auth = isAuthenticated();


  if (auth == null) {

 
    return <Navigate to="/" />;
  }
  return children;
}

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          exact
          element={(
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          )}
         />
        <Route
          path="/detalhe/:id"
          exact
          element={(
            <PrivateRoute>
              <Detalhe />
            </PrivateRoute>
          )}
         />
        <Route path="/" exact element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
