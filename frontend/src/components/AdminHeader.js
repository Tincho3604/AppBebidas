import React from 'react';
import logoBlanco from '../images/logoBlanco.png';

const AdminHeader = (props) => {
	return ( <div className="adminHeader">
		<div className='logo'>
				<img src={logoBlanco} />
		</div>
		<div style={{flex: 1}}></div>
		<span>Salir</span>
	</div> );
}
 
export default AdminHeader;