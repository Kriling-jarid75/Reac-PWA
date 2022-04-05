import React, { Component } from 'react'

import "../App.css";

export class Inicio extends Component {
  render() {
    return (
      <div className="container">
        <br /><br />
        <center>
          <h1>Creación de una PWA en React</h1>
          <br />
          <h2>Deploy con Netlify</h2>
        </center>
        <br /><br /><br />
        <p>En esta app se llevará acabo la creación de una <strong>PWA</strong> usando
          <strong>Reeact</strong> y al mismo tiempo consumiendo una <strong>API</strong> realizada
          en <strong>Spring Boot</strong>,
          usando igual como herramienta <strong>Postman</strong> para corroborar que las urls esten correctamente
          activas.</p>
        <br />
        <center>
          <h2>Developers</h2>
          <ul className="biñeta">
            <li>{">>"} Kriling Jarid Garcia Espinioza </li>
            <li>{">>"} José Manuel Navarrete Cruz</li>
            
          </ul>
        </center>
      </div>
    )
  }
}

export default Inicio