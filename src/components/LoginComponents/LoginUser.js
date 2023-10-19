import React, { Component } from "react";
import axios from "axios";
import './LoginUser.css'
import { Link } from 'react-router-dom'
export default class LoginUser extends Component {
    state = {
        nickname: '',
        password: '',
    }
    componentDidMount() {
        // Verifica si ya está logueado
        const isLogged = localStorage.getItem('isLogged');
        if (isLogged) {
          this.props.navigate('/amiibos');
        }
      }
    getLogin = async e => {
        e.preventDefault();
        const { setLogged, navigate } = this.props;
        const res = await axios.post(process.env.REACT_APP_HOSTNAME+'/users/login', {
            nickname: this.state.nickname,
            password: this.state.password
        });
        if(res.data.goIn === 1){
            alert("Inicio exitoso")
            setLogged(true); // Cambia isLogged a true en App
            localStorage.setItem("isLogged", true)
            localStorage.setItem("user_name", res.data.user.name)
            localStorage.setItem("user_id", res.data.user._id)
            navigate('/amiibos'); // Navega a /amiibos
        }else{
            alert("Usuario o contraseña incorrectos")
        }
    }

    onChangeNickname = (e) =>{
        this.setState({
            nickname: e.target.value
        })
    }
    onChangePassword = (e) =>{
        this.setState({
            password: e.target.value
        })
    }
    render() {
        return (
            <div>
                <div className="title-login">
                    <h1>Amiibos</h1>
                </div>
                <form className="container-login" onSubmit={this.getLogin}>
                    <div >
                        <h3 className="log">Iniciar Sesión</h3>
                    </div>
                    <div className="form-outline mb-4">
                        <input onChange={this.onChangeNickname} value={this.state.nickname} placeholder="username" type="text" className="form-control" />
                        <label className="form-label">Nickname</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input onChange={this.onChangePassword} value={this.state.password} placeholder="******" type="password" className="form-control" />
                        <label className="form-label">Password</label>
                    </div>

                    <button type="submit" className="btn btn-primary mb-4">Aceptar</button>

                    <div className="text-center">
                        <p>No tienes cuenta? <Link to="/resgistro">Registrate Aquí</Link></p>
                    </div>
                </form>
            </div>
        );
    }
}