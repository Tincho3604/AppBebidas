import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
//import Footer from '../components/Footer';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import '../styles/generalStyles.css'



const SignUp = (props) => { 
    
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '', apellido: '', password: '', foto: '', phone: '', mail: ''
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
        if (nuevoUsuario.nombre === '' || nuevoUsuario.apellido === ''|| nuevoUsuario.password === ''|| nuevoUsuario.phone === '') {
            alert("Campos obligatorios")
        } else {
            const respuesa = props.crearCuenta(nuevoUsuario)
        }
    }
    const responseGoogle = respuesa => {
        props.crearCuenta({
              nombre: respuesa.profileObj.givenName, 
              apellido: respuesa.profileObj.familyName, 
              mail: respuesa.profileObj.email, 
              password: respuesa.profileObj.googleId, 
              foto: respuesa.profileObj.imageUrl
            })
      }
    return (
       <>
        <div className="mainContainer fondoForm">
            <div className="formulario">
            <h1>Nuevo usuario</h1>
               <input type="text" name="nombre" onChange={leerInput} placeholder="Nombre" />
               <input type="text" name="apellido" onChange={leerInput} placeholder="Apellido" />
               <input type="mail" name="mail" onChange={leerInput} placeholder="Email" />
               <input type="numero" name="phone" onChange={leerInput} placeholder="Telefono" />
               <input type="password" name="password" onChange={leerInput} placeholder="Contraseña (min 5 caracteres)" />
               <button onClick={enviarInfo}>Registrarme</button>
               <h4>O</h4>
               <GoogleLogin
                clientId="1070761935759-nsctc4ltqrua4gick49a01itbuopt2qj.apps.googleusercontent.com"
                buttonText="Crear cuenta con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                //cookiePolicy={'single_host_origin'}
                />
               <button><NavLink to='/login'> Ya estoy registrado </NavLink></button>
            </div>
        </div>

        </>
    )
}
const mapDispatchToProps = {
    crearCuenta: userActions.createUser
}
export default connect(null, mapDispatchToProps)(SignUp)