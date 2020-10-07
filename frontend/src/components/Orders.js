import React from 'react';
import { connect } from "react-redux"
import { useEffect } from "react"
import userActions from '../redux/actions/userActions';
import orderActions from '../redux/actions/orderActions';
import NavAdmin from '../components/NavAdmin';
import Order from "../components/Order"

const Orders = (props) => {

	useEffect(() => {
		props.getAllOrders()

	}, [])


	return (<>

		<div className="Container">

			{props.Orders.length === undefined ?
				null :
				props.Orders.map(orders => {
					return <>
				

						<Order orders={orders.items} billingAddress={orders.billingAddress} shippingAddress={orders.shippingAddress} status={orders.status} />
					</>


				})}

		</div>


	</>);
}

const mapStateToProps = state => {
	return {
		Orders: state.orderReducer.Orders
	}
}
const mapDispatchToProps = {
	getAllOrders: orderActions.getAllOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);