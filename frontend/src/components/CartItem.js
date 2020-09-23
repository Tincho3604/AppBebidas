import React from 'react';
import foto from '../images/ron-barcelo.png'

const CartItem = (props) => {
	return ( <>
		<div className='cartItem'>
			<div className='pic' style={{backgroundImage: `url(${require('../images/ron-barcelo.png')})`}}>

			</div>
			<div className='text'>
				<span>Ron Dominicano Barceló</span>
				<span>700ml / 37,5%</span>
				<span>1 x $2400</span>
			</div>
			<div className='actions'>
				<span>X</span>
			</div>
		</div>
	</> );
}
 
export default CartItem;