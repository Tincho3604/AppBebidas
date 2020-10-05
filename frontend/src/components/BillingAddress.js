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
    nameFAC: props.billingAddress !== undefined ? props.billingAddress.nameFAC : '',
    dniFAC: props.billingAddress !== undefined ? props.billingAddress.dniFAC : '',
    voucherFAC:  props.billingAddress !== undefined ? props.billingAddress.voucherFAC : '',
    phoneFAC: props.billingAddress !== undefined ? props.billingAddress.phoneFAC : '',
    notesFAC: props.billingAddress !== undefined ? props.billingAddress.notesFAC : '',
})

const [error, setError] = useState({
	nameFAC:'',
    dniFAC:'',
	voucherFAC:'',
	phoneFAC:'',
	notesFAC:''
})

const [send, setSend] = useState({
	status: false
})

const [alerta, setAlerta] = useState({
	errorNameFAC: "",
	errorDniFAC: "",
	errorVoucherFAC: "",
	errorPhoneFAC: "",
	errorNotesFAC: "",
})



/*----------------------------------------------VALIDATION-----------------------------------------*/

	const validation = billing => {
	error.ok = true
		//RegEx
		const alphanum = RegExp(/^\w+$/)
		const num = RegExp(/\d./)
		const decimals = RegExp(/^([0-9]+(\.?[0-9]?[0-9]?)?)/)							
		
		//name
		if (billing.nameFAC === '') {
			error.nameFAC = 'Nombre no puede estar vacío'
			error.ok = false
		}
		else error.nameFAC = ""
		
	
	
		// cuit
		if (billing.dniFAC === '') {
			error.dniFAC = 'CUIT / CUIL / DNI no puede estar vacío'
			error.ok = false
		}
		
		else if (!alphanum.test(billing.number)) {
			error.dniFAC = 'Solo puede contener numeros '
			error.ok = false
		}
		else error.dniFAC = ''
		
	
	
		//type
		if (billing.voucherFAC === '') {
			error.voucherFAC = 'El tipo no puede estar vacío'
			error.ok = false
		}
		else if (billing.voucherFAC > 3) {
			error.voucherFAC = "2 caracteres como máximo"
			error.ok = false
		}
		else error.voucherFAC = ''
		
	
	
		//phone
		if (billing.phoneFAC === '') {
			error.phoneFAC = 'Telefono no puede estar vacío'
			error.ok = false
		}
		else if (!num.test(billing.phoneFAC)) {
			error.phoneFAC = 'Solo puede contener números'
			error.ok = false
		}
		else error.phoneFAC = ''
		
	
	
		//notes
		if (billing.notesFAC === '') {
			error.notesFAC = 'Las notas no pueden estar vacías'
			error.ok = false
		}
		else error.notesFAC = ""
	 
		//return
	 console.log(error)
	 return error.ok
	
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

console.log(props)

const submitHandler = async e => {
	e.preventDefault();
    send.status = true
	setSend({ status: true })
	

	if (validation(billing)) {
		toast.success("¡Datos Confirmados!", {
			position: toast.POSITION.TOP_CENTER
	});
		
		await   props.billingAddress(billing, props.user.token)

		setError({
			...error,
			ok: true
		})
		
		setAlerta({
			errorNameFAC: '',
			errorDniFAC: '',
			errorVoucherFAC: '',
			errorPhoneFAC: '',
			errorNotesFAC: '',
		})
	
	
		setBilling({
			nameFAC: billing.nameFAC,
			dniFAC: billing.dniFAC,
			voucherFAC: billing.voucherFAC,
			phoneFAC: billing.phoneFAC,
			notesFAC: billing.notesFAC,
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
			errorNameFAC: error.nameFAC,
			errorDniFAC: error.dniFAC,
			errorVoucherFAC: error.voucherFAC,
			errorPhoneFAC: error.phoneFAC,
			errorNotesFAC: error.notesFAC,
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
					<input type='text' onChange={inputHandler} name="nameFAC" value={billing.nameFAC} />
				    <span style={{ color: "red" }}>{alerta.errorNameFAC}</span>
				</div>
				<div className="input">
					<label>CUIT/CUIL/DNI</label>
					<input type='text' onChange={inputHandler} name="dniFAC" value={billing.dniFAC} />
					<span style={{ color: "red" }}>{alerta.errorDniFAC}</span>
				</div>
				<div className="input">
					<label>Tipo de comprobante</label>
					<input type='text' onChange={inputHandler} name="voucherFAC" value={billing.voucherFAC} />
				    <span style={{ color: "red" }}>{alerta.errorVoucherFAC}</span>
				</div>
				<div className="input">
					<label>Telefono</label>
					<input type='text' onChange={inputHandler} name="phoneFAC" value={billing.phoneFAC} />
				    <span style={{ color: "red" }}>{alerta.errorPhoneFAC}</span>
				</div>
				<div className="input">
					<label>Notas</label>
					<input type='text' onChange={inputHandler} name="notesFAC" value={billing.notesFAC} />
				    <span style={{ color: "red" }}>{alerta.errorNotesFAC}</span>
				</div>
                
				
                <div className="input">
                    <button className="btnPrimary" style={{margin:'0 auto', width:'40vh'}} type="submit" value="Send Info" onClick={submitHandler}>Actualizar datos</button>
                </div>

				<div className="buttons">
				<button className="btnSecondary" onClick={() => props.history.push('/shippingAddress')}>Volver</button>
				<button className="btnPrimary" onClick={() => props.history.push('/payment')}>Siguiente</button>
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
    billingAddress: userActions.addBillingAddress
}


export default connect(mapStateToProps, mapDispatchToProps)(BillingAddress);
