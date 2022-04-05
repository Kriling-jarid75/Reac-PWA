import React, { Component } from 'react';


import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const url = "http://localhost:8585/usuarios";

export class crearUsuario extends Component {


    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            id: '',
            nombreJugador: '',
            apellidoPat: '',
            apellidoMat: '',
            edad: '',
            posicion: '',
            equipo: ''
        }
    }

    peticionGet = () => {
        axios.get(url + "/listar").then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
       
    }

    peticionPost = async () => {
        delete this.state.form.id;
        await axios.post(url + "/guardar", this.state.form, {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
            },
            "body": JSON.stringify({
                "id": null,
                "nombreJugador": this.state.form.nombreJugador,
                "apellidoPat": this.state.form.apellidoPat,
                "apelliDoMat": this.state.form.apellidoMat,
                "edad": this.state.form.edad,
                "posicion": this.state.form.posicion,
                "equipo": this.state.form.equipo
            })
        })
        .then(response => {

           
            
             if (response.status >= 200 && response.status < 300) {
                this.modalInsertar();
                this.peticionGet();
                 NotificationManager.success('', 'Se guardó el registro.', 2000);
                
            } else {
                if (response.status === 409) {
                    NotificationManager.error(' Nombre de registró duplicado', 'No se actualizo el registro.', 5000);
                } else {
                    NotificationManager.error('', 'No se actualizo el registro.', 5000);
                }
            }

            
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPut = () => {
        axios.put(url + "/actualizar", this.state.form)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                this.modalInsertar();
                this.peticionGet();
                NotificationManager.warning('', 'Se actaulió el registro.', 2000);

            } else {
                if (response.status === 409) {
                    NotificationManager.error(' Nombre de registro duplicado', 'No se actualizo el registro.', 5000);
                } else {
                    NotificationManager.error('', 'No se actualizo el registro.', 5000);
                }
            }
            
        })
    }

    peticionDelete = () => {
        axios.delete(url + "/eliminar/" + this.state.form.id)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                this.setState({ modalEliminar: false });
                this.peticionGet();
                NotificationManager.info('', 'Se eliminó el registro.', 2000);

            } else {
                if (response.status === 409) {
                    NotificationManager.error(' Nombre de registro duplicado', 'No se actualizo el registro.', 5000);
                } else {
                    NotificationManager.error('', 'No se actualizo el registro.', 5000);
                }
            }
           
        })
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    seleccionarJugador = (jugador) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
               
                id: jugador.id,
                nombreJugador: jugador.nombreJugador,
                apellidoPat: jugador.apellidoPat,
                apellidoMat: jugador.apellidoMat,
                edad: jugador.edad,
                posicion: jugador.posicion,
                equipo: jugador.equipo
            }
        })
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        //console.log(this.state.form);
    }

    componentDidMount() {
        this.peticionGet();
    }



    render() {
        const { form } = this.state;
         return (
           
             
            <div className="bg-light p-5 rounded">
             <br />
               {/* <main className="container">
                    <div className="bg-light p-5 rounded">
                        <h1>Crear un futbulista </h1>



                        <FontAwesomeIcon icon="fa-brands fa-facebook" />
                        <a className="btn btn-lg btn-primary" href="../components/navbar/" role="button">Agregar »</a>
                    </div>
                </main>*/}

                <button className="btn btn-success"
                 onClick={() => 
                 { this.setState({ form: null, tipoModal: 'insertar' });
                  this.modalInsertar() }}>Agregar Jugador</button>
                <br /><br />
                <table className="table table-striped " style={{width: '100%'}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre Jugador</th>
                            <th>Apellido paterno</th>
                            <th>Apellido materno</th>
                            <th>Edad</th>
                            <th>Posición</th>
                            <th>Equipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(jugador => {
                            return (
                                <tr key={jugador.id}>
                                    <td>{jugador.id}</td>
                                    <td>{jugador.nombreJugador}</td>
                                    <td>{jugador.apellidoPat}</td>
                                    <td>{jugador.apellidoMat}</td>
                                    <td>{jugador.edad}</td>
                                    <td>{jugador.posicion}</td>
                                    <td>{jugador.equipo}</td>

                                    <td>
                                        <button className="btn btn-primary" 
                                        onClick={() => { this.seleccionarJugador(jugador);
                                         this.modalInsertar() }}>
                                         <FontAwesomeIcon icon={faEdit} />
                                         </button>
                                        &nbsp;
                                        <button className="btn btn-danger" 
                                        onClick={() => { this.seleccionarJugador(jugador);
                                         this.setState({ modalEliminar: true }) }}>
                                         <FontAwesomeIcon icon={faTrashAlt} />
                                         </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>



                <Modal isOpen={this.state.modalInsertar}>
                   
                    <ModalHeader  style={{ display: 'block' }}>
                        <h1>Formulario de registro</h1>
                        <span className="btn btn-danger" style={{ float: 'right', marginTop: '-50px' }} onClick={() => this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id : this.state.data.length + 1} />
                            <br />
                            <label htmlFor="nombreJugador">Nombre del Jugador:</label>
                            <input className="form-control" type="text" name="nombreJugador" id="nombreJugador" onChange={this.handleChange} value={form ? form.nombreJugador : ''} />
                            <br />
                            <label htmlFor="apellidoPat">Apellido Paterno:</label>
                            <input className="form-control" type="text" name="apellidoPat" id="apellidoPat" onChange={this.handleChange} value={form ? form.apellidoPat : ''} />
                            <br />
                            <label htmlFor="apellidoMat">Apellido Materno:</label>
                            <input className="form-control" type="text" name="apellidoMat" id="apellidoMat" onChange={this.handleChange} value={form ? form.apellidoMat : ''} />
                            <br />
                            <label htmlFor="edad">Edad:</label>
                            <input className="form-control" type="text" name="edad" id="edad" onChange={this.handleChange} value={form ? form.edad : ''} />
                            <br />
                            <label htmlFor="posicion">Posicion en la que juega:</label>
                            <input className="form-control" type="text" name="posicion" id="posicion" onChange={this.handleChange} value={form ? form.posicion : ''} />
                            <br />
                            <label htmlFor="equipo">Equipo en que juega:</label>
                            <input className="form-control" type="text" name="equipo" id="equipo" onChange={this.handleChange} value={form ? form.equipo : ''} />
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        {this.state.tipoModal === 'insertar'  ?
                            <button className="btn btn-success" 
                                onClick={() => form === null ? 
                                  NotificationManager.error('', 'Los cammpos estan vacios', 2000)
                                :
                                this.peticionPost()}>
                                Registrarlo
                            </button> 
                            
                            : <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                                Actualizar jugador
                            </button>
                        }
                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar acción</button>
                    </ModalFooter>
                </Modal>
                <NotificationContainer />

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        ¿Estás seguro que deseas eliminar a la jugador? {form && form.apellidoPat}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-primary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default crearUsuario