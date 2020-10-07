import React, { useState,useEffect } from 'react'
import userActions from '../redux/actions/userActions'
import {connect} from 'react-redux'
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/checkout.css';
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';

const Payment = (props) => {

const [card, setCard] = useState({
	cvc: '',
	expiry: '',
	focus: '',
	name: '',
	number: '',
	})

const handleInputFocus = (e) => {
	setCard({...card, focus: e.target.name });
}
	
const handleInputChange = (e) => {
	const { name, value } = e.target;
	setCard({...card, [name]: value });
}
	
	return (
		<>
			<Header />
			<div className='checkout'>
				<div className='breadcrum'>
					<img src={require('../images/stepOneOn.png')} />
					<img src={require('../images/stepTwoOn.png')} />
					<img src={require('../images/stepThreeOn.png')} />
					<img src={require('../images/stepFourOn.png')} />
					<img src={require('../images/stepFiveOff.png')} />
				</div>
				<div className='title'>
					<span>Pago con tarjeta</span>
				</div>
				<div id="PaymentForm">
					<Cards
					cvc={card.cvc}
					expiry={card.expiry}
					focused={card.focus}
					name={card.name}
					number={card.number}
					/>
					<form className='addressForm'>
						<div className='input'>
							<label>Numero</label>
							<input type="tel" name="number" placeholder="Ej. 4912 1234 1234 1234" onChange={handleInputChange} onFocus={handleInputFocus} maxLength={19} />
						</div>
						<div className='input'>
							<label>Nombre</label>
							<input type="text" name="name" placeholder="Ej. Maria Gomez" onChange={handleInputChange} onFocus={handleInputFocus} />
						</div>
						<div className='input'>
							<label>Fecha de expiracion</label>
							<input type="tel" name="expiry" placeholder="MMAA" onChange={handleInputChange} onFocus={handleInputFocus} maxLength={4} />
						</div>
						<div className='input'>
							<label>Codigo de seguridad</label>
							<input type="tel" name="cvc" placeholder="Ej. 123" onChange={handleInputChange} onFocus={handleInputFocus} maxLength={3}/>
						</div>
						<div className="buttons">
							<button className="btnSecondary" onClick={() => props.history.push('/billingAddress')}>Volver</button>
							<button className="btnPrimary" onClick={() => props.history.push('/createOrder')}>Pagar y finalizar compra</button>
						</div>
					</form>
				</div>
			</div> 
			<Footer />
		</>
		)
}




const mapStateToProps = state => {
    return {
        user: state.userReducer
    }
}

const mapDispatchToProps = {
	
}


export default connect(mapStateToProps, mapDispatchToProps)(Payment);