import React from 'react';
import AdminHeader from '../components/AdminHeader';
import CreateProduct from '../components/CreateProduct';
import NavAdmin from '../components/NavAdmin';
import '../styles/adminDashboard.css'

const AdminCreateProduct = (props) => {
	return ( <>
	<AdminHeader />
	<div className="dashboard">
		<NavAdmin />
		<CreateProduct />
	</div></> );
}
 
export default AdminCreateProduct;