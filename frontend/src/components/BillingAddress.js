import React, { useState } from 'react'
import userActions from '../redux/actions/userActions'
import userReducer from '../redux/reducers/userReducer'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/checkout.css';

const BillingAddress = (props) => {

const [billing, setBilling] = useState({
    name: props.billingAddress !== undefined ? props.billingAddress.name : '',
    cuit: props.billingAddress !== undefined ? props.billingAddress.cuit : '',
    type:  props.billingAddress !== undefined ? props.billingAddress.type : '',
    phone: props.billingAddress !== undefined ? props.billingAddress.phone : '',
    notes: props.billingAddress !== undefined ? props.billingAddress.notes : '',
})

const [error, setError] = useState({
	name:'',
    cuit:'',
	type:'',
	phone:'',
	notes:''
})

const [send, setSend] = useState({
	status: false
})

const [alerta, setAlerta] = useState({
	errorName: "",
	errorCuit: "",
	errorType: "",
	errorPhone: "",
	errorNotes: "",
})



/*----------------------------------------------VALIDATION-----------------------------------------*/

	const validation = billing => {
	error.ok = true
		//RegEx
		const alphanum = RegExp(/^\w+$/)
		const num = RegExp(/\d./)
		const decimals = RegExp(/^([0-9]+(\.?[0-9]?[0-9]?)?)/)							
		
		//name
		if (billing.street === '') {
			error.name = 'Cannot be empty'
			error.ok = false
		}
		else error.name = ""
		
	
	
		// cuit
		if (billing.cuit === '') {
			error.cuit = 'Cannot be empty'
			error.ok = false
		}
		
		else if (!alphanum.test(billing.number)) {
			error.cuit = 'Solo puede contener numeros '
			error.ok = false
		}
		else error.cuit = ''
		
	
	
		//type
		if (billing.type === '') {
			error.type = 'Cannot be empty'
			error.ok = false
		}
		else if (billing.type.length > 3) {
			error.type = "Max 2 characters"
			error.ok = false
		}
		else error.type = ''
		
	
	
		//phone
		if (billing.phone === '') {
			error.phone = 'Cannot be empty'
			error.ok = false
		}
		else if (!num.test(billing.phone)) {
			error.phone = 'Only can contains numbers'
			error.ok = false
		}
		else error.phone = ''
		
	
	
		//notes
		if (billing.notes === '') {
			error.notes = 'Cannot be empty'
			error.ok = false
		}
		else error.notes = ""
	}
									
	    /*----------------------------------------------VALIDATION-----------------------------------------*/

const inputHandler = (e) => {
	const valor = e.target.value;
	const campo = e.target.name;
	setBilling({
			...billing,
			[campo]: valor
	})
}



const submitHandler = async e => {
	e.preventDefault();
    send.status = true
	setSend({ status: true })
	

	if (validation(billing)) {
        
		toast.success("¡Datos Confirmados!", {
                position: toast.POSITION.TOP_CENTER
        });
	
		await props.addBillingAddress(billing,props.user.token)
		
		setError({
			...error,
			ok: true
		})
		
		setAlerta({
			errorName: '',
			errorCuit: '',
			errorType: '',
			errorPhone: '',
			errorNotes: '',
		})
	
	
		setBilling({
			name: "",
			cuit: "",
			type: "",
			phone: "",
			notes: "",
		})
	}
	else {
		send.status = false
		setSend({ status: false })
		setError({
			...error,
			ok: false
		})
		setAlerta({
			errorName: error.name,
			errorCuit: error.cuit,
			errorType: error.type,
			errorPhone: error.phone,
			errorNotes: error.notes,
			})
		}
}

return (
    <>
		<Header />
        <div className='checkout'>
			<div className='breadcrum'>
				<img src={require('../images/stepOneOn.png')} />
				<img src={require('../images/stepTwoOn.png')} />
				<img src={require('../images/stepThreeOn.png')} />
				<img src={require('../images/stepFourOff.png')} />
				<img src={require('../images/stepFiveOff.png')} />
			</div>
			<div className='title'>
				<span>Datos de facturacion</span>
			</div>
			<form className='addressForm'>
				<div className="input">
					<label>Nombre y apellido / Nombre de fantasia</label>
					<input type='text' onChange={inputHandler} name="name" value={billing.name} />
				    <span style={{ color: "white" }}>{alerta.errorName}</span>
				</div>
				<div className="input">
					<label>CUIT/CUIL/DNI</label>
					<input type='text' onChange={inputHandler} name="cuit" value={billing.cuit} />
					<span style={{ color: "white" }}>{alerta.errorCuit}</span>
				</div>
				<div className="input">
					<label>Tipo de comprobante</label>
					<input type='text' onChange={inputHandler} name="type" value={billing.type} />
				    <span style={{ color: "white" }}>{alerta.errorType}</span>
				</div>
				<div className="input">
					<label>Telefono</label>
					<input type='text' onChange={inputHandler} name="phone" value={billing.phone} />
				    <span style={{ color: "white" }}>{alerta.errorPhone}</span>
				</div>
				<div className="input">
					<label>Notas</label>
					<input type='text' onChange={inputHandler} name="notes" value={billing.notes} />
				    <span style={{ color: "white" }}>{alerta.errorNotes}</span>
				</div>
                
				
                <div className="input">
                    <button className="btnPrimary" style={{margin:'0 auto', width:'40vh'}} type="submit" value="Send Info" onClick={submitHandler}>Actualizar datos</button>
                </div>

				<div className="buttons">
				<button className="btnSecondary" onClick={() => props.history.push('/shippingAddress')}>Volver a datos de envio</button>
				<button className="btnPrimary" onClick={() => props.history.push('/payment')}>Ir pagar</button>
				</div>
			</form>
        </div> 
        <Footer />
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
