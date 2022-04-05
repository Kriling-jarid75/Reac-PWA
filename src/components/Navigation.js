import React, { Component } from 'react';
import { Link } from 'react-router-dom';



export class Navigation extends Component {
    render() {
        return (
            <div >
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container-fluid">
                        <Link className="navbar-brand" to="/">Página Principal</Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link className="nav-link" to="/create">Crear un futbolista</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className="nav-link disabled" to="/#">Link</Link>
                                </li>
                                <li class="nav-item dropdown">
                                    <Link class="nav-link dropdown-toggle" to="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </Link>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link class="dropdown-item" to="/#">Action</Link></li>
                                        <li><Link class="dropdown-item" to="/#">Another action</Link></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><Link class="dropdown-item" to="/#">Something else here</Link></li>
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link disabled">Disabled</Link>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navigation