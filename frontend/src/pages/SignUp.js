import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
//import Footer from '../components/Footer';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import '../styles/generalStyles.css'



const SignUp = (props) => { 
    
    const [nuevoUsuario, setNuevoUsuario] = useState({
        firstName: '', lastName: '', pass: '', mail: ''
    })
    const leerInput = e => {
        const campo = e.target.name
        const valor = e.target.value
        setNuevoUsuario({
            ...nuevoUsuario,
            [campo]: valor
        })
    }
    const enviarInfo = async e => {
        e.preventDefault()
        //Validacion
        if (nuevoUsuario.firstName === '' || nuevoUsuario.lastName === ''|| nuevoUsuario.pass === '') {
            alert("Campos obligatorios")
        } else {
            const response = props.createUser(nuevoUsuario)
            props.history.push('/')
        }
    }
    const responseGoogle = response => {
        props.createUser({
              firstName: response.profileObj.givenName, 
              lastName: response.profileObj.familyName, 
              mail: response.profileObj.email, 
              pass: response.profileObj.googleId, 
            })
      }
    return (
       <>
        <div className="mainContainer fondoForm">
            <div className="formulario">
            <h1>Nuevo usuario</h1>
               <input type="text" name="firstName" onChange={leerInput} placeholder="Nombre" />
               <input type="text" name="lastName" onChange={leerInput} placeholder="Apellido" />
               <input type="mail" name="mail" onChange={leerInput} placeholder="Email" />
               <input type="password" name="pass" onChange={leerInput} placeholder="Contraseña (min 5 caracteres)" />
               <button onClick={enviarInfo}>Registrarme</button>
               <h4>O</h4>
               <GoogleLogin
                clientId="1036652497232-evt9ves8p9a3kqs1uu47f769ueldgr2n.apps.googleusercontent.com"
                buttonText="Crear cuenta con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                />
               <button><NavLink to='/login'> Ya estoy registrado </NavLink></button>
            </div>
        </div>

        </>
    )
}
const mapDispatchToProps = {
    createUser: userActions.createUser
}
export default connect(null, mapDispatchToProps)(SignUp)