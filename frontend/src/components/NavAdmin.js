import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavAdmin = (props) => {
	return ( <>
	<div className='navAdmin'>
		<div className='navBrand'>
		</div>
		<NavLink to='/admin'>
			<div className='navItem'>
				<div><i className="fas fa-home"></i></div>
				<div>Dashboard</div>
			</div>
		</NavLink>
		<Link>
			<div className='navItem'>
				<div><i className="fas fa-wine-bottle"></i></div>
				<div>Productos</div>
			</div>
		</Link>
		<Link>
			<div className='navItem'>
				<div><i className="fas fa-plus-circle"></i></div>
				<div>Cargar Producto</div>
			</div>
		</Link>
		<Link>
			<div className='navItem'>
				<div><i className="fas fa-folder-open"></i></div>
				<div>Ordenes</div>
			</div>
		</Link>
		<Link>
			<div className='navItem'>
				<div><i className="fas fa-images"></i></div>
				<div>Modificar carrusel</div>
			</div>
		</Link>
		<Link>
			<div className='navItem'>
				<div><i className="fas fa-store-alt"></i></div>
				<div>Ir a la tienda</div>
			</div>
		</Link>
	</div>
	</> );
}
 
export default NavAdmin;