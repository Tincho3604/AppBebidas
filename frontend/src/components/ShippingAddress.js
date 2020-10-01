import React, { useState } from 'react'
import userActions from '../redux/actions/userActions'
import userReducer from '../redux/reducers/userReducer'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert'

const ShippingAddress = (props) => {

const [shipAddress, setAddress] = useState({
    street: '',
    number: '',
    floor:  '',
    apartment: '',
})

const [error, setError] = useState({
    street: '',
    number:'',
    floor:'',
    apartment:'',
})

const [send, setSend] = useState({
    status: false
})

const [disabled, setDisabled] = useState(true);

const validation = shipAddress => {
    error.ok = true
    //RegEx
    
    const alphanum = RegExp(/^\w+$/)
    const num = RegExp(/\d.{1,}/)
    

    //Street
    
    if (shipAddress.street === '') {
        error.street = 'Cannot be empty'
        error.ok = false
    }
    else if (shipAddress.street < 3) {
        error.street = 'Need three characters at least'
        error.ok = false
    }
    else if (!alphanum.test(shipAddress.street)) {
        error.street = 'Only can contains letters and numbers'
        error.ok = false
    }
    else error.title = ''
    


    //Number
    if (shipAddress.number === '') {
        error.number = 'Cannot be empty'
        error.ok = false
    }
    else if (!num.test(shipAddress.number)) {
        error.number = 'Only can contains numbers'
        error.ok = false
    }
    else error.number = ''
    
    

    //Floor
    if (shipAddress.floor === '') {
        error.number = 'Cannot be empty'
        error.ok = false
    }
    else if (!num.test(shipAddress.floor)) {
        error.number = 'Only can contains numbers'
        error.ok = false
    }
    else error.number = ''
    

     //Apartment
    if (shipAddress.apartment === '') {
        error.apartment = 'Cannot be empty'
        error.ok = false
    }
    else if (shipAddress.street === 1) {
        error.street = 'Need three characters at least'
        error.ok = false
    }
    else if (!alphanum.test(shipAddress.apartment)) {
        error.apartment = 'Only can contains letters and numbers'
        error.ok = false
    }
    else error.apartment = ''
    
    console.log(error)

    return error.ok
}

const handleChange = e => {
    
    setAddress({
        ...shipAddress,
        [e.target.name]: e.target.value
    })
}

const confirm = () => {
    swal({
        title: "¡Advertencia",
        text: "Recuerde que si confirma los datos, no podra cambiarlos",
        icon: "warning",
        button: "¡Entiendo!",
      });
}


const handleClick = async e => {
    e.preventDefault();
    send.status = true
    setSend({ status: true })
    if (validation(shipAddress)) {
        
        const fd = new FormData()
        fd.append("street",shipAddress.street)
        fd.append("number",shipAddress.number)
        fd.append("floor",shipAddress.floor)
        fd.append("apartment",shipAddress.apartment)
        
        await props.addShippingAddress(fd)
        
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


return (
    <>
        <div id="mainContainerProduct">
            <h1>Shipping Address</h1>
    
                <label for="option">¿Do you want to modify the information?</label>
                
                <label htmlFor="yes">Yes</label>
                <input type="radio" name="option" id="yes" value="yes" onChange={handleGameClick}/>
                
                <label htmlFor="no">No</label>
                <input type="radio" name="option"  id="no" value="No" onChange={handleGameClick}/>
            
    
            <div className="formContainer">
                <div className="inputs">
                    <label for="street">Street:</label>
                    <input type="text" name="street" onChange={handleChange} value={props.user.shippingAddress === undefined ? shipAddress.street : props.shippingAddress.street} disabled={disabled}></input>
                    
                    <div className="inputs">
                        <label for="number">Number:</label>
                        <input type="number" name="number" onChange={handleChange} value={props.user.shippingAddress === undefined ? shipAddress.number : props.shippingAddress.number} disabled={disabled}></input>
                    </div>
                    
                    <div className="inputs">
                        <label for="floor">Floor:</label>
                        <input type="text" name="floor" onChange={handleChange} value={props.user.shippingAddress === undefined ? shipAddress.floor : props.shippingAddress.floor} disabled={disabled}></input>
                    </div>
                        
                    <div className="inputs">
                        <label for="apartment">Apartment:</label>
                        <input type="text" name="apartment" onChange={handleChange} value={props.user.shippingAddress === undefined ? shipAddress.apartment : props.shippingAddress.apartament} disabled={disabled}></input>
                    </div>
                
                </div>
            </div>
                <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={handleClick}>Send Info</button>
                <NavLink to="/billingAddress"><button style={{height:'5vh', width:'10vh',margin:'0 auto'}} onClick={confirm}>Next</button></NavLink>
        </div> 
    
        
    </>
        )
    }

    


const mapStateToProps = state => {
    return {
        shippingAddress: state.userReducer.shippingAddress,
        user: state.userReducer
    }
}

const mapDispatchToProps = {
    addShippingAddress: userActions.addShippingAddress
    }


export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress);
