import React from 'react';
import { connect } from "react-redux"

import OrderProfile from './OrderProfile';

const OrdersProfile = (props) => {

console.log(props)

	return (<>

		<div className="Container">

			{props.orders.length === undefined ?
				null :
				props.orders.map(orders => {
					return <>
				

						<OrderProfile orders={orders.items} billingAddress={orders.billingAddress} shippingAddress={orders.shippingAddress} status={orders.status} id={orders._id}/>
					</>


				})}

		</div>


	</>);
}

const mapStateToProps = state => {
	return {
		
	}
}
const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersProfile);