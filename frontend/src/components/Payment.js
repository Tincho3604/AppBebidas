import React, { useState,useEffect } from 'react'
import userActions from '../redux/actions/userActions'
import {connect} from 'react-redux'
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/checkout.css';

const Payment = (props) => {

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
				<span>Forma de pago</span>
			</div>
			<div>
				
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