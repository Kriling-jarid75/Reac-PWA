import React from 'react';


import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navigation';
import crearUsuario from './pages/crearUsuario';
import Inicio from './pages/Inicio';


function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="container p-4">
        <Route path="/" exact component={Inicio} />
        <Route path="/create" exact  component={crearUsuario} />
        

      </div>
    </Router>
  );
}

export default App;
