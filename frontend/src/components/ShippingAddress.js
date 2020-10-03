import React, { useState,useEffect } from 'react'
import userActions from '../redux/actions/userActions'
import userReducer from '../redux/reducers/userReducer'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/checkout.css';

const ShippingAddress = (props) => {

const [shipping, setShipping] = useState({
    street: props.shippingAddress !== undefined ? props.shippingAddress.street : '',
    number: props.shippingAddress !== undefined ? props.shippingAddress.number : '',
    dpto:  props.shippingAddress !== undefined ? props.shippingAddress.dpto : '',
    who: props.shippingAddress !== undefined ? props.shippingAddress.who : '',
    phone: props.shippingAddress !== undefined ? props.shippingAddress.phone : '',
    notes: props.shippingAddress !== undefined ? props.shippingAddress.notes : '',
})






const inputHandler = (e) => {
	const valor = e.target.value;
	const campo = e.target.name;
	setShipping({
			...shipping,
			[campo]: valor
	})
}

const submitHandler = async e => {
    e.preventDefault();
        await props.addShippingAddress(shipping,props.user.token)
            toast.success("¡Datos Confirmados!", {
                position: toast.POSITION.TOP_CENTER
        });
    }



    
return (
    <>
		<Header />
        <div className='checkout'>
			<div className='breadcrum'>
				<img src={require('../images/stepOneOn.png')} />
				<img src={require('../images/stepTwoOn.png')} />
				<img src={require('../images/stepThreeOff.png')} />
				<img src={require('../images/stepFourOff.png')} />
				<img src={require('../images/stepFiveOff.png')} />
			</div>
			<div className='title'>
				<span>Datos de envio</span>
			</div>
			<form className='addressForm'>
				<div className="input">
					<label>Calle</label>
					<input type='text' onChange={inputHandler} name="street" value={shipping.street} />
				</div>
				<div className="input">
					<label>Altura</label>
					<input type='text' onChange={inputHandler} name="number" value={shipping.number} />
				</div>
				<div className="input">
					<label>Piso/Dpto</label>
					<input type='text' onChange={inputHandler} name="dpto" value={shipping.dpto} />
				</div>
				<div className="input">
					<label>Quien recibe?</label>
					<input type='text' onChange={inputHandler} name="who" value={shipping.who} />
				</div>
				<div className="input">
					<label>Telefono</label>
					<input type='text' onChange={inputHandler} name="phone" value={shipping.phone} />
				</div>
				<div className="input">
					<label>Notas</label>
					<input type='text' onChange={inputHandler} name="notes" value={shipping.notes} />
				</div>
				
                <div className="input">
                    <button className="btnPrimary" style={{margin:'0 auto', width:'40vh'}} type="submit" value="Send Info" onClick={submitHandler}>Actualizar datos</button>
                </div>
                
                <div className="buttons">
                <button className="btnSecondary" onClick={() => props.history.push('/cartList')}>Volver a Mi pedido</button>
				<button className="btnPrimary" onClick={() => props.history.push('/billingAddress')}>Ir datos de facturacion</button>
				</div>
			</form>
        </div> 
        <Footer />
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
