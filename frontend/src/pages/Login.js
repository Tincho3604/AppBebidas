import React from 'react';
//import Footer from '../components/Footer';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux'
import { GoogleLogin } from 'react-google-login';

class Login extends React.Component {
    state = {
        mail: '',
        password:''
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
        if (this.state.mail === '' || this.state.password === '') {
            alert("Campos obligatorios")
        } else {
            const usuarioALoguear = {mail: this.state.mail, password: this.state.password}
            const respuesta = await this.props.loguearUser(usuarioALoguear)
                this.props.history.push('/')
        }
    }
    responseGoogle = respuesa => {
        this.props.loguearUser({
        mail: respuesa.profileObj.email, 
        password: respuesa.profileObj.googleId, 
     })
   }
    render(){
        return (
            <>
           <div className="mainContainer fondoForm">
              <div className="formulario">
              <h1>Ingresar a mi cuenta</h1>
                 <input type="mail" name="mail" onChange={this.leerInput} placeholder="Email" />
                 <input type="password" name="password" onChange={this.leerInput} placeholder="Contraseña (min 5 caracteres)" />
                 <button onClick={this.enviarInfo}>Identificarme</button>
                 <GoogleLogin
                  clientId="1070761935759-nsctc4ltqrua4gick49a01itbuopt2qj.apps.googleusercontent.com"
                  buttonText="Ingresar con Google"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                //cookiePolicy={'single_host_origin'}
                />,
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