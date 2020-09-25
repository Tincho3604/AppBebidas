import React from 'react';
//import Footer from '../components/Footer';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import { NavLink } from 'react-router-dom';

class Login extends React.Component {
    state = {
        mail: '',
        pass:''
    }
    leerInput = e => {
        const campo = e.target.name
        const valor = e.target.value
        this.setState({
            [campo]: valor
        })
    }
    enviarInfo = async e => {
        e.preventDefault()
        //Validacion
        if (this.state.mail === '' || this.state.pass === '') {
            alert("Campos obligatorios")
        } else {
            const usuarioALoguear = {mail: this.state.mail, pass: this.state.pass}
            const respuesta = await this.props.loguearUser(usuarioALoguear)
                this.props.history.push('/')
        }
    }
    responseGoogle = respuesa => {
        this.props.loguearUser({
        mail: respuesa.profileObj.email, 
        pass: respuesa.profileObj.googleId, 
     })
   }
    render(){
        return (
            <>
           <div className="mainContainer fondoForm">
              <div className="formulario">
              <h1>Ingresar a mi cuenta</h1>
                 <input type="mail" name="mail" onChange={this.leerInput} placeholder="Email" />
                 <input type="password" name="pass" onChange={this.leerInput} placeholder="Contraseña (min 5 caracteres)" />
                 <button onClick={this.enviarInfo}>Identificarme</button>
                 <h4>O</h4>
                 <GoogleLogin
                  clientId="1036652497232-evt9ves8p9a3kqs1uu47f769ueldgr2n.apps.googleusercontent.com"
                  buttonText="Ingresar con Google"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
                <NavLink to="/passRecovery" ><h4>Olvide mi contraseña</h4></NavLink>
              </div>
           </div>
           </>
        )
    }
}  
const mapDispatchToProps = {
    loguearUser: userActions.loginUser

}

export default connect(null, mapDispatchToProps)(Login)
