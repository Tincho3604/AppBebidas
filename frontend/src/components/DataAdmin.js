import React from 'react';

const DataAdmin = (props) => {
	return ( <>
	<div className="dataPanel">
			<div className='adminData'>
				<span>5</span>
				<span>Ordenes pendientes</span>
			</div>
			<div className='adminData'>
				<span>3</span>
				<span>Articulos sin stock</span>
			</div>
			<div className='adminData'>
				<span>35</span>
				<span>Cantida de usuarios</span>
			</div>
			<div className='adminData'>
				<span>7</span>
				<span>Reseñas hechas</span>
			</div>
		</div>
	</> );
}
 
export default DataAdmin;