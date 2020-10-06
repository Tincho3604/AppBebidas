import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import orderActions from '../redux/actions/orderActions';
import Footer from './Footer';
import Header from './Header';

const CreateOrder = (props) => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const createOr = async (order) => {
			await props.createOrder(order)
		}
		
		setTimeout(() => {
			setLoading(false)
			const order = {
				userId: props.user.id,
				shippingAddress: props.orderShippingInfo,
				billingAddress: props.orderBillingInfo,
				items: props.user.cart,
				payment: 'Tarjeta de credito'
			}
			console.log(order)
			createOr(order)
		}, 3000);


	}, [])

	return (  <>
		<Header />
        <div className='checkout'>
			<div className='breadcrum'>
				<img src={require('../images/stepOneOn.png')} />
				<img src={require('../images/stepTwoOn.png')} />
				<img src={require('../images/stepThreeOn.png')} />
				<img src={require('../images/stepFourOn.png')} />
				<img src={require('../images/stepFiveOn.png')} />
			</div>
			<div>
				<span>¡Muchas gracias por su compra!</span>
				<span>En breve le llegara un mail.</span>
			</div>
		</div>
		<Footer />
		</> );
}

const mapStateToProps = state => {
    return {
		orderShippingInfo: state.userReducer.orderShippingInfo,
		orderBillingInfo: state.userReducer.orderBillingInfo,
		user: state.userReducer
    }
}

const mapDispatchToProps = {
	createOrder: orderActions.createOrder
}
 
export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);