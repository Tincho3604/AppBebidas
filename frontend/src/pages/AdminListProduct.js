import React from 'react';
import AdminHeader from '../components/AdminHeader';
import EditProduct from '../components/EditProduct';
import NavAdmin from '../components/NavAdmin';
import '../styles/adminDashboard.css'
import ListProduct from '../components/ListProduct'

const AdminListProduct = (props) => {

	return ( <>
	<AdminHeader />
	<div className="dashboard">
		<NavAdmin />
		<ListProduct />
	</div></> );
}
 
export default AdminListProduct;