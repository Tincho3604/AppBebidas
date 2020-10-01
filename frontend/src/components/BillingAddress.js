import React, { useState } from 'react'
import userActions from '../redux/actions/userActions'
import userReducer from '../redux/reducers/userReducer'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert'
// import userActions from '../redux/actions/userActions';

const BillingAddress = (props) => {

const [billingAddress, setAddress] = useState({
    street: "",
    number:"",
    floor:"",
    apartment:"",
})

const [error, setError] = useState({
    street: "",
    number:"",
    floor:"",
    apartment:"",
})

const [send, setSend] = useState({
    status: false
})

const [disabled, setDisabled] = useState(true);



const validation = billingAddress => {
    error.ok = true
    //RegEx
    
    const alphanum = RegExp(/^\w+$/)
    const num = RegExp(/\d.{1,}/)
    

    //Street
    
    if (billingAddress.street === '') {
        error.street = 'Cannot be empty'
        error.ok = false
    }
    else if (billingAddress.street < 3) {
        error.street = 'Need three characters at least'
        error.ok = false
    }
    else if (!alphanum.test(billingAddress.street)) {
        error.street = 'Only can contains letters and numbers'
        error.ok = false
    }
    else error.title = ''
    


    //Number
    if (billingAddress.number === '') {
        error.number = 'Cannot be empty'
        error.ok = false
    }
    else if (!num.test(billingAddress.number)) {
        error.number = 'Only can contains numbers'
        error.ok = false
    }
    else error.number = ''
    
    

    //Floor
    if (billingAddress.floor === '') {
        error.number = 'Cannot be empty'
        error.ok = false
    }
    else if (!num.test(billingAddress.floor)) {
        error.number = 'Only can contains numbers'
        error.ok = false
    }
    else error.number = ''
    


     //Apartment
    if (billingAddress.apartment === '') {
        error.apartment = 'Cannot be empty'
        error.ok = false
    }
    else if (billingAddress.street === 1) {
        error.street = 'Need three characters at least'
        error.ok = false
    }
    else if (!alphanum.test(billingAddress.apartment)) {
        error.apartment = 'Only can contains letters and numbers'
        error.ok = false
    }
    else error.apartment = ''
    
    console.log(error)

    return error.ok
}


const handleChange = e => {
    
    setAddress({
        ...billingAddress,
        [e.target.name]: e.target.value
    })
console.log(e.target.value)
}

const handleClick = async e => {
    e.preventDefault();
    send.status = true
    setSend({ status: true })
    if (validation(billingAddress)) {
        const fd = new FormData()
        fd.append("street",billingAddress.street)
        fd.append("number",billingAddress.number)
        fd.append("floor",billingAddress.floor)
        fd.append("apartment",billingAddress.apartment)
        

        await props.addBillingAddress(fd)
        
        
        //ACCION
        setError({
            ...error,
            ok: true
        })
    }
    
    else {
        send.status = false
        setSend({ status: false })
        setError({
            ...error,
            ok: false
        })
        alert("ERROR")
    }
}


function handleGameClick() {
    setDisabled(!disabled);
}

const confirm = () => {
    swal({
        title: "¡Datos Confirmados!",
        text: "¡Los datos fueron confirmados exitosamente!",
        icon: "success",
        
      });
}
        

return (
    <>
        <div id="mainContainerProduct">
            <h1>Billing Address</h1>
            
        
                
                <label for="option">¿Do you want to modify the information?</label>
                
                <label htmlFor="yes">Yes</label>
                <input type="radio" name="option" id="yes" value="yes" onChange={handleGameClick}/>
                
                <label htmlFor="no">No</label>
                <input type="radio" name="option"  id="no" value="No" onChange={handleGameClick}/>
            
        
                <div className="formContainer">
                <div className="inputs">
                    <label for="street">Street:</label>
                    <input type="text" name="street" onChange={handleChange} value={props.user.billingAddress === undefined ? billingAddress.street : props.billingAddress.street} disabled={disabled}></input>
                    
                    <div className="inputs">
                        <label for="number">Number:</label>
                        <input type="number" name="number" onChange={handleChange} value={props.user.billingAddress === undefined ? billingAddress.number : props.billingAddress.number} disabled={disabled}></input>
                    </div>
                    
                    <div className="inputs">
                        <label for="floor">Floor:</label>
                        <input type="text" name="floor" onChange={handleChange} value={props.user.billingAddress === undefined ? billingAddress.floor : props.billingAddress.floor} disabled={disabled}></input>
                    </div>
                        
                    <div className="inputs">
                        <label for="apartment">Apartment:</label>
                        <input type="text" name="apartment" onChange={handleChange} value={props.user.billingAddress === undefined ? billingAddress.apartment : props.billingAddress.apartament} disabled={disabled}></input>
                    </div>               
                </div>
            
            </div>
                <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={handleClick}>Send Info</button>
                <NavLink to="/"><button style={{height:'5vh', width:'10vh',margin:'0 auto'}} onClick={confirm}>Next</button></NavLink>
            </div> 
        </>
    )
}


const mapStateToProps = state => {
    return {
        billingAddress: state.userReducer.billingAddress,
        user: state.userReducer
    }
}

const mapDispatchToProps = {
    
    addBillingAddress: userActions.addBillingAddress

    }


export default connect(mapStateToProps, mapDispatchToProps)(BillingAddress);
