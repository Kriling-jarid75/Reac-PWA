import axios from 'axios';


export class UsuarioServices{
    URL = "http://localhost:8585/usuarios";
    
    getAll(){
        return axios.get(this.URL + "all")
        .then(res =>res.data);
    }
}