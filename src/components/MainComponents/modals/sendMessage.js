import React, { Component } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

export default class SendMessage extends Component {
    state = {
        show: false,
        asunto: '',
        contenido: ''
    }

    enviarMensaje = async () => {
        const options ={
            user: localStorage.getItem("user_name"),
            asunto: this.state.asunto,
            contenido: this.state.contenido,
            email: this.props.contacto.email
        }
        const res = await axios.post(process.env.REACT_APP_HOSTNAME+"/contactos/mail", options)
        if(res.data.message){
            alert("El correo fue enviado")
            window.location.reload();
        }
    }
    
    onChangeAsunto = (e) =>{
        this.setState({
            asunto: e.target.value
        })
    }
    
    onChangeContenido = (e) =>{
        this.setState({
            contenido: e.target.value
        })
    }

    HandleClose = () => this.setState({ show: false });
    HandleShow = () => this.setState({ show: true });
    render() {
        return (
            <div>
                <Button variant="success" onClick={this.HandleShow}>
                    Enviar Correo
                </Button>
                <Modal show={this.state.show} onHide={this.HandleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Envia un Mensaje a {this.props.contacto.email}</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Asunto</Form.Label>
                                <Form.Control type="text" placeholder="Aviso importante" onChange={this.onChangeAsunto}
                                    value={this.state.asunto}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Contenido del Mensaje</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={this.onChangeContenido}
                                    value={this.state.contenido}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.HandleClose}>
                                Cancelar
                            </Button>
                            <Button type="button" variant="success" onClick={this.enviarMensaje}>
                                Enviar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}