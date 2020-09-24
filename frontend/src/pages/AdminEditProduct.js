import React from 'react';
import AdminHeader from '../components/AdminHeader';
import EditProduct from '../components/EditProduct';
import NavAdmin from '../components/NavAdmin';
import '../styles/adminDashboard.css'

const AdminCreateProduct = (props) => {
	return ( <>
	<AdminHeader />
	<div className="dashboard">
		<NavAdmin />
		<EditProduct />
	</div></> );
}
 
export default AdminCreateProduct;