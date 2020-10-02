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
					<input type='text' onChange={inputHandler} value={billing.name} />
				</div>
				<div className="input">
					<label>CUIT/CUIL/DNI</label>
					<input type='text' onChange={inputHandler} value={billing.cuit} />
				</div>
				<div className="input">
					<label>Tipo de comprobante</label>
					<input type='text' onChange={inputHandler} value={billing.type} />
				</div>
				<div className="input">
					<label>Telefono</label>
					<input type='text' onChange={inputHandler} value={billing.phone} />
				</div>
				<div className="input">
					<label>Notas</label>
					<input type='text' onChange={inputHandler} value={billing.notes} />
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
