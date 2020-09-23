import React from 'react';
import AdminHeader from '../components/AdminHeader';
import NavAdmin from '../components/NavAdmin';
import '../styles/adminDashboard.css'

const AdminDashboard = (props) => {
	return ( <>
	<AdminHeader />
	<div className="dashboard">
		<NavAdmin />
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
	</div></> );
}
 
export default AdminDashboard;