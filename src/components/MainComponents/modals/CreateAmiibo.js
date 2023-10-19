import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

export default class CreateAmiibo extends Component {
    state = {
        show: false,
        title: 'Agrega un amiibo',
        btnLabel: 'Agregar amiibo',
        amiibo: {
            character:'', 
            name:'',
            tail:''
        },
        user_id: localStorage.getItem("user_id")
       
    }
    async componentDidMount(){
        const {amiibo} = this.props
        if(amiibo){
            this.setState({
                title: 'Modificar amiibo' + ' ' + amiibo.character + ' ' + amiibo.name + ' ' + amiibo.tail, 
                btnLabel: "Editar",
                amiibo: {
                    character: amiibo.character,
                    name: amiibo.name,
                    tail: amiibo.tail
                },
            })
        }
    }

    onInputChange = (e) => {
        const {name, value} = e.target;
        this.setState((prevState)=>({
            amiibo:{
                ...prevState.amiibo,
                [name]: value
            }
        }))
    }
    onSubmit = async (e)=>{
        e.preventDefault();
        const {amiibo} = this.props
        const newAmiibo ={
            character: this.state.amiibo.character,
            name: this.state.amiibo.name,
            tail: this.state.amiibo.tail
        }
        if(amiibo){
            // esta editando
            await axios.put(process.env.REACT_APP_HOSTNAME+"/amiibos/"+amiibo._id, newAmiibo)
        }else{
            // esta guardando
            newAmiibo.idUsuario = this.state.user_id
            await axios.post(process.env.REACT_APP_HOSTNAME+"/amiibos",newAmiibo)
        }
        console.log(newAmiibo)
        //window.location.reload();
    }
    HandleClose = () => this.setState({ show: false });
    HandleShow = () => this.setState({ show: true });
    render() {
        return (
            <div>
                <Button className=" m-2" variant="primary" onClick={this.HandleShow}>
                    {this.state.btnLabel}
                </Button>
                <Modal show={this.state.show} onHide={this.HandleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                    <form>
                        <Modal.Body>
                        <div className="form-group mb-2">
                            <label className="mb-2">Character</label>
                            <input type="text" className="form-control" placeholder="Super-Mario" required name="character"
                                onChange={this.onInputChange} value={this.state.amiibo.character}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="mb-2">Name</label>
                            <input type="text" className="form-control" placeholder="Mario" required name="name"
                                onChange={this.onInputChange} value={this.state.amiibo.name}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="mb-2">tail</label>
                            <input type="text" className="form-control" placeholder="Mario" required name="tail"
                                onChange={this.onInputChange} value={this.state.amiibo.tail}
                            />
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.HandleClose}>
                                Cancelar
                            </Button>
                            <Button variant="success" onClick={this.onSubmit}>
                                Guardar
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )
    }
}