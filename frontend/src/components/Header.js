import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/HeaderFooter.css';
import logo from '../images/logo.png';
import logoBlanco from '../images/logoBlanco.png';
import Cart from './Cart';

const Header = () => {
	const [cart, setCart] = useState(false)
	const cartHandler = () => {
		setCart(!cart)
	}
	return ( <> 
		<header>
			<div className='logo'>
				<img src={logoBlanco} />
			</div>
			<div className='links'>
				<NavLink to className='ufc'>Home</NavLink>
				<NavLink to className='ufc'>Bebidas</NavLink>
				<NavLink to className='ufc'>Contacto</NavLink>
			</div>
			<div style={{flex: 1}}/>
			<div className='links'>
				<NavLink to className='ufc'>Ingresar</NavLink> / 
				<NavLink to className='ufc'>Registrarse</NavLink>
			</div>
			<div className='cart' onClick={cartHandler}>
				<div className='icono'>
					<i class="fas fa-shopping-cart"></i>
				</div>
				<div className='data'>
					<span>$ 1000</span>
					<span>1 item</span>
				</div>
			</div>
		</header>
		<Cart show={cart} cerrar={cartHandler} />
	</> );
}
 
export default Header;