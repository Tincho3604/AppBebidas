import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import Swal from 'sweetalert2'
import '../styles/generalStyles.css'


class PassRecovery extends React.Component{

    state={
        mail:"",
        error:"",
        disabled: false
    }

    getForm = e =>{
        e.preventDefault()
        const value = e.target.value
        this.setState({
            ...this.state,
            mail: value,
            error:""
        })
        
    
    }


    submit =  async e => {
 
        e.preventDefault()

        this.setState({
            ...this.state,
            disabled: true
        })
        if (this.state.error ==="" ){
            
            const sendMail = await this.props.sendMail(this.state.mail) 
            if (sendMail === false){
                this.setState({
                    error: "That email address is not associated with an existing account"
                })   
                this.setState({
                    ...this.state,
                    disabled: false
                }) 
            } else{
                Swal.fire({  title: 'A email has been sent!',  text: "Please check your mail box",  icon: 'success',  showConfirmButton: false, timer: 4000,allowOutsideClick: false})
                this.props.history.push('/')
                this.setState({
                    ...this.state,
                    disabled: false
                }) 
            }
        }
    }
    render(){
        
        return(
            <>
            <Header />
            <div className="Pass">
            <h3 className="titleHouses">CAMBIA TU CONTRASEÑA</h3>
            <div style={{marginTop:"2rem",marginBottom:"1rem"}} className="signContainer">
                <h4 style={{color:"whitesmoke",textAlign:"center",fontSize:"1rem",margin:"1rem"}}>Si olvidó su contraseña por favor ingrese su correo electrónico</h4>
                <div className="inputs">
                    <span className={this.state.error === "" ? "" : "logError"}>{this.state.error}</span>
                    <input className="account" onChange={this.getForm} name="mail" type="text" placeholder="Tu email"></input>
                    <button disabled={this.state.disabled} className="send" onClick={this.submit}>Enviar</button>
                </div>
            </div>
            <img src="https://www.vinetur.com/imagenes/2020/mayo/18/whisky.jpg"/>
            </div>
            <Footer/>
            
            </>
        )
    }
}


const mapDispatchToProps ={
    sendMail: userActions.sendMail
}

export default connect (null, mapDispatchToProps)(PassRecovery)