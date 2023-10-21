import React, { Component } from "react";
import { Table } from 'react-bootstrap';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
/*import SendMessage from "./modals/sendMessage";*/
/*import { Button } from 'react-bootstrap';*/

export default class Amiibos extends Component {
    state = {
        amiibos: [],
        amiibosfav: []
    }
    async componentDidMount() {
        const res = await axios.get(process.env.REACT_APP_HOSTNAME + "/amiibos/user/" + localStorage.getItem("user_id"));
        this.setState({ amiibosfav: res.data });

        const res2 = await axios.get(process.env.REACT_APP_API_EXTERNA);
        let x = Object.entries(res2.data.amiibo); 
        let y = x.slice(x.length-30); 
        let z = []
        y.forEach(yi => z.push(yi))
        this.setState({amiibos: z})
        console.log(this.state.amiibos)
    }
    agregarAmiibo = async(amiibo) =>{
        await axios.post(process.env.REACT_APP_HOSTNAME+"/amiibos/", 
        {
            character: amiibo.character,
            name: amiibo.gameSeries,
            tail: amiibo.tail,
            idUsuario: localStorage.getItem("user_id")
        }
        );
        window.location.reload();
    }
    eliminarAmiibo = async(id) =>{
        await axios.delete(process.env.REACT_APP_HOSTNAME+"/amiibos/" + id);
        window.location.reload();
    }
    
    render() {
        return (
            <div className="container">
                <h1>Amiibos</h1>
                <div className="row">
                    <div className="col-lg-6">
                    <h3>Lista de Amiibos Favoritos</h3>
                     <Table striped bordered hover>
                         <thead>
                             <tr>
                              <th>Personaje</th>
                              <th>Nombre</th>
                              <th>Tail</th>
                              <th>Acción</th>
                         </tr>
                     </thead>
                    <tbody>
                        {
                            this.state.amiibosfav.map(amiibofav =>
                                <tr key={amiibofav._id}>
                                    <td>{amiibofav.character}</td>
                                    <td>{amiibofav.name}</td>
                                    <td>{amiibofav.tail}</td>
                                    <td><Button onClick={() => this.eliminarAmiibo(amiibofav._id)} className="btn-danger">Eliminar</Button></td>
                               </tr>
                            )
                        }
                    </tbody>
                 </Table>
                </div>
                <div className="col-lg-6">
                <h3>Lista de Amiibos</h3>
                     <Table striped bordered hover>
                         <thead>
                             <tr>
                              <th>Personaje</th>
                              <th>Nombre</th>
                              <th>Tail</th>
                              <th>Acción</th>
                         </tr>
                     </thead>
                    <tbody>
                        {
                            this.state.amiibos.map(amiibo =>
                                <tr key={amiibo[1].tail}>
                                    <td>{amiibo[1].character}</td>
                                    <td>{amiibo[1].gameSeries}</td>
                                    <td>{amiibo[1].tail}</td>
                                    <Button onClick={() => this.agregarAmiibo(amiibo[1])} className="btn-danger">Agregar</Button>
                                </tr>
                            )
                        }
                    </tbody>
                 </Table>
                </div>
              </div>
           </div>
        )
    }
}