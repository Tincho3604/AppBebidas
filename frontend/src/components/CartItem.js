import React from 'react';
import foto from '../images/ron-barcelo.png'

const CartItem = (props) => {
	return ( <>
		<div className='cartItem'>
			<div className='pic' style={{backgroundImage: `url(${props.data.pic})`}}>

			</div>
			<div className='text'>
				<span>{props.data.title}</span>
				<span>{props.data.ml}ml / {props.data.alcPct}%</span>
				<span>{props.data.quantity} x ${props.data.price}</span>
			</div>
			<div className='actions'>
				<span>X</span>
			</div>
		</div>
	</> );
}
 
export default CartItem;